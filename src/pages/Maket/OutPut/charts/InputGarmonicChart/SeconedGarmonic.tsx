import { ReactElement } from "react";
import { Line } from "react-chartjs-2";

// eslint-disable-next-line import/no-unresolved
import { IAnalogSignalData } from "../../../../../modules/signal/signal";

interface ISeconedGarmonicProps {
  signalCoords: IAnalogSignalData;
}

export const SeconedGarmonic = ({
  signalCoords,
}: ISeconedGarmonicProps): ReactElement => {
  const dataSignal = {
    labels: signalCoords.x,
    datasets: [
      {
        label: "Напряжение",
        data: signalCoords.seconedGarmonic.y,
        borderColor: "#b835eb",
        backgroundColor: "#b835eb88",
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
          title: {
            display: true,
            text: "Третья гармоника с амплитудой = 2 · A",
          },
        },
      }}
      data={dataSignal}
    />
  );
};
