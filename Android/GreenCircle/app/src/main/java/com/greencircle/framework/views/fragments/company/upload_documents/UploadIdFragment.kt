package com.greencircle.framework.views.fragments.company.upload_documents

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.greencircle.R
import com.greencircle.databinding.FragmentUploadIdBinding
import com.greencircle.domain.model.company.files.FileDescription
import com.greencircle.domain.model.company.files.FileFormat
import com.greencircle.framework.viewmodel.company.files.FileNamesViewModel
import com.greencircle.framework.views.activities.RegisterCompanyActivity

/**Constructor de "UploadIdFragment"
 *
 * @constructor Incializa y crea la vista del "UploadIdFragment"
 */
class UploadIdFragment : Fragment(), UploadDocumentDialogFragment.UploadDialogListener {
    private var _binding: FragmentUploadIdBinding? = null
    private val binding get() = _binding!!
    private var arguments: Bundle? = null
    private var submittingFile: FileDescription? = null
    private val fileNamesViewModel = FileNamesViewModel()

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

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflar el diseño de este fragmento
        _binding = FragmentUploadIdBinding.inflate(inflater, container, false)
        val root: View = binding.root

        initializeSubmitDocumentsButton()
        initializeNavigationButtons()

        fileNamesViewModel.idFileName?.let { fileName ->
            {
                binding.idTitle.text = fileName
                binding.idFileSizeText.text = getString(R.string.change_file)
                binding.idChevron.visibility = View.GONE
                binding.idCheck.visibility = View.VISIBLE
            }
        }

        fileNamesViewModel.constitutiveFileName?.let { fileName ->
            {
                binding.constitutiveTitle.text = fileName
                binding.constitutiveFileSizeText.text = getString(R.string.change_file)
                binding.constitutiveChevron.visibility = View.GONE
                binding.constitutiveCheck.visibility = View.VISIBLE
            }
        }

        return root
    }

    /**
     * Método que inicializa los botones de subir documentos.
     */
    private fun initializeSubmitDocumentsButton() {
        binding.ineUpload.setOnClickListener {
            val dialogFragment = UploadDocumentDialogFragment(
                "INE", FileDescription.INE_REPRESENTANTE_LEGAL, FileFormat.PDF
            )
            submittingFile = FileDescription.INE_REPRESENTANTE_LEGAL
            dialogFragment.arguments = arguments
            dialogFragment.uploadDialogListener = this
            dialogFragment.show(childFragmentManager, "UploadImageDialog")
        }

        binding.constitutiveUpload.setOnClickListener {
            val dialogFragment = UploadDocumentDialogFragment(
                "Acta Constitutiva", FileDescription.ACTA_CONSTITUTIVA, FileFormat.PDF
            )
            submittingFile = FileDescription.ACTA_CONSTITUTIVA
            dialogFragment.arguments = arguments
            dialogFragment.uploadDialogListener = this
            dialogFragment.show(childFragmentManager, "UploadImageDialog")
        }
    }

    /**
     * Método que inicializa los botones de siguiente y regresar.
     */
    private fun initializeNavigationButtons() {
        binding.nextDocumentButton.setOnClickListener {
            navigateToSubmitCurriculumFragment()
        }

        binding.topbar.documentsBackButton.setOnClickListener {
            requireActivity().supportFragmentManager.popBackStackImmediate()
        }
    }

    /**
     * Método que navega al fragmento de subir el curriculum.
     */
    private fun navigateToSubmitCurriculumFragment() {
        val uploadCurriculumFragment = UploadCurriculumFragment()

        val activity = requireActivity() as RegisterCompanyActivity
        val intent = Intent(activity, RegisterCompanyActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        activity.replaceFragment(uploadCurriculumFragment, arguments)
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
            FileDescription.INE_REPRESENTANTE_LEGAL -> {
                fileNamesViewModel.idFileName = fileName
                binding.idTitle.text = fileName
                binding.idFileSizeText.text = getString(R.string.change_file)
                binding.idChevron.visibility = View.GONE
                binding.idCheck.visibility = View.VISIBLE
            }

            FileDescription.ACTA_CONSTITUTIVA -> {
                fileNamesViewModel.constitutiveFileName = fileName
                binding.constitutiveTitle.text = fileName
                binding.constitutiveFileSizeText.text = getString(R.string.change_file)
                binding.constitutiveChevron.visibility = View.GONE
                binding.constitutiveCheck.visibility = View.VISIBLE
            }

            else -> {}
        }
    }
}