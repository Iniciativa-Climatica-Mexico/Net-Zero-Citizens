'use client'

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import { deleteUser } from '@/api/v1/users'

interface DeleteUserConfirmationModalProps {
    userId?: string
    firstName?: string
    lastName?: string
    setIsModalOpen: (value: boolean) => void
    fetchUsers: () => void
}
export default function DeleteUserConfirmationModal({userId, firstName, lastName, setIsModalOpen, fetchUsers}: DeleteUserConfirmationModalProps) {
  if (!userId) return

  const userName = `${firstName} ${lastName}`
  const { toast } = useToast()
  const handleDelete = async () => {
    try {
      await deleteUser(userId)
      toast({
        description: 'Usuario eliminado exitosamente'
      })  
      fetchUsers()
      setIsModalOpen(false)
    } catch (error) {
      toast({
        description: 'Hubo un error al eliminar al usuario, por favor intenta de nuevo más tarde'
      })  
    }
  }

  return(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="modal-container">
        <Card className="w-[450px] modal-card">
          <CardHeader>
            <CardTitle>Confirmar Acción</CardTitle>
            <CardDescription>¿Seguro que desea eliminar al usuario {`${userName}`}?</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <Button
              onClick={handleDelete}
              variant="default"
            >
                Eliminar
            </Button>
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="outline"
            >
                Cancelar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}