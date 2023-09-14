import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Exchange } from 'search-layout';
import { assertOk, makeError } from '../helpers/dataLoaderUtils';

interface DataProviderProps {
  api?: Array<
    (tradingPairs: string) => Promise<{ name: string; pairs: any[] }>
  >;
}
export const DataProvider = createContext<DataProviderProps>({});

export function useLoading(): [
  { isLoading: boolean; isLoaded: boolean; error: any },
  { executeLoad: any }
] {
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [error, setError] = useState<PromiseRejectedResult>();

  const executeLoad = useCallback(
    async (load: Promise<any>[], onSuccess: any) => {
      setLoading(true);
      setError(undefined);

      function onLoadComplete() {
        setLoading(false);
        setLoaded(true);
      }
      return Promise.allSettled(load)
        .then((result) => {
          onLoadComplete();

          const successful = result
            .filter((e) => e.status === 'fulfilled')
            .map((e: any) => e.value);

          const rejected = result.filter(
            (e) => e.status === 'rejected'
          )[0] as PromiseRejectedResult;

          onSuccess(successful);
          if (rejected !== undefined) {
            setError(rejected);
          }
        })
        .catch((err: any) => {
          onLoadComplete();
          setError(err);
        });
    },
    [setLoading, setLoaded, setError]
  );

  return [{ isLoading, isLoaded, error }, { executeLoad }];
}

export function useApiLoader(): [
  { isLoading: boolean; isLoaded: boolean; error: any; executeApiLoad: any }
] {
  const ctx = useContext(DataProvider);

  const [{ isLoading, isLoaded, error }, { executeLoad }] = useLoading();

  const api = ctx?.api;

  const executeApiLoad = useCallback(
    (executeApiFetch: any, setter: any) => {
      executeLoad && executeLoad(executeApiFetch(api), setter);
    },
    [executeLoad, api]
  );

  return [{ isLoading, isLoaded, error, executeApiLoad }];
}

export function useGetData(
  tradingPairs: string
): [{ data: Exchange[]; isLoading: boolean; isLoaded: boolean; error: any }] {
  const ctx = useContext(DataProvider);
  assertOk(!!ctx?.api, makeError('useGetData'));
  const [data, setData] = useState([]);
  const [{ isLoading, isLoaded, executeApiLoad, error }] = useApiLoader();

  useEffect(() => {
    if (tradingPairs) {
      executeApiLoad(
        (api: DataProviderProps['api']) =>
          api?.map((f: any) => f(tradingPairs)),
        setData
      );
    } else {
      setData([]);
    }
  }, [executeApiLoad, tradingPairs]);

  return [{ data, isLoading, isLoaded, error }];
}
