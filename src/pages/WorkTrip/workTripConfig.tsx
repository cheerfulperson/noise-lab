import { ReactElement } from "react";

import {
  AnalogConclude,
  AnalogFluct,
  AnalogImpules,
  AnalogPeriod,
  Conclude,
  DigitalInfo,
} from "./blockes";

interface IWorkTripInfo {
  id: string;
  title: string;
  element: () => ReactElement;
}

export const workTripInfo: Array<IWorkTripInfo> = [
  {
    id: "analogFluct",
    title:
      "Исследование воздействия «Флуктуационной помехи» на полезный аналоговый сигнал.",
    element: AnalogFluct,
  },
  {
    id: "analogImpules",
    title:
      "Исследование воздействия «Случайной импульсной помехи» на полезный аналоговый сигнал.",
    element: AnalogImpules,
  },
  {
    id: "analogPeriod",
    title:
      "Исследование воздействия «Периодической помехи» на полезный аналоговый сигнал.",
    element: AnalogPeriod,
  },
  {
    id: "analogConclude",
    title:
      "Вывод о том какая помеха сильнее искажает аналоговый полезный сигнал",
    element: AnalogConclude,
  },
  {
    id: "digitalInfo",
    title:
      "Исследование воздействия различных видов помех на полезный цифровой сигнал.",
    element: DigitalInfo,
  },
  {
    id: "conclude",
    title:
      "Вывод о том какой сигнал является наиболее помехоустойчивыми лучшим для передачи виедосигнала",
    element: Conclude,
  },
];
