import { getFluctuationNoise, getImpulsNoise, getPeriodsNoise } from "./noise";
import { getAnalogSignal, ISignalCoords } from "./signal";

interface IFluctuationOutputProps {
  amountPoints: number;
  signalType: "analog" | "digital";
  signal: {
    frequency: number;
    ampl: number;
  };
  noise: {
    minF: number;
    maxF: number;
    minA: number;
    maxN: number;
  };
  digitalCoords: ISignalCoords;
}

export const getFluctuationOutput = ({
  amountPoints,
  noise,
  signal,
  signalType,
  digitalCoords,
}: IFluctuationOutputProps): ISignalCoords => {
  const signalProps = {
    amountPoints,
    ...signal,
  };

  const signalPoints =
    signalType === "analog"
      ? getAnalogSignal(signalProps)
      : digitalCoords;
  const noisePoints = getFluctuationNoise({ amountPoints, ...noise });

  return {
    x: signalPoints.x,
    y: signalPoints.y.map((value, i) =>
      Number((value + noisePoints.y[i]).toFixed(3))
    ),
  };
};

export const getImpulsOutput = ({
  amountPoints,
  noise,
  signal,
  signalType,
  digitalCoords,
}: IFluctuationOutputProps): ISignalCoords => {
  const signalProps = {
    amountPoints,
    ...signal,
  };

  const signalPoints =
    signalType === "analog"
      ? getAnalogSignal(signalProps)
      : digitalCoords;
  const noisePoints = getImpulsNoise({ amountPoints, ...noise });

  return {
    x: signalPoints.x,
    y: signalPoints.y.map((value, i) =>
      Number((value + noisePoints.y[i]).toFixed(3))
    ),
  };
};

export const getPeriodOutput = ({
  amountPoints,
  noise,
  signal,
  signalType,
  digitalCoords,
}: IFluctuationOutputProps): ISignalCoords => {
  const signalProps = {
    amountPoints,
    ...signal,
  };

  const signalPoints =
    signalType === "analog"
      ? getAnalogSignal(signalProps)
      : digitalCoords;
  const noisePoints = getPeriodsNoise({ amountPoints, ...noise });

  return {
    x: signalPoints.x,
    y: signalPoints.y.map((value, i) =>
      Number((value + noisePoints.y[i]).toFixed(3))
    ),
  };
};
