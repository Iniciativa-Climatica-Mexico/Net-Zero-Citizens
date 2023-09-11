"use client";

import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import CheckCircleOutlineIcon from "./../../node_modules/@mui/icons-material/CheckCircleOutline";
import CancelIcon from "./../../node_modules/@mui/icons-material/Cancel";
import MoreHorizIcon from "./../../node_modules/@mui/icons-material/MoreHoriz";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const theme = createTheme({
  palette: {
    primary: {
      main: "#589A74",
    },
    secondary: {
      main: "#589A74",
      light: "#F5EBFF",
      contrastText: "#47008F",
    },
  },
});

export const CellAction = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizIcon className="cursor-pointer" onClick={() => {}} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
            <CheckCircleOutlineIcon className="mr-1.5" onClick={() => {}} />{" "}
            Aceptar
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
            <CancelIcon className="mr-1.5" onClick={() => {}} /> Rechazar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ThemeProvider>
  );
};
