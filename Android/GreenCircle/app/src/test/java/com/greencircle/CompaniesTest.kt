package com.greencircle

import com.greencircle.domain.model.Companies
import com.greencircle.domain.model.Status
import java.sql.Timestamp
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotEquals
import org.junit.Assert.assertNull
import org.junit.Test

/**
 * @class CompaniesTest
 * @brief Pruebas unitarias para la clase Companies
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
            companyId = 1,
            userId = 1,
            name = "Test Company",
            description = "Test Description",
            email = "test@example.com",
            location = "Test Location",
            profilePicture = "test.jpg",
            status = status,
            phoneNumber = "+52 442 123 4567",
            website = "https://example.com",
            createdAt = timestamp,
            updatedAt = timestamp
        )

        assertEquals(1, company.companyId)
        assertEquals(1, company.userId)
        assertEquals("Test Company", company.name)
        assertEquals("Test Description", company.description)
        assertEquals("test@example.com", company.email)
        assertEquals("Test Location", company.location)
        assertEquals("test.jpg", company.profilePicture)
        assertEquals(status, company.status)
        assertEquals("+52 442 123 4567", company.phoneNumber)
        assertEquals("https://example.com", company.website)
        assertEquals(timestamp, company.createdAt)
        assertEquals(timestamp, company.updatedAt)
    }

    /**
     * @brief
     * Test de la igualdad de dos objetos de la clase Companies
     * @flags @Test
     * @since 0.0.1
     */
    @Test
    fun testEquality() {
        val timestamp = Timestamp(System.currentTimeMillis())
        val status = Status.APPROVED
        val company = Companies(
            companyId = 1,
            userId = 1,
            name = "Test Company",
            description = "Test Description",
            email = "company@email.com",
            location = "Test Location",
            profilePicture = "test.jpg",
            status = status,
            phoneNumber = "+52 442 123 4567",
            website = "https://example.com",
            createdAt = timestamp,
            updatedAt = timestamp
        )

        val company2 = Companies(
            companyId = 1,
            userId = 1,
            name = "Test Company",
            description = "Test Description",
            email = "company@email.com",
            location = "Test Location",
            profilePicture = "test.jpg",
            status = status,
            phoneNumber = "+52 442 123 4567",
            website = "https://example.com",
            createdAt = timestamp,
            updatedAt = timestamp
        )

        assertEquals(company, company2)
    }

    /**
     * @brief
     * Test de la desigualdad de dos objetos de la clase Companies
     * @flags @Test
     * @since 0.0.1
     */
    @Test
    fun testInequality() {
        val timestamp = Timestamp(System.currentTimeMillis())
        val status = Status.APPROVED
        val company = Companies(
            companyId = 1,
            userId = 1,
            name = "Test Company",
            description = "Test Description",
            email = "company@email.com",
            location = "Test Location",
            profilePicture = "test.jpg",
            status = status,
            phoneNumber = "+52 442 123 4567",
            website = "https://example.com",
            createdAt = timestamp,
            updatedAt = timestamp
        )

        val company2 = Companies(
            companyId = 2,
            userId = 2,
            name = "Test Company 2",
            description = "Test Description 2",
            email = "company2@email.com",
            location = "Test Location 2",
            profilePicture = "test2.jpg",
            status = status,
            phoneNumber = "+52 442 123 4567",
            website = "https://example.com",
            createdAt = timestamp,
            updatedAt = timestamp
        )

        assertNotEquals(company, company2)
    }

    /**
     * @brief
     * Test el hashCode de dos objetos de la clase Companies
     * @flags @Test
     * @since 0.0.1
     */
    @Test
    fun testHashCode() {
        val timestamp = Timestamp(System.currentTimeMillis())
        val status = Status.APPROVED
        val company = Companies(
            companyId = 1,
            userId = 1,
            name = "Test Company",
            description = "Test Description",
            email = "company@email.com",
            location = "Test Location",
            profilePicture = "test.jpg",
            status = status,
            phoneNumber = "+52 442 123 4567",
            website = "https://example.com",
            createdAt = timestamp,
            updatedAt = timestamp
        )

        val company2 = Companies(
            companyId = 1,
            userId = 1,
            name = "Test Company",
            description = "Test Description",
            email = "company@email.com",
            location = "Test Location",
            profilePicture = "test.jpg",
            status = status,
            phoneNumber = "+52 442 123 4567",
            website = "https://example.com",
            createdAt = timestamp,
            updatedAt = timestamp
        )

        assertEquals(company.hashCode(), company2.hashCode())
    }

    /**
     * @brief
     * Test el toString de un objeto de la clase Companies
     * @flags @Test
     * @since 0.0.1
     */
    @Test
    fun testToString() {
        val timestamp = Timestamp(System.currentTimeMillis())
        val status = Status.APPROVED
        val company = Companies(
            companyId = 1,
            userId = 1,
            name = "Test Company",
            description = "Test Description",
            email = "test@example.com",
            location = "Test Location",
            profilePicture = "test.jpg",
            status = status,
            phoneNumber = "+52 442 123 4567",
            website = "https://example.com",
            createdAt = timestamp,
            updatedAt = timestamp
        )

        val expectedString = "Companies(companyId=1, userId=1, name=Test Company" +
            ", description=Test Description, email=test@example.com, location=Test Location" +
            ", profilePicture=test.jpg, status=APPROVED, phoneNumber=+52 442 123 4567" +
            ", website=https://example.com, createdAt=$timestamp, updatedAt=$timestamp)"

        assertEquals(expectedString, company.toString())
    }

    /**
     * @brief
     * Test de nulabilidad de la propiedad profilePicture
     * @flag @Test
     * @since 0.0.1
     */
    @Test
    fun testNullability() {
        val timestamp = Timestamp(System.currentTimeMillis())
        val status = Status.APPROVED
        val company = Companies(
            companyId = 1,
            userId = 1,
            name = "Test Company",
            description = "Test Description",
            email = "company@email.com",
            location = "Test Location",
            profilePicture = null,
            status = status,
            phoneNumber = "+52 442 123 4567",
            website = null,
            createdAt = timestamp,
            updatedAt = timestamp
        )

        assertNull(company.profilePicture)
        assertNull(company.website)
    }
}