package com.greencircle

import com.greencircle.data.remote.models.Company
import org.junit.Assert.assertEquals
import org.junit.Test

class CompanyTest {
    @Test
    fun testCreateCompany() {
        val userId = "efgh-1234-hijk-5678"
        val name = "CompanyTest"
        val description = "CompanyTest description"
        val email = "company@outlook.com"
        val phone = "4423567453"
        val webPage = "https://www.companytest.com"
        val street = "CompanyTest Street"
        val streetNumber = "1234"
        val city = "Querétaro"
        val state = "Querétaro"
        val zipCode = "76904"
        val pdfCurriculumUrl = "test1"
        val pdfGuaranteeSecurityUrl = "test2"
        val pdfActaConstitutivaUrl = "test3"
        val pdfIneUrl = "test4"

        val company = Company(
            userId = userId,
            name = name,
            description = description,
            email = email,
            phone = phone,
            webPage = webPage,
            street = street,
            streetNumber = streetNumber,
            city = city,
            state = state,
            zipCode = zipCode,
            pdfCurriculumUrl = pdfCurriculumUrl,
            pdfGuaranteeSecurityUrl = pdfGuaranteeSecurityUrl,
            pdfActaConstitutivaUrl = pdfActaConstitutivaUrl,
            pdfIneUrl = pdfIneUrl
        )

        // Checar la integridad de los datos
        assertEquals(userId, company.userId)
        assertEquals(name, company.name)
        assertEquals(description, company.description)
        assertEquals(email, company.email)
        assertEquals(phone, company.phone)
        assertEquals(webPage, company.webPage)
        assertEquals(street, company.street)
        assertEquals(streetNumber, company.streetNumber)
        assertEquals(city, company.city)
        assertEquals(state, company.state)
        assertEquals(zipCode, company.zipCode)
        assertEquals(pdfCurriculumUrl, company.pdfCurriculumUrl)
        assertEquals(pdfGuaranteeSecurityUrl, company.pdfGuaranteeSecurityUrl)
        assertEquals(pdfActaConstitutivaUrl, company.pdfActaConstitutivaUrl)
        assertEquals(pdfIneUrl, company.pdfIneUrl)
    }

    @Test
    fun testEquals() {
        val userId = "efgh-1234-hijk-5678"
        val name = "CompanyTest"
        val description = "CompanyTest description"
        val email = "company@outlook.com"
        val phone = "4423567453"
        val webPage = "https://www.companytest.com"
        val street = "CompanyTest Street"
        val streetNumber = "1234"
        val city = "Querétaro"
        val state = "Querétaro"
        val zipCode = "76904"
        val pdfCurriculumUrl = "test1"
        val pdfGuaranteeSecurityUrl = "test2"
        val pdfActaConstitutivaUrl = "test3"
        val pdfIneUrl = "test4"

        val company = Company(
            userId = userId,
            name = name,
            description = description,
            email = email,
            phone = phone,
            webPage = webPage,
            street = street,
            streetNumber = streetNumber,
            city = city,
            state = state,
            zipCode = zipCode,
            pdfCurriculumUrl = pdfCurriculumUrl,
            pdfGuaranteeSecurityUrl = pdfGuaranteeSecurityUrl,
            pdfActaConstitutivaUrl = pdfActaConstitutivaUrl,
            pdfIneUrl = pdfIneUrl
        )

        val company2 = Company(
            userId = userId,
            name = name,
            description = description,
            email = email,
            phone = phone,
            webPage = webPage,
            street = street,
            streetNumber = streetNumber,
            city = city,
            state = state,
            zipCode = zipCode,
            pdfCurriculumUrl = pdfCurriculumUrl,
            pdfGuaranteeSecurityUrl = pdfGuaranteeSecurityUrl,
            pdfActaConstitutivaUrl = pdfActaConstitutivaUrl,
            pdfIneUrl = pdfIneUrl
        )

        assertEquals(company, company2)
    }
}