package com.greencircle

import com.greencircle.data.remote.ecoinfo.EcoInfoAPI
import com.greencircle.data.repository.EcoInfoRepository
import com.greencircle.domain.model.ecoinfo.EcoInfo
import java.sql.Time
import java.util.UUID
import kotlinx.coroutines.runBlocking
import org.junit.Assert.assertEquals
import org.junit.Test
import org.mockito.Mockito.mock
import org.mockito.Mockito.`when`

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

    @Test
    fun testGetEcoInfoFromApi() = runBlocking {
        val apiMock = mock(EcoInfoAPI::class.java)
        `when`(apiMock.getEcoInfo()).thenReturn(listOf())

        val repo = EcoInfoRepository(apiMock)
        val result = repo.getEcoInfoFromApi()

        assertEquals(result.isEmpty(), true)
    }

    @Test
    fun testEcoInfoGetApiWithMockData() = runBlocking {
        val apiMock = mock(EcoInfoAPI::class.java)
        val mockEcoInfo = EcoInfo(
            ecoinfoId = UUID.randomUUID(),
            postId = "this-is-a-post-id",
            postUrl = "https://example.com/post",
            coverImageUrl = "https://example.com/image.jpg",
            description = "Sample description",
            createdAt = Time(System.currentTimeMillis()),
            updatedAt = Time(System.currentTimeMillis())
        )
        `when`(apiMock.getEcoInfo()).thenReturn(listOf(mockEcoInfo))

        val repo = EcoInfoRepository(apiMock)
        val result = repo.getEcoInfoFromApi()

        assertEquals(listOf(mockEcoInfo), result)
    }
}