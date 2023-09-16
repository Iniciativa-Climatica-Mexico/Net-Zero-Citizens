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

/**Fragment_create_user constructor
 *
 * @constructor Initializes and returns crete_user view
 */
class CreateUserFragment : Fragment() {
    private lateinit var viewModel: CreateUserViewModel
    private var arguments = Bundle()

    /**
     * Initializes create_user fragment
     *
     * @param savedInstanceState data and state information from the Activity
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    /**
     * Inflates layout and sets up create_user view
     *
     * @param inflater Instantiates layout xml into view objects
     * @param container View that contains views
     * @param savedInstanceState data and state information from the Activity/Fragment
     * @return view create_user
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
     * Sets texts that can be displayed in the view
     *
     * @param arguments Arguments supplied when the fragment was initiated
     * @param view Inflate layout create_user
     * @return userName and userEmail as texts that can be displayed
     */
    private fun setTexts(arguments: Bundle, view:View){
        val userName = view.findViewById<TextView>(R.id.tvUserName)
        val userEmail = view.findViewById<TextView>(R.id.tvUserEmail)

        userName.text = arguments.getString("displayName")
        userEmail.text = arguments.getString("email")
    }
}
