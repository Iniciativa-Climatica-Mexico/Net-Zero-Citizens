'use client'
import { useState, useEffect } from 'react'
import { Company } from '@/api/v1/company'
import { CompanyComplaints } from '@/@types/complaint/complaint'
import { getCompaniesWithComplaints } from '@/api/v1/complaints'
import { formatDate } from '@/utils/dateUtils'
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
//import LogoSm from '@/public/images/logo-sm.svg'

import ModalProveedor from '@/components/modalProveedor'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const [SelectedComplaint, setSelectedComplaint] = useState<CompanyComplaints>(
    {
      companyId: '',
      name: '',
      profilePicture: '',
      complaints: [],
    }
  )
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const [companiesWithComplaints, setCompaniesWithComplaints] = useState<
    CompanyComplaints[]
  >([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleTableRowClick = (company: CompanyComplaints) => {
    setSelectedComplaint(company)
    router.push(`/quejas/${company.companyId}`)
  }

  const fetchCompaniesWithComplaints = async () => {
    try {
      const companies = await getCompaniesWithComplaints()
      console.log(companies)
      setCompaniesWithComplaints(companies)
    } catch (error) {
      console.error('Fetch of complaints by company was not successful', error)
    }
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const handlePageChange = (newPage: number) => setCurrentPage(newPage)

  useEffect(() => {
    fetchCompaniesWithComplaints()
  }, [])

  return (
    <main className="border border-[#C1C9D2] m-[30px] mt-[15px] p-[20px] pb-5 rounded-lg">
      <h1 className="text-[20px] font-bold">Proveedores Reportados: </h1>

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
            <TableHead>Última fecha de reporte</TableHead>
            <TableHead>Número de veces reportado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companiesWithComplaints?.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No hay proveedores reportados
              </TableCell>
            </TableRow>
          )}

          {companiesWithComplaints?.map((company) => (
            <TableRow key={company.companyId}>
              <TableCell
                className="cursor-pointer"
                onClick={() => handleTableRowClick(company)}
              >
                {company.profilePicture != null && (
                  <Avatar>
                    <AvatarImage src={company.profilePicture} />
                  </Avatar>
                )}
              </TableCell>
              <TableCell
                className="cursor-pointer"
                onClick={() => handleTableRowClick(company)}
              >
                {company.name}
              </TableCell>
              <TableCell
                className="cursor-pointer"
                onClick={() => handleTableRowClick(company)}
              >
                {formatDate(company.complaints[0].createdAt) ?? 'N/A'}
              </TableCell>
              <TableCell
                className="cursor-pointer"
                onClick={() => handleTableRowClick(company)}
              >
                {company.complaints.length}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
