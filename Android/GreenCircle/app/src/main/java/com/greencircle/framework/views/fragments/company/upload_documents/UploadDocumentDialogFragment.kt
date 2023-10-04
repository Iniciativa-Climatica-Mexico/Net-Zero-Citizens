package com.greencircle.framework.views.fragments.company.upload_documents

import android.app.AlertDialog
import android.app.Dialog
import android.net.Uri
import android.os.Bundle
import android.provider.OpenableColumns
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.activity.result.contract.ActivityResultContracts
import androidx.cardview.widget.CardView
import androidx.fragment.app.DialogFragment
import com.greencircle.R
import com.greencircle.framework.viewmodel.company.files.UploadFilesViewModel
import java.io.InputStream
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.toRequestBody

class UploadDocumentDialogFragment(
    title: String,
    fileDescription: String,
    fileFormat: String
) : DialogFragment() {
    private lateinit var view: View
    private lateinit var viewModel: UploadFilesViewModel
    private val title = title
    private val fileDescription = fileDescription
    private val fileFormat = fileFormat
    private var arguments = Bundle()
    private lateinit var authToken: String
    private lateinit var fileUri: Uri
    private var isFileSelected = false

    private var companyId: String? = null

    private val filePickerLauncher = registerForActivityResult(
        ActivityResultContracts.GetContent()
    ) { uri: Uri? ->
        if (uri != null) {
            fileUri = uri
            val fileName = getFileName(uri)
            changeDialogAfterSelection(fileName!!)
            isFileSelected = true

            val uploadFileButton = view.findViewById<Button>(R.id.uploadFileButton)
            uploadFileButton.isEnabled = true
            uploadFileButton.setOnClickListener {
                uploadFile(fileUri)
                dialog?.dismiss()
            }
        }
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments = requireArguments()
        authToken = arguments.getString("authToken").toString()
        companyId = arguments.getString("companyId")
    }

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val inflater = requireActivity().layoutInflater
        view = inflater.inflate(R.layout.modal_upload_document, null)
        viewModel = UploadFilesViewModel(requireContext())

        val cardView = view.findViewById<CardView>(R.id.uploadFileCard)
        cardView.setOnClickListener {
            openFilePicker()
        }
        val cancelFileButton = view.findViewById<Button>(R.id.cancelFileButton)
        cancelFileButton.setOnClickListener {
            dialog?.dismiss()
        }

        val builder = AlertDialog.Builder(requireActivity())
        builder.setView(view)
            .setTitle(title)
            .setMessage("Sube tu archivo aqui")
        return builder.create()
    }

    private fun openFilePicker() {
        filePickerLauncher.launch("*/*")
    }

    private fun getFileName(uri: Uri): String? {
        var fileName: String? = null
        val cursor = requireContext().contentResolver.query(uri, null, null, null, null)
        cursor?.use {
            it.moveToFirst()
            val displayNameIndex = it.getColumnIndex(OpenableColumns.DISPLAY_NAME)
            if (displayNameIndex != -1) {
                fileName = it.getString(displayNameIndex)
            }
        }
        return fileName
    }

    private fun changeDialogAfterSelection(fileName: String) {
        dialog?.findViewById<TextView>(R.id.selectedFileName)?.text = fileName
        dialog?.findViewById<ImageView>(R.id.uploadFileImage)?.visibility = View.GONE
        dialog?.findViewById<ImageView>(R.id.checkmarkImageView)?.visibility = View.VISIBLE
        dialog?.findViewById<Button>(R.id.uploadFileButton)?.isEnabled = true
        isFileSelected = true
    }

    private fun uploadFile(uri: Uri) {
        var inputStream: InputStream? = null
        try {
            inputStream = requireContext().contentResolver.openInputStream(uri)
            val requestBody = inputStream
                ?.readBytes()
                ?.toRequestBody("multipart/form-data".toMediaTypeOrNull())
            val filePart = MultipartBody.Part.createFormData(
                "file",
                title,
                requestBody!!
            )
            viewModel.uploadFile(
                authToken,
                filePart,
                companyId!!,
                fileDescription,
                fileFormat
            )
        } catch (e: Exception) {
            Log.e("UploadDocumentDialogFragment", "uploadFile: ${e.message}")
        } finally {
            inputStream?.close()
        }
    }
}