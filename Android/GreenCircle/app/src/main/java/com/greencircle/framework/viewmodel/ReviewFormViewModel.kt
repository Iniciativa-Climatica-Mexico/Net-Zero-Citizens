package com.greencircle.framework.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class ReviewFormViewModel : ViewModel() {
    private val _rating = MutableLiveData<Int>()

    val rating: LiveData<Int>
        get() = _rating

    init {
        _rating.value = 0
    }

    fun setRating(rating: Int) {
        _rating.value = rating
    }
}