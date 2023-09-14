import { Exchange } from '../types';

export const withError =
  <P extends object>(Component: React.ComponentType<P>) =>
  ({ error, ...props }: P & { error?: any; data?: Exchange[] }) => {
    if (error !== undefined && props?.data?.length === 0) {
      return <div>Handling error</div>;
    }

    return <Component {...(props as P)} />;
  };
