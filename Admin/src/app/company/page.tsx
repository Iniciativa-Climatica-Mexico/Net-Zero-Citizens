'use client'

import React, { useState } from 'react'
import { updateCompany, UpdateCompanyInfoBody } from '@/api/v1/company' // Import the updateCompany function and UpdateCompanyInfoBody type

const CompanyPage = () => {
  const companyId = 'comp-1234-efgh-0002'
  const [status, setStatus] = useState('pending_approval') // State to track the current status

  // Function to handle the click of the "Accept" button
  const handleAccept = async () => {
    try {
      // Create an object with the updated status
      const updatedCompanyInfo: UpdateCompanyInfoBody = {
        name: '',
        description: '',
        location: '',
        profilePicture: '',
        status: 'approved', // Update the status to 'approved'
        phoneNumber: '',
        webPage: '',
      }

      // Call the updateCompany function with the updated information
      const updatedCompany = await updateCompany(companyId, updatedCompanyInfo)
    } catch (error) {
      console.error('Error accepting company:', error)
    }
  }

  // Function to handle the click of the "Reject" button
  const handleReject = async () => {
    try {
      // Create an object with the updated status
      const updatedCompanyInfo: UpdateCompanyInfoBody = {
        name: 'Company 3',
        description: 'Company 3 description',
        location: 'Company 3 location',
        profilePicture: '',
        status: 'rejected', // Update the status to 'rejected'
        phoneNumber: '8345858931',
        webPage: '',
      }

      // Call the updateCompany function with the updated information
      const updatedCompany = await updateCompany(companyId, updatedCompanyInfo)
    } catch (error) {
      console.error('Error rejecting company:', error)
    }
  }

  return (
    <div>
      <h1>Company Page</h1>
      <button onClick={handleAccept}>Accept</button>
      <br />
      <button onClick={handleReject}>Reject</button>
    </div>
  )
}

export default CompanyPage
