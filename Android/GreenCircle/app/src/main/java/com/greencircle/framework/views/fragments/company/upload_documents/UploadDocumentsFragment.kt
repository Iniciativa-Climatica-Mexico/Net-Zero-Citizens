package com.greencircle.framework.views.fragments.company.upload_documents

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.greencircle.R
import com.greencircle.databinding.FragmentUploadDocumentsBinding

/**Constructor de "UploadDocumentsFragment"
 *
 * @constructor Incializa y crea la vista del "UploadDocumentsFragment"
 */
class UploadDocumentsFragment : Fragment() {

    private var _binding: FragmentUploadDocumentsBinding? = null
    private val binding get() = _binding!!
    private var arguments = Bundle()

    private val STORAGE_PERMISSION_REQUEST_CODE = 102

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments = requireArguments()
    }

    /**
     * Método que se llama cuando se crea la vista del fragmento de subir los documentos.
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
    ): View {
        // Inflar el diseño de este fragmento
        _binding = FragmentUploadDocumentsBinding.inflate(inflater, container, false)
        val root: View = binding.root

        displaySubmitIdFragment()
        initializeBackButton()

        return root
    }

    /**
     * Método que se llama cuando se destruye la vista del fragmento de subir los documentos.
     */
    private fun initializeBackButton() {
        binding.documentsBackButton.setOnClickListener {
            if (requireActivity().supportFragmentManager.backStackEntryCount == 0) {
                requireActivity().finish()
            } else {
                requireActivity().supportFragmentManager.popBackStack()
            }
        }
    }

    /**
     * Método que muestra el fragmento de subir los documentos de identificación.
     */
    private fun displaySubmitIdFragment() {
        val uploadIdFragment = UploadIdFragment()
        uploadIdFragment.arguments = arguments
        val transaction = requireActivity().supportFragmentManager.beginTransaction()
        transaction.replace(R.id.fragment_submit_documents_layout, uploadIdFragment)
        transaction.addToBackStack(null)
        transaction.commit()
    }

    /**
     * Método que se llama cuando se destruye la vista del fragmento de subir los documentos.
     */
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}