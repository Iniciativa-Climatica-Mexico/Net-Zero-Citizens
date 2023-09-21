/**
 * Represents a component that allows admin to make quick actions from the table
 *
 * @component
 * @example
 * ```tsx
 * <CellAction companyId={company.companyId} fetchPending={fetchPending} company={company} />
 * ```
 */

import { ThemeProvider } from '@mui/material/styles'
import { Company } from '@/@types/company/company'
import { Theme } from '@/@types/icons/material'

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CancelIcon from '@mui/icons-material/Cancel'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { updateCompany, UpdateCompanyInfoBody } from '@/api/v1/company'
import { useToast } from './ui/use-toast'
import { Toaster } from './ui/toaster'
//import { recoverTokens } from '@/utils/authUtils'

interface cellActionProps {
  setIsModalOpen: (value: boolean) => void
  companyId: string
  fetchPending: () => void
  company: Company
}

export const CellAction = ({
  setIsModalOpen,
  companyId,
  fetchPending,
  company,
}: cellActionProps) => {
  const { toast } = useToast()
  //const tokens = recoverTokens()
  /**
   * @brief Function that allows admin to accept a specific company
   * @param company
   * @param companyId
   */
  const handleAccept = async (company: Company, companyId: string) => {
    try {
      // Create an object with the updated status
      const updatedCompanyInfo: UpdateCompanyInfoBody = {
        name: company.name,
        description: company.description,
        street: company.street,
        streetNumber: company.streetNumber,
        city: company.city,
        state: company.state,
        zipCode: company.zipCode,
        profilePicture: company.profilePicture,
        status: 'approved',
        phone: company.phone,
        webPage: company.webPage,
      }

      await updateCompany(companyId, updatedCompanyInfo)
    } catch (error) {
      console.error('Error accepting company:', error)
    } finally {
      toast({
        description: 'Proveedor aprobado exitosamente.',
      })
      fetchPending()
    }
  }

  /**
   * @brief Function that allows admin to reject a specific company
   * @param company
   * @param companyId
   */
  const handleReject = async (company: Company, companyId: string) => {
    try {
      // Create an object with the updated status
      const updatedCompanyInfo: UpdateCompanyInfoBody = {
        name: company.name,
        description: company.description,
        street: company.street,
        streetNumber: company.streetNumber,
        city: company.city,
        state: company.state,
        zipCode: company.zipCode,
        profilePicture: company.profilePicture,
        status: 'approved',
        phone: company.phone,
        webPage: company.webPage,
      }

      // Call the updateCompany function with the updated information
      await updateCompany(companyId, updatedCompanyInfo)
    } catch (error) {
      console.error('Error rejecting company:', error)
    } finally {
      toast({
        description: 'Proveedor rechazado exitosamente.',
      })
      setIsModalOpen(false)
      fetchPending()
    }
  }
  return (
    <ThemeProvider theme={Theme}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizIcon onClick={() => {}} className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" style={{ background: 'white' }}>
          <DropdownMenuLabel>Acciones rápidas</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleAccept(company, companyId)}>
            <CheckCircleOutlineIcon className="mr-1.5" />
            Aceptar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleReject(company, companyId)}>
            <CancelIcon className="mr-1.5" />
            Rechazar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Toaster />
    </ThemeProvider>
  )
}
