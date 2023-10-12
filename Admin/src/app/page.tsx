'use client'

import { useState, useEffect } from 'react'
import {
  Company,
  getPendingCompanies,
  getApprovedCompanies,
} from '@/api/v1/company'

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
import LogoSm from './../../public/LogoSm.svg'

import ModalProveedor from '@/components/modalProveedor'
import Image from 'next/image'

export type tabs = 'pending_approval' | 'approved' | 'no_user'

export default function Home() {
  const [selectedCompany, setSelectedCompany] = useState<Company>({
    companyId: '',
    userId: null,
    name: '',
    profilePicture: '',
    state: '',
    city: '',
    street: '',
    zipCode: '',
    status: 'pending_approval',
    email: '',
    phone: '',
    webPage: '',
    description: '',
    createdAt: '',
    streetNumber: '',
    companyFiles: [],
  })
  const [modalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const [pendingCompanies, setPendingCompanies] = useState<Company[]>([])
  const [approvedCompanies, setApprovedCompanies] = useState<Company[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState<tabs>('pending_approval')

  const handleTableRowClick = (company: Company) => {
    setSelectedCompany(company)
    if (window.innerWidth <= 850) {
      setMessage(
        'Para visualizar detalles de un proveedor ingresa desde tu dispositivo de escritorio. Gracias.'
      )
    } else {
      setMessage('')
    }
    setIsModalOpen(true)
  }

  const fetchPendingCompanies = async () => {
    try {
      const companies = await getPendingCompanies()
      setPendingCompanies(companies)
    } catch (error) {
      console.error('Fetch of pending companies was not successful', error)
    }
  }

  const fetchApprovedCompanies = async () => {
    try {
      const companies = await getApprovedCompanies()
      setApprovedCompanies(companies)
    } catch (error) {
      console.error('Fetch of approved companies was not successful', error)
    }
  }

  const filteredCompanies =
    activeTab === 'pending_approval'
      ? pendingCompanies?.filter((company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : activeTab === 'approved'
        ? approvedCompanies?.filter((company) =>
          company.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : approvedCompanies?.filter(
          (company) =>
            company.userId === null &&
            company.name.toLowerCase().includes(searchTerm.toLowerCase())
        )

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCompanies = filteredCompanies?.slice(startIndex, endIndex)

  const handlePageChange = (newPage: number) => setCurrentPage(newPage)

  useEffect(() => {
    fetchPendingCompanies()
    fetchApprovedCompanies()
  }, [])

  const renderTable = (companies: Company[]) => (
    <Table className="border border-[#C1C9D2] rounded">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Imagen</TableHead>
          {activeTab === 'no_user' ? (
            <TableHead>Token de registro</TableHead>
          ) : null}
          <TableHead>Nombre</TableHead>
          <TableHead>Correo</TableHead>
          <TableHead>Ubicación</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies?.map((company) => (
          <TableRow key={company.companyId}>
            <TableCell
              className="cursor-pointer"
              onClick={() => handleTableRowClick(company)}
            >
              <Image
                src={LogoSm}
                alt="Placeholder"
                width={350}
                height={350}
                className="basis-6/12 mr-[10px] rounded-l-xl object-cover"
              />
            </TableCell>
            {activeTab === 'no_user' ? (
              <TableCell
                className="cursor-pointer"
                onClick={() => handleTableRowClick(company)}
              >
                {company.companyId}
              </TableCell>
            ) : null}
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
              {company.email}
            </TableCell>
            <TableCell
              className="cursor-pointer"
              onClick={() => handleTableRowClick(company)}
            >
              {`${company.street} ${company.city}, ${company.state} ${company.zipCode}`}
            </TableCell>
            <TableCell
              className="cursor-pointer"
              onClick={() => handleTableRowClick(company)}
            >
              <div
                className={`${
                  company.status === 'approved'
                    ? 'bg-[#547C8B] text-white'
                    : 'bg-[#FFE6C2] text-jet'
                }
                text-center rounded-xl p-2.5`}
              >
                {company.status === 'approved' ? 'Aprobado' : 'Pendiente'}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <>
      {modalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-60 z-20"></div>
      )}
      {modalOpen && (
        <div className="flex flex-col items-center justify-center h-screen absolute left-1/2 right-1/2 z-30">
          <ModalProveedor
            selectedCompany={selectedCompany}
            setIsModalOpen={setIsModalOpen}
            fetchPendingCompanies={() => fetchPendingCompanies()}
            fetchApprovedCompanies={() => fetchApprovedCompanies()}
            activeTab={activeTab}
            message={message}
          />
        </div>
      )}
      <main className="border border-[#C1C9D2] m-[30px] mt-[15px] p-[20px] pb-5 rounded-lg">
        <h1 className="text-[20px] font-bold">Descubre Proveedores</h1>
        <div className="flex items-center pt-4 pb-2 gap-x-2">
          <Input
            placeholder="Busca un proveedor"
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Tabs defaultValue="pending_approval" className="sm:flex-row mb-4">
          <TabsList className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2  p-2 rounded h-full sm:w-auto md:w-96 justify-start sm:justify-start">
            <TabsTrigger
              className="bg-gray-100"
              value="pending_approval"
              onClick={() => setActiveTab('pending_approval')}
            >
              Pendientes
            </TabsTrigger>
            <TabsTrigger
              className="bg-gray-100"
              value="approved"
              onClick={() => setActiveTab('approved')}
            >
              Aprobados
            </TabsTrigger>
            <TabsTrigger
              className="bg-gray-100"
              value="no_user"
              onClick={() => setActiveTab('no_user')}
            >
              Sin Responsable
            </TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab}>
            {renderTable(paginatedCompanies)}
          </TabsContent>
        </Tabs>
        <div className="flex justify-end items-center pt-2 gap-x-2 z-0">
          <Button
            variant="outline"
            className="px-4"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={endIndex >= filteredCompanies?.length}
          >
            Siguiente
          </Button>
        </div>
      </main>
    </>
  )
}
