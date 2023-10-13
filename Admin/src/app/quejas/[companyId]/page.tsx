'use client'
import { useState, useEffect } from 'react'
import { ComplaintsWithUser } from '@/@types/complaint/complaint'
import { getComplaintsWithUsers, postUpdateStatus } from '@/api/v1/complaints'
import { formatDate } from '@/utils/dateUtils'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { usePathname, useRouter } from 'next/navigation'
import { error } from 'console'

export default function Home() {
  const [SelectedComplaint, setSelectedComplaint] =
    useState<ComplaintsWithUser>()

  const [complaintsWithUsers, setComplaintsWithUsers] = useState<
    ComplaintsWithUser[]
  >([])

  const path = usePathname()
  const id = path.split('/')[2]

  const fetchComplaintsWithUsers = async (id: string) => {
    try {
      const complaints = await getComplaintsWithUsers(id)
      setComplaintsWithUsers(complaints)
    } catch (error) {
      console.error('Fetch of complaints by user was not successful', error)
    }
  }

  const changeToInactive = (id: string, status: string = 'inactive') => {
    setComplaintsWithUsers((prevComplaints) => {
      return prevComplaints.filter((complaint) => {
        if (complaint.complaintId === id) {
          descartar(id, status)
          return false
        }
        return true
      })
    })
  }

  const descartar = async (id: string, status: string) => {
    try {
      // post to db
      await postUpdateStatus(id, status)
    } catch (error) {
      console.error('Fetch of complaints by user was not successful', error)
    }
  }

  useEffect(() => {
    fetchComplaintsWithUsers(id)
  }, [])

  return (
    <>
      <main className="border border-[#C1C9D2] m-[30px] mt-[15px] p-[20px] pb-5 rounded-lg">
        <h1 className="text-[20px] font-bold"> Reportes del proveedor: </h1>
        <div className="flex items-center py-2 gap-x-2"></div>
        <Table className="border border-[#C1C9D2] rounded">
          <TableHeader>
            <TableRow>
              <TableHead>Usuario que Reporta</TableHead>
              <TableHead>Clase</TableHead>
              <TableHead>Descripcion</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complaintsWithUsers?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No hay reportes para mostrar
                </TableCell>
              </TableRow>
            ) : null}

            {complaintsWithUsers?.map((company) => (
              <TableRow key={company.complaintId} className="min-h-max">
                <TableCell>
                  {company.firstName} {company.lastName}
                </TableCell>
                <TableCell>{company.complaintSubject}</TableCell>
                <TableCell className="max-w-xs overflow-hidden">
                  {company.complaintDescription ? (
                    company.complaintDescription
                  ) : (
                    <span>No description available</span> // Alternate message
                  )}
                </TableCell>
                <TableCell>{formatDate(company.createdAt) ?? 'N/A'}</TableCell>
                <TableCell>
                  <Button
                    className="bg-[#547c8b] text-white rounded-lg p-2 hover:bg-[#3e5f6b] hover:text-white"
                    onClick={() => changeToInactive(company.complaintId)}
                  >
                    Descartar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </>
  )
}
