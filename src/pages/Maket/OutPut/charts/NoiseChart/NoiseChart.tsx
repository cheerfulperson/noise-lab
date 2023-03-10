import { ReactElement } from "react";
import { Line } from "react-chartjs-2";

// eslint-disable-next-line import/no-unresolved
import { ISignalCoords } from "../../../../../modules/signal/signal";
import { tooltip } from "../InputChart";

interface INoiseChartProps {
  signalCoords: ISignalCoords;
}

export const NoiseChart = ({
  signalCoords,
}: INoiseChartProps): ReactElement => {
  const dataSignal = {
    labels: signalCoords.x.sort(),
    datasets: [
      {
        label: "Напряжение",
        data: signalCoords.y,
        borderColor: "#000141",
        backgroundColor: "#00014173",
      },
    ],
  };

  return (
    <Line
      options={{
        responsive: true,
        interaction: {
          intersect: false
        },
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
            text: "Помеха",
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
