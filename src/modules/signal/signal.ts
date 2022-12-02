const { sin, PI } = Math;

export interface ISignalCoords {
  x: number[];
  y: number[];
}

export interface IAnalogSignalData extends ISignalCoords {
  firstGarmonic: ISignalCoords;
  seconedGarmonic: ISignalCoords;
  thirdGarmonic: ISignalCoords;
}

interface ISignalProps {
  amountPoints: number;
  frequency: number;
  ampl?: number;
}

const getGarmonicPoint = (ampl: number, t: number): number => ampl * sin(t);

const getSignalPoint = (t: number): number =>
  3 * sin(t) + 2 * sin(3 * t) + 0.5 * sin(5 * t);

const getDigitalPoint = (t: number): number =>
  sin((t / 90) * PI) > 0 ? 0.1 : 1;

export const getAnalogSignal = ({
  amountPoints,
  frequency,
  ampl = 1,
}: ISignalProps): IAnalogSignalData => {
  const delta = 100;
  const x = Array.from({ length: amountPoints }, (_, i) => i);

  return {
    x: x.map((value) => Number((value / frequency).toFixed(3))),
    y: x.map((value) => getSignalPoint(value / delta) * ampl),
    firstGarmonic: {
      y: x.map((value) => getGarmonicPoint(ampl * 3, value / delta)),
      x: [],
    },
    seconedGarmonic: {
      y: x.map((value) => getGarmonicPoint(ampl * 2, (3 * value) / delta)),
      x: [],
    },
    thirdGarmonic: {
      y: x.map((value) => getGarmonicPoint(ampl * 0.5, (5 * value) / delta)),
      x: [],
    },
  };
};

export const getDigitalSignal = ({
  amountPoints,
  frequency,
  ampl = 1,
}: ISignalProps): ISignalCoords => {
  const x = Array.from({ length: amountPoints }, (_, i) => i);

  return {
    x: x.map((value) => Number((value / frequency).toFixed(3))),
    y: x.map((value) => getDigitalPoint(value) * ampl),
  };
};
