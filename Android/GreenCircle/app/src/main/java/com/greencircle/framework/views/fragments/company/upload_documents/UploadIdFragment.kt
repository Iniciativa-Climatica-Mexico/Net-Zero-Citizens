package com.greencircle.framework.views.fragments.company.upload_documents

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.greencircle.R
import com.greencircle.databinding.FragmentUploadIdBinding

/**Constructor de "UploadIdFragment"
 *
 * @constructor Incializa y crea la vista del "UploadIdFragment"
 */
class UploadIdFragment : Fragment() {
    private var _binding: FragmentUploadIdBinding? = null
    private val binding get() = _binding!!

    /**
     * Método que se llama cuando se crea la vista del fragmento de subir los documentos de identificación.
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
        _binding = FragmentUploadIdBinding.inflate(inflater, container, false)
        val root: View = binding.root

        binding.ineUpload.setOnClickListener {
            val dialogFragment = UploadDocumentDialogFragment("INE")
            dialogFragment.show(childFragmentManager, "UploadImageDialog")
        }

        initializeButton()

        return root
    }

    /**
     * Método que inicializa el botón de siguiente.
     */
    private fun initializeButton() {
        binding.nextDocumentButton.setOnClickListener {
            navigateToSubmitCurriculumFragment()
        }
    }

    /**
     * Método que navega al fragmento de subir el curriculum.
     */
    private fun navigateToSubmitCurriculumFragment() {
        val uploadCurriculumFragment = UploadCurriculumFragment()
        val transaction = requireActivity().supportFragmentManager.beginTransaction()
        transaction.replace(R.id.fragment_submit_documents_layout, uploadCurriculumFragment)
        transaction.addToBackStack(null)
        transaction.commit()
    }

    /**
     * Método que se llama cuando se destruye la vista del fragmento de subir los documentos de identificación.
     */
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}