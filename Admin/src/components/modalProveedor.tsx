/**
 * Represents a modal component that includes company info and allows admin to accpet or reject a comapny
 *
 * @component
 * @example
 * ```tsx
 * <ModalProveedor selectedCompany={selectedCompany} setIsModalOpen={setIsModalOpen}fetchPending={fetchPending} />
 * ```
 */

import { ThemeProvider } from '@mui/material/styles'
import { Theme } from '@/api/v1/material'
import Image from 'next/image'

import { Company, updateCompany, UpdateCompanyInfoBody } from '@/api/v1/company'

import CloseIcon from '@mui/icons-material/Close'
import PhoneIcon from '@mui/icons-material/Phone'
import BusinessIcon from '@mui/icons-material/Business'
import LanguageIcon from '@mui/icons-material/Language'
import PlaceIcon from '@mui/icons-material/Place'
import FileOpenIcon from '@mui/icons-material/FileOpen'

import { Separator } from './ui/separator'
import { Button } from './ui/button'

interface ModalProveedorProps {
    setIsModalOpen: (value: boolean) => void;
    selectedCompany: Company
    fetchPending: () => void
}

export default function ModalProveedor({ setIsModalOpen, selectedCompany, fetchPending }: ModalProveedorProps) {

  /**
     * @brief Function that allows admin to accept a specific company
     * @param company
     * @param companyId
   */
  const handleAccept = async (company: Company, companyId: string)  => {
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
          color='info'
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
                    <FileOpenIcon color='primary' className='mt-3' />
                    <p className='my-2 text-[11px]'>Curriculum</p>
                  </div>
                </a>
                <a href={selectedCompany.pdfDicCdmxURL} className='min-w-[31%]' target="_blank">
                  <div className='border px-[5px] rounded flex flex-col justify-center items-center'>
                    <FileOpenIcon color='primary' className='mt-3' />
                    <p className='my-2 text-[11px]'>Dic CDMX</p>
                  </div>
                </a>
                <a href={selectedCompany.pdfPeeFideURL} className='min-w-[31%]' target="_blank">
                  <div className='border px-[5px] rounded flex flex-col justify-center items-center'>
                    <FileOpenIcon color='primary' className='mt-3' />
                    <p className='my-2 text-[11px]'>Pee Fide</p>
                  </div>
                </a>
              </section>
              <section className='flex justify-between items-end mb-3'>
                <a href={selectedCompany.pdfGuaranteeSecurityURL} className='min-w-[31%]' target="_blank">
                  <div className='border px-[5px] rounded flex flex-col justify-center items-center'>
                    <FileOpenIcon color='primary' className='mt-3' />
                    <p className='my-2 text-[11px]'>Guarantee</p>
                  </div>
                </a>
                <a href={selectedCompany.pdfActaConstitutivaURL} className='min-w-[31%]' target="_blank">
                  <div className='border px-[5px] rounded flex flex-col justify-center items-center'>
                    <FileOpenIcon color='primary' className='mt-3' />
                    <p className='my-2 text-[11px]'>Acta Constitutiva</p>
                  </div>
                </a>
                <a href={selectedCompany.pdfINEURL} className='min-w-[31%]' target="_blank">
                  <div className='border px-[5px] rounded flex flex-col justify-center items-center'>
                    <FileOpenIcon color='primary' className='mt-3' />
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
            <footer className='flex gap-x-3'>
              <Button onClick={() => handleAccept(selectedCompany, selectedCompany.companyId)} variant='default'>Aprobar</Button>
              <Button variant='outline'>Rechazar</Button>
            </footer>
          </section>
        </article>
      </ThemeProvider>
    </div>
  )
}