package com.greencircle.framework.viewmodel

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider

/**
 * Fábrica personalizada de ViewModels para la creación de ViewModels.
 *
 * Esta clase se utiliza como una fábrica para crear instancias de ViewModels específicos.
 *
 * @param context El contexto de la aplicación Android necesario para la creación de algunos ViewModels.
 * @param viewModelClass La clase del ViewModel que deseas crear.
 */

class ViewModelFactory(
    private val context: Context,
    private val viewModelClass: Class<out ViewModel>
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(viewModelClass)) {
            @Suppress("UNCHECKED_CAST")
            return viewModelClass.getConstructor(Context::class.java).newInstance(context) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
