import android.app.Activity.RESULT_OK
import android.app.AlertDialog
import android.app.Dialog
import android.content.DialogInterface
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.OpenableColumns
import android.util.Log
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import androidx.cardview.widget.CardView
import androidx.fragment.app.DialogFragment
import com.greencircle.R
import com.greencircle.framework.viewmodel.company.files.UploadFilesViewModel
import java.io.File
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody

class UploadDocumentDialogFragment(title: String) : DialogFragment() {
    private lateinit var viewModel: UploadFilesViewModel
    private val title = title
    private var uploadFileUri: Uri? = null
    private var uploadFile: MultipartBody.Part? = null
    private var arguments = Bundle()
    private lateinit var authToken: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments = requireArguments()
        authToken = arguments.getString("authToken").toString()
    }

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val inflater = requireActivity().layoutInflater
        val view = inflater.inflate(R.layout.modal_upload_document, null)
        viewModel = UploadFilesViewModel(requireContext())

        val cardView = view.findViewById<CardView>(R.id.uploadFileCard)
        cardView.setOnClickListener {
            openFilePicker()
        }

        val builder = AlertDialog.Builder(requireActivity())
        builder.setView(view)
            .setTitle(title)
            .setPositiveButton("Upload") { dialog: DialogInterface, which: Int ->
                uploadFile(uploadFile!!)
            }
            .setNegativeButton("Cancel") { dialog: DialogInterface, which: Int ->
                dialog.dismiss()
            }
        return builder.create()
    }
    fun openFilePicker() {
        val intent = Intent(Intent.ACTION_GET_CONTENT)
        intent.type = "*/*"
        intent.addCategory(Intent.CATEGORY_OPENABLE)
        startActivityForResult(intent, 100)
    }

    @Deprecated("Deprecated in Java")
    override fun onActivityResult(
        requestCode: Int,
        resultCode: Int,
        data: Intent?
    ) {
        if (requestCode == 100 && resultCode == RESULT_OK && data != null) {
            val uri: Uri? = data.data
            uploadFileUri = uri
            val fileName = setNFileName(uri!!)
            dialog?.findViewById<TextView>(R.id.selectedFileName)?.text = fileName
            changeUploadButtonState()
            uploadFile = transformFile(uploadFileUri!!)
        }
        super.onActivityResult(requestCode, resultCode, data)
    }

    private fun setNFileName(fileUri: Uri): String {
        var result: String = ""
        if (fileUri.scheme == "content") {
            val cursor = requireActivity().contentResolver.query(fileUri, null, null, null, null)
            cursor?.use {
                val nameIndex = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME)
                cursor.moveToFirst()
                result = cursor.getString(nameIndex)
            }
        }
        return result ?: "unknown"
    }

    private fun changeUploadButtonState() {
        dialog?.findViewById<ImageView>(R.id.uploadFileImage)?.visibility = View.GONE
        dialog?.findViewById<ImageView>(R.id.checkmarkImageView)?.visibility = View.VISIBLE
    }

    private fun transformFile(fileUri: Uri): MultipartBody.Part {
        val fileUri = File(fileUri.toString())
        val requestBody = RequestBody.create("multipart/form-data".toMediaTypeOrNull(), fileUri)
        val part = MultipartBody.Part.createFormData("file", fileUri.name, requestBody)
        return part
    }

    private fun uploadFile(file: MultipartBody.Part) {
        try {
            viewModel.uploadFile(authToken, file, authToken)
        } catch (e: Exception) {
            Log.d("NOPE", e.toString())
        }
    }
}