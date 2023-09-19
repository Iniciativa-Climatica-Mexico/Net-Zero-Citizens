'use client'

import { useState, useEffect } from 'react'
import { getPendingCompanies } from '@/api/v1/company'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Company {
  companyId: number
  name: string
  location: string
  profilePicture: string
  state: string
  city: string
  street: string
  zipCode: string
  status: 'approved' | 'pending_approval' | 'rejected'
  email: string
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const [pendingCompanies, setPendingCompanies] = useState<Company[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const fetchPending = async function fetchingPendingCompanies() {
    try {
      const companies = await getPendingCompanies()
      setPendingCompanies(companies)
    } catch (error) {
      console.log('Fetch of companies was not succesful', error)
    }
  }

  const filteredCompanies = pendingCompanies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handlePageChange = (newPage: number) => setCurrentPage(newPage)

  useEffect(() => {
    fetchPending()
  }, [])

  return (
    <>
      <main className="border border-[#C1C9D2] m-[30px] mt-[15px] p-[20px] pb-5 rounded-lg">
        <h1 className="text-[20px] font-bold">Descubre Proveedores</h1>
        <div className="flex items-center py-4 gap-x-2">
          <Input
            placeholder="Busca un proveedor"
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Table className="border border-[#C1C9D2] rounded">
          <TableCaption></TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Ubicacion</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.slice(startIndex, endIndex).map((company) => (
              <TableRow key={company.companyId}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.profilePicture} />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>{`${company.street} ${company.city}, ${company.state} ${company.zipCode}`}</TableCell>
                <TableCell>
                  <div
                    className={`${
                      company.status === 'approved'
                        ? 'bg-[#547C8B] text-white'
                        : 'bg-[#FFE6C2] text-jet'
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
          <Button
            variant="outline"
            className="px-4"
            onClick={() => {
              handlePageChange(currentPage - 1)
            }}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              handlePageChange(currentPage + 1)
            }}
            disabled={endIndex >= filteredCompanies.length}
          >
            Siguiente
          </Button>
        </div>
      </main>
    </>
  )
}
