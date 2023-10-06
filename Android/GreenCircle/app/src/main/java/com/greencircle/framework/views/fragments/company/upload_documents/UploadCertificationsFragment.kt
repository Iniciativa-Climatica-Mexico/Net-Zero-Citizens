package com.greencircle.framework.views.fragments.company.upload_documents

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.greencircle.R
import com.greencircle.databinding.FragmentUploadCertificationsBinding
import com.greencircle.domain.model.company.files.FileDescription
import com.greencircle.domain.model.company.files.FileFormat
import com.greencircle.framework.views.activities.RegisterCompanyActivity

/**Constructor de "UploadCertificationsFragment"
 *
 * @constructor Incializa y crea la vista del "UploadCertificationsFragment"
 */
class UploadCertificationsFragment : Fragment(), UploadDocumentDialogFragment.UploadDialogListener {
    private var _binding: FragmentUploadCertificationsBinding? = null
    private val binding get() = _binding!!
    private var arguments: Bundle? = null
    private var submittingFile: FileDescription? = null

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

        initializeSubmitDocumentsButton()
        initializeNavigationButtons()

        return root
    }

    /**
     * Método que inicializa los botones de subir documentos.
     */
    private fun initializeSubmitDocumentsButton() {
        binding.dirInstaladoresCdmxUpload.setOnClickListener {
            val dialogFragment = UploadDocumentDialogFragment(
                "Directorio de instaladores certificados de CDMX",
                FileDescription.DIRECTORIO_DE_INSTALADORES_CERTIFICADOS_DE_CDMX,
                FileFormat.PDF,
            )
            submittingFile = FileDescription.DIRECTORIO_DE_INSTALADORES_CERTIFICADOS_DE_CDMX
            dialogFragment.arguments = arguments
            dialogFragment.uploadDialogListener = this
            dialogFragment.show(childFragmentManager, "UploadImageDialog")
        }

        binding.fideUpload.setOnClickListener {
            val dialogFragment = UploadDocumentDialogFragment(
                "Padron de empresas especializadas FIDE",
                FileDescription.PADRON_DE_EMPRESAS_ESPECIALIZADAS_FIDE,
                FileFormat.PDF
            )
            submittingFile = FileDescription.PADRON_DE_EMPRESAS_ESPECIALIZADAS_FIDE
            dialogFragment.arguments = arguments
            dialogFragment.show(childFragmentManager, "UploadImageDialog")
        }
    }

    /**
     * Método que inicializa los botones de siguiente y regresar.
     */
    private fun initializeNavigationButtons() {
        binding.nextDocumentButton.setOnClickListener {
            val photovoltaics = arguments?.getBoolean("photovoltaics")
            val solarHeaters = arguments?.getBoolean("solarHeaters")

            if (photovoltaics == false && solarHeaters == true) {
                navigateToUploadHeatersDocsFragment()
            } else {
                navigateToUploadPhotovoltaicDocsFragment()
            }
        }

        binding.topbar.documentsBackButton.setOnClickListener {
            requireActivity().supportFragmentManager.popBackStackImmediate()
        }
    }

    /**
     * Método que navega al fragmento de subir los documentos de sistemas fotovoltaicos.
     */
    private fun navigateToUploadPhotovoltaicDocsFragment() {
        val uploadPhotovoltaicDocsFragment = UploadPhotovoltaicDocsFragment()

        val activity = requireActivity() as RegisterCompanyActivity
        val intent = Intent(
            activity,
            RegisterCompanyActivity::class.java
        )
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        activity.replaceFragment(uploadPhotovoltaicDocsFragment, arguments)
    }

    private fun navigateToUploadHeatersDocsFragment() {
        val uploadHeatersDocsFragment = UploadHeatersDocsFragment()

        val activity = requireActivity() as RegisterCompanyActivity
        val intent = Intent(activity, RegisterCompanyActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        activity.replaceFragment(uploadHeatersDocsFragment, arguments)
    }

    /**
     * Método que destruye la vista del fragmento.
     */
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    /**
     * Método que se llama cuando se sube un archivo.
     *
     * @param fileName El nombre del archivo que se subió.
     */
    override fun onFileUploaded(fileName: String) {
        when (submittingFile) {
            FileDescription.DIRECTORIO_DE_INSTALADORES_CERTIFICADOS_DE_CDMX -> {
                binding.dirCdmxUploadTitle.text = fileName
                binding.cdmxFileSizeText.text = getString(R.string.change_file)
                binding.cdmxChevron.visibility = View.GONE
                binding.cdmxCheck.visibility = View.VISIBLE
            }

            FileDescription.PADRON_DE_EMPRESAS_ESPECIALIZADAS_FIDE -> {
                binding.fideUploadTitle.text = fileName
                binding.fideFileSizeText.text = getString(R.string.change_file)
                binding.fideChevron.visibility = View.GONE
                binding.fideCheck.visibility = View.VISIBLE
            }

            else -> {}
        }
    }
}