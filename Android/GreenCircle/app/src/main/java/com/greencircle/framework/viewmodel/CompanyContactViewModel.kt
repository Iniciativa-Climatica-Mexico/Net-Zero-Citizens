import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.data.repository.CompaniesRepository
import com.greencircle.domain.model.Companies
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class CompanyContactViewModel : ViewModel() {

    private val _companyData = MutableLiveData<Companies?>()
    val companyData: MutableLiveData<Companies?> = _companyData
    private val repository: CompaniesRepository = CompaniesRepository()

    /*
    * Inicializa el LiveData con los items de prueba para el carrusel
     */
    fun getCompanyData() {
        viewModelScope.launch(Dispatchers.IO) {
            val response = repository.getCompanyData()
            _companyData.postValue(response)
        }
    }
}
