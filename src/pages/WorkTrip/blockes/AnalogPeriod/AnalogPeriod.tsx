import { ReactElement, ReactNode } from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material";

import styles from "./AnalogPeriod.module.scss";

export const AnalogPeriod = (): ReactElement => {
  return (
    <div className={styles.analog_period}>
      <Typography marginTop={"8px"}>
        В данной работе полезный аналоговый сигнал является сложным и состоит из
        суммы трех гармоник:
      </Typography>
      <Typography marginTop={"16px"} textAlign="center">
        <strong>U(t) = A · (3 · sin(t) + 2 · sin(3t) + 0.5 · sin(5t)).</strong>
      </Typography>
      <Typography marginTop={"16px"}>
        Где A - амплитуда, которую вы задаете, t - момент времени в определенной
        точке.
      </Typography>
      <Typography marginTop={"8px"}>
        В настройках полезного сигнала видеоконтрольного устройства (ВКУ),
        выбрать аналоговый видеосигнал (изображение) с амплитудой равной 5 В.
        Установить в настройках помех такое напряжение, при котором она едва
        заметна или не заметна. Так же выбрать тип помехи:{" "}
        <strong>«Периодическая помеха»</strong>.
      </Typography>
      <Typography marginTop={"8px"}>
        Далее меняя значение амплитуды помехи в настройках в соответсвии с
        таблицой 2.1, открываем осциллограф и записываем в таблицу необходимые
        нам значения. Так же наблюдаем за поведением выходного сигнала на втором
        экране телефона.
      </Typography>
      <Typography>
        Изменяя частоту <strong>«Периодической помехи»</strong> добиться того,
        что помеха начнет проявлять себя на экране не так как при более низкой
        частоте. Зафиксировать эту частоту. Это происходит тогда, когда f
        <Prefix>пом</Prefix> {">"} f<Prefix>ст</Prefix>, где f
        <Prefix>пом</Prefix> - частота помехи и f<Prefix>cn</Prefix> - частота
        строк экрана.
      </Typography>
      <Typography marginTop={"8px"}>
        Необходимо посчитать отношение сигнала к шуму (помехе), которое является
        количественной оценкой степени мешающего действия шума (помехи).
        Измерить размахи сигнала, помехи исгнала (это можно сделать так: навести
        курсором мыши на графике на определенную точку и во всплывающем окне
        будут показаны необходимые значения), а потом рассчитать ОСП по
        выражению:
      </Typography>
      <Typography marginTop={"16px"} textAlign="center">
        ψ<Prefix>п</Prefix> = 20 lg[U<Prefix>вс</Prefix> / U<Prefix>п</Prefix>]
        дБ (1)
      </Typography>
      <div>
        <Typography marginTop={"16px"}>
          где U<Prefix>п</Prefix> - максимальный размах помехи
        </Typography>
        <Typography marginBottom={"16px"}>
          U<Prefix>вс</Prefix> - размаха видеосигнала.
        </Typography>
      </div>
      <Typography>
        Отношение квазипикового размаха помехи Uкп к эффективному напряжению
        помехи Uп эф называют пик-фактором:
      </Typography>
      <Typography marginTop={"16px"} textAlign="center">
        К<Prefix>п</Prefix> = U<Prefix>кп</Prefix>/U<Prefix>п эф</Prefix> (2).
      </Typography>
      <Typography marginTop={"16px"}>
        Расчет ОСП при измерении с помощью осциллографа ведут по выражению (1),
        а затем, учитывая (2), пересчитывают в соответствии с определением (1)
        по выражению:
      </Typography>
      <Typography marginTop={"16px"} marginBottom={"16px"} textAlign="center">
        ψ<Prefix>эф</Prefix> = 20 lg[U<Prefix>вс</Prefix> /(U
        <Prefix>Ш кп</Prefix> /К<Prefix>п</Prefix>)] = 20 lgU<Prefix>вс</Prefix>{" "}
        /U<Prefix>Ш кп</Prefix> + 20 lg К<Prefix>п</Prefix> = ψ
        <Prefix>кп</Prefix> + (16…17), дБ.
      </Typography>
      <Typography>
        Изменяя частоту <strong>«Периодической помехи»</strong> добиться того,
        что помеха начнет проявлять себя на экране не так как при более низкой
        частоте.
      </Typography>
      <Typography marginTop={"16px"}>
        Предполагая, что помеха имеет равномерную спектральную плотность. Если
        помеха на изображении незаметна, результаты измерений будут
        соответствовать изображению отличного качества.
      </Typography>
      <Typography marginTop={"16px"}>
        Качество изображения в соответствии с рекомендациями может оцениваться
        по шкале ухудшений: 5 – помеха незаметна; 4 – заметна, но не мешает; 3 –
        заметна, немного мешает; 2 – мешает, надоедает; 1 – сильно мешает.
      </Typography>
      <Typography marginTop={"16px"}>
        Произвести выполение пункта и записать все данные в виде таблицы 2.1 в
        тетрадь.
      </Typography>
      <Typography marginTop={"16px"}>
        Таблица 4.1 - Результаты исследования{" "}
        <strong>«Периодическая помеха»</strong>.
      </Typography>
      <DenseTable />
    </div>
  );
};

const StyledTableCell = styled(TableCell)`
  border-left: 1px solid rgba(224, 224, 224, 1);
  border-right: 1px solid rgba(224, 224, 224, 1);
`;

const Prefix = ({ children }: { children: ReactNode }): ReactElement => {
  return <span style={{ fontSize: "10px" }}>{children}</span>;
};

const chartData = [1, 2.5, 5, 10, 15];

function DenseTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">
              A<Prefix>вс</Prefix> – задаваемая амплитуда сигнала, В
            </StyledTableCell>
            <StyledTableCell align="center">
              A<Prefix>п</Prefix> — задаваемая амплитуда помехи, В
            </StyledTableCell>
            <StyledTableCell align="center">
              U<Prefix>вс</Prefix> - размаха видеосигнала, В
            </StyledTableCell>
            <StyledTableCell align="center">
              U<Prefix>п</Prefix> - максимальный размах помехи, В
            </StyledTableCell>
            <StyledTableCell align="center">
              К<Prefix>п</Prefix>
            </StyledTableCell>
            <StyledTableCell align="center">
              Качество изображения (от 1 до 5)
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[1, 2, 3, 4, 5].map((row, i) => (
            <TableRow key={row}>
              <StyledTableCell align="center">5</StyledTableCell>
              <StyledTableCell align="center">{chartData[i]}</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
