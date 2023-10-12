import { Company } from "../company/company"

export interface Complaint {
  complaintId: string
  userId: string
  companyId: string
  name: string
  profilePicture: string
  complaintSubject: string
  complaintDescription: string
  complaintStatus: string
  createdAt: string
}

export interface CompanyComplaints extends Company {
  complaints: Complaint[]
}

export interface ComplaintsWithUser {
  companyId: string
  name: string
  profilePicture: string
  userId: string
  firstName: string
  lastName: string
  complaintId: string
  complaintSubject: string
  complaintDescription: string
  complaintStatus: string
  createdAt: string
}
