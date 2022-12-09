import React from "react";
import Paper from "@mui/material/Paper";
import { inputStyles } from "../styles/inputContainer.styles";
import { Box } from "@mui/material";

export type TPaperWrapper = {
  children: React.ReactNode;
  height?: string;
  position?: number;
  todoId?: number;
  // handleCloseIcon: (position: number) => void;
  setIsCloseIcon?: (value: any) => void;
};

const PaperWrapper: React.FC<TPaperWrapper> = ({
  children,
  height,
  setIsCloseIcon,
  position,
  todoId,
}) => {
  const handleMouseEnter = () => {
    if (position === todoId) {
      setIsCloseIcon?.(true);
    }
  };
  const handleMouseOut = () => {
    if (position === todoId) {
      setIsCloseIcon?.(false);
    }
  };
  return (
    <Box
      component="div"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseOut}
    >
      <Paper
        elevation={3}
        square={true}
        sx={[inputStyles.checkboxStyle, { height: height }]}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default PaperWrapper;
