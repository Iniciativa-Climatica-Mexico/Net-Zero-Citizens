package com.greencircle.framework.views.fragments.company

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.greencircle.R

class ReportCompanyFragment: Fragment() {
    /**
     * Se ejecuta cuando se crea la vista
     * @param inflater: LayoutInflater -> Inflador de la vista
     * @param container: ViewGroup? -> Contenedor de la vista
     * @param savedInstanceState: Bundle? -> Bundle
     * @return View -> Vista
     */
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(
            R.layout.fragment_report_company,
            container,
            false
        )
    }

    /**
     * Se ejecuta cuando la vista se ha creado
     * @param view: View -> Vista
     * @param savedInstanceState: Bundle? -> Bundle
     */
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val adapter = ArrayAdapter.createFromResource(
            requireContext(),
            R.array.options_array,
            android.R.layout.simple_spinner_item
        )

        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        val spinnerOptions: Spinner = view.findViewById(R.id.spinnerOptions)

        spinnerOptions.adapter = adapter
        spinnerOptions.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            /**
             * Se ejecuta cuando no se selecciona ningún elemento del spinner
             * @param parent: AdapterView<*> -> Spinner
             */
            override fun onNothingSelected(parent: AdapterView<*>?) {
                Toast.makeText(requireContext(), "No issue selected", Toast.LENGTH_SHORT).show()
            }

            /**
             * Se ejecuta cuando se selecciona un elemento del spinner
             * @param parent: AdapterView<*> -> Spinner
             * @param view: View? -> Vista del elemento seleccionado
             * @param position: Int -> Posición del elemento seleccionado
             * @param id: Long -> Id del elemento seleccionado
             */
            override fun onItemSelected(
                parent: AdapterView<*>?,
                view: View?,
                position: Int,
                id: Long
            ) {
                val selectedItem = parent?.getItemAtPosition(position).toString()
                Toast.makeText(requireContext(), "Selected: $selectedItem", Toast.LENGTH_SHORT)
                    .show()
            }
        }

        val btnSubmit = view.findViewById<View>(R.id.btnSubmit)
        btnSubmit.setOnClickListener {
            val selectedIssue = spinnerOptions.selectedItem.toString()

            Toast.makeText(
                requireContext(),
                "Selected: $selectedIssue",
                Toast.LENGTH_LONG
            ).show()
        }
    }
}