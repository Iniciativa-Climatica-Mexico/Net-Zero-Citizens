import android.app.Activity
import android.app.AlertDialog
import android.app.Dialog
import android.content.DialogInterface
import android.content.Intent
import android.os.Bundle
import android.util.Log
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
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.asRequestBody
class UploadDocumentDialogFragment(title: String) : DialogFragment() {
    private lateinit var viewModel: UploadFilesViewModel
    private val title = title
    private lateinit var uploadFilePart: MultipartBody.Part

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
                uploadSelectedFile()
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
                // Convert the URI to a File object
                val selectedFile = File(selectedFileUri.path)
                val mediaType = "application/pdf".toMediaType()

                // Create a RequestBody from the File
                val requestFile = selectedFile.asRequestBody(mediaType)

                // Create a MultipartBody.Part from the RequestBody
                val filePart = MultipartBody.Part
                    .createFormData("file", selectedFile.name, requestFile)

                // Store the filePart for later use if needed
                uploadFilePart = filePart

                // Update the UI as needed
                val uploadFileImage = dialog?.findViewById<ImageView>(R.id.uploadFileImage)
                uploadFileImage?.visibility = View.GONE
                val checkmarkImageView = dialog?.findViewById<ImageView>(R.id.checkmarkImageView)
                checkmarkImageView?.visibility = View.VISIBLE
                val selectedFileName = dialog?.findViewById<TextView>(R.id.selectedFileName)
                selectedFileName?.text = selectedFile.name + ".pdf"
            }
        } else {
            Log.d("customErr", "Something went wrong")
        }
    }

    // Function to upload the selected file
    private fun uploadSelectedFile() {
        // Check if you have a valid filePart, which was created in onActivityResult
        if (uploadFilePart != null) {
            // Call your API service to upload the file
            try {
                viewModel.uploadFile("companyId", uploadFilePart)
            } catch (e: Exception) {
                Log.d("noUpload", e.toString())
            }
        } else {
            Log.d("customErr", "No file selected")
        }
    }
}
