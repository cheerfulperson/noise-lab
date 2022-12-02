import { ReactElement } from "react";
import { Line } from "react-chartjs-2";

// eslint-disable-next-line import/no-unresolved
import { ISignalCoords } from "../../../../../modules/signal/signal";

interface IInputChartProps {
  signalCoords: ISignalCoords;
}

export const OutputChart = ({
  signalCoords,
}: IInputChartProps): ReactElement => {
  const dataSignal = {
    labels: signalCoords.x,
    datasets: [
      {
        label: "Напряжение",
        data: signalCoords.y,
        borderColor: "rgb(99, 219, 255)",
        backgroundColor: "rgba(99, 198, 255, 0.5)",
      },
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
          legend: {
            display: true,
            position: "center" as const,
          },
          title: {
            display: true,
            text: "Сигнал после действия помех",
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
