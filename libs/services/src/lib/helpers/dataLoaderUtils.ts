export function makeError(hookName: string) {
  return `${hookName} cannot be used outside DataProvider`;
}

export function assertThrow(test: () => boolean, err: string) {
  if (test()) return;
  if (typeof err === 'string') throw new Error(err);
  throw err;
}

export function assertOk(value: boolean, err = 'should be a truthy value') {
  assertThrow(() => !!value, err);
}
