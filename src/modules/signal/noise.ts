import { ISignalCoords } from "./signal";

const { random, ceil } = Math;

interface IFluctuationNoiseProps {
  amountPoints: number;
  minF: number;
  maxF: number;
  minA: number;
  maxN: number;
}

export const getFluctuationNoise = ({
  amountPoints,
  maxF,
  maxN,
  minA,
  minF,
}: IFluctuationNoiseProps): ISignalCoords => {
  const x = Array.from({ length: amountPoints }, (_, i) => {
    return Number((i / (random() * (maxF - minF) + minF)).toFixed(3));
  });

  const y = Array.from({ length: amountPoints }, (_, i) => {
    const minor = i % 2 === 0 ? 1 : -1;
    return minor * (random() * (maxN - minA) + minA);
  });
  return {
    x,
    y,
  };
};

export const getImpulsNoise = ({
  amountPoints,
  maxF,
  maxN,
  minA,
  minF,
}: IFluctuationNoiseProps): ISignalCoords => {
  const x = Array.from({ length: amountPoints }, (_, i) => {
    return Number((i / (random() * (maxF - minF) + minF)).toFixed(3));
  });
  const y = Array.from({ length: amountPoints }, (_, i) => {
    const minor = i % 2 === 0 ? 1 : -1;
    const delta = random() < 0.2 ? 1 : 10;
    return minor * ((random() * (maxN - minA)) / delta + minA);
  });

  return {
    x,
    y,
  };
};

export const getPeriodsNoise = ({
  amountPoints,
  maxF,
  maxN,
  minA,
  minF,
}: IFluctuationNoiseProps): ISignalCoords => {
  const delta = 1 / amountPoints * 5;
  const x = Array.from({ length: amountPoints }, (_, i) => {
    return Number((i / (random() * (maxF - minF) + minF)).toFixed(3));
  });

  const y = Array.from({ length: 50 }, (_, i) => {
    if (i === 25) {
      return maxN;
    }
    return (random() * (maxN - minA)) / 4 + minA;
  });

  return {
    x,
    y: Array.from({ length: ceil(amountPoints / 50) }, (_, k) => {
      if (k === 0) return y;
      return y.map((value, i) =>
        amountPoints / 6 === i ? value - minA * delta * k : value
      );
    }).flat(),
  };
};
