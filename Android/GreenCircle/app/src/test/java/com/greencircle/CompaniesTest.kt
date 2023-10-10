package com.greencircle

import com.greencircle.domain.model.company.Companies
import com.greencircle.domain.model.status.Status
import java.sql.Timestamp
import java.util.UUID
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotEquals
import org.junit.Assert.assertNull
import org.junit.Test

/**
 * Pruebas unitarias para la clase Companies
 * @constructor Crea un objeto Companies para realizar las pruebas unitarias
 */
class CompaniesTest {
    /**
     * @brief
     * Test del constructor de la clase Companies
     * @flags @Test
     * @since 0.0.1
     */
    @Test
    fun testCompaniesConstructor() {
        val timestamp = Timestamp(System.currentTimeMillis())
        val status = Status.APPROVED
        val company = Companies(
            companyId = UUID(0, 1),
            userId = UUID(0, 1),
            name = "Test Company",
            description = "Test Description",
            email = "company@test.com",
            phone = "+52 442 123 4567",
            webPage = null,
            street = "Test Street",
            streetNumber = "123",
            city = "Test City",
            state = "Test State",
            zipCode = 12345,
            latitude = 19.4326,
            longitude = -99.1332,
            profilePicture = "test.jpg",
            pdfCurriculumUrl = "test.pdf",
            pdfDicCdmxUrl = null,
            pdfPeeFideUrl = null,
            pdfGuaranteeSecurityUrl = "test.pdf",
            pdfActaConstituyentesUrl = "test.pdf",
            pdfIneUrl = "test.pdf",
            status = status,
            createdAt = timestamp,
            updatedAt = timestamp
        )

        assertEquals(UUID(0, 1), company.companyId)
        assertEquals(UUID(0, 1), company.userId)
        assertEquals("Test Company", company.name)
        assertEquals("Test Description", company.description)
        assertEquals("company@test.com", company.email)
        assertEquals("+52 442 123 4567", company.phone)
        assertNull(company.webPage)
        assertEquals("Test Street", company.street)
        assertEquals("123", company.streetNumber)
        assertEquals("Test City", company.city)
        assertEquals("Test State", company.state)
        assertEquals(12345, company.zipCode)
        assertEquals(19.4326, company.latitude, 0.0)
        assertEquals(-99.1332, company.longitude, 0.0)
        assertEquals("test.jpg", company.profilePicture)
        assertEquals("test.pdf", company.pdfCurriculumUrl)
        assertNull(company.pdfDicCdmxUrl)
        assertNull(company.pdfPeeFideUrl)
        assertEquals("test.pdf", company.pdfGuaranteeSecurityUrl)
        assertEquals("test.pdf", company.pdfActaConstituyentesUrl)
        assertEquals("test.pdf", company.pdfIneUrl)
        assertEquals(status, company.status)
        assertEquals(timestamp, company.createdAt)
        assertEquals(timestamp, company.updatedAt)
    }

    /**
     * @Brief
     * Test de equals de la clase Companies
     */
    @Test
    fun testCompaniesEquals() {
        val timestamp = Timestamp(System.currentTimeMillis())
        val status = Status.APPROVED
        val company = Companies(
            companyId = UUID(0, 1),
            userId = UUID(0, 1),
            name = "Test Company",
            description = "Test Description",
            email = "company@test.com",
            phone = "+52 442 123 4567",
            webPage = null,
            street = "Test Street",
            streetNumber = "123",
            city = "Test City",
            state = "Test State",
            zipCode = 12345,
            latitude = 19.4326,
            longitude = -99.1332,
            profilePicture = "test.jpg",
            pdfCurriculumUrl = "test.pdf",
            pdfDicCdmxUrl = null,
            pdfPeeFideUrl = null,
            pdfGuaranteeSecurityUrl = "test.pdf",
            pdfActaConstituyentesUrl = "test.pdf",
            pdfIneUrl = "test.pdf",
            status = status,
            createdAt = timestamp,
            updatedAt = timestamp
        )

        val company2 = Companies(
            companyId = UUID(0, 1),
            userId = UUID(0, 1),
            name = "Test Company",
            description = "Test Description",
            email = "company@test.com",
            phone = "+52 442 123 4567",
            webPage = null,
            street = "Test Street",
            streetNumber = "123",
            city = "Test City",
            state = "Test State",
            zipCode = 12345,
            latitude = 19.4326,
            longitude = -99.1332,
            profilePicture = "test.jpg",
            pdfCurriculumUrl = "test.pdf",
            pdfDicCdmxUrl = null,
            pdfPeeFideUrl = null,
            pdfGuaranteeSecurityUrl = "test.pdf",
            pdfActaConstituyentesUrl = "test.pdf",
            pdfIneUrl = "test.pdf",
            status = status,
            createdAt = timestamp,
            updatedAt = timestamp
        )

        assertEquals(company, company2)
    }

    /**
     * @Brief
     * Test de not equals de la clase Companies
     */
    @Test
    fun testCompaniesNotEquals() {
        val timestamp = Timestamp(System.currentTimeMillis())
        val status = Status.APPROVED
        val company = Companies(
            companyId = UUID(0, 1),
            userId = UUID(0, 1),
            name = "Test Company",
            description = "Test Description",
            email = "company@test.com",
            phone = "+52 442 123 4567",
            webPage = null,
            street = "Test Street",
            streetNumber = "123",
            city = "Test City",
            state = "Test State",
            zipCode = 12345,
            latitude = 19.4326,
            longitude = -99.1332,
            profilePicture = "test.jpg",
            pdfCurriculumUrl = "test.pdf",
            pdfDicCdmxUrl = null,
            pdfPeeFideUrl = null,
            pdfGuaranteeSecurityUrl = "test.pdf",
            pdfActaConstituyentesUrl = "test.pdf",
            pdfIneUrl = "test.pdf",
            status = status,
            createdAt = timestamp,
            updatedAt = timestamp
        )

        val company2 = Companies(
            companyId = UUID(0, 3),
            userId = UUID(0, 2),
            name = "Test Company",
            description = "Test Description",
            email = "company@test.com",
            phone = "+52 442 123 4567",
            webPage = null,
            street = "Test Street",
            streetNumber = "123",
            city = "Test City",
            state = "Test State",
            zipCode = 12345,
            latitude = 19.4326,
            longitude = -99.1332,
            profilePicture = "test.jpg",
            pdfCurriculumUrl = "test.pdf",
            pdfDicCdmxUrl = null,
            pdfPeeFideUrl = null,
            pdfGuaranteeSecurityUrl = "test.pdf",
            pdfActaConstituyentesUrl = "test.pdf",
            pdfIneUrl = "test.pdf",
            status = status,
            createdAt = timestamp,
            updatedAt = timestamp
        )

        assertNotEquals(company, company2)
    }

    /**
     * @brief
     * Test de hashCode de la clase Companies
     */
    @Test
    fun testCompaniesHashCode() {
        val timestamp = Timestamp(System.currentTimeMillis())
        val status = Status.APPROVED
        val company = Companies(
            companyId = UUID(0, 1),
            userId = UUID(0, 1),
            name = "Test Company",
            description = "Test Description",
            email = "company@test.com",
            phone = "+52 442 123 4567",
            webPage = null,
            street = "Test Street",
            streetNumber = "123",
            city = "Test City",
            state = "Test State",
            zipCode = 12345,
            latitude = 19.4326,
            longitude = -99.1332,
            profilePicture = "test.jpg",
            pdfCurriculumUrl = "test.pdf",
            pdfDicCdmxUrl = null,
            pdfPeeFideUrl = null,
            pdfGuaranteeSecurityUrl = "test.pdf",
            pdfActaConstituyentesUrl = "test.pdf",
            pdfIneUrl = "test.pdf",
            status = status,
            createdAt = timestamp,
            updatedAt = timestamp
        )

        val company2 = Companies(
            companyId = UUID(0, 1),
            userId = UUID(0, 1),
            name = "Test Company",
            description = "Test Description",
            email = "company@test.com",
            phone = "+52 442 123 4567",
            webPage = null,
            street = "Test Street",
            streetNumber = "123",
            city = "Test City",
            state = "Test State",
            zipCode = 12345,
            latitude = 19.4326,
            longitude = -99.1332,
            profilePicture = "test.jpg",
            pdfCurriculumUrl = "test.pdf",
            pdfDicCdmxUrl = null,
            pdfPeeFideUrl = null,
            pdfGuaranteeSecurityUrl = "test.pdf",
            pdfActaConstituyentesUrl = "test.pdf",
            pdfIneUrl = "test.pdf",
            status = status,
            createdAt = timestamp,
            updatedAt = timestamp
        )

        assertEquals(company.hashCode(), company2.hashCode())
    }
}