package com.greencircle

import com.greencircle.domain.model.Companies
import com.greencircle.domain.model.Product
import com.greencircle.domain.model.Status
import java.sql.Timestamp
import java.util.UUID
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotEquals
import org.junit.Test

/**
 * Pruebas unitarias para la clase Product
 * @constructor Crea un objeto Product para realizar las pruebas unitarias
 */
class ProductTest {
    @Test
    fun testProductConstructor() {
        val company = Companies(
            companyId = UUID(0, 1),
            userId = UUID(0, 1),
            name = "Test Company",
            description = "Test Description",
            email = "company@test.com",
            phone = "+52 442 123 4567",
            webPage = null,
            street = "Test Street",
            streetNumber = 123,
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

        val product = Product(
            productId = UUID(0, 2),
            name = "Test Product",
            description = "Test Description",
            imageUrl = "test.jpg",
            imageAltText = "Test Image Alt Text",
            companies = listOf(company)
        )

        assertEquals(product.productId, UUID(0, 2))
        assertEquals(product.name, "Test Product")
        assertEquals(product.description, "Test Description")
        assertEquals(product.imageUrl, "test.jpg")
        assertEquals(product.imageAltText, "Test Image Alt Text")
        assertEquals(product.companies.size, 1)
        assertEquals(product.companies[0], company)
    }

    @Test
    fun testProductEquals() {
        val company = Companies(
            companyId = UUID(0, 1),
            userId = UUID(0, 1),
            name = "Test Company",
            description = "Test Description",
            email = "company@test.com",
            phone = "+52 442 123 4567",
            webPage = null,
            street = "Test Street",
            streetNumber = 123,
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

        val product1 = Product(
            productId = UUID(0, 2),
            name = "Test Product",
            description = "Test Description",
            imageUrl = "test.jpg",
            imageAltText = "Test Image Alt Text",
            companies = listOf(company)
        )

        val product2 = Product(
            productId = UUID(0, 2),
            name = "Test Product",
            description = "Test Description",
            imageUrl = "test.jpg",
            imageAltText = "Test Image Alt Text",
            companies = listOf(company)
        )

        assertEquals(product1, product2)
    }

    @Test
    fun testProductNotEquals() {
        val company = Companies(
            companyId = UUID(0, 1),
            userId = UUID(0, 1),
            name = "Test Company",
            description = "Test Description",
            email = "company@test.com",
            phone = "+52 442 123 4567",
            webPage = null,
            street = "Test Street",
            streetNumber = 123,
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

        val product1 = Product(
            productId = UUID(0, 2),
            name = "Test Product",
            description = "Test Description",
            imageUrl = "test.jpg",
            imageAltText = "Test Image Alt Text",
            companies = listOf(company)
        )

        val product2 = Product(
            productId = UUID(0, 3),
            name = "Another Product",
            description = "Another Description",
            imageUrl = "another.jpg",
            imageAltText = "Another Image Alt Text",
            companies = listOf(company)
        )

        assertNotEquals(product1, product2)
    }

    @Test
    fun testProductHashCode() {
        val company = Companies(
            companyId = UUID(0, 1),
            userId = UUID(0, 1),
            name = "Test Company",
            description = "Test Description",
            email = "company@test.com",
            phone = "+52 442 123 4567",
            webPage = null,
            street = "Test Street",
            streetNumber = 123,
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

        val product1 = Product(
            productId = UUID(0, 2),
            name = "Test Product",
            description = "Test Description",
            imageUrl = "test.jpg",
            imageAltText = "Test Image Alt Text",
            companies = listOf(company)
        )

        val product2 = Product(
            productId = UUID(0, 2),
            name = "Test Product",
            description = "Test Description",
            imageUrl = "test.jpg",
            imageAltText = "Test Image Alt Text",
            companies = listOf(company)
        )

        assertEquals(product1.hashCode(), product2.hashCode())
    }
}
