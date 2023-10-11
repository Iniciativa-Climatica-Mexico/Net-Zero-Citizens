/**
 * Represents a modal component that includes company info and allows admin to accpet or reject a comapny
 *
 * @component
 * @example
 * ```tsx
 * <ModalProveedor
      selectedCompany={selectedCompany}
      setIsModalOpen={setIsModalOpen}
      fetchPendingCompanies={() => fetchPendingCompanies()}
      fetchApprovedCompanies={() => fetchApprovedCompanies()}
      activeTab={activeTab}
    />
 * ```
 */
'use client'

import { useState } from 'react'

import { ThemeProvider } from '@mui/material/styles'
import { Theme } from '@/@types/icons/material'

import { useToast } from './ui/use-toast'

import { Company, updateCompany, UpdateCompanyInfoBody } from '@/api/v1/company'

import CloseIcon from '@mui/icons-material/Close'
import PhoneIcon from '@mui/icons-material/Phone'
import BusinessIcon from '@mui/icons-material/Business'
import LanguageIcon from '@mui/icons-material/Language'
import PlaceIcon from '@mui/icons-material/Place'
import FileOpenIcon from '@mui/icons-material/FileOpen'
import Logo from '../../public/Logo.svg'
import { formatDate } from '@/utils/dateUtils'

import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import Image from 'next/image'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { tabs } from '@/app/page'

interface ModalProveedorProps {
  setIsModalOpen: (value: boolean) => void
  selectedCompany: Company
  fetchPendingCompanies: () => void
  fetchApprovedCompanies: () => void
  activeTab: tabs | 'rejected'
}

export default function ModalProveedor({
  setIsModalOpen,
  selectedCompany,
  fetchPendingCompanies,
  fetchApprovedCompanies,
  activeTab,
}: ModalProveedorProps) {
  const [viewModal, setViewModal] = useState<boolean>(false)
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const { toast } = useToast()
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
      console.error('Error approving company:', error)
    } finally {
      toast({
        description: 'Proveedor aprobado exitosamente.',
      })
      setIsModalOpen(false)
      fetchPendingCompanies()
      fetchApprovedCompanies()
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
    <div>
      {viewModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="modal-container">
            <Card className="w-[450px] modal-card">
              <CardHeader>
                <CardTitle>Confirmar Acción</CardTitle>
                <CardDescription>Seguro que desea eliminar al proveedor?</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Button
                  onClick={() => {
                    handleReject(selectedCompany, selectedCompany.companyId)
                    toast({
                      description: 'Proveedor eliminado exitosamente.',
                    })
                  }
                  }
                  variant="default"
                >
                  Confirmar
                </Button>
                <Button
                  onClick={() => setViewModal(false)}
                  variant="outline"
                >
                  Cancelar
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
      <div className="fixed inset-0 flex flex-col items-center justify-center">
        <ThemeProvider theme={Theme}>
          <div className="flex justify-end w-50 pr-4 pb-2">
            <CloseIcon
              color="secondary"
              className="cursor-pointer"
              onClick={() => {
                setIsModalOpen(false)
              }}
            />
          </div>
          <article className="flex flex-col border border-[#C1C9D2] justify-center items-center rounded-lg lg:w-[823px] md:w-[512px] sm:w-[360px] py-[25px] bg-white z-10">
            <article className="flex border border-[#C1C9D2] rounded-xl lg:w-[763px] md:w-[500px] sm:w-[250px]">
              {selectedCompany.profilePicture  != null ? (
                <img
                  src={selectedCompany.profilePicture}
                  alt="Company Profile"
                  width={350}
                  height={350}
                  className="basis-6/12 mr-[10px] rounded-l-xl object-cover border-r"
                />
              ) : (
                <Image
                  src={Logo}
                  alt="Placeholder"
                  width={350}
                  height={350}
                  className="basis-6/12 mr-[10px] rounded-l-xl object-cover border-r"
                />
              )}

              <aside className="basis-6/12 pl-[15px] pr-[25px] py-[20px] pb-[0px] text-[14px]">
                <h2 className="text-[20px] font-bold">{selectedCompany.name}</h2>
                <section className="flex items-center text-[#589A74] py-[10px] gap-x-2">
                  <PlaceIcon color="primary" />
                  {`${selectedCompany.city} ${selectedCompany.state} ${selectedCompany.zipCode}`}
                </section>
                {selectedCompany.street && (
                  <>
                    <Separator />
                    <section className="flex items-center text-[#589A74] py-[10px] gap-x-2">
                      <BusinessIcon color="primary" />
                      {`${selectedCompany.street} ${selectedCompany.streetNumber}`}
                    </section>
                  </>
                )}

                <Separator />
                <section className="flex items-center text-[#589A74] py-[10px] gap-x-2">
                  <PhoneIcon color="primary" />
                  {selectedCompany.phone}
                </section>
                {selectedCompany.webPage && (
                  <>
                    <Separator />
                    <section className="flex items-center text-[#589A74] py-[10px] gap-x-2">
                      <LanguageIcon color="primary" />
                      <span>{selectedCompany.webPage}</span>
                    </section>
                  </>
                )}
                {selectedCompany.pdfCurriculumUrl && selectedCompany.pdfDicCdmxUrl && selectedCompany.pdfPeeFideUrl && selectedCompany.pdfGuaranteeSecurityUrl && selectedCompany.pdfActaConstitutivaUrl && selectedCompany.pdfIneUrl &&
                <h2 className="text-[14px] font-bold mt-[10px] mb-[10px]">
                  Documentos
                </h2>
                }
                {selectedCompany.pdfCurriculumUrl && selectedCompany.pdfDicCdmxUrl && selectedCompany.pdfPeeFideUrl &&

                <section className="flex justify-between items-end mb-3">
                  <a
                    href={selectedCompany.pdfCurriculumUrl}
                    className="min-w-[31%] no-underline text-[#333333] font-medium"
                    target="_blank"
                  >
                    <div className="border px-[5px] rounded flex flex-col justify-center items-center">
                      <FileOpenIcon color="info" className="mt-3" />
                      <p className="my-2 text-[11px]">Curriculum</p>
                    </div>
                  </a>
                  <a
                    href={selectedCompany.pdfDicCdmxUrl}
                    className="min-w-[31%] no-underline text-[#333333] font-medium"
                    target="_blank"
                  >
                    <div className="border px-[5px] rounded flex flex-col justify-center items-center">
                      <FileOpenIcon color="info" className="mt-3" />
                      <p className="my-2 text-[11px]">Dic CDMX</p>
                    </div>
                  </a>
                  <a
                    href={selectedCompany.pdfPeeFideUrl}
                    className="min-w-[31%]  no-underline text-[#333333] font-medium"
                    target="_blank"
                  >
                    <div className="border px-[5px] rounded flex flex-col justify-center items-center">
                      <FileOpenIcon color="info" className="mt-3" />
                      <p className="my-2 text-[11px]">Pee Fide</p>
                    </div>
                  </a>
                </section>
                }
                {selectedCompany.pdfGuaranteeSecurityUrl && selectedCompany.pdfActaConstitutivaUrl && selectedCompany.pdfIneUrl &&
                <section className="flex justify-between items-end mb-3">
                  <a
                    href={selectedCompany.pdfGuaranteeSecurityUrl}
                    className="min-w-[31%] no-underline text-[#333333] font-medium"
                    target="_blank"
                  >
                    <div className="border px-[5px] rounded flex flex-col justify-center items-center">
                      <FileOpenIcon color="info" className="mt-3" />
                      <p className="my-2 text-[11px]">Guarantee</p>
                    </div>
                  </a>
                  <a
                    href={selectedCompany.pdfActaConstitutivaUrl}
                    className="min-w-[31%] no-underline text-[#333333] font-medium"
                    target="_blank"
                  >
                    <div className="border px-[5px] rounded flex flex-col justify-center items-center">
                      <FileOpenIcon color="info" className="mt-3" />
                      <p className="my-2 text-[11px]">Acta Constitutiva</p>
                    </div>
                  </a>
                  <a
                    href={selectedCompany.pdfIneUrl}
                    className="min-w-[31%] no-underline text-[#333333] font-medium"
                    target="_blank"
                  >
                    <div className="border px-[5px] rounded flex flex-col justify-center items-center">
                      <FileOpenIcon color="info" className="mt-3" />
                      <p className="my-2 text-[11px]">INE</p>
                    </div>
                  </a>
                </section>
                }
                <section className='flex justify-end'>
                  <p className="text-right text-[#858585] text-[14px]">
                    Fecha que se registro:
                  </p>
                  <p className="text-right text-[#858585] text-[14px] ml-2">
                    {formatDate(selectedCompany.createdAt)}
                  </p>
                </section>
              </aside>
            </article>
            <section className="text-[13px] px-[35px] pt-[25px] w-full">
              {activeTab === 'no_user' ? (
                <>
                  <h3 className="font-bold">Token de registro</h3>
                  <p className="text-sm py-[15px]">{selectedCompany.companyId}</p>
                </>) : null}
              <h3 className="font-bold">Descripción</h3>
              <p className="text-sm py-[15px]">{selectedCompany.description}</p>
              {activeTab === 'pending_approval' ? (
                <>
                  <Separator />
                  <div className="flex items-center space-x-2 py-[25px]">
                    <Checkbox
                      onClick={() => {
                        setCheckboxChecked(!checkboxChecked)
                      }}
                      id="terms"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      He leído los documentos que ha entregado el proveedor
                    </label>
                  </div>
                  <footer className="flex gap-x-3">
                    <Button
                      disabled={!checkboxChecked}
                      onClick={() =>
                        handleAccept(selectedCompany, selectedCompany.companyId)
                      }
                      variant="default"
                    >
                      Aprobar
                    </Button>
                    <Button
                      onClick={() => {
                        handleReject(selectedCompany, selectedCompany.companyId)
                        toast({
                          description: 'Proveedor rechazado exitosamente.',
                        })
                      }
                      }
                      variant="outline"
                    >
                      Rechazar
                    </Button>
                  </footer>
                </>
              ) : (
                <Button
                  onClick={() =>
                    setViewModal(true)
                  }
                  variant="default"
                >
                  Eliminar
                </Button>
              )}
            </section>
          </article>
        </ThemeProvider>
      </div>
    </div>
  )
}
