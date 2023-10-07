package com.greencircle.framework.views.fragments.company.upload_documents

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
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
    private var uploadingFile: FileDescription? = null
    private var idUploaded = false
    private var constitutiveUploaded = false
    private var fileNamesViewModel = FileNamesViewModel()

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
        fileNamesViewModel = ViewModelProvider(requireActivity())
            .get(FileNamesViewModel::class.java)
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
        initializeObservers()
        initializeNavigationButtons()

        return root
    }

    /**
     * Método que cambia el estado del enlace de INE.
     *
     * @param fileName El nombre del archivo que se subió.
     */
    private fun changeIdBindingState(fileName: String) {
        binding.idTitle.text = fileName
        binding.idFileSizeText.text = getString(R.string.change_file)
        binding.idChevron.visibility = View.GONE
        binding.idCheck.visibility = View.VISIBLE
    }

    /**
     * Método que cambia el estado del enlace de Acta Constitutiva.
     *
     * @param fileName El nombre del archivo que se subió.
     */
    private fun changeConstitutiveBindingState(fileName: String) {
        binding.constitutiveTitle.text = fileName
        binding.constitutiveFileSizeText.text = getString(R.string.change_file)
        binding.constitutiveChevron.visibility = View.GONE
        binding.constitutiveCheck.visibility = View.VISIBLE
    }

    /**
     * Método que inicializa los observadores de los nombres de los archivos.
     */
    private fun initializeObservers() {
        fileNamesViewModel.idFileName.observe(viewLifecycleOwner) {
            if (it != null) {
                changeIdBindingState(it)
                idUploaded = true
            }
        }

        fileNamesViewModel.constitutiveFileName.observe(viewLifecycleOwner) {
            if (it != null) {
                changeConstitutiveBindingState(it)
                constitutiveUploaded = true
            }
        }
    }

    /**
     * Método que inicializa los botones de subir documentos.
     */
    private fun initializeSubmitDocumentsButton() {
        binding.ineUpload.setOnClickListener {
            val dialogFragment = UploadDocumentDialogFragment(
                "INE", FileDescription.INE_REPRESENTANTE_LEGAL, FileFormat.PDF
            )
            uploadingFile = FileDescription.INE_REPRESENTANTE_LEGAL
            dialogFragment.arguments = arguments
            dialogFragment.uploadDialogListener = this
            dialogFragment.show(childFragmentManager, "UploadImageDialog")
        }

        binding.constitutiveUpload.setOnClickListener {
            val dialogFragment = UploadDocumentDialogFragment(
                "Acta Constitutiva", FileDescription.ACTA_CONSTITUTIVA, FileFormat.PDF
            )
            uploadingFile = FileDescription.ACTA_CONSTITUTIVA
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
            if (idUploaded && constitutiveUploaded) {
                navigateToSubmitCurriculumFragment()
            } else {
                Toast.makeText(
                    requireContext(),
                    getString(R.string.upload_all_documents),
                    Toast.LENGTH_SHORT
                ).show()
            }
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
        when (uploadingFile) {
            FileDescription.INE_REPRESENTANTE_LEGAL -> {
                fileNamesViewModel.idFileName.value = fileName
            }

            FileDescription.ACTA_CONSTITUTIVA -> {
                fileNamesViewModel.constitutiveFileName.value = fileName
            }

            else -> {}
        }
    }
}