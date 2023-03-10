import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  getFluctuationOutput,
  getDigitalSignal,
  getFluctuationNoise,
  IAnalogSignalData,
  ISignalCoords,
  getAnalogSignal,
  getImpulsNoise,
  getPeriodsNoise,
  getImpulsOutput,
  getPeriodOutput,
} from "../../modules";
import { getCoff } from "../../utils/filter";

export type TSignalType = "analog" | "digital";
export type TNoiseType = "impuls" | "fluct" | "period";
export type TSignalNaming = Record<TSignalType, string>;
export type TNoiseNaming = Record<TNoiseType, string>;
export type TScreenImages = "image1" | "image2" | "image3";

export interface IUseMaketResults extends IMaketState {
  setNoise: (noise: INoiseProps) => void;
  setSignal: (data: ISignalProps) => void;
  setBrightness: (data: number) => void;
  chartsData: {
    analog: IAnalogSignalData;
    digital: ISignalCoords;
    noise: ISignalCoords;
    output: ISignalCoords;
    filter: ISignalCoords;
  };
}

interface ICartContextProviderProps {
  children: ReactNode;
}

interface INoise {
  type: TNoiseType;
  name: string;
  minF: number;
  maxF: number;
  minA: number;
  maxN: number;
}

interface INoiseProps {
  type: TNoiseType;
  minF: number;
  maxF: number;
  minA: number;
  maxN: number;
}

interface ISignal {
  type: TSignalType;
  name: string;
  frequency: number;
  ampl: number;
}

interface ISignalProps {
  image: TScreenImages;
  type: TSignalType;
  frequency: number;
  ampl: number;
}

interface IPointsAmount {
  analog: number;
  digital: number;
  noise: number;
}

interface IMaketState {
  brightness: number;
  image: TScreenImages;
  pointsAmount: IPointsAmount;
  signal: ISignal;
  noise: INoise;
  lines: number;
  rows: number;
}

export const signalsNaming: Record<TSignalType, string> = {
  analog: "Аналоговый",
  digital: "Цифровой",
};

export const noiseNaming: Record<TNoiseType, string> = {
  fluct: "Флуктуационная помеха",
  impuls: "Случайная импульсная помеха",
  period: "Периодическая помеха",
};

export const MaketContext = createContext<IUseMaketResults | undefined>(
  undefined
);

export const initialMaketValues: IMaketState = {
  image: "image1",
  lines: 800,
  rows: 500,
  brightness: 50,
  pointsAmount: {
    analog: 1000,
    digital: 1085,
    noise: 50,
  },
  signal: {
    type: "analog",
    name: signalsNaming["analog"],
    frequency: 800,
    ampl: 3,
  },
  noise: {
    type: "fluct",
    name: noiseNaming["fluct"],
    minF: 45,
    maxF: 55,
    minA: 0.05,
    maxN: 0.15,
  },
};

export const MaketProvider = ({
  children,
}: ICartContextProviderProps): ReactElement => {
  const [state, setState] = useState<IMaketState>(initialMaketValues);

  const setNoise = (noise: INoiseProps): void => {
    setState((prev) => ({
      ...prev,
      noise: {
        ...noise,
        name: noiseNaming[noise.type],
      },
      pointsAmount: {
        ...prev.pointsAmount,
        noise: noise.type === "fluct" ? 50 : noise.type === "impuls" ? 80 : 120,
      },
    }));
  };

  const setSignal = ({ image, ...signal }: ISignalProps): void => {
    setState((prev) => ({
      ...prev,
      image,
      signal: {
        ...signal,
        name: signalsNaming[signal.type],
      },
    }));
  };

  const setBrightness = (brightness: number): void => {
    setState((prev) => ({
      ...prev,
      brightness,
    }));
  };

  const analogCoords = useMemo<IAnalogSignalData>(
    () =>
      getAnalogSignal({
        amountPoints: state.pointsAmount.analog,
        ...state.signal,
      }),
    [state.signal, state.pointsAmount.analog]
  );

  const digitalCoords = useMemo(
    () =>
      getDigitalSignal({
        amountPoints: state.pointsAmount.digital,
        ...state.signal,
      }),
    [state.signal, state.pointsAmount.digital]
  );

  const noiseCoords = useMemo(() => {
    const settings = {
      amountPoints: state.pointsAmount.noise,
      ...state.noise,
    };
    if (state.noise.type === "fluct") {
      return getFluctuationNoise(settings);
    }

    if (state.noise.type === "impuls") {
      return getImpulsNoise(settings);
    }

    return getPeriodsNoise(settings);
  }, [state]);

  const outputCoords = useMemo(() => {
    const settings = {
      amountPoints:
        state.signal.type === "analog"
          ? state.pointsAmount.analog
          : state.pointsAmount.digital,
      noise: state.noise,
      signal: state.signal,
      signalType: state.signal.type,
      digitalCoords: digitalCoords
    };

    if (state.noise.type === "fluct") {
      return getFluctuationOutput(settings);
    }

    if (state.noise.type === "impuls") {
      return getImpulsOutput(settings);
    }

    return getPeriodOutput(settings);
  }, [state, digitalCoords]);

  const filterCoords = useMemo(() => {
    const k = getCoff(state.signal.type, state.signal.ampl, state.noise.maxN);
    const noiseData = {
      ...state.noise,
      maxN: state.noise.maxN * k,
      minA: state.noise.minA * k,
    };
    if (k !== 1 && state.signal.type === "digital") {
      noiseData.maxN = 0;
      noiseData.minA = 0;
    }

    const settings = {
      amountPoints:
        state.signal.type === "analog"
          ? state.pointsAmount.analog
          : state.pointsAmount.digital,
      noise: noiseData,
      signal: state.signal,
      signalType: state.signal.type,
      digitalCoords,
    };

    if (k === 1 && state.signal.type === "digital") {
      return getDigitalSignal({
        amountPoints: state.pointsAmount.digital,
        ...state.signal,
      });
    }

    if (state.noise.type === "fluct") {
      return getFluctuationOutput(settings);
    }

    if (state.noise.type === "impuls") {
      return getImpulsOutput(settings);
    }

    return getPeriodOutput(settings);
  }, [state, digitalCoords]);

  const cartContextValue: IUseMaketResults = {
    ...state,
    setNoise,
    setSignal,
    setBrightness,
    chartsData: {
      analog: analogCoords,
      digital: digitalCoords,
      noise: noiseCoords,
      output: outputCoords,
      filter: filterCoords,
    },
  };

  return (
    <MaketContext.Provider value={cartContextValue}>
      {children}
    </MaketContext.Provider>
  );
};

export const useMaketContext = (): IUseMaketResults => {
  const cartContext = useContext(MaketContext);

  if (!cartContext) {
    throw Error("You can use useMaketContext only with CartMaketProvider");
  }

  return cartContext;
};
