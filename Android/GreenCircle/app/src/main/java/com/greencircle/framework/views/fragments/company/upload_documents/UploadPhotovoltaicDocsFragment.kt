package com.greencircle.framework.views.fragments.company.upload_documents

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.greencircle.databinding.FragmentUploadPhotovoltaicDocsBinding
import com.greencircle.framework.views.activities.RegisterCompanyActivity

/**Constructor de "SubmitCertificationsFragment"
 *
 * @constructor Incializa y crea la vista del "SubmitCertificationsFragment"
 */
class UploadPhotovoltaicDocsFragment : Fragment() {
    private var _binding: FragmentUploadPhotovoltaicDocsBinding? = null
    private val binding get() = _binding!!
    private var arguments: Bundle? = null

    /**
     * Método que se llama cuando se crea la vista del fragmento de subir los documentos de identificación.
     *
     * @param inflater El inflador de diseño que se utiliza para inflar la vista.
     * @param container El contenedor en el que se debe colocar la vista del fragmento.
     * @param savedInstanceState La instancia de Bundle que contiene datos previamente guardados del fragmento.
     * @return La vista inflada para el fragmento.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments = requireArguments()
    }

    /**
     * Método que se llama cuando se crea la vista del fragmento de subir los documentos de sistemas fotovoltaicos.
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
        _binding = FragmentUploadPhotovoltaicDocsBinding.inflate(inflater, container, false)
        val root: View = binding.root

        initializeSubmitDocumentsButton()
        initializeNavigationButtons()

        return root
    }

    /**
     * Método que inicializa los botones de subir documentos.
     */
    private fun initializeSubmitDocumentsButton() {
        binding.certSistemasFotovoltaicosUpload.setOnClickListener {
            val dialogFragment = UploadDocumentDialogFragment(
                "Certificado de sistemas fotovoltaicos",
                "Certificado de sistemas fotovoltaicos",
                "pdf",
            )
            dialogFragment.arguments = arguments
            dialogFragment.show(childFragmentManager, "UploadImageDialog")
        }
    }

    /**
     * Método que inicializa los botones de siguiente y regresar.
     */
    private fun initializeNavigationButtons() {
        binding.nextDocumentButton.setOnClickListener {
            val solarHeaters = arguments?.getBoolean("solarHeaters")

            if (solarHeaters == true) {
                navigateToUploadHeatersDocsFragment()
            } else {
                navigateToUploadCommitmentFragment()
            }
        }

        binding.topbar.documentsBackButton.setOnClickListener {
            requireActivity().supportFragmentManager.popBackStackImmediate()
        }
    }

    /**
     * Método que navega al fragmento de subir los documentos de calentadores solares.
     */
    private fun navigateToUploadHeatersDocsFragment() {
        val uploadHeatersDocsFragment = UploadHeatersDocsFragment()

        val activity = requireActivity() as RegisterCompanyActivity
        val intent = Intent(activity, RegisterCompanyActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        activity.replaceFragment(uploadHeatersDocsFragment, arguments)
    }

    /**
     * Método que navega al fragmento de subir el la carta compromiso.
     */
    private fun navigateToUploadCommitmentFragment() {
        val uploadCommitmentFragment = UploadCommitmentFragment()

        val activity = requireActivity() as RegisterCompanyActivity
        val intent = Intent(activity, RegisterCompanyActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        activity.replaceFragment(uploadCommitmentFragment, arguments)
    }

    /**
     * Método que se llama cuando se destruye la vista del fragmento de subir los documentos de sistemas fotovoltaicos.
     */
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}