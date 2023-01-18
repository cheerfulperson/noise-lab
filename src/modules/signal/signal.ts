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
  (sin(t) + sin(2 * t) + sin(3 * t)) / 2.5;

const getDigitalPoint = (t: number): number => {
  const value = sin((t / 180) * PI);

  if ((value > 0 && value < 0.5) || (value < 0 && value > -0.5)) {
    return 0;
  }
  if (value >= 0.5 && value <= 1) {
    return 1;
  }
  if (value <= -0.5 && value >= -1) {
    return 0.25;
  }
  return 0;
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
