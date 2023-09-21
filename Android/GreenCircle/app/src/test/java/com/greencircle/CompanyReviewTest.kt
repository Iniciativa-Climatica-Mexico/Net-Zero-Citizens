package com.greencircle

import com.greencircle.domain.model.CompanyReview
import com.greencircle.domain.model.UserBase
import java.sql.Timestamp
import java.util.UUID
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotEquals
import org.junit.Test

/**
 * Pruebas unitarias para la clase CompanyReview
 * @constructor Crea un objeto Companies para realizar las pruebas unitarias
 */
class CompanyReviewTest {
    /**
     * @brief
     * Test del constructor de la clase CompanyReview
     * @flags @Test
     * @since 0.0.1
     */
    @Test
    fun testCompanyReviewConstructor() {
        val timestamp = Timestamp(System.currentTimeMillis())
        val companyReview = CompanyReview(
            userId = UUID(0, 1),
            reviewId = UUID(0, 1),
            companyId = UUID(0, 1),
            reviewTitle = "Review title",
            review = "Review comment",
            rating = 5,
            createdAt = timestamp,
            updatedAt = timestamp,
            user = UserBase("Jhon", "Doe")
        )

        assertEquals(UUID(0, 1), companyReview.userId)
        assertEquals(UUID(0, 1), companyReview.reviewId)
        assertEquals(UUID(0, 1), companyReview.companyId)
        assertEquals("Review title", companyReview.reviewTitle)
        assertEquals("Review comment", companyReview.review)
        assertEquals(5, companyReview.rating)
        assertEquals(timestamp, companyReview.createdAt)
        assertEquals(timestamp, companyReview.updatedAt)
        assertEquals("Jhon", companyReview.user.firstName)
        assertEquals("Doe", companyReview.user.lastName)
    }

    /**
     * @Brief
     * Test de equals de la clase CompanyReview
     */
    @Test
    fun testCompanyReviewEquals() {
        val timestamp = Timestamp(System.currentTimeMillis())
        val companyReview1 = CompanyReview(
            userId = UUID(0, 1),
            reviewId = UUID(0, 1),
            companyId = UUID(0, 1),
            reviewTitle = "Review title",
            review = "Review comment",
            rating = 5,
            createdAt = timestamp,
            updatedAt = timestamp,
            user = UserBase("Jhon", "Doe")
        )

        val companyReview2 = CompanyReview(
            userId = UUID(0, 1),
            reviewId = UUID(0, 1),
            companyId = UUID(0, 1),
            reviewTitle = "Review title",
            review = "Review comment",
            rating = 5,
            createdAt = timestamp,
            updatedAt = timestamp,
            user = UserBase("Jhon", "Doe")
        )

        assertEquals(companyReview1, companyReview2)
    }

    /**
     * @Brief
     * Test de not equals de la clase CompanyReview
     */
    @Test
    fun testCompanyReviewsNotEquals() {
        val timestamp = Timestamp(System.currentTimeMillis())
        val companyReview1 = CompanyReview(
            userId = UUID(0, 1),
            reviewId = UUID(0, 1),
            companyId = UUID(0, 1),
            reviewTitle = "Review title",
            review = "Review comment",
            rating = 5,
            createdAt = timestamp,
            updatedAt = timestamp,
            user = UserBase("Jhon", "Doe")
        )

        val companyReview2 = CompanyReview(
            userId = UUID(0, 3),
            reviewId = UUID(0, 2),
            companyId = UUID(0, 1),
            reviewTitle = "Review title",
            review = "Review comment",
            rating = 5,
            createdAt = timestamp,
            updatedAt = timestamp,
            user = UserBase("Jhon", "Doe")
        )

        assertNotEquals(companyReview1, companyReview2)
    }

    /**
     * @brief
     * Test de hashCode de la clase CompanyReview
     */
    @Test
    fun testCompaniesHashCode() {
        val timestamp = Timestamp(System.currentTimeMillis())
        val companyReview1 = CompanyReview(
            userId = UUID(0, 1),
            reviewId = UUID(0, 1),
            companyId = UUID(0, 1),
            reviewTitle = "Review title",
            review = "Review comment",
            rating = 5,
            createdAt = timestamp,
            updatedAt = timestamp,
            user = UserBase("Jhon", "Doe")
        )

        val companyReview2 = CompanyReview(
            userId = UUID(0, 1),
            reviewId = UUID(0, 1),
            companyId = UUID(0, 1),
            reviewTitle = "Review title",
            review = "Review comment",
            rating = 5,
            createdAt = timestamp,
            updatedAt = timestamp,
            user = UserBase("Jhon", "Doe")
        )

        assertEquals(companyReview1.hashCode(), companyReview2.hashCode())
    }
}