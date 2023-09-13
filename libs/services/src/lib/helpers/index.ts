import { useCallback, useEffect, useRef } from 'react';

export function makeError(hookName: string) {
  return `${hookName} cannot be used outside AccountManagementApiProvider`;
}

export function assertThrow(test: () => boolean, err: string) {
  if (test()) return;
  if (typeof err === 'string') throw new Error(err);
  throw err;
}
export function assertOk(value: boolean, err = 'should be a truthy value') {
  assertThrow(() => !!value, err);
}

// https://usehooks-ts.com/react-hook/use-is-mounted
export function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
}
