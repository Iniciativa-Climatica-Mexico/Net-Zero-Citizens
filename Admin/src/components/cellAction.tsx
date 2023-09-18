import { createTheme, ThemeProvider } from '@mui/material/styles'

import CheckCircleOutlineIcon from './../../node_modules/@mui/icons-material/CheckCircleOutline'
import MoreHorizIcon from './../../node_modules/@mui/icons-material/MoreHoriz'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { updateCompany, UpdateCompanyInfoBody } from '@/api/v1/company'

interface Company {
  companyId: string
  name: string
  location: string
  profilePicture: string
  state: string
  city: string
  street: string
  zipCode: string
  status: 'approved' | 'pending_approval' | 'rejected'
  email: string
  phoneNumber: string
  webPage: string
  description: string
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#589A74',
    },
    secondary: {
      main: '#589A74',
      light: '#F5EBFF',
      contrastText: '#47008F',
    },
  },
})

interface cellActionProps {
  companyId: string
  fetchPending: () => void
  company: Company
}

export const CellAction = ({
  companyId,
  fetchPending,
  company,
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
    <ThemeProvider theme={theme}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizIcon onClick={() => {}} className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones rápidas</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleAccept(company, companyId)}>
            <CheckCircleOutlineIcon className="mr-1.5" />
            Aceptar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ThemeProvider>
  )
}
