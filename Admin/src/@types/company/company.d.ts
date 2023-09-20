export interface Company {
  companyId: string
  name: string
  profilePicture: string
  state: string
  city: string
  street: string
  zipCode: string
  status: 'approved' | 'pending_approval' | 'rejected'
  email: string
  phone: string
  webPage: string
  description: string
  createdAt: string
  streetNumber: string
  pdfCurriculumURL: string
  pdfDicCdmxURL: string
  pdfPeeFideURL: string
  pdfGuaranteeSecurityURL: string
  pdfActaConstitutivaURL: string
  pdfINEURL: string
}
