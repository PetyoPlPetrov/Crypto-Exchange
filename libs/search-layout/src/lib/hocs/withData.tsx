import { useGetData } from 'libs/services';

export const withData =
  <P extends object>(Component: React.ComponentType<P>) =>
  ({ pairs, ...props }: P & { pairs: string }) => {
    const [data] = useGetData(pairs);

    return <Component {...data} data={data} {...(props as P)} />;
  };
