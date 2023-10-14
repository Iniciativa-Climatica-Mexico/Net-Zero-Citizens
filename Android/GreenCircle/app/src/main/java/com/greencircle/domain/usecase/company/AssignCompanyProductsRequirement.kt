package com.greencircle.domain.usecase.company

import android.util.Log
import com.greencircle.data.repository.CompanyRepository

class AssignCompanyProductsRequirement {
    private val repository = CompanyRepository()

    suspend operator fun invoke(
        authToken: String,
        companyId: String,
        products: ArrayList<String>,
    ): Boolean {
        return try {
            repository.assignCompanyProducts(
                authToken,
                companyId,
                products,
            )
        } catch (e: Exception) {
            Log.e("CompanyProducts", "Could not assign company products: ${e.message}")
            false
        }
    }
}