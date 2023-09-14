package com.greencircle.framework.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.greencircle.data.repository.EcoInfoRepository

class EcoInfoViewModelFactory(private val repository: EcoInfoRepository) :
    ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(EcoInfoViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return EcoInfoViewModel(repository) as T
        }

        throw IllegalArgumentException("Unknown ViewModel class")
    }
}