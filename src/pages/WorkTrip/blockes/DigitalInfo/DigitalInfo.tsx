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

import styles from "./DigitalInfo.module.scss";

export const DigitalInfo = (): ReactElement => {
  return (
    <div className={styles.digital_info}>
      <Typography marginTop={"8px"}>
        В настройках полезного сигнала видеоконтрольного устройства (ВКУ),
        выбрать аналоговый видеосигнал (изображение) с амплитудой равной 5 В.
        Установить в настройках помех такое напряжение, при котором она едва
        заметна или ее нету. Так же выбрать тип помехи:{" "}
        <strong>«Флуктуационная помеха»</strong>.
      </Typography>
      <Typography marginTop={"8px"}>
        Меняя среднюю амплитуду помехи добиться уровня когда цифровой сигнал
        исчезает - это будт пиковое значение помехи при котором цифровой сигнал
        невозможно восстановить.
      </Typography>
      <Typography marginTop={"8px"}>
        Повторить все перечисленное выше с остальными видами помех и результаты
        занести в таблицу 5.1.
      </Typography>
      <Typography marginTop={"8px"}>
        Таблицу 5.1 - исследование влияния помех на цирфровой сигнал.
      </Typography>
      <DenseTable />
      <Typography marginTop={"8px"}>
        Сделать вывод по полученным результатам.
      </Typography>
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
              U<Prefix>п</Prefix> - максимальный размах помехи, В
            </StyledTableCell>
            <StyledTableCell align="center">
              U<Prefix>пик</Prefix> - пиковое значение помехи, В
            </StyledTableCell>
            <StyledTableCell align="center">
              Наличие сигнала ("есть", "нет")
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[1, 2, 3, 4, 5].map((row, i) => (
            <TableRow key={row}>
              <StyledTableCell align="center">5</StyledTableCell>
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
