package com.greencircle

import com.greencircle.domain.model.company.Companies
import com.greencircle.domain.model.company.CompanyProducts
import com.greencircle.domain.model.product.Product
import com.greencircle.domain.model.status.Status
import java.sql.Timestamp
import java.util.UUID
import org.junit.Assert.assertEquals
import org.junit.Test

/**
 * Pruebas unitarias para la clase CompanyProducts
 * @constructor Crea un objeto CompanyProducts para realizar las pruebas unitarias
 */
class CompanyProductsTest {
    @Test
    fun testCompanyProductsConstructor() {
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
        )

        val companyProducts = CompanyProducts(
            companyProductId = UUID(0, 1),
            productId = UUID(0, 2),
            companyId = UUID(0, 3),
            pdfProductCertificationUrl = "test.pdf",
            company = company,
            product = product
        )

        assertEquals(companyProducts.companyProductId, UUID(0, 1))
        assertEquals(companyProducts.productId, UUID(0, 2))
        assertEquals(companyProducts.companyId, UUID(0, 3))
        assertEquals(companyProducts.pdfProductCertificationUrl, "test.pdf")
        assertEquals(companyProducts.company, company)
        assertEquals(companyProducts.product, product)
    }

    @Test
    fun testHashCode() {
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
        )

        val companyProducts = CompanyProducts(
            companyProductId = UUID(0, 1),
            productId = UUID(0, 2),
            companyId = UUID(0, 3),
            pdfProductCertificationUrl = "test.pdf",
            company = company,
            product = product
        )

        val companyProducts2 = CompanyProducts(
            companyProductId = UUID(0, 1),
            productId = UUID(0, 2),
            companyId = UUID(0, 3),
            pdfProductCertificationUrl = "test.pdf",
            company = company,
            product = product
        )

        assertEquals(companyProducts.hashCode(), companyProducts2.hashCode())
    }

    @Test
    fun testEquals() {
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
        )

        val companyProducts = CompanyProducts(
            companyProductId = UUID(0, 1),
            productId = UUID(0, 2),
            companyId = UUID(0, 3),
            pdfProductCertificationUrl = "test.pdf",
            company = company,
            product = product
        )

        val companyProducts2 = CompanyProducts(
            companyProductId = UUID(0, 1),
            productId = UUID(0, 2),
            companyId = UUID(0, 3),
            pdfProductCertificationUrl = "test.pdf",
            company = company,
            product = product
        )

        assertEquals(companyProducts, companyProducts2)
    }

    @Test
    fun testNotEquals() {
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
        )

        val companyProducts = CompanyProducts(
            companyProductId = UUID(0, 1),
            productId = UUID(0, 2),
            companyId = UUID(0, 3),
            pdfProductCertificationUrl = "test.pdf",
            company = company,
            product = product
        )

        val companyProducts2 = CompanyProducts(
            companyProductId = UUID(0, 3),
            productId = UUID(0, 4),
            companyId = UUID(0, 5),
            pdfProductCertificationUrl = "test.pdf",
            company = company,
            product = product
        )
    }
}