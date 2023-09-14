import { Exchange } from '../types';

export const flatTransformData = (data: any): Exchange[] => {
  return data
    ?.map((exchange: any) => {
      return exchange?.pairs
        ?.map((pair: any) => {
          const pairName = Object.keys(pair)?.[0];
          const value = parseFloat(pair?.[pairName]);

          return {
            name: pairName,
            value: !isNaN(value) ? value : 'Not supported',
            platform: exchange.name,
          };
        })

        .flat()
        .filter(Boolean);
    })
    .flat()
    .filter(Boolean);
};
