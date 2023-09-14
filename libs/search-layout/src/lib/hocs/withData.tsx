import { useGetData } from 'libs/services';
import { useMemo } from 'react';
import { flatTransformData } from '../helpers/transformData';

export const withData =
  <P extends object>(Component: React.ComponentType<P>) =>
  ({
    pairs,
    ...props
  }: P & { pairs: { current: string; deffered: string } }) => {
    const [{ data, error, isLoading }] = useGetData(pairs.deffered);
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
