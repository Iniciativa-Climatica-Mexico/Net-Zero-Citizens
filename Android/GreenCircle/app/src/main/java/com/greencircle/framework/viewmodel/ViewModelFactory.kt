import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.greencircle.framework.viewmodel.LoginViewModel

/**
 * Fábrica de ViewModels personalizada para la creación de ViewModels.
 *
 * Esta clase se utiliza como una fábrica para crear instancias de ViewModels específicos, incluyendo el [LoginViewModel].
 *
 * @param context El contexto de la aplicación Android necesario para la creación de algunos ViewModels.
 */
class ViewModelFactory(private val context: Context) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(LoginViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return LoginViewModel(context) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}