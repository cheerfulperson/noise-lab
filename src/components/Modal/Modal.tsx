import { Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MouseEvent as ReactMouseEvent, ReactElement, ReactNode } from "react";

import styles from "./Modal.module.scss";

interface IModalProps {
  className?: string;
  children: ReactNode;
  open?: boolean;
  hideClose?: boolean;
  onClose?: () => void;
}

export const Modal = ({
  children,
  className,
  onClose,
  hideClose,
  open = false,
}: IModalProps): ReactElement => {
  const handleClose = (
    e: ReactMouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      className={[styles.modal__overlay, open && styles.modal__open].join(" ")}
      onClick={handleClose}
    >
      <div className={[styles.modal, className].join(" ")}>
        {!hideClose && (
          <Button
            variant="contained"
            className={styles.modal__close_btn}
            onClick={onClose}
          >
            <ArrowBackIcon />
          </Button>
        )}

        {children}
      </div>
    </div>
  );
};
