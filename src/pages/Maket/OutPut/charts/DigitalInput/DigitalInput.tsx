import { ReactElement } from "react";
import { Line } from "react-chartjs-2";

import { useMaketContext } from "../../../../../context";
// eslint-disable-next-line import/no-unresolved
import { ISignalCoords } from "../../../../../modules/signal/signal";
import { tooltip } from "../InputChart";

interface IDigitalInputChartProps {
  signalCoords: ISignalCoords;
}

export const DigitalInputChart = ({
  signalCoords,
}: IDigitalInputChartProps): ReactElement => {

  const dataSignal = {
    labels: signalCoords.x.sort(),
    datasets: [
      {
        label: "Напряжение",
        data: signalCoords.y,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      }, {
        data: [Math.max(...signalCoords.y) * 1.2],
      }
    ],
  };

  return (
    <Line
      options={{
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
          tooltip: tooltip,
          legend: {
            position: "center" as const,
          },
          title: {
            display: true,
            text: "Полезный сигнал",
            font: {
              size() {
                return 24;
              },
            },
          },
        },
      }}
      data={dataSignal}
    />
  );
};
