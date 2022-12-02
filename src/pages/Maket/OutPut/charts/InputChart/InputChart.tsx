import { ReactElement } from "react";
import { Line } from "react-chartjs-2";

// eslint-disable-next-line import/no-unresolved
import { IAnalogSignalData } from "../../../../../modules/signal/signal";

interface IInputChartProps {
  signalCoords: IAnalogSignalData;
}

export const InputChart = ({
  signalCoords,
}: IInputChartProps): ReactElement => {
  const dataSignal = {
    labels: signalCoords.x,
    datasets: [
      {
        label: "Напряжение",
        data: signalCoords.y,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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
            position: "center" as const,
          },
        },
      }}
      data={dataSignal}
    />
  );
};
