import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.greencircle.data.remote.CompanyAPIClient
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.imaginativeworld.whynotimagecarousel.model.CarouselItem

class CompanyContactViewModel : ViewModel() {

    private val _carouselItems = MutableLiveData<List<CarouselItem>>()
    val carouselItems: LiveData<List<CarouselItem>> = _carouselItems

    private val _selectedButtonId = MutableLiveData<Int>()
    val selectedButtonId: LiveData<Int> = _selectedButtonId

    val companyAPIClient = CompanyAPIClient()

    /*
    * Pasa el id del botón seleccionado al LiveData
     */
    fun onButtonSelected(checkedId: Int) {
        _selectedButtonId.value = checkedId
    }

    /*
    * Inicializa el LiveData con los items de prueba para el carrusel
     */
    init {

        CoroutineScope(Dispatchers.IO).launch {
            val companyData =
                companyAPIClient.getCompanyById("c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e")
            Log.d("CompanyData", companyData.toString())
            val carouselItems = mutableListOf<CarouselItem>()
            companyData?.companyImages?.forEach {
                carouselItems.add(CarouselItem(imageUrl = it.imageUrl))
            }
            _carouselItems.postValue(carouselItems)
        }
    }
}
