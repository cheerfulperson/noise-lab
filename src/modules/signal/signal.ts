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

let pointNum = Math.random() > 0.5 ? 0 : 1;

const getGarmonicPoint = (ampl: number, t: number): number => ampl * sin(t);

const getSignalPoint = (t: number): number =>
  (sin(t) + sin(2 * t) + sin(3 * t)) / 2.5;

const getDigitalPoint = (t: number): number => {
  const value = Math.abs(Math.round(Math.sin(t / 180 * PI) * 100) / 100);

  if (value === 0) {
    pointNum = Math.random() >= 0.5 ? 0 : 1;
    if (pointNum === 1) {
      return 0;
    }
  }

  return pointNum;
};

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
      y: x.map((value) => getGarmonicPoint(ampl, value / delta)),
      x: [],
    },
    seconedGarmonic: {
      y: x.map((value) => getGarmonicPoint(ampl * 0.5, (2 * value) / delta)),
      x: [],
    },
    thirdGarmonic: {
      y: x.map((value) => getGarmonicPoint(ampl * 0.33, (3 * value) / delta)),
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
