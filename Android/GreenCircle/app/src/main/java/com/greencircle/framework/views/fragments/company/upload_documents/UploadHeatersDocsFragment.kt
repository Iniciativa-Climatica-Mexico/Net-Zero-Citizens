package com.greencircle.framework.views.fragments.company.upload_documents

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.greencircle.R
import com.greencircle.databinding.FragmentUploadHeatersDocsBinding
import com.greencircle.domain.model.company.files.FileDescription
import com.greencircle.domain.model.company.files.FileFormat
import com.greencircle.framework.views.activities.RegisterCompanyActivity

/**Constructor de "UploadHeatersDocsFragment"
 *
 * @constructor Incializa y crea la vista del "UploadHeatersDocsFragment"
 */
class UploadHeatersDocsFragment : Fragment(), UploadDocumentDialogFragment.UploadDialogListener {
    private var _binding: FragmentUploadHeatersDocsBinding? = null
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

        initializeSubmitDocumentsButton()
        initializeNavigationButtons()

        return root
    }

    /**
     * Método que inicializa los botones de subir documentos.
     */
    private fun initializeSubmitDocumentsButton() {
        binding.calentadoresMoreThanUpload.setOnClickListener {
            val dialogFragment = UploadDocumentDialogFragment(
                "Archivos presion mayor a 294k Pa",
                FileDescription.ARCHIVOS_PRESION_MAYOR_A_294K_PA,
                FileFormat.PDF,
            )
            submittingFile = FileDescription.ARCHIVOS_PRESION_MAYOR_A_294K_PA
            dialogFragment.arguments = arguments
            dialogFragment.show(childFragmentManager, "UploadImageDialog")
        }

        binding.calentadoresLessThanUpload.setOnClickListener {
            val dialogFragment = UploadDocumentDialogFragment(
                "Archivos presion menor a 294k Pa",
                FileDescription.ARCHIVOS_PRESION_MENOR_A_294K_PA,
                FileFormat.PDF
            )
            submittingFile = FileDescription.ARCHIVOS_PRESION_MENOR_A_294K_PA
            dialogFragment.arguments = arguments
            dialogFragment.show(childFragmentManager, "UploadImageDialog")
        }
    }

    /**
     * Método que inicializa los botones de siguiente y regresar.
     */
    private fun initializeNavigationButtons() {
        binding.nextDocumentButton.setOnClickListener {
            navigateToUploadCommitmentFragment()
        }

        binding.topbar.documentsBackButton.setOnClickListener {
            requireActivity().supportFragmentManager.popBackStackImmediate()
        }
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
     * Método que se llama cuando se destruye la vista del fragmento de subir los documentos de identificación.
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
            FileDescription.ARCHIVOS_PRESION_MAYOR_A_294K_PA -> {
                binding.moreThanUploadTitle.text = fileName
                binding.moreThanFileDesc.text = getString(R.string.change_file)
                binding.moreThanChevron.visibility = View.GONE
                binding.moreThanCheck.visibility = View.VISIBLE
            }

            FileDescription.ARCHIVOS_PRESION_MENOR_A_294K_PA -> {
                binding.lessThanUploadTitle.text = fileName
                binding.lessThanFileDesc.text = getString(R.string.change_file)
                binding.lessThanChevron.visibility = View.GONE
                binding.lessThanCheck.visibility = View.VISIBLE
            }

            else -> {}
        }
    }
}