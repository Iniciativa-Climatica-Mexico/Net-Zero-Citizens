package com.greencircle

import com.greencircle.domain.model.ReviewBase
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotEquals
import org.junit.Test

/**
 * Pruebas unitarias para la clase ReviewBase
 * @constructor Crea un objeto ReviewBase para realizar las pruebas unitarias
 */
class ReviewBaseTest {
    /**
     * @brief
     * Test del constructor de la clase ReviewBase
     * * @flags @Test
     * @since 0.0.1
     */
    @Test
    fun testReviewBaseConstructor() {
        val review = ReviewBase(
            reviewTitle = "Test review",
            review = "Test review",
            score = 5
        )

        assertEquals("Test review", review.reviewTitle)
        assertEquals("Test review", review.review)
        assertEquals(5, review.score)
    }

    /**
     * @Brief
     * Test de equals de la clase ReviewBase
     */
    @Test
    fun testCompaniesEquals() {
        val review1 = ReviewBase(
            reviewTitle = "Test review",
            review = "Test review",
            score = 5
        )

        val review2 = ReviewBase(
            reviewTitle = "Test review",
            review = "Test review",
            score = 5
        )

        assertEquals(review1, review2)
    }

    /**
     * @Brief
     * Test de not equals de la clase ReviewBase
     */
    @Test
    fun testCompaniesNotEquals() {
        val review1 = ReviewBase(
            reviewTitle = "Test review",
            review = "Test review",
            score = 5
        )

        val review2 = ReviewBase(
            reviewTitle = "Test review",
            review = "Test review",
            score = 2
        )

        assertNotEquals(review1, review2)
    }

    /**
     * @brief
     * Test de hashCode de la clase ReviewBase
     */
    @Test
    fun testCompaniesHashCode() {
        val review1 = ReviewBase(
            reviewTitle = "Test review",
            review = "Test review",
            score = 5
        )

        val review2 = ReviewBase(
            reviewTitle = "Test review",
            review = "Test review",
            score = 5
        )

        assertEquals(review1.hashCode(), review2.hashCode())
    }
}