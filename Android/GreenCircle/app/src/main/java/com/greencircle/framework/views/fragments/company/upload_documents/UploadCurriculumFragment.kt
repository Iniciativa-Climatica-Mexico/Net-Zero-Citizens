package com.greencircle.framework.views.fragments.company.upload_documents

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.greencircle.R
import com.greencircle.databinding.FragmentUploadCurriculumBinding
import com.greencircle.domain.model.company.files.FileDescription
import com.greencircle.domain.model.company.files.FileFormat
import com.greencircle.framework.views.activities.RegisterCompanyActivity

/**Constructor de "UploadCurriculumFragment
 *
 * @constructor Incializa y crea la vista del "UploadCurriculumFragment"
 */
class UploadCurriculumFragment : Fragment(), UploadDocumentDialogFragment.UploadDialogListener {
    private var _binding: FragmentUploadCurriculumBinding? = null
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

        return root
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
            dialogFragment.show(childFragmentManager, "UploadImageDialog")
        }
    }

    /**
     * Método que inicializa los botones de siguiente y regresar.
     */
    private fun initializeNavigationButtons() {
        binding.nextDocumentButton.setOnClickListener {
            navigateToUploadCertificationsFragment()
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
        binding.curriculumUploadTitle.text = fileName
        binding.curriculumFileSizeText.text = getString(R.string.change_file)
        binding.curriculumChevron.visibility = View.GONE
        binding.curriculumCheck.visibility = View.VISIBLE
    }
}