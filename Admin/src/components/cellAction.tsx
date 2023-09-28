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
import DeleteIcon from '@mui/icons-material/Delete'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { updateCompany, UpdateCompanyInfoBody } from '@/api/v1/company'
import { toast } from './ui/use-toast'
import { Toaster } from './ui/toaster'

interface cellActionProps {
  setIsModalOpen: (value: boolean) => void
  companyId: string
  fetchPendingCompanies: () => void
  fetchApprovedCompanies: () => void
  company: Company
  activeTab: 'pending_approval' | 'approved'
}

export const CellAction = ({
  setIsModalOpen,
  companyId,
  fetchPendingCompanies,
  fetchApprovedCompanies,
  company,
  activeTab,
}: cellActionProps) => {
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

      // Call the updateCompany function with the updated information
      await updateCompany(companyId, updatedCompanyInfo)
    } catch (error) {
      console.error('Error approving company:', error)
    } finally {
      fetchPendingCompanies()
      fetchApprovedCompanies()
      toast({
        description: 'Proveedor aprobado exitosamente.',
      })
      setIsModalOpen(false)
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
        status: 'rejected',
        phone: company.phone,
        webPage: company.webPage,
      }

      // Call the updateCompany function with the updated information
      await updateCompany(companyId, updatedCompanyInfo)
    } catch (error) {
      console.error('Error rejecting company:', error)
    } finally {
      setIsModalOpen(false)
      fetchPendingCompanies()
      fetchApprovedCompanies()
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
          {activeTab === 'pending_approval' ? (
            <>
              <DropdownMenuItem
                onClick={() => {
                  handleAccept(company, companyId)
                  toast({
                    description: 'Proveedor rechazado exitosamente.',
                  })
                }}
              >
                <CheckCircleOutlineIcon className="mr-1.5" />
                Aceptar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleReject(company, companyId)
                }}
              >
                <CancelIcon className="mr-1.5" />
                Rechazar
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem
              onClick={() => {
                handleReject(company, companyId)
                toast({
                  description: 'Proveedor eliminado exitosamente.',
                })
              }}
            >
              <DeleteIcon className="mr-1.5" />
              Eliminar
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Toaster />
    </ThemeProvider>
  )
}
