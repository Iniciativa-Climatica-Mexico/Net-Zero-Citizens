import android.app.Activity
import android.app.AlertDialog
import android.app.Dialog
import android.content.DialogInterface
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.OpenableColumns
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import androidx.cardview.widget.CardView
import androidx.fragment.app.DialogFragment
import androidx.lifecycle.ViewModelProvider
import com.greencircle.R
import com.greencircle.framework.viewmodel.ViewModelFactory
import com.greencircle.framework.viewmodel.company.files.UploadFilesViewModel
import java.io.File
import java.io.FileOutputStream
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.asRequestBody

class UploadDocumentDialogFragment(title: String) : DialogFragment() {
    private lateinit var viewModel: UploadFilesViewModel
    private val title = title
    private lateinit var uploadFile: File
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
        viewModel = ViewModelProvider(
            this,
            ViewModelFactory(requireContext(), UploadFilesViewModel::class.java)
        )[UploadFilesViewModel::class.java]

        val cardView = view.findViewById<CardView>(R.id.uploadFileCard)
        cardView.setOnClickListener {
            launchFilePicker()
        }

        val builder = AlertDialog.Builder(requireActivity())
        builder.setView(view)
            .setTitle(title)
            .setPositiveButton("Upload") { dialog: DialogInterface, which: Int ->
                uploadSelectedFile(uploadFile)
            }
            .setNegativeButton("Cancel") { dialog: DialogInterface, which: Int ->
                dialog.dismiss()
            }
        return builder.create()
    }

    private fun launchFilePicker() {
        val intent = Intent(Intent.ACTION_OPEN_DOCUMENT)
        intent.addCategory(Intent.CATEGORY_OPENABLE)
        intent.type = "*/*" // Specify the MIME type for PDF files

        startActivityForResult(intent, PICK_PDF_REQUEST)
    }

    companion object {
        private const val PICK_PDF_REQUEST = 123
    }

    // Inside your onActivityResult() method
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == PICK_PDF_REQUEST && resultCode == Activity.RESULT_OK) {
            val selectedFileUri = data?.data
            if (selectedFileUri != null) {
                uploadFile = getFileFromContentUri(selectedFileUri)!!
                if (uploadFile != null) {
                    data?.data?.let { uri ->
                        val cursor =
                            requireActivity().contentResolver.query(uri, null, null, null, null)
                        cursor?.use {
                            val nameIndex = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME)
                            cursor.moveToFirst()
                            val fileName = cursor.getString(nameIndex)

                            // Update the UI as needed
                            val uploadFileImage =
                                dialog?.findViewById<ImageView>(R.id.uploadFileImage)
                            uploadFileImage?.visibility = View.GONE
                            val checkmarkImageView =
                                dialog?.findViewById<ImageView>(R.id.checkmarkImageView)
                            checkmarkImageView?.visibility = View.VISIBLE
                            val selectedFileName =
                                dialog?.findViewById<TextView>(R.id.selectedFileName)
                            selectedFileName?.text = fileName
                        }
                    }
                }
            }
        }
    }

    // Function to upload the selected file
    private fun uploadSelectedFile(file: File) {
        val requestFile = file.asRequestBody("multipart/form-data".toMediaTypeOrNull())
        val body = MultipartBody.Part.createFormData("file", file.name, requestFile)
        try {
            viewModel.uploadFile("companyId", body, authToken)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    // Function to get a File object from a content URI
    private fun getFileFromContentUri(contentUri: Uri): File? {
        val inputStream = requireActivity().contentResolver.openInputStream(contentUri)
        if (inputStream != null) {
            val fileName = getFileName(contentUri)
            val tempFile = File(requireContext().cacheDir, fileName)
            tempFile.deleteOnExit()
            FileOutputStream(tempFile).use { output ->
                inputStream.copyTo(output)
            }
            return tempFile
        }
        return null
    }

    // Function to get the file name from a content URI
    private fun getFileName(uri: Uri): String {
        var result: String? = null
        if (uri.scheme == "content") {
            val cursor = requireActivity().contentResolver.query(uri, null, null, null, null)
            cursor?.use {
                val nameIndex = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME)
                cursor.moveToFirst()
                result = cursor.getString(nameIndex)
            }
        }
        return result ?: "unknown"
    }
}
