import { useGetData } from 'libs/services';

export const withData =
  <P extends object>(Component: React.ComponentType<P>) =>
  ({
    pairs,
    ...props
  }: P & { pairs: { current: string; deffered: string } }) => {
    const [{ data, error }] = useGetData(pairs.deffered);

    return <Component data={data} error={error} {...(props as P)} />;
  };
