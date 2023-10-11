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
import com.greencircle.databinding.FragmentUploadPhotovoltaicDocsBinding
import com.greencircle.domain.model.company.files.FileDescription
import com.greencircle.domain.model.company.files.FileFormat
import com.greencircle.framework.viewmodel.company.files.FileNamesViewModel
import com.greencircle.framework.views.activities.RegisterCompanyActivity

/**Constructor de "SubmitCertificationsFragment"
 *
 * @constructor Incializa y crea la vista del "SubmitCertificationsFragment"
 */
class UploadPhotovoltaicDocsFragment :
    Fragment(),
    UploadDocumentDialogFragment.UploadDialogListener {
    private var _binding: FragmentUploadPhotovoltaicDocsBinding? = null
    private val binding get() = _binding!!
    private var arguments: Bundle? = null
    private var fileNamesViewModel = FileNamesViewModel()
    private var photovoltaicsUploaded = false

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
        initializeObservers()

        return root
    }

    /**
     * Método que cambia el estado del enlace de curriculum.
     *
     * @param fileName El nombre del archivo que se subió.
     */
    private fun changePhotovoltaicsBindingState(fileName: String) {
        binding.photovoltaicsUploadTitle.text = fileName
        binding.photovoltaicFileSizeText.text = getString(R.string.change_file)
        binding.photovoltaicChevron.visibility = View.GONE
        binding.photovoltaicCheck.visibility = View.VISIBLE
    }

    /**
     * Método que inicializa los observadores de los nombres de los archivos.
     */
    private fun initializeObservers() {
        fileNamesViewModel.photovoltaicsFileName.observe(viewLifecycleOwner) {
            if (it != null) {
                changePhotovoltaicsBindingState(it)
                photovoltaicsUploaded = true
            }
        }
    }

    /**
     * Método que inicializa los botones de subir documentos.
     */
    private fun initializeSubmitDocumentsButton() {
        binding.certSistemasPhotovoltaicsUpload.setOnClickListener {
            val dialogFragment = UploadDocumentDialogFragment(
                "Certificado de sistemas fotovoltaicos",
                FileDescription.CERTIFICACIONES_SISTEMAS_FOTOVOLTAICOS,
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
            if (!photovoltaicsUploaded) {
                Toast.makeText(
                    requireContext(),
                    getString(R.string.upload_all_documents),
                    Toast.LENGTH_SHORT
                ).show()

                return@setOnClickListener
            }

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

    /**
     * Método que se llama cuando se sube un archivo.
     *
     * @param fileName El nombre del archivo que se subió.
     */
    override fun onFileUploaded(fileName: String) {
        fileNamesViewModel.photovoltaicsFileName.value = fileName
    }
}