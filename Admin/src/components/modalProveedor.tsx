'use client'

import { useState } from 'react'
import Image from 'next/image'

import { ThemeProvider } from '@mui/material/styles'
import { Theme } from '@/@types/icons/material'

import { updateCompany, UpdateCompanyInfoBody } from '@/api/v1/company'
import { Company } from '@/@types/company/company'

import CloseIcon from './../../node_modules/@mui/icons-material/Close'
import PhoneIcon from './../../node_modules/@mui/icons-material/Phone'
import BusinessIcon from './../../node_modules/@mui/icons-material/Business'
import LanguageIcon from './../../node_modules/@mui/icons-material/Language'
import PlaceIcon from './../../node_modules/@mui/icons-material/Place'
import FileOpenIcon from '@mui/icons-material/FileOpen'

import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'
import { Checkbox } from './ui/checkbox'
import { AlertDialog, AlertDialogTrigger, AlertDialogDescription, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from './ui/alert-dialog'

interface ModalProveedorProps {
    setIsModalOpen: (value: boolean) => void;
    selectedCompany: Company
    fetchPending: () => void
}

export default function ModalProveedor({ setIsModalOpen, selectedCompany, fetchPending }: ModalProveedorProps) {
  const [checkboxChecked, setCheckboxChecked] = useState(false)

  const { toast } = useToast()

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
      toast({
        description: 'Proveedor aprobado exitosamente.',
      })
      setIsModalOpen(false)
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
        profilePicture: company.profilePicture,
        status: 'rejected',
        phoneNumber: company.phoneNumber,
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

  /**
   * @brief Function to format companies approval date to: DD/MM/YY
   * @param date
   * @returns formatted date
   */
  const formatDate = (date: string) => {
    const dateObject = new Date(date)

    const day = dateObject.getDate()
    const month = dateObject.getMonth() + 1
    const year = dateObject.getFullYear()

    const formattedDay = day < 10 ? `0${day}` : day
    const formattedMonth = month < 10 ? `0${month}` : month

    return `${formattedDay}/${formattedMonth}/${year}`
  }


  return (
    <div className='bg h-screen flex flex-col items-end'>
      <ThemeProvider theme={Theme}>
        <CloseIcon
          htmlColor='#ffffff'
          className='cursor-pointer mb-2'
          onClick={() => {
            setIsModalOpen(false)
          }}
        />
        <article className='flex flex-col border border-[#C1C9D2] justify-center items-center rounded-lg w-[823px] py-[25px] bg-white z-10'>
          <article className='flex border border-[#C1C9D2] rounded-xl w-[763px]'>
            <Image
              src={selectedCompany.profilePicture}
              alt='Green Circle'
              width={350}
              height={350}
              className='basis-6/12 mr-[10px] rounded-l-xl object-cover'
            />
            <aside className='basis-6/12 pl-[15px] pr-[25px] py-[20px] text-[14px]'>
              <h2 className='text-[20px] font-bold'>{selectedCompany.name}</h2>
              <section className='flex items-center text-[#589A74] py-[10px] gap-x-2'>
                <PlaceIcon color='secondary' />
                {`${selectedCompany.city} ${selectedCompany.state} ${selectedCompany.zipCode}`}


              </section>
              <Separator />
              <section className='flex items-center text-[#589A74] py-[10px] gap-x-2'>
                <BusinessIcon color='secondary' />
                {`${selectedCompany.street} ${selectedCompany.streetNumber}`}
              </section>
              <Separator />
              <section className='flex items-center text-[#589A74] py-[10px] gap-x-2'>
                <PhoneIcon color='secondary' />
                {selectedCompany.phoneNumber}
              </section>
              <Separator />
              <section className='flex items-center text-[#589A74] py-[10px] gap-x-2'>
                <LanguageIcon color='secondary' />
                {selectedCompany.webPage}
              </section>
              <h2 className='text-[14px] font-bold mt-[10px] mb-[10px]'>
                Documentos
              </h2>
              <section className='flex justify-between items-end mb-3'>
                <a href={selectedCompany.pdfCurriculumURL} className='min-w-[31%]' target="_blank">
                  <div className='border px-[5px] rounded flex flex-col justify-center items-center'>
                    <FileOpenIcon color='info' className='mt-3' />
                    <p className='my-2 text-[11px]'>Curriculum</p>
                  </div>
                </a>
                <a href={selectedCompany.pdfDicCdmxURL} className='min-w-[31%]' target="_blank">
                  <div className='border px-[5px] rounded flex flex-col justify-center items-center'>
                    <FileOpenIcon color='info' className='mt-3' />
                    <p className='my-2 text-[11px]'>Dic CDMX</p>
                  </div>
                </a>
                <a href={selectedCompany.pdfPeeFideURL} className='min-w-[31%]' target="_blank">
                  <div className='border px-[5px] rounded flex flex-col justify-center items-center'>
                    <FileOpenIcon color='info' className='mt-3' />
                    <p className='my-2 text-[11px]'>Pee Fide</p>
                  </div>
                </a>
              </section>
              <section className='flex justify-between items-end mb-3'>
                <a href={selectedCompany.pdfGuaranteeSecurityURL} className='min-w-[31%]' target="_blank">
                  <div className='border px-[5px] rounded flex flex-col justify-center items-center'>
                    <FileOpenIcon color='info' className='mt-3' />
                    <p className='my-2 text-[11px]'>Guarantee</p>
                  </div>
                </a>
                <a href={selectedCompany.pdfActaConstitutivaURL} className='min-w-[31%]' target="_blank">
                  <div className='border px-[5px] rounded flex flex-col justify-center items-center'>
                    <FileOpenIcon color='info' className='mt-3' />
                    <p className='my-2 text-[11px]'>Acta Constitutiva</p>
                  </div>
                </a>
                <a href={selectedCompany.pdfINEURL} className='min-w-[31%]' target="_blank">
                  <div className='border px-[5px] rounded flex flex-col justify-center items-center'>
                    <FileOpenIcon color='info' className='mt-3' />
                    <p className='my-2 text-[11px]'>INE</p>
                  </div>
                </a>
              </section>
              <p className='text-right text-[#858585] text-[14px]'>{formatDate(selectedCompany.createdAt)}</p>
            </aside>
          </article>
          <section className='text-[13px] px-[35px] pt-[25px] w-full'>
            <h3 className='font-bold'>Descripción</h3>
            <p className='text-sm py-[15px]'>
              {selectedCompany.description}
            </p>
            <Separator />
            <div className="flex items-center space-x-2 py-[25px]">
              <Checkbox onClick={()=> {setCheckboxChecked(!checkboxChecked)}} id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                He leído los documentos que ha entregado el proveedor
              </label>
            </div>
            <footer className='flex gap-x-3'>
              <Button disabled={!checkboxChecked} onClick={() => handleAccept(selectedCompany, selectedCompany.companyId)} variant='default'>Aprobar</Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant='outline'>Rechazar</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Seguro que deseas realizar esta acción?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Confirmar el rechazo de un proveedor.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleReject(selectedCompany, selectedCompany.companyId)} className='bg-[#3E5D8C] font-medium text-primary-foreground hover:bg-[#173871] hover:text-white'>
                      Continuar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </footer>
          </section>
        </article>
      </ThemeProvider>
    </div>
  )
}
