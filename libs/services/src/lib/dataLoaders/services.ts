import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { assertOk, makeError } from '../helpers';

interface DataProviderProps {
  api?: Array<() => Promise<any>>;
}
export const DataProvider = createContext<DataProviderProps>({});

export function useLoading() {
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [error, setError] = useState(undefined);

  const executeLoad = useCallback(
    async (load: () => Promise<any>, onSuccess: any, onError?: any) => {
      setLoading(true);

      function onLoadComplete() {
        setLoading(false);
        setLoaded(true);
      }
      return Promise.allSettled(load)
        .then((p) => {
          onLoadComplete();
          onSuccess(
            p.filter((e) => e.status === 'fulfilled').map((e) => e.value)
          );
        })
        .catch((err: any) => {
          onLoadComplete();
          setError(err);
          onError?.(err);
        });
    },
    [setLoading, setLoaded, setError]
  );

  return [{ isLoading, isLoaded, error }, { executeLoad }];
}

export function useApiLoader(hookName: string) {
  const ctx = useContext(DataProvider);
  assertOk(!!ctx?.api, `${hookName} cannot be used outside DataProvider`);

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

export function useGetData(text: string) {
  const ctx = useContext(DataProvider);
  assertOk(!!ctx?.api, makeError('useGetData'));
  const [data, setData] = useState([]);
  const [{ isLoading, isLoaded, executeApiLoad, error }] =
    useApiLoader('useGetData');

  useEffect(() => {
    if (text) {
      executeApiLoad(
        (api: DataProviderProps['api']) => api?.map((f: any) => f(text)),
        setData
      );
    } else {
      setData([]);
    }
  }, [executeApiLoad, text]);

  return [{ data, isLoading, isLoaded, error }];
}
