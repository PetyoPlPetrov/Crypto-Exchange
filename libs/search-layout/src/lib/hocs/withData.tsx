import { useGetData } from 'libs/services';
import { useMemo } from 'react';
import { flatTransformData } from '../helpers/transformData';

export const withData =
  <P extends object>(Component: React.ComponentType<P>) =>
  ({
    pairs,
    updateInterval,
    ...props
  }: P & {
    pairs: { current: string; deffered: string };
    updateInterval: number;
  }) => {
    const [{ data, error, isLoading }] = useGetData(
      pairs.deffered,
      updateInterval
    );
    const transformedData = useMemo(() => flatTransformData(data), [data]);

    return (
      <Component
        data={transformedData}
        error={error}
        isLoading={isLoading}
        {...(props as P)}
      />
    );
  };
