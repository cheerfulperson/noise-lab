import { ReactElement } from "react";
import { Line } from "react-chartjs-2";

// eslint-disable-next-line import/no-unresolved
import { IAnalogSignalData } from "../../../../../modules/signal/signal";
import { tooltip } from "../InputChart";

interface IThirdGarmonicProps {
  signalCoords: IAnalogSignalData;
}

export const ThirdGarmonic = ({
  signalCoords,
}: IThirdGarmonicProps): ReactElement => {
  const dataSignal = {
    labels: signalCoords.x,
    datasets: [
      {
        label: "Напряжение",
        data: signalCoords.thirdGarmonic.y,
        borderColor: "#ebca35",
        backgroundColor: "#ebca3583",
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
            text: "Третья гармоника",
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
