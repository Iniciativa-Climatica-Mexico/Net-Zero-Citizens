'use client' 
import { useState, useEffect } from 'react'
import { Company, updateCompany } from '@/api/v1/company'
import { ComplaintsWithUser } from '@/@types/complaint/complaint'
import { getComplaintsWithUsers } from '@/api/v1/complaints'
import { Complaint } from '@/@types/complaint/complaint'
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

import { CellAction } from '@/components/cellAction'
import Image from 'next/image'
import { userAgent } from 'next/server'
import { usePathname, useRouter } from 'next/navigation'




export default function Home() {
  const [SelectedComplaint, setSelectedComplaint] = useState<ComplaintsWithUser>(
    {
      userId: '',
      companyId: '',
      complaintId: '',
      createdAt: '',
      firstName: '',
      lastName: '',
      complaintStatus: '',
      complaintSubject: '',
      complaintDescription: '',
      name: '',
      profilePicture: '',
    }
  )
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const [complaintsWithUsers, setComplaintsWithUsers] = useState<
    ComplaintsWithUser[]
  >([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'pending_approval' | 'approved'>(
    'pending_approval'
  )

const path = usePathname()
console.log(path)
const id = path.split('/')[2]
console.log(id)



  const handleTableRowClick = (complaint: ComplaintsWithUser) => {
    setSelectedComplaint(complaint)
  }

  const fetchComplaintsWithUsers = async (id: string) => {
    try {
      const complaints = await getComplaintsWithUsers(id)
      setComplaintsWithUsers(complaints)
    } catch (error) {
      console.error('Fetch of complaints by user was not successful', error)
    }
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const handlePageChange = (newPage: number) => setCurrentPage(newPage)

  useEffect(() => {
    fetchComplaintsWithUsers(id)
    console.log("complaints with users")
    console.log(complaintsWithUsers)
  }, [])


  return (
    <>
      <main className="border border-[#C1C9D2] m-[30px] mt-[15px] p-[20px] pb-5 rounded-lg">
        <h1 className="text-[20px] font-bold"> Reportes del proveedor:  </h1>
        <div className="flex items-center py-2 gap-x-2">
        </div>
        <Table className="border border-[#C1C9D2] rounded">
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario que Reporta</TableHead>
              <TableHead>Clase</TableHead>
              <TableHead>Descripcion</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {complaintsWithUsers?.map((company) => (
              <TableRow key={company.complaintId}>
                <TableCell
                  className="cursor-pointer"
                >
                  {company.firstName} {company.lastName}
                </TableCell>
                <TableCell
                  className="cursor-pointer"
                  onClick={() => handleTableRowClick(company)}
                >
                  {company.complaintSubject}
                </TableCell>
                <TableCell
                  className="cursor-pointer"
                  onClick={() => handleTableRowClick(company)}
                >
                  {company.complaintDescription}
                </TableCell>
                <TableCell
                  className="cursor-pointer"
                  onClick={() => handleTableRowClick(company)}
                >
                  {formatDate(company.createdAt) ?? 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </>
  )
}
