interface Complaint {
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

export interface CompanyComplaints {
    companyId: string
    name: string
    profilePicture: string
    numberComplaints: number
    complaints: Complaint[]
}