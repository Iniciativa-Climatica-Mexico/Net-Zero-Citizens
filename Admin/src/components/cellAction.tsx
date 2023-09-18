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
import { Theme } from '@/api/v1/material'

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Company, updateCompany, UpdateCompanyInfoBody } from '@/api/v1/company'


interface cellActionProps {
  companyId: string
  fetchPending: () => void
  company: Company
}

export const CellAction = ({companyId, fetchPending, company}:cellActionProps) => {

  /**
     * @brief Function that allows admin to accept a specific company
     * @param company
     * @param companyId
   */
  const handleAccept = async (company: Company, companyId: string) => {
    try {
      const updatedCompanyInfo: UpdateCompanyInfoBody = {
        name: company.name,
        description: company.description,
        profilePicture: company.profilePicture,
        status: 'approved',
        phoneNumber: company.phoneNumber,
        webPage: company.webPage,
      }

      await updateCompany(companyId, updatedCompanyInfo)

    } catch (error) {
      console.error('Error accepting company:', error)
    } finally {
      fetchPending()
    }
  }

  return (
    <ThemeProvider theme={Theme}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizIcon
            onClick={() => {
            }}
            className='cursor-pointer'
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleAccept(company, companyId)}>
            <CheckCircleOutlineIcon className='mr-1.5' />
            Aceptar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ThemeProvider>
  )
}