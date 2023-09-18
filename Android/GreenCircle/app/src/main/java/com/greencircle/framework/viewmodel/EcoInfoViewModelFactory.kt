package com.greencircle.framework.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.greencircle.data.repository.EcoInfoRepository

/**
 * Patrón de diseño Factory para crear instancias de EcoInfoViewModel
 * @constructor Crea una instancia de EcoInfoViewModelFactory
 * @property repository Repositorio de EcoInfo
 * @since 1.0.0
 */
class EcoInfoViewModelFactory(private val repository: EcoInfoRepository) :
    ViewModelProvider.Factory {

    /**
     * Una implementación personalizada de [ViewModelProvider.Factory]
     * para crear instancias de [ViewModel]
     * @param modelClass: Class<T> T Un parámetro de tipo que debe ser un subtipo de [ViewModel].
     * @return T Una instancia de [ViewModel]
     * @throw IllegalArgumentException Si el parámetro de tipo no es un subtipo de [ViewModel]
     */
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(EcoInfoViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST") return EcoInfoViewModel(repository) as T
        }

        throw IllegalArgumentException("Unknown ViewModel class")
    }
}