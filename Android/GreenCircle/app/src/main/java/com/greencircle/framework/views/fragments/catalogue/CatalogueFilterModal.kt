package com.greencircle.framework.views.fragments.catalogue

import android.app.Dialog
import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.DialogFragment
import com.greencircle.R
import com.greencircle.databinding.FragmentCompanyFilterBinding
import com.greencircle.framework.viewmodel.catalogue.CatalogueViewModel
import kotlin.math.roundToInt

/**
 * Fragmento para el modal de filtros del catálogo
 *
 * @since 3.0.0
 */
class CatalogueFilterModal(private val viewModel: CatalogueViewModel) : DialogFragment() {

    companion object {
        /**
         * Crea una nueva instancia del fragmento
         *
         * @return CatalogueFilterModal Nueva instancia del fragmento
         * @since 3.0.0
         */
        fun newInstance(viewModel: CatalogueViewModel): CatalogueFilterModal {
            return CatalogueFilterModal(viewModel)
        }
    }

    /**
     * Infla el layout del fragmento
     *
     * @param inflater LayoutInflater - Inflador del layout
     * @param container ViewGroup? - Contenedor del fragmento
     * @param savedInstanceState Bundle? - Bundle con los datos guardados
     *
     * @return View? Vista del fragmento
     * @since 3.0.0
     */
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val binding = FragmentCompanyFilterBinding.inflate(inflater, container, false)

        val cancelButton = binding.cancelButton

        cancelButton.setOnClickListener {
            dismiss()
        }

        val applyButton = binding.applyButton

        applyButton.setOnClickListener {
            val newParams = viewModel.params.value
            newParams?.ordering = binding.companyRating.selectedItem.toString()
            newParams?.productName = binding.companyProducts.selectedItem.toString()
            newParams?.state = binding.companyPhyisicalState.selectedItem.toString()
            if (newParams != null) {
                viewModel.updateParams(newParams)
                Log.d("Params Update: ", viewModel.params.value.toString())
            }
            dismiss()
        }

        return binding.root
    }

    /**
     * Inicia el diálogo y lo posiciona en la parte superior de la pantalla,
     * justo debajo del botón que lo abre.
     *
     * @since 3.0.0
     */
    override fun onStart() {
        super.onStart()
        val dialog = dialog

        if (dialog != null) {
            val window = dialog.window
            window?.setGravity(android.view.Gravity.TOP or android.view.Gravity.CENTER_HORIZONTAL)

            val params = window?.attributes
            params?.y = 175
            window?.attributes = params

            val width = 325.dpToPx(requireContext())
            val height = 425.dpToPx(requireContext())

            dialog.window?.setLayout(width, height)

            dialog.window?.setBackgroundDrawableResource(R.drawable.rounded_modal)
            dialog.setCancelable(true)
            dialog.setCanceledOnTouchOutside(true)
        }
    }

    /**
     * Crea el diálogo y le asigna un título personalizado.
     *
     * @param savedInstanceState Bundle? - Bundle con los datos guardados
     *
     * @return Dialog Diálogo
     * @since 3.0.0
     */
    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val dialog = super.onCreateDialog(savedInstanceState)

        dialog.setTitle("Filtrar empresas")
        return dialog
    }

    /**
     * Convierte de dp a px para el ancho del modal
     * @param context: Context -> Contexto
     * @return Int -> Ancho del modal en px
     * @since 2.0.0
     */
    private fun Int.dpToPx(context: Context): Int {
        val metrics = context.resources.displayMetrics
        return this * (metrics.densityDpi / 160f).roundToInt()
    }
}