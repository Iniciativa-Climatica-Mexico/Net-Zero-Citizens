import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import {
//   createTheme,
//   ThemeProvider,
// } from "../../node_modules/@mui/material/styles/ThemeProvider";

import Image from "../../node_modules/next/image";
import PanelSolar from "../../public/panelSolar.jpg";
import Placeholder from "./../../public/placeholder.jpg";

import CloseIcon from "./../../node_modules/@mui/icons-material/Close";
import WhatsAppIcon from "./../../node_modules/@mui/icons-material/WhatsApp";
import PhoneIcon from "./../../node_modules/@mui/icons-material/Phone";
import BusinessIcon from "./../../node_modules/@mui/icons-material/Business";
import LanguageIcon from "./../../node_modules/@mui/icons-material/Language";
import PlaceIcon from "./../../node_modules/@mui/icons-material/Place";

import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

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

interface Props {
  setIsModalOpen: any;
}

export default function ModalProveedor({ setIsModalOpen }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <CloseIcon
        className="cursor-pointer"
        onClick={() => {
          setIsModalOpen(false);
        }}
      />
      <article className="flex flex-col border border-[#C1C9D2] justify-center items-center rounded-lg w-[823px] py-[25px] bg-white z-10">
        <article className="flex border border-[#C1C9D2] rounded-xl w-[763px]">
          <Image
            src={PanelSolar}
            alt="Green Circle"
            width={350}
            height={350}
            className="basis-6/12 mr-[10px] rounded-l-xl object-cover"
          />
          <aside className="basis-6/12 pl-[15px] pr-[25px] py-[20px] text-[14px]">
            <h2 className="text-[20px] font-bold">Natural Project MX</h2>
            <section className="flex items-center text-[#589A74] py-[10px] gap-x-2">
              <PlaceIcon color="secondary" />
              Santiago de Querétaro, Querétaro
            </section>
            <Separator />
            <section className="flex items-center text-[#589A74] py-[10px] gap-x-2">
              <BusinessIcon color="secondary" />
              Querétaro
            </section>
            <Separator />
            <section className="flex items-center text-[#589A74] py-[10px] gap-x-2">
              <PhoneIcon color="secondary" />
              442-123-4567
            </section>
            <Separator />
            <section className="flex items-center text-[#589A74] py-[10px] gap-x-2">
              <WhatsAppIcon color="secondary" />
              442-123-4567
            </section>
            <Separator />
            <section className="flex items-center text-[#589A74] py-[10px] gap-x-2">
              <LanguageIcon color="primary" />
              www.mitec.com.mx
            </section>
            <h2 className="text-[14px] font-bold mt-[10px] mb-[10px]">
              Documentos
            </h2>
            <section className="flex justify-between items-end">
              <div className="bg-black rounded w-[80px] h-[100px] flex flex-col justify-center items-center">
                <Image
                  src={Placeholder}
                  alt="Green Circle"
                  width={60}
                  height={60}
                  className="w-[65px] h-[85px] basis-6/12"
                />
              </div>
              <p className="text-[#858585] text-[14px]">03/09/2023</p>
            </section>
          </aside>
        </article>
        <section className="text-[13px] px-[35px] pt-[25px]">
          <h3 className="font-bold">Descripción</h3>
          <p className="text-sm py-[15px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            dignissim auctor molestie. In massa sapien, vehicula vitae suscipit
            sit amet, congue vel est. Aenean maximus et erat a consequat.
          </p>
          <Separator />
          <div className="flex items-center space-x-2 py-[25px]">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              He leído y acepto los términos y condiciones
            </label>
          </div>
          <footer className="flex gap-x-3">
            <Button className="bg-customColor1">Aprobar</Button>
            <Button variant="outline">Rechazar</Button>
          </footer>
        </section>
      </article>
    </ThemeProvider>
  );
}
