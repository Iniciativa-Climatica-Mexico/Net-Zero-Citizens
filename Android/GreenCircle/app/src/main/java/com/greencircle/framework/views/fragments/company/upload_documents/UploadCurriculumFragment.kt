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
import com.greencircle.databinding.FragmentUploadCurriculumBinding
import com.greencircle.domain.model.company.files.FileDescription
import com.greencircle.domain.model.company.files.FileFormat
import com.greencircle.framework.viewmodel.company.files.FileNamesViewModel
import com.greencircle.framework.views.activities.RegisterCompanyActivity

/**Constructor de "UploadCurriculumFragment
 *
 * @constructor Incializa y crea la vista del "UploadCurriculumFragment"
 */
class UploadCurriculumFragment : Fragment(), UploadDocumentDialogFragment.UploadDialogListener {
    private var _binding: FragmentUploadCurriculumBinding? = null
    private val binding get() = _binding!!
    private var arguments: Bundle? = null
    private var fileNamesViewModel = FileNamesViewModel()
    private var curriculumUploaded = false

    /**
     * Método que se llama cuando se crea la vista del fragmento de subir los documentos de curriculum.
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
     * Método que se llama cuando se crea la vista del fragmento de subir los documentos de curriculum.
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
        _binding = FragmentUploadCurriculumBinding.inflate(inflater, container, false)
        val root: View = binding.root

        initializeSubmitDocumentsButton()
        initializeNavigationButtons()
        initializeObservers()

        return root
    }

    /**
     * Método que cambia el estado del enlace de curriculum.
     *
     * @param fileName El nombre del archivo que se subió.
     */
    private fun changeCurriculumBindingState(fileName: String) {
        binding.curriculumUploadTitle.text = fileName
        binding.curriculumFileSizeText.text = getString(R.string.change_file)
        binding.curriculumChevron.visibility = View.GONE
        binding.curriculumCheck.visibility = View.VISIBLE
    }

    /**
     * Método que inicializa los observadores de los nombres de los archivos.
     */
    private fun initializeObservers() {
        fileNamesViewModel.curriculumFileName.observe(viewLifecycleOwner) {
            if (it != null) {
                changeCurriculumBindingState(it)
                curriculumUploaded = true
            }
        }
    }

    /**
     * Método que inicializa los botones de subir documentos.
     */
    private fun initializeSubmitDocumentsButton() {
        binding.curriculumUpload.setOnClickListener {
            val dialogFragment = UploadDocumentDialogFragment(
                "Curriculum",
                FileDescription.CURRICULUM,
                FileFormat.PDF,
            )
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
            if (curriculumUploaded) {
                navigateToUploadCertificationsFragment()
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
     * Método que navega al fragmento de subir los documentos de certificaciones.
     */
    private fun navigateToUploadCertificationsFragment() {
        val uploadCertificationsFragment = UploadCertificationsFragment()

        val activity = requireActivity() as RegisterCompanyActivity
        val intent = Intent(activity, RegisterCompanyActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        activity.replaceFragment(uploadCertificationsFragment, arguments)
    }

    /**
     * Método que se llama cuando se destruye la vista del fragmento de subir los documentos de curriculum.
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
        fileNamesViewModel.curriculumFileName.value = fileName
    }
}