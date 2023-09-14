export type ExchangeResponse = {
  name: string;
  pairs: {
    [x: string]: string;
  }[];
};
