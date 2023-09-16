package com.greencircle.domain.usecase

import com.greencircle.data.repository.SurveyRepository
import com.greencircle.domain.model.survey.Survey

class SurveyPendingRequirement {
    private val repository = SurveyRepository()

    suspend operator fun invoke(): Survey? =
        repository.getSurveyPending()
}
