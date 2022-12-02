import { getFluctuationNoise, getImpulsNoise, getPeriodsNoise } from "./noise";
import { getAnalogSignal, getDigitalSignal, ISignalCoords } from "./signal";

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
}

export const getFluctuationOutput = ({
  amountPoints,
  noise,
  signal,
  signalType,
}: IFluctuationOutputProps): ISignalCoords => {
  const signalProps = {
    amountPoints,
    ...signal,
  };

  const signalPoints =
    signalType === "analog"
      ? getAnalogSignal(signalProps)
      : getDigitalSignal(signalProps);
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
}: IFluctuationOutputProps): ISignalCoords => {
  const signalProps = {
    amountPoints,
    ...signal,
  };

  const signalPoints =
    signalType === "analog"
      ? getAnalogSignal(signalProps)
      : getDigitalSignal(signalProps);
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
}: IFluctuationOutputProps): ISignalCoords => {
  const signalProps = {
    amountPoints,
    ...signal,
  };

  const signalPoints =
    signalType === "analog"
      ? getAnalogSignal(signalProps)
      : getDigitalSignal(signalProps);
  const noisePoints = getPeriodsNoise({ amountPoints, ...noise });

  return {
    x: signalPoints.x,
    y: signalPoints.y.map((value, i) =>
      Number((value + noisePoints.y[i]).toFixed(3))
    ),
  };
};
