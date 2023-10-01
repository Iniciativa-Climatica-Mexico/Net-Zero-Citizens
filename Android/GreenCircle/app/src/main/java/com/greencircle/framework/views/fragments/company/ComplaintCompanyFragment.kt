package com.greencircle.framework.views.fragments.company

import android.app.AlertDialog
import android.app.Dialog
import android.content.Context
import android.os.Bundle
import android.view.View
import android.view.ViewGroup
import android.view.WindowManager
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.EditText
import android.widget.Spinner
import android.widget.Toast
import androidx.fragment.app.DialogFragment
import com.greencircle.R
import com.greencircle.data.remote.complaints.ComplaintClient
import com.greencircle.domain.model.complaints.Complaint
import com.greencircle.domain.model.complaints.ComplaintStatus
import java.util.UUID
import kotlin.math.roundToInt
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.json.JSONObject

/**
 * Modal para reportar una empresa
 * @constructor Crea un modal para reportar una empresa
 * @since 2.0.0
 */
class ComplaintCompanyFragment : DialogFragment() {
    private lateinit var companyId: UUID
    private lateinit var authToken: String
    private val complaintClient = ComplaintClient()

    /**
     * Se ejecuta cuando la vista se ha creado
     * @param view: View -> Vista
     * @param savedInstanceState: Bundle? -> Bundle
     */
    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val view = activity?.layoutInflater?.inflate(
            R.layout.fragment_complaint_company, null
        )

        val adapter = ArrayAdapter.createFromResource(
            requireContext(), R.array.options_array, android.R.layout.simple_spinner_item
        )

        companyId = arguments?.getString("CompanyId")?.let { UUID.fromString(it) }!!

        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        val spinnerOptions: Spinner = view!!.findViewById(R.id.spinnerProblems)

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
             * @param view: View -> Vista
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
                Toast.makeText(
                    requireContext(), "Selected: $selectedItem", Toast.LENGTH_SHORT
                ).show()
            }
        }

        return AlertDialog.Builder(requireContext()).setView(view)
            .setNegativeButton("Cancelar") { _, _ ->
                Toast.makeText(requireContext(), "Cancel", Toast.LENGTH_SHORT).show()
            }.setPositiveButton("Reportar") { _, _ ->
                val complaintTitle = spinnerOptions.selectedItem.toString()
                val complaintDescription =
                    view.findViewById<EditText>(R.id.TellUsMore).text.toString()

                val sharedPreferences =
                    context?.getSharedPreferences("my_preferences", Context.MODE_PRIVATE)

                val userJson = sharedPreferences?.getString("user_session", null)
                val userJSON = JSONObject(userJson!!)
                val userId = UUID.fromString(userJSON.getString("uuid"))

                authToken = sharedPreferences.getString("auth_token", null)!!

                val complaint = Complaint(
                    userId = userId,
                    companyId = companyId,
                    complaintSubject = complaintTitle,
                    complaintDescription = complaintDescription,
                    complaintStatus = ComplaintStatus.ACTIVE.toLowerCase().toString()
                )

                CoroutineScope(Dispatchers.Main).launch {
                    val response = withContext(Dispatchers.IO) {
                        complaintClient.postComplaint(authToken, complaint)
                    }

                    if (isAdded) {
                        if (response?.isSuccessful == true) {
                            Toast.makeText(
                                requireContext(),
                                "Report sent successfully",
                                Toast.LENGTH_SHORT
                            ).show()
                        } else {
                            Toast.makeText(
                                requireContext(),
                                "Error sending report",
                                Toast.LENGTH_SHORT
                            ).show()
                        }
                    }
                }

                Toast.makeText(requireContext(), "Report", Toast.LENGTH_SHORT).show()
            }.create()
    }

    /**
     * Configura el ancho y alto del modal al abrirse, asi como el fondo
     * @since 2.0.0
     */
    override fun onStart() {
        super.onStart()

        // Width match parent
        val width = ViewGroup.LayoutParams.WRAP_CONTENT
        val height = 600.dpToPx(requireContext())

        dialog?.window?.setLayout(width, height)
        dialog?.window?.setBackgroundDrawableResource(R.drawable.rounded_modal)
        dialog?.window?.addFlags(WindowManager.LayoutParams.FLAG_DIM_BEHIND)
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