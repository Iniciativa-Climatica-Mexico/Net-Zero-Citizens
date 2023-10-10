package com.greencircle

import com.greencircle.domain.model.company.Companies
import com.greencircle.domain.model.company.CompanyImages
import com.greencircle.domain.model.status.Status
import java.sql.Timestamp
import java.util.UUID
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotEquals
import org.junit.Test

/**
 * Unit tests for the CompanyImages class
 * @constructor Creates a CompanyImages object for unit testing
 */
class CompanyImagesTest {
    @Test
    fun testCompanyImagesConstructor() {
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
            status = Status.APPROVED,
            createdAt = Timestamp(System.currentTimeMillis()),
            updatedAt = Timestamp(System.currentTimeMillis())
        )

        val companyImage = CompanyImages(
            companyImageId = UUID(0, 2),
            companyId = UUID(0, 1),
            imageUrl = "test.jpg",
            altText = "Test Image Alt Text",
        )

        assertEquals(companyImage.companyImageId, UUID(0, 2))
        assertEquals(companyImage.companyId, UUID(0, 1))
        assertEquals(companyImage.imageUrl, "test.jpg")
        assertEquals(companyImage.altText, "Test Image Alt Text")
    }

    @Test
    fun testCompanyImagesEquals() {
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
            status = Status.APPROVED,
            createdAt = Timestamp(System.currentTimeMillis()),
            updatedAt = Timestamp(System.currentTimeMillis())
        )

        val companyImage1 = CompanyImages(
            companyImageId = UUID(0, 2),
            companyId = UUID(0, 1),
            imageUrl = "test.jpg",
            altText = "Test Image Alt Text",
        )

        val companyImage2 = CompanyImages(
            companyImageId = UUID(0, 2),
            companyId = UUID(0, 1),
            imageUrl = "test.jpg",
            altText = "Test Image Alt Text",
        )

        assertEquals(companyImage1, companyImage2)
    }

    @Test
    fun testCompanyImagesNotEquals() {
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
            status = Status.APPROVED,
            createdAt = Timestamp(System.currentTimeMillis()),
            updatedAt = Timestamp(System.currentTimeMillis())
        )

        val companyImage1 = CompanyImages(
            companyImageId = UUID(0, 2),
            companyId = UUID(0, 1),
            imageUrl = "test.jpg",
            altText = "Test Image Alt Text",
        )

        val companyImage2 = CompanyImages(
            companyImageId = UUID(0, 3),
            companyId = UUID(0, 1),
            imageUrl = "another.jpg",
            altText = "Another Image Alt Text",
        )

        assertNotEquals(companyImage1, companyImage2)
    }

    @Test
    fun testCompanyImagesHashCode() {
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
            status = Status.APPROVED,
            createdAt = Timestamp(System.currentTimeMillis()),
            updatedAt = Timestamp(System.currentTimeMillis())
        )

        val companyImage1 = CompanyImages(
            companyImageId = UUID(0, 2),
            companyId = UUID(0, 1),
            imageUrl = "test.jpg",
            altText = "Test Image Alt Text",
        )

        val companyImage2 = CompanyImages(
            companyImageId = UUID(0, 2),
            companyId = UUID(0, 1),
            imageUrl = "test.jpg",
            altText = "Test Image Alt Text",
        )

        assertEquals(companyImage1.hashCode(), companyImage2.hashCode())
    }
}