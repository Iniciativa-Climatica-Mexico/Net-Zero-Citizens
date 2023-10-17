'use client'

import { useEffect, useState } from 'react'

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

import LogoSm from './../../../public/Logo.svg'

import type { User } from '@/@types/users/users'
import { getAllUsers } from '@/api/v1/users'
import Image from 'next/image'
import DeleteUsersButton from '@/components/users/DeleteUsersButton'
import DeleteUserConfirmationModal from '@/components/users/DeleteUserConfirmationModal'

export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const fetchUsers = async () => {
    try {
      const users = await getAllUsers()
      setUsers(users)
    } catch (error) {
      console.error('Fetch of users was not successful', error)
    }
  }

  const filteredUsersBySearchTerm = users?.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`
    const email = user.email
    const includesFullName = fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const includesEmail = email.toLowerCase().includes(searchTerm.toLowerCase())
    return includesFullName || includesEmail
  })

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedUsers = filteredUsersBySearchTerm?.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredUsersBySearchTerm?.length / itemsPerPage)

  const handlePageChange = (newPage: number) => setCurrentPage(newPage)

  const handleOnDeleteUserClick = (user: User) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const renderTable = (users: User[]) => (
    <Table className="border border-[#C1C9D2] rounded">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Imagen</TableHead>
          <TableHead>Nombre(s)</TableHead>
          <TableHead>Apellido(s)</TableHead>
          <TableHead>Correo</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.userId}>
            <TableCell className="cursor-pointer">
              {user.profilePicture != null ? (
                <Avatar>
                  <AvatarImage src={user.profilePicture} />
                </Avatar>
              ) : (
                <Image
                  src={LogoSm}
                  alt="Placeholder"
                  width={350}
                  height={350}
                  className="basis-6/12 mr-[10px] rounded-l-xl object-cover"
                />
              )}
            </TableCell>
            <TableCell className="cursor-pointer">{user.firstName}</TableCell>
            <TableCell className="cursor-pointer">{user.lastName}</TableCell>
            <TableCell className="cursor-pointer">{user.email}</TableCell>
            <TableCell
              className="text-right"
              onClick={() => handleOnDeleteUserClick(user)}
            >
              {user.roleId != 'ADMIN_ROLE_ID' && (
                <DeleteUsersButton setIsModalOpen={setIsModalOpen} />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <>
      {isModalOpen && (
        <DeleteUserConfirmationModal
          userId={selectedUser?.userId}
          firstName={selectedUser?.firstName}
          lastName={selectedUser?.lastName}
          setIsModalOpen={setIsModalOpen}
          fetchUsers={fetchUsers}
        />
      )}
      <main className="border border-[#C1C9D2] m-[30px] mt-[15px] p-[20px] pb-5 rounded-lg">
        <h1 className="text-[20px] font-bold">Usuarios</h1>
        <div className="flex items-center py-4 gap-x-2">
          <Input
            placeholder="Busca un usuario"
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {renderTable(paginatedUsers)}
        <div className="flex justify-between items-center pt-2 gap-x-2">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className='flex justify-end gap-2'>
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
              disabled={currentPage >= totalPages}
              className={currentPage >= totalPages ? 'cursor-not-allowed' : ''}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
