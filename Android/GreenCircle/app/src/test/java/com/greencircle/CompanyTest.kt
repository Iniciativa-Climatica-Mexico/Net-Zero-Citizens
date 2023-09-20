package com.greencircle

import com.greencircle.data.remote.models.Company
import java.util.UUID
import org.junit.Assert.assertEquals
import org.junit.Test

/**
 * Clase de prueba para la funcionalidad relacionada con la clase [Company].
 *
 * Esta clase de prueba contiene métodos de prueba para evaluar la creación de objetos [Company] y la igualdad entre ellos.
 */
class CompanyTest {

    /**
     * Prueba la creación de un objeto [Company] y verifica la integridad de los datos.
     */
    @Test
    fun testCreateCompanyInstantiation() {
        val userId: UUID = UUID.randomUUID()
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

    /**
     * Prueba la igualdad entre dos objetos [Company] con los mismos valores.
     */
    @Test
    fun testEquals() {
        val userId: UUID = UUID.randomUUID()
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