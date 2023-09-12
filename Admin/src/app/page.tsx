"use client";

import React, { useState } from "react";
import { getPendingCompanies } from "@/api/v1/company";
// Import the updateCompany function and UpdateCompanyInfoBody type

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";

interface Company {
  companyId: number
  name: string
  description: string
  location: string
  profilePicture: string
  status: 'approved' | 'pending_approval' | 'rejected'
  phoneNumber: string
  webPage: string
}

export default function Home() {
  const [pendingCompanies, setPendingCompanies] = useState<Company []>([])
  const [status, setStatus] = useState('pending_approval') // State to track the current status

  const fetchPending = async () => {
    try {
      const companies = await getPendingCompanies()
      console.log(companies)
      setPendingCompanies(companies)
    } catch(error){
      console.log("Fetch of companies was not succesful", error)
    }
  }

  useEffect(() => {
    fetchPending()
  },[])

  return (
    <>
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
            {pendingCompanies.map((company) => (
              <TableRow
                key={company.companyId}

              >
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.profilePicture} />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.phoneNumber}</TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>
                  <div
                    className={`${
                      company.status === "approved"
                        ? "bg-[#547C8B] text-white"
                        : "bg-[#FFE6C2] text-jet"
                    }
                    text-center rounded-xl py-2`}
                  >
                    Pendiente
                  </div>
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
