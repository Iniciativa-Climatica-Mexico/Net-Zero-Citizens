package com.greencircle.framework.viewmodel.splashscreen

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.utils.Constants
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

/**
 * ViewModel para la creación de la splashscreen.
 *
 * Esta clase ViewModel se utiliza para gestionar la duración de la splashscreen que se
 * muestra al iniciar la app.
 */
class SplashscreenViewModel : ViewModel() {
    val finishedLoading = MutableLiveData<Boolean>()

    /**
     * Gestiona la duración de nuestro splashscreen.
     *
     */
    fun onCreate() {
        finishedLoading.postValue(false)
        viewModelScope.launch {
            delay(Constants.SPLASHSCREEN_DURATION)
            finishedLoading.postValue(true)
        }
    }
}