package com.greencircle

import com.google.gson.Gson
import com.greencircle.domain.model.CompanySummary
import org.junit.Test

class CompanySummaryTest {
    @Test
    fun validCompanySummary() {
        val json = """
            {
                "companyId": "e4a3f0a0-0b1a-4b1a-8b1a-0b1a0b1a0b1a",
                "name": "Company 1",
                "city": "City 1",
                "state": "State 1",
                "score": 4.5,
                "profilePicture": "https://picsum.photos/200/300"
            }
        """.trimIndent()
        val companySummary = Gson().fromJson(json, CompanySummary::class.java)
        assert(companySummary != null)
        assert(companySummary.companyId.toString() == "e4a3f0a0-0b1a-4b1a-8b1a-0b1a0b1a0b1a")
        assert(companySummary.name == "Company 1")
        assert(companySummary.city == "City 1")
        assert(companySummary.state == "State 1")
        assert(companySummary.rating == 4.5f)
        assert(companySummary.profilePicture == "https://picsum.photos/200/300")
    }
}
