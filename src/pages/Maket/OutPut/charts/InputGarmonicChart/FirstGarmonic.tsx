import { ReactElement } from "react";
import { Line } from "react-chartjs-2";

import { IAnalogSignalData } from "../../../../../modules/signal/signal";

interface IFirstGarmonicProps {
  signalCoords: IAnalogSignalData;
}

export const FirstGarmonic = ({
  signalCoords,
}: IFirstGarmonicProps): ReactElement => {
  const dataSignal = {
    labels: signalCoords.x,
    datasets: [
      {
        label: "Напряжение",
        data: signalCoords.firstGarmonic.y,
        borderColor: "rgb(53, 235, 93)",
        backgroundColor: "rgba(53, 235, 93, 0.5)",
      },
    ],
  };

  return <Line options={{
    responsive: true,
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "U, В",
          align: "center",
          font() {
            return {
              weight: "600",
            };
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "t, мкс",
          align: "center",
          font() {
            return {
              weight: "600",
            };
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "center" as const,
      },
      title: {
        display: true,
        text: "Первая гармоника с амплитудой = 3 · A",
        font: {
          size() {
            return 24;
          },
        },
      },
    },
  }} data={dataSignal} />;
};
