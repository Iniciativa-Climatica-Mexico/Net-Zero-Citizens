package com.greencircle.framework.views.fragments.company.upload_documents

import UploadDocumentDialogFragment
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.greencircle.R
import com.greencircle.databinding.FragmentUploadCertificationsBinding

/**Constructor de "UploadCertificationsFragment"
 *
 * @constructor Incializa y crea la vista del "UploadCertificationsFragment"
 */
class UploadCertificationsFragment : Fragment() {
    private var _binding: FragmentUploadCertificationsBinding? = null
    private val binding get() = _binding!!

    /**
     * Método que se llama cuando se crea la vista del fragmento de subir los documentos de certificaciones.
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
        _binding = FragmentUploadCertificationsBinding.inflate(inflater, container, false)
        val root: View = binding.root

        binding.dirInstaladoresCdmxUpload.setOnClickListener{
            val dialogFragment = UploadDocumentDialogFragment(
                "Directorio de instaladores certificados de CDMX",
                "Directorio de instaladores certificados de CDMX",
                "pdf"
            )
            dialogFragment.arguments = arguments
            dialogFragment.show(childFragmentManager, "UploadImageDialog")
        }

        binding.fideUpload.setOnClickListener{
            val dialogFragment = UploadDocumentDialogFragment(
                "Padron de empresas especializadas FIDE",
                "Padron de empresas especializadas FIDE",
                "pdf"
            )
            dialogFragment.arguments = arguments
            dialogFragment.show(childFragmentManager, "UploadImageDialog")
        }

        initializeButton()

        return root
    }

    /**
     * Método que inicializa el botón de "Siguiente" para navegar al fragmento de subir los documentos de fotovoltaica.
     */
    private fun initializeButton() {
        binding.nextDocumentButton.setOnClickListener {
            navigateToUploadPhotovoltaicDocsFragment()
        }

        binding.nextNoDocumentsButton.setOnClickListener {
            navigateToUploadPhotovoltaicDocsFragment()
        }
    }

    /**
     * Método que navega al fragmento de subir los documentos de sistemas fotovoltaicos.
     */
    private fun navigateToUploadPhotovoltaicDocsFragment() {
        val uploadPhotovoltaicDocsFragment = UploadPhotovoltaicDocsFragment()
        val transaction = requireActivity().supportFragmentManager.beginTransaction()
        transaction.replace(R.id.fragment_submit_documents_layout, uploadPhotovoltaicDocsFragment)
        transaction.addToBackStack(null)
        transaction.commit()
    }

    /**
     * Método que destruye la vista del fragmento.
     */
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}