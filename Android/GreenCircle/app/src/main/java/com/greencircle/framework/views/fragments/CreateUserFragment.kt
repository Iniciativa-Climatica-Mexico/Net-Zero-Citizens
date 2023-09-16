package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.greencircle.R
import com.greencircle.framework.viewmodel.CreateUserViewModel

/**Constructor de "CreateUserFragment"
 *
 * @constructor Incializa y crea la vista del "CreateUserFragment"
 */
class CreateUserFragment : Fragment() {
    private lateinit var viewModel: CreateUserViewModel
    private var arguments = Bundle()

    /**
     * Inicializa el "CreateUserFragment"
     *
     * @param savedInstanceState La instancia de Bundle que contiene datos previamente guardados del fragmento.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    /**
     * Método que se llama cuando se crea la vista del fragmento de crear usuario.
     *
     * @param inflater El inflador de diseño que se utiliza para inflar la vista.
     * @param container El contenedor en el que se debe colocar la vista del fragmento.
     * @param savedInstanceState La instancia de Bundle que contiene datos previamente guardados del fragmento.
     * @return La vista inflada para el fragmento.
     */
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(
            R.layout.fragment_create_user,
            container, false
        )
        viewModel = ViewModelProvider(this)[CreateUserViewModel::class.java]
        arguments = requireArguments()

        setTexts(arguments, view)

        val token: String = arguments.getString("idToken").toString()

        //Sends User token to View Model
        viewModel.googleLogin(token)

        return view
    }

    /**
     * Establece los textos en la vista con datos proporcionados en los argumentos.
     *
     * Esta función se encarga de obtener referencias a las vistas TextView dentro de la vista proporcionada y
     * establecer los textos con los valores obtenidos de los argumentos.
     *
     * @param arguments Un Bundle  que contiene la información de la cuenta de Google.
     * @param view La vista del "CreateUserFragment"
     */
    private fun setTexts(arguments: Bundle, view:View){
        val userName = view.findViewById<TextView>(R.id.tvUserName)
        val userEmail = view.findViewById<TextView>(R.id.tvUserEmail)

        userName.text = arguments.getString("displayName")
        userEmail.text = arguments.getString("email")
    }
}
