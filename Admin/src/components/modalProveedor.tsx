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

import { useState, useRef } from 'react'

import { ThemeProvider } from '@mui/material/styles'
import { Theme } from '@/@types/icons/material'

import { useToast } from './ui/use-toast'

import {
  Company,
  CompanyFiles,
  updateCompany,
  UpdateCompanyInfoBody,
  getCompanyFileDownload
} from '@/api/v1/company'

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
import emailjs from '@emailjs/browser'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

interface ModalProveedorProps {
  setIsModalOpen: (value: boolean) => void
  selectedCompany: Company
  fetchPendingCompanies: () => void
  fetchApprovedCompanies: () => void
  activeTab: tabs | 'rejected'
  message: string
}

export default function ModalProveedor({
  setIsModalOpen,
  selectedCompany,
  fetchPendingCompanies,
  fetchApprovedCompanies,
  activeTab,
  message,
}: ModalProveedorProps) {
  const [viewModal, setViewModal] = useState<boolean>(false)
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [rejectCompany, setRejectCompany] = useState(false)
  const [rejectCompanyMessage, setRejectCompanyMessage] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const form = useRef(HTMLFormElement)
  const submitButton = useRef(HTMLButtonElement)
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
      setRejectCompany(false)
      setRejectCompanyMessage('')
      setShowErrorMessage(false)
    }
  }

  const sendRejectEmail = (e: HTMLFormElement) => {
    e.preventDefault()

    emailjs.sendForm('service_icm2023', 'template_vjx2ic3', form.current, 'LSXaN-F4jhFZ5mzIt')
      .then((result) => {
        console.log(result.text)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const sendAcceptEmail = (e: HTMLFormElement) => {
    e.preventDefault()

    emailjs.sendForm('service_icm2023', 'template_f34afsb', form.current, 'LSXaN-F4jhFZ5mzIt')
      .then((result) => {
        console.log(result.text)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const downloadCompanyFile = async (companyId: string, fileDescription: string, fileFormat: string) => {
    try {
      await getCompanyFileDownload(companyId, fileDescription, fileFormat)
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  if (message) {
    return (
      <div>
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="modal-container">
            <CloseIcon
              color="primary"
              className="cursor-pointer"
              onClick={() => {
                setIsModalOpen(false)
              }}
            />
            <Card className="w-[350px] modal-card">
              <CardDescription className='p-4 text-center'>{message}</CardDescription>
            </Card>
          </div>
        </div>
      </div>
    )
  }
  

  return (
    <>
      {viewModal && !rejectCompany && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="modal-container">
            <Card className="w-[450px] modal-card">
              <CardHeader>
                <CardTitle>Confirmar Acción</CardTitle>
                <CardDescription>
                  ¿Seguro que desea eliminar al proveedor?
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Button
                  onClick={() => {
                    handleReject(selectedCompany, selectedCompany.companyId)
                    toast({
                      description: 'Proveedor eliminado exitosamente.',
                    })
                  }}
                  variant="default"
                >
                  Confirmar
                </Button>
                <Button onClick={() => setViewModal(false)} variant="outline">
                  Cancelar
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
      {viewModal && rejectCompany && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="modal-container">
            <Card className="w-[450px] modal-card">
              <CardHeader>
                <CardTitle>Confirmar Acción</CardTitle>
                <CardDescription>
                  ¿Seguro que desea rechazar al proveedor?
                </CardDescription>
                <form
                  className="flex items-center space-x-2 pt-4"
                  ref={form}
                  onSubmit={sendRejectEmail}
                >
                  <input
                    type="hidden"
                    name="user_email"
                    value={selectedCompany.email}
                  />
                  <input
                    type="hidden"
                    name="to_name"
                    value={selectedCompany.name}
                  />
                  <textarea
                    placeholder="Redacta el mensaje para el proveedor"
                    className="h-60 flex w-full border-[#C1C9D2] border-1 py-4 pl-2 rounded-l-md rounded-r-md"
                    id="messageInput"
                    name="message"
                    onChange={(e) => {
                      setRejectCompanyMessage(e.target.value)
                      setShowErrorMessage(false)
                    }}
                  />
                  <button
                    type="submit"
                    ref={submitButton}
                    style={{ display: 'none' }}
                  />
                </form>
                {showErrorMessage && (
                  <p className="text-[#bd4e4e] my-3">
                    Por favor, escribe un mensaje para el proveedor.
                  </p>
                )}
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Button
                  onClick={() => {
                    if (rejectCompanyMessage == '') {
                      setShowErrorMessage(true)
                    } else {
                      console.log(rejectCompanyMessage)
                      handleReject(selectedCompany, selectedCompany.companyId)
                      submitButton.current.click()
                      toast({
                        description: 'Proveedor rechazado exitosamente.',
                      })
                    }
                  }}
                  variant="default"
                >
                  Confirmar
                </Button>
                <Button
                  onClick={() => {
                    setViewModal(false)
                    setRejectCompany(false)
                    setRejectCompanyMessage('')
                  }}
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
          <div className="flex justify-end w-50 pl-[800px] pb-2">
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
              <Image
                src={Logo}
                alt="Placeholder"
                width={350}
                height={350}
                className="basis-6/12 mr-[10px] rounded-l-xl object-cover border-r"
              />
              <aside className="basis-6/12 pl-[15px] pr-[25px] py-[20px] text-[14px]">
                <h2 className="text-[20px] font-bold">
                  {selectedCompany.name}
                </h2>
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
                <h3 className="font-bold">Documentos</h3>
                <div className="flex flex-wrap justify-between items-end mb-1">
                  {selectedCompany.files &&
                  selectedCompany.files.length > 3 ? (
                      <div className="mb-3">
                        <Carousel
                          showThumbs={false}
                          width={350}
                          emulateTouch={true}
                          dynamicHeight={false}
                          showArrows={true}
                          showStatus={false}
                          centerMode
                          centerSlidePercentage={33.33}
                        >
                          {selectedCompany.files
                            .filter(
                              (file: CompanyFiles) =>
                                file.fileDescription !== 'Imagen' && // Exclude image files
                                !/\.(png|jpg|jpeg)$/.test(file.fileFormat)
                            )
                            .map((file: CompanyFiles) => (
                              <a
                                key={file.companyFileId}
                                href={file.fileUrl}
                                className="min-w-[31%] no-underline text-[#333333] font-medium"
                                target="_blank"
                                onClick={() => downloadCompanyFile(selectedCompany.companyId, file.fileDescription, file.fileFormat)}
                              >
                                <div className="border px-[5px] rounded flex flex-col justify-center items-center">
                                  <FileOpenIcon color="info" className="mt-3" />
                                  <p className="my-2 text-[11px]">{file.fileDescription}</p>
                                </div>
                              </a>
                            ))}
                        </Carousel>
                      </div>
                    ) : (
                      <div className="flex flex-wrap justify-between items-end mb-3 w-full">
                        {selectedCompany.files &&
                          selectedCompany.files
                            .filter(
                              (file: CompanyFiles) =>
                                file.fileDescription !== 'Imagen' && // Exclude image files
                                !/\.(png|jpg|jpeg)$/.test(file.fileFormat)
                            )
                            .map((file: CompanyFiles) => (
                              <a
                                key={file.companyFileId}
                                href={file.fileUrl}
                                className="min-w-[31%] no-underline text-[#333333] font-medium"
                                target="_blank"
                                onClick={() => downloadCompanyFile(selectedCompany.companyId, file.fileDescription, file.fileFormat)}
                              >
                                <div className="border px-[5px] rounded flex flex-col justify-center items-center">
                                  <FileOpenIcon color="info" className="mt-3" />
                                  <p className="my-2 text-[11px]">{file.fileDescription}</p>
                                </div>
                              </a>
                            ))}
                      </div>
                    )}
                </div>
                <section className="flex justify-end">
                  <p className="text-right text-[#858585] text-[14px]">
                    Fecha que se registró:
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
                  <p className="text-sm py-[15px]">
                    {selectedCompany.companyId}
                  </p>
                </>
              ) : null}
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
                    <form 
                      className="flex items-center space-x-2"
                      ref={form}
                      onSubmit={sendAcceptEmail}
                    >

                      <input
                        type="hidden"
                        name="user_email"
                        value={selectedCompany.email}
                      />
                      <input
                        type="hidden"
                        name="to_name"
                        value={selectedCompany.name}
                      />
                      <Button
                        disabled={!checkboxChecked}
                        onClick={() => {
                          handleAccept(selectedCompany, selectedCompany.companyId)
                        }}
                        variant="default"
                      >
                        Aprobar
                      </Button>
                    </form>
                    
                    <Button
                      onClick={() => {
                        setViewModal(true)
                        setRejectCompany(true)
                      }}
                      variant="default"
                    >
                      Rechazar
                    </Button>
                    <Button
                      onClick={() => setIsModalOpen(false)}
                      variant="outline"
                    >
                      Cancelar
                    </Button>
                  </footer>
                </>
              ) : (
                <Button onClick={() => setViewModal(true)} variant="default">
                  Eliminar
                </Button>
              )}
            </section>
          </article>
        </ThemeProvider>
      </div>
    </>
  )
}
