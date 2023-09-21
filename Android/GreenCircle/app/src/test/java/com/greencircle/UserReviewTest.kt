package com.greencircle

import com.greencircle.domain.model.UserReview
import java.sql.Timestamp
import java.util.UUID
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotEquals
import org.junit.Test

/**
 * Pruebas unitarias para la la clase UserReview
 * @constructor Crea un objeto Companies para realizar las pruebas unitarias
 */

class UserReviewTest {
    /**
     * @brief
     * Test del constructor de la clase UserReview
     * @flags @Test
     * @since 0.0.1
     */
    @Test
    fun testUserReviewConstructor() {
        val timestamp = Timestamp(System.currentTimeMillis())
        val userReview = UserReview(
            reviewId = UUID(0, 1),
            userId = UUID(0, 1),
            companyId = UUID(0, 1),
            review = "review",
            reviewTitle = "reviewTitle",
            score = 5,
            createdAt = timestamp,
            updatedAt = timestamp
        )

        assertEquals(UUID(0, 1), userReview.reviewId)
        assertEquals(UUID(0, 1), userReview.userId)
        assertEquals(UUID(0, 1), userReview.companyId)
        assertEquals("review", userReview.review)
        assertEquals("reviewTitle", userReview.reviewTitle)
        assertEquals(5, userReview.score)
        assertEquals(timestamp, userReview.createdAt)
        assertEquals(timestamp, userReview.updatedAt)
    }

    /**
     * @Brief
     * Test de equals de la clase CompanyReview
     */
    @Test
    fun testUserReviewEquals() {
        val timestamp = Timestamp(System.currentTimeMillis())
        val userReview1 = UserReview(
            reviewId = UUID(0, 1),
            userId = UUID(0, 1),
            companyId = UUID(0, 1),
            review = "review",
            reviewTitle = "reviewTitle",
            score = 5,
            createdAt = timestamp,
            updatedAt = timestamp
        )
        val userReview2 = UserReview(
            reviewId = UUID(0, 1),
            userId = UUID(0, 1),
            companyId = UUID(0, 1),
            review = "review",
            reviewTitle = "reviewTitle",
            score = 5,
            createdAt = timestamp,
            updatedAt = timestamp
        )
        assertEquals(userReview1, userReview2)
    }

    /**
     * @Brief
     * Test de not equals de la clase CompanyReview
     */
    @Test
    fun testUserReviewNotEquals() {
        val timestamp = Timestamp(System.currentTimeMillis())
        val userReview1 = UserReview(
            reviewId = UUID(0, 1),
            userId = UUID(0, 1),
            companyId = UUID(0, 1),
            review = "review",
            reviewTitle = "reviewTitle",
            score = 5,
            createdAt = timestamp,
            updatedAt = timestamp
        )
        val userReview2 = UserReview(
            reviewId = UUID(0, 2),
            userId = UUID(0, 2),
            companyId = UUID(0, 2),
            review = "review2",
            reviewTitle = "reviewTitle2",
            score = 4,
            createdAt = timestamp,
            updatedAt = timestamp
        )
        assertNotEquals(userReview1, userReview2)
    }

    /**
     * @brief
     * Test de hashCode de la clase CompanyReview
     */
    @Test
    fun testUserReviewHashCode() {
        val timestamp = Timestamp(System.currentTimeMillis())
        val userReview1 = UserReview(
            reviewId = UUID(0, 1),
            userId = UUID(0, 1),
            companyId = UUID(0, 1),
            review = "review",
            reviewTitle = "reviewTitle",
            score = 5,
            createdAt = timestamp,
            updatedAt = timestamp
        )
        val userReview2 = UserReview(
            reviewId = UUID(0, 1),
            userId = UUID(0, 1),
            companyId = UUID(0, 1),
            review = "review",
            reviewTitle = "reviewTitle",
            score = 5,
            createdAt = timestamp,
            updatedAt = timestamp
        )
        assertEquals(userReview1.hashCode(), userReview2.hashCode())
    }
}