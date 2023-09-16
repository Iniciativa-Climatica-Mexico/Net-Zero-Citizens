package com.greencircle

import com.greencircle.domain.model.EcoInfo
import java.sql.Time
import java.util.UUID
import org.junit.Assert.assertEquals
import org.junit.Test

class EcoInfoTest {
    @Test
    fun testEcoInfoInstantiation() {
        val ecoinfoId = UUID.randomUUID()
        val postId = "this-is-a-post-id"
        val coverImageUrl = "https://example.com/image.jpg"
        val description = "Sample description"
        val createdAt = Time(System.currentTimeMillis())
        val updatedAt = Time(System.currentTimeMillis())

        val ecoInfo = EcoInfo(
            ecoinfoId = ecoinfoId,
            postId = postId,
            postUrl = "https://example.com/post",
            coverImageUrl = coverImageUrl,
            description = description,
            createdAt = createdAt,
            updatedAt = updatedAt
        )

        // Check data integrity
        assertEquals(ecoinfoId, ecoInfo.ecoinfoId)
        assertEquals(postId, ecoInfo.postId)
        assertEquals(coverImageUrl, ecoInfo.coverImageUrl)
        assertEquals(description, ecoInfo.description)
        assertEquals(createdAt, ecoInfo.createdAt)
        assertEquals(updatedAt, ecoInfo.updatedAt)
    }

    @Test
    fun testEquals() {
        val ecoinfoId = UUID.randomUUID()
        val postId = "this-is-a-post-id"
        val coverImageUrl = "https://example.com/image.jpg"
        val description = "Sample description"
        val createdAt = Time(System.currentTimeMillis())
        val updatedAt = Time(System.currentTimeMillis())

        val ecoInfo = EcoInfo(
            ecoinfoId = ecoinfoId,
            postId = postId,
            postUrl = "https://example.com/post",
            coverImageUrl = coverImageUrl,
            description = description,
            createdAt = createdAt,
            updatedAt = updatedAt
        )

        val ecoInfo2 = EcoInfo(
            ecoinfoId = ecoinfoId,
            postId = postId,
            postUrl = "https://example.com/post",
            coverImageUrl = coverImageUrl,
            description = description,
            createdAt = createdAt,
            updatedAt = updatedAt
        )

        assertEquals(ecoInfo, ecoInfo2)
    }
}