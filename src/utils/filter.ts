import { TSignalType } from "../context";

export const getCoff = (
  signalT: TSignalType,
  ampl: number,
  noise: number
): number => {
  if (signalT === "digital") {
    return ampl - noise * 0.75 > 0 ? 0.2 : 1;
  }
  if (signalT === "analog" && noise / ampl < 0.2) {
    return 0.5;
  }
  return 0.6;
};
