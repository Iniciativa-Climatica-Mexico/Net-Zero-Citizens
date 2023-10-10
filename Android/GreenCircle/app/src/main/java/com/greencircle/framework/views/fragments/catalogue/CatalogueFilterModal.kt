package com.greencircle.framework.views.fragments.catalogue

import android.app.Dialog
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.DialogFragment
import com.greencircle.R

/**
 * Fragmento para el modal de filtros del catálogo
 *
 * @since 3.0.0
 */
class CatalogueFilterModal : DialogFragment() {
    companion object {
        /**
         * Crea una nueva instancia del fragmento
         *
         * @return CatalogueFilterModal Nueva instancia del fragmento
         * @since 3.0.0
         */
        fun newInstance(): CatalogueFilterModal {
            return CatalogueFilterModal()
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
    ): View? {
        return inflater.inflate(R.layout.fragment_company_filter, container, false)
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
            val width = ViewGroup.LayoutParams.MATCH_PARENT
            val height = ViewGroup.LayoutParams.WRAP_CONTENT

            dialog.window?.setLayout(width, height)

            val window = dialog.window
            window?.setGravity(android.view.Gravity.TOP or android.view.Gravity.CENTER_HORIZONTAL)

            val params = window?.attributes
            params?.y = 100
            window?.attributes = params

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
}