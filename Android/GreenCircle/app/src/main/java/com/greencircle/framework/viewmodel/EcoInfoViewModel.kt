package com.greencircle.framework.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.greencircle.data.repository.EcoInfoRepository
import com.greencircle.domain.model.EcoInfo

/**
 * ViewModel para EcoInfo
 * @constructor Crea una instancia de EcoInfoViewModel
 * @property repository Repositorio de EcoInfo
 * @since 1.0.0
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