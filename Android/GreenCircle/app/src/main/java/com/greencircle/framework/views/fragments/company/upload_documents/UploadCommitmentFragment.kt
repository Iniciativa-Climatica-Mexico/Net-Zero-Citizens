package com.greencircle.framework.views.fragments.company.upload_documents

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.greencircle.R
import com.greencircle.databinding.FragmentUploadCommitmentBinding
import com.greencircle.domain.model.company.files.FileDescription
import com.greencircle.domain.model.company.files.FileFormat
import com.greencircle.framework.viewmodel.company.files.FileNamesViewModel

/**Constructor de "UploadCommitmentFragment"
 *
 * @constructor Incializa y crea la vista del "UploadCommitmentFragment"
 */
class UploadCommitmentFragment : Fragment(), UploadDocumentDialogFragment.UploadDialogListener {
    private var _binding: FragmentUploadCommitmentBinding? = null
    private val binding get() = _binding!!
    private var fileNamesViewModel = FileNamesViewModel()
    private var commitmentUploaded = false
    private var privacyAgreementAccepted = false
    private var termsConditionsAccepted = false

    /**
     * Método que se llama cuando se crea la vista del fragmento de subir los documentos de carta compromiso.
     *
     * @param savedInstanceState La instancia de Bundle que contiene datos previamente guardados del fragmento.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        fileNamesViewModel = ViewModelProvider(requireActivity())
            .get(FileNamesViewModel::class.java)
    }

    /**
     * Método que se llama cuando se crea la vista del fragmento de subir la carta compromiso y
     * finalizar el proceso de documentos.
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
        _binding = FragmentUploadCommitmentBinding.inflate(inflater, container, false)
        val root: View = binding.root

        initializeNavigationButtons()
        initializeSubmitDocumentsButton()
        initializeObservers()
        initializePrivacyAgreementSwitch()
        initializeTermsConditionsSwitch()

        return root
    }

    /**
     * Método que inicializa los switches del aviso de privacidad.
     */
    private fun initializePrivacyAgreementSwitch() {
        val privacyAgreementSwitch = binding.privacyAgreementSwitch
        privacyAgreementSwitch.setOnCheckedChangeListener { _, isChecked ->
            if (isChecked) {
                privacyAgreementAccepted = true
                privacyAgreementSwitch.thumbTintList = ContextCompat.getColorStateList(
                    requireContext(), R.color.white
                )
                privacyAgreementSwitch.trackTintList = ContextCompat.getColorStateList(
                    requireContext(), R.color.green
                )

                privacyAgreementSwitch.thumbIconTintList = ContextCompat.getColorStateList(
                    requireContext(), R.color.green
                )
            } else {
                privacyAgreementAccepted = false
                // Colors when the switch is OFF
                privacyAgreementSwitch.thumbTintList = ContextCompat.getColorStateList(
                    requireContext(), R.color.white
                )
                privacyAgreementSwitch.trackTintList = ContextCompat.getColorStateList(
                    requireContext(), R.color.gray_500
                )

                privacyAgreementSwitch.thumbIconTintList = ContextCompat.getColorStateList(
                    requireContext(), R.color.white
                )
            }
        }
    }

    /**
     * Método que inicializa los switches del aviso de privacidad y términos de condiciones.
     */
    private fun initializeTermsConditionsSwitch() {
        val termsConditionsSwitch = binding.conditionsAgreementSwitch
        termsConditionsSwitch.setOnCheckedChangeListener { _, isChecked ->
            if (isChecked) {
                termsConditionsAccepted = true
                termsConditionsSwitch.thumbTintList = ContextCompat.getColorStateList(
                    requireContext(), R.color.white
                )
                termsConditionsSwitch.trackTintList = ContextCompat.getColorStateList(
                    requireContext(), R.color.green
                )

                termsConditionsSwitch.thumbIconTintList = ContextCompat.getColorStateList(
                    requireContext(), R.color.green
                )
            } else {
                termsConditionsAccepted = false
                // Colors when the switch is OFF
                termsConditionsSwitch.thumbTintList = ContextCompat.getColorStateList(
                    requireContext(), R.color.white
                )
                termsConditionsSwitch.trackTintList = ContextCompat.getColorStateList(
                    requireContext(), R.color.gray_500
                )

                termsConditionsSwitch.thumbIconTintList = ContextCompat.getColorStateList(
                    requireContext(), R.color.white
                )
            }
        }
    }

    /**
     * Método que cambia el estado del enlace de la carta compromiso.
     *
     * @param fileName El nombre del archivo que se subió.
     */
    private fun changeCommitmentBindingState(fileName: String) {
        binding.commitmentUploadTitle.text = fileName
        binding.commitmentFileSizeText.text = getString(R.string.change_file)
        binding.commitmentChevron.visibility = View.GONE
        binding.commitmentCheck.visibility = View.VISIBLE
    }

    /**
     * Método que inicializa los observadores de los nombres de los archivos.
     */
    private fun initializeObservers() {
        fileNamesViewModel.commitmentFileName.observe(viewLifecycleOwner) {
            if (it != null) {
                changeCommitmentBindingState(it)
                commitmentUploaded = true
            }
        }
    }

    /**
     * Método que inicializa los botones de subir documentos.
     */
    private fun initializeSubmitDocumentsButton() {
        binding.commitmentUpload.setOnClickListener {
            val dialogFragment = UploadDocumentDialogFragment(
                "Carta Compromiso",
                FileDescription.CARTA_DE_COMPROMISO,
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
        binding.nextFragment.setOnClickListener {
            if (!commitmentUploaded) {
                Toast.makeText(
                    requireContext(),
                    getString(R.string.upload_all_documents),
                    Toast.LENGTH_SHORT
                ).show()
            } else if (!privacyAgreementAccepted || !termsConditionsAccepted) {
                Toast.makeText(
                    requireContext(),
                    getString(R.string.accept_tc_and_privacy),
                    Toast.LENGTH_SHORT
                ).show()
            } else {
                navigateToNextFragment()
            }
        }

        binding.topbar.documentsBackButton.setOnClickListener {
            requireActivity().supportFragmentManager.popBackStackImmediate()
        }
    }

    /**
     * Método que navega al siguiente fragmento.
     */
    private fun navigateToNextFragment() {
        //        TODO("Not yet implemented")
        return
    }

    /**
     * Método que se llama cuando se destruye la vista del fragmento de subir la carta compromiso y
     * finalizar el proceso de documentos.
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
        fileNamesViewModel.commitmentFileName.value = fileName
    }
}