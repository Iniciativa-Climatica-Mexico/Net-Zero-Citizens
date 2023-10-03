package com.greencircle.framework.views.fragments.company.upload_documents

import android.app.Activity.RESULT_OK
import android.app.AlertDialog
import android.app.Dialog
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.OpenableColumns
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.cardview.widget.CardView
import androidx.fragment.app.DialogFragment
import com.greencircle.R
import com.greencircle.framework.viewmodel.company.files.UploadFilesViewModel
import java.io.File

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
    private lateinit var fileToUpload: File
    private var isFileSelected = false

    private var companyId: String? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments = requireArguments()
        authToken = arguments.getString("authToken").toString()
        companyId = arguments.getString("companyId")
        Log.d("CUstomSucc2", companyId.toString())
    }

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val inflater = requireActivity().layoutInflater
        view = inflater.inflate(R.layout.modal_upload_document, null)
        viewModel = UploadFilesViewModel(requireContext())

        val cardView = view.findViewById<CardView>(R.id.uploadFileCard)
        cardView.setOnClickListener {
            launchPicker()
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

    private fun launchPicker() {
        val intent = Intent(Intent.ACTION_GET_CONTENT)
        intent.type = "application/pdf"
        startActivityForResult(intent, 1)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        if (resultCode == RESULT_OK && data != null) {
            val fileUri: Uri? = data.data
            fileUri?.let {
                val filePath = getFilePath(it)
                fileToUpload = File(filePath)
                val fileName = fileToUpload.name
                changeDialogAfterSelection(fileName)

                isFileSelected = true
                val uploadFileButton = view.findViewById<Button>(R.id.uploadFileButton)
                if (isFileSelected) {
                    uploadFileButton.isEnabled = true
                    uploadFileButton.setOnClickListener {
                        uploadFile(fileToUpload)
                        dialog?.dismiss()
                    }
                }
            }
        }
    }

    private fun getFilePath(uri: Uri): String? {
        val projection = arrayOf(OpenableColumns.DISPLAY_NAME)
        val cursor = requireContext().contentResolver.query(uri, projection, null, null, null)
        cursor?.use {
            val nameIndex = it.getColumnIndex(OpenableColumns.DISPLAY_NAME)
            if (it.moveToFirst()) {
                return File(requireContext().cacheDir, it.getString(nameIndex)).absolutePath
            }
        }
        return null
    }

    private fun changeDialogAfterSelection(fileName: String) {
        dialog?.findViewById<TextView>(R.id.selectedFileName)?.text = fileName
        dialog?.findViewById<ImageView>(R.id.uploadFileImage)?.visibility = View.GONE
        dialog?.findViewById<ImageView>(R.id.checkmarkImageView)?.visibility = View.VISIBLE
    }

    private fun uploadFile(file: File) {
        viewModel.uploadFile(
            authToken,
            file,
            companyId!!,
            fileDescription,
            fileFormat
        )
    }
}