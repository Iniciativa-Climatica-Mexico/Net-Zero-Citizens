package com.greencircle.framework.views.fragments.company.upload_documents

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.greencircle.R
import com.greencircle.databinding.FragmentUploadHeatersDocsBinding

/**Constructor de "UploadHeatersDocsFragment"
 *
 * @constructor Incializa y crea la vista del "UploadHeatersDocsFragment"
 */
class UploadHeatersDocsFragment : Fragment() {
    private var _binding: FragmentUploadHeatersDocsBinding? = null
    private val binding get() = _binding!!

    /**
     * Método que se llama cuando se crea la vista del fragmento de subir los documentos de calentadores solares.
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
        _binding = FragmentUploadHeatersDocsBinding.inflate(inflater, container, false)
        val root: View = binding.root

        binding.calentadoresMoreThanUpload.setOnClickListener {
            val dialogFragment = UploadDocumentDialogFragment(
                "Archivos presion mayor a 294k Pa",
                "Archivos presion mayor a 294k Pa",
                "pdf"
            )
            dialogFragment.arguments = arguments
            dialogFragment.show(childFragmentManager, "UploadImageDialog")
        }

        binding.calentadoresLessThanUpload.setOnClickListener {
            val dialogFragment = UploadDocumentDialogFragment(
                "Archivos presion menor a 294k Pa",
                "Archivos presion menor a 294k Pa",
                "pdf"
            )
            dialogFragment.arguments = arguments
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
            navigateToUploadCommitmentFragment()
        }
    }

    /**
     * Método que navega al fragmento de subir el la carta compromiso.
     */
    private fun navigateToUploadCommitmentFragment() {
        val uploadCommitmentFragment = UploadCommitmentFragment()
        val transaction = requireActivity().supportFragmentManager.beginTransaction()
        transaction.replace(R.id.fragment_submit_documents_layout, uploadCommitmentFragment)
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