import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { assertOk, makeError } from '../helpers/dataLoaderUtils';

interface DataProviderProps {
  api?: Array<(tradingPairs: string) => Promise<any[]>>;
}
export const DataProvider = createContext<DataProviderProps>({});

export function useLoading() {
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [error, setError] = useState<PromiseRejectedResult>();

  const executeLoad = useCallback(
    async (load: Promise<any>[], onSuccess: any) => {
      setLoading(true);

      function onLoadComplete() {
        setLoading(false);
        setLoaded(true);
      }
      return Promise.allSettled(load)
        .then((p) => {
          onLoadComplete();
          const successful = p
            .filter((e) => e.status === 'fulfilled')
            .map((e: any) => e.value);
          const rejected = p.filter(
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

export function useApiLoader() {
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

export function useGetData(tradingPairs: string) {
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
