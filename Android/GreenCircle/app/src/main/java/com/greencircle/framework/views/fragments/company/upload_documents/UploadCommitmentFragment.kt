package com.greencircle.framework.views.fragments.company.upload_documents

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.greencircle.databinding.FragmentUploadCommitmentBinding

/**Constructor de "UploadCommitmentFragment"
 *
 * @constructor Incializa y crea la vista del "UploadCommitmentFragment"
 */
class UploadCommitmentFragment : Fragment() {
    private var _binding: FragmentUploadCommitmentBinding? = null
    private val binding get() = _binding!!

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

        return root
    }

    /**
     * Método que inicializa los botones de siguiente y regresar.
     */
    private fun initializeNavigationButtons() {
        binding.topbar.documentsBackButton.setOnClickListener {
            requireActivity().supportFragmentManager.popBackStackImmediate()
        }
    }

    /**
     * Método que se llama cuando se destruye la vista del fragmento de subir la carta compromiso y
     * finalizar el proceso de documentos.
     */
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}