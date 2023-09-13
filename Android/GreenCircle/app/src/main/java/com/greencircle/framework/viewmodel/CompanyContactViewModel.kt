import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import org.imaginativeworld.whynotimagecarousel.model.CarouselItem

class CompanyContactViewModel : ViewModel() {

    private val _carouselItems = MutableLiveData<List<CarouselItem>>()
    val carouselItems: LiveData<List<CarouselItem>> = _carouselItems

    init {

        val items = mutableListOf<CarouselItem>()
        items.add(
            CarouselItem(
                "https://eresloquecomes.es/wp-content/uploads/2021/11/Dorada.jpg"
            )
        )
        items.add(
            CarouselItem(
                "https://thefoodtech.com/wp-content/uploads/2023/04/atun-rojo-" +
                    "realmente-fresco-aislado-blanco.jpg"
            )
        )
        items.add(
            CarouselItem(
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Odesa_bazaa" +
                    "r%2C_Prussian_Carps.jpg/800px-Odesa_bazaar%2C_Prussian_Carps.jpg"
            )
        )
        _carouselItems.value = items
    }
}
