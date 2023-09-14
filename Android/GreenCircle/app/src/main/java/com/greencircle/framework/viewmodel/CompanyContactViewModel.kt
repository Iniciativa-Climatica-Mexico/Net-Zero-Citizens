import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import org.imaginativeworld.whynotimagecarousel.model.CarouselItem

class CompanyContactViewModel : ViewModel() {

    private val _carouselItems = MutableLiveData<List<CarouselItem>>()
    val carouselItems: LiveData<List<CarouselItem>> = _carouselItems

    private val _selectedButtonId = MutableLiveData<Int>()
    val selectedButtonId: LiveData<Int> = _selectedButtonId

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

        val items = mutableListOf<CarouselItem>()
        items.add(
            CarouselItem(
                "https://www.labodegasolar.com/cdn/shop/articles/placas-solares-tejado-" +
                    "thinkstock-getty-1662535982.jpg?v=1667323017"
            )
        )
        items.add(
            CarouselItem(
                "https://www.viviendasaludable.es/wp-content/uploads/2021/09/Paneles-" +
                    "Solares-en-casa.jpg"
            )
        )
        items.add(
            CarouselItem(
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSid3sii1nL-4PaHZE_" +
                    "Ksa9HRslIsrgXPlizHbu7AKNM0KAee8FOw38iFNgec_mk_buf_M&usqp=CAU"
            )
        )
        _carouselItems.value = items
    }
}
