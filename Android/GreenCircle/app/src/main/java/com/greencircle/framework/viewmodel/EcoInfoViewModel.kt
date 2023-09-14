package com.greencircle.framework.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.greencircle.domain.model.EcoInfo
import java.sql.Time
import java.util.UUID

class EcoInfoViewModel : ViewModel() {
    private val _ecoInfos = MutableLiveData<List<EcoInfo>>()
    val ecoInfos: LiveData<List<EcoInfo>> get() = _ecoInfos

    fun fetchEcoInfos() {
        val ecoInfoList = listOf(
            EcoInfo(
                ecoinfoId = UUID.randomUUID(),
                postId = "1",
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "https://i1.sndcdn.com/avatars-8zXkV8ACe3yad2qj-OgAarw-t240x240.jpg",
                description = "TA DA! THIS IS A CAT THAT COMMITED WAR CRIMES",
                Time(0),
                Time(0),
            ),
            EcoInfo(
                ecoinfoId = UUID.randomUUID(),
                postId = "2",
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "https://i1.sndcdn.com/avatars-8zXkV8ACe3yad2qj-OgAarw-t240x240.jpg",
                description = "TA DA! THIS IS A CAT THAT COMMITED WAR CRIMES",
                Time(0),
                Time(0),
            ),
            EcoInfo(
                ecoinfoId = UUID.randomUUID(),
                postId = "2",
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "https://i1.sndcdn.com/avatars-8zXkV8ACe3yad2qj-OgAarw-t240x240.jpg",
                description = "TA DA! THIS IS A CAT THAT COMMITED WAR CRIMES",
                Time(0),
                Time(0),
            ),
            EcoInfo(
                ecoinfoId = UUID.randomUUID(),
                postId = "2",
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "https://i1.sndcdn.com/avatars-8zXkV8ACe3yad2qj-OgAarw-t240x240.jpg",
                description = "TA DA! THIS IS A CAT THAT COMMITED WAR CRIMES",
                Time(0),
                Time(0),
            ),
        )

        _ecoInfos.value = ecoInfoList
    }
}