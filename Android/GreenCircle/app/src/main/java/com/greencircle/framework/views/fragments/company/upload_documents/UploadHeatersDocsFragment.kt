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
import com.greencircle.databinding.FragmentUploadHeatersDocsBinding
import com.greencircle.domain.model.company.files.FileDescription
import com.greencircle.domain.model.company.files.FileFormat
import com.greencircle.framework.viewmodel.company.files.FileNamesViewModel
import com.greencircle.framework.views.activities.RegisterCompanyActivity

/**Constructor de "UploadHeatersDocsFragment"
 *
 * @constructor Incializa y crea la vista del "UploadHeatersDocsFragment"
 */
class UploadHeatersDocsFragment : Fragment(), UploadDocumentDialogFragment.UploadDialogListener {
    private var _binding: FragmentUploadHeatersDocsBinding? = null
    private val binding get() = _binding!!
    private var arguments: Bundle? = null
    private var uploadingFile: FileDescription? = null
    private var fileNamesViewModel = FileNamesViewModel()
    private var lessThanUploaded = false
    private var moreThanUploaded = false

    /**
     * Método que se llama cuando se crea la vista del fragmento de subir los documentos de calentadores solares.
     *
     * @param savedInstanceState La instancia de Bundle que contiene datos previamente guardados del fragmento.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments = requireArguments()
        fileNamesViewModel = ViewModelProvider(requireActivity())
            .get(FileNamesViewModel::class.java)
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
        initializeObservers()

        return root
    }

    /**
     * Método que cambia el estado del enlace de menor a 294kPA.
     *
     * @param fileName El nombre del archivo que se subió.
     */
    private fun changeLessThanBindingState(fileName: String) {
        binding.lessThanUploadTitle.text = fileName
        binding.lessThanFileDesc.text = getString(R.string.change_file)
        binding.lessThanChevron.visibility = View.GONE
        binding.lessThanCheck.visibility = View.VISIBLE
    }

    /**
     * Método que cambia el estado del enlace de mayor a 249kPA.
     *
     * @param fileName El nombre del archivo que se subió.
     */
    private fun changeMoreThanBindingState(fileName: String) {
        binding.moreThanUploadTitle.text = fileName
        binding.moreThanFileDesc.text = getString(R.string.change_file)
        binding.moreThanChevron.visibility = View.GONE
        binding.moreThanCheck.visibility = View.VISIBLE
    }

    /**
     * Método que inicializa los observadores de los nombres de los archivos.
     */
    private fun initializeObservers() {
        fileNamesViewModel.heatersLessThanFileName.observe(viewLifecycleOwner) {
            if (it != null) {
                changeLessThanBindingState(it)
                lessThanUploaded = true
            }
        }

        fileNamesViewModel.heatersMoreThanFileName.observe(viewLifecycleOwner) {
            if (it != null) {
                changeMoreThanBindingState(it)
                moreThanUploaded = true
            }
        }
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
            uploadingFile = FileDescription.ARCHIVOS_PRESION_MAYOR_A_294K_PA
            dialogFragment.arguments = arguments
            dialogFragment.uploadDialogListener = this
            dialogFragment.show(childFragmentManager, "UploadImageDialog")
        }

        binding.calentadoresLessThanUpload.setOnClickListener {
            val dialogFragment = UploadDocumentDialogFragment(
                "Archivos presion menor a 294k Pa",
                FileDescription.ARCHIVOS_PRESION_MENOR_A_294K_PA,
                FileFormat.PDF
            )
            uploadingFile = FileDescription.ARCHIVOS_PRESION_MENOR_A_294K_PA
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
            if (lessThanUploaded || moreThanUploaded) {
                navigateToUploadCommitmentFragment()
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
        when (uploadingFile) {
            FileDescription.ARCHIVOS_PRESION_MAYOR_A_294K_PA -> {
                fileNamesViewModel.heatersMoreThanFileName.value = fileName
            }

            FileDescription.ARCHIVOS_PRESION_MENOR_A_294K_PA -> {
                fileNamesViewModel.heatersLessThanFileName.value = fileName
            }

            else -> {}
        }
    }
}