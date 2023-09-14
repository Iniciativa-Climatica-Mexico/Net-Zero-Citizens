package com.greencircle.framework.viewmodel

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.greencircle.data.repository.EcoInfoRepository
import com.greencircle.domain.model.EcoInfo

/**
 * ViewModel para EcoInfo
 */
class EcoInfoViewModel(private val repository: EcoInfoRepository) : ViewModel() {
    private val _ecoInfos = MutableLiveData<List<EcoInfo>>()
    val ecoInfos: LiveData<List<EcoInfo>> get() = _ecoInfos

    /**
     * Obtiene la lista de EcoInfo del repositorio
     */
    suspend fun fetchEcoInfos() {
        val ecoInfoList = repository.getEcoInfoFromApi()

        _ecoInfos.value = ecoInfoList
    }
}