'use client'
// Your React component file
import React, { useEffect, useState } from 'react';
import { getPendingCompanies } from '@/api/v1/company';

function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    getPendingCompanies()
      .then((data) => {
        setCompanies(data.rows);
      })
      .catch((error) => {
        // Handle error
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Pending Companies</h2>
      <ul>
        {companies.map((company) => (
          <li key={company.companyId}>{company.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyList;
