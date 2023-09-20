package com.greencircle.framework.ui.adapters

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.CatalogueCardLayoutBinding
import com.greencircle.domain.model.CompanySummary
import com.greencircle.framework.ui.adapters.ViewHolder.CatalogueViewHolder

/**
 * Esta clase se utiliza para almacenar los datos de
 * resumen de la empresa y crear la vista de la
 * tarjeta del catálogo de la empresa
 */

class CatalogueAdapter : RecyclerView.Adapter<CatalogueViewHolder>() {
    private var data: ArrayList<CompanySummary> = ArrayList()
    lateinit var context: Context

    /**
     * Esta función se utiliza para inicializar el adaptador personalizado
     * @param data: Lista de objetos CompanySummary
     * @param context: Contexto de la aplicación
     * */
    fun initCustomAdapter(data: ArrayList<CompanySummary>, context: Context) {
        this.data = data
        this.context = context
    }

    /**
     * Esta función se utiliza para crear la
     * vista de la tarjeta del catálogo de la empresa
     * @param viewGroup: Objeto ViewGroup
     * @param i: Valor entero
     * @return Objeto CatalogueViewHolder
     */

    override fun onCreateViewHolder(viewGroup: ViewGroup, i: Int): CatalogueViewHolder {
        val v = CatalogueCardLayoutBinding.inflate(
            LayoutInflater.from(viewGroup.context),
            viewGroup,
            false
        )
        return CatalogueViewHolder(v)
    }

    /**
     * Esta función se utiliza para vincular los datos de resumen de la empresa
     * @param viewHolder: ViewHolder de la tarjeta del catálogo de la empresa
     * @param position: Posición de la tarjeta del catálogo de la empresa en la lista
     */
    override fun onBindViewHolder(viewHolder: CatalogueViewHolder, position: Int) {
        val item = data[position]
        viewHolder.bind(item)
    }

    /**
     * Esta función se utiliza para obtener el número de elementos de la lista
     * @return Valor entero
     */
    override fun getItemCount(): Int {
        return data.size
    }
}
