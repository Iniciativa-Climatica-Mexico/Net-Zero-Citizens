"use client";

import React, { useState } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CellAction } from "@/components/cell-action";
import ModalProveedor from "@/components/ModalProveedor";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const proveedores = [
  {
    id: 1,
    imagen:
      "https://www.iwmbuzz.com/wp-content/uploads/2021/01/arnold-schwarzenegger-goes-face-to-face-with-himself-here-take-a-look-to-know-more.jpg",
    nombre: "Villenergy",
    servicio: "Instalaciones fotovoltaicas",
    ubicacion: "Santiago de Queretaro, Queretaro",
    estado: "Aprobado",
  },
  {
    id: 2,
    imagen:
      "https://www.iwmbuzz.com/wp-content/uploads/2021/01/arnold-schwarzenegger-goes-face-to-face-with-himself-here-take-a-look-to-know-more.jpg",
    nombre: "Villenergy",
    servicio: "Instalaciones fotovoltaicas",
    ubicacion: "Santiago de Queretaro, Queretaro",
    estado: "Pendiente",
  },
  {
    id: 3,
    imagen:
      "https://www.iwmbuzz.com/wp-content/uploads/2021/01/arnold-schwarzenegger-goes-face-to-face-with-himself-here-take-a-look-to-know-more.jpg",
    nombre: "Villenergy",
    servicio: "Instalaciones fotovoltaicas",
    ubicacion: "Santiago de Queretaro, Queretaro",
    estado: "Pendiente",
  },
  {
    id: 4,
    imagen:
      "https://www.iwmbuzz.com/wp-content/uploads/2021/01/arnold-schwarzenegger-goes-face-to-face-with-himself-here-take-a-look-to-know-more.jpg",
    nombre: "Villenergy",
    servicio: "Instalaciones fotovoltaicas",
    ubicacion: "Santiago de Queretaro, Queretaro",
    estado: "Aprobado",
  },
  {
    id: 5,
    imagen:
      "https://www.iwmbuzz.com/wp-content/uploads/2021/01/arnold-schwarzenegger-goes-face-to-face-with-himself-here-take-a-look-to-know-more.jpg",
    nombre: "Villenergy",
    servicio: "Instalaciones fotovoltaicas",
    ubicacion: "Santiago de Queretaro, Queretaro",
    estado: "Pendiente",
  },
  {
    id: 6,
    imagen:
      "https://www.iwmbuzz.com/wp-content/uploads/2021/01/arnold-schwarzenegger-goes-face-to-face-with-himself-here-take-a-look-to-know-more.jpg",
    nombre: "Villenergy",
    servicio: "Instalaciones fotovoltaicas",
    ubicacion: "Santiago de Queretaro, Queretaro",
    estado: "Aprobado",
  },
  {
    id: 7,
    imagen:
      "https://www.iwmbuzz.com/wp-content/uploads/2021/01/arnold-schwarzenegger-goes-face-to-face-with-himself-here-take-a-look-to-know-more.jpg",
    nombre: "Villenergy",
    servicio: "Instalaciones fotovoltaicas",
    ubicacion: "Santiago de Queretaro, Queretaro",
    estado: "Pendiente",
  },
  {
    id: 8,
    imagen:
      "https://www.iwmbuzz.com/wp-content/uploads/2021/01/arnold-schwarzenegger-goes-face-to-face-with-himself-here-take-a-look-to-know-more.jpg",
    nombre: "Villenergy",
    servicio: "Instalaciones fotovoltaicas",
    ubicacion: "Santiago de Queretaro, Queretaro",
    estado: "Pendiente",
  },
];

export default function Home() {
  const [modalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {modalOpen ? (
        <div className="flex flex-col items-center justify-center h-screen absolute left-1/2 right-1/2">
          <ModalProveedor setIsModalOpen={setIsModalOpen} />
        </div>
      ) : (
        <></>
      )}
      <main className={`border m-[30px] mt-[15px] p-[20px] pb-5 rounded-lg`}>
        <h1 className="text-[20px] font-bold">Descubre Proveedores</h1>
        <div className="flex items-center py-4 gap-x-2">
          <Input placeholder="Busca un proveedor" className="max-w-sm" />
          <Button variant="outline" className="px-4">
            Aprobados
          </Button>
          <Button variant="outline">Pendientes</Button>
        </div>
        <Table className="border rounded">
          <TableCaption></TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Servicio</TableHead>
              <TableHead>Ubicacion</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proveedores.map((proveedor) => (
              <TableRow
                key={proveedor.id}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <TableCell>
                  <Avatar>
                    <AvatarImage src={proveedor.imagen} />
                  </Avatar>
                </TableCell>
                <TableCell>{proveedor.nombre}</TableCell>
                <TableCell>{proveedor.servicio}</TableCell>
                <TableCell>{proveedor.ubicacion}</TableCell>
                <TableCell>
                  <div
                    className={`${
                      proveedor.estado === "Aprobado"
                        ? "bg-[#547C8B] text-white"
                        : "bg-[#FFE6C2] text-jet"
                    }
                    text-center rounded-xl py-2`}
                  >
                    {proveedor.estado}
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <CellAction />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end items-center pt-2 gap-x-2">
          <Button variant="outline" className="px-4">
            Anterior
          </Button>
          <Button variant="outline">Siguiente</Button>
        </div>
      </main>
    </>
  );
}
