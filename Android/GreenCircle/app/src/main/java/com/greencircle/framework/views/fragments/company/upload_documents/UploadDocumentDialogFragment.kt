import android.app.Activity.RESULT_OK
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
import com.greencircle.R
import com.greencircle.framework.viewmodel.company.files.UploadFilesViewModel
import java.io.File

class UploadDocumentDialogFragment(title: String) : DialogFragment() {
    private lateinit var viewModel: UploadFilesViewModel
    private val title = title
    private var arguments = Bundle()
    private lateinit var authToken: String
    private lateinit var fileToUpload: File

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
            launchPicker()
        }

        val builder = AlertDialog.Builder(requireActivity())
        builder.setView(view)
            .setTitle(title)
            .setPositiveButton("Upload") { dialog: DialogInterface, which: Int ->
                uploadFile(fileToUpload)
            }
            .setNegativeButton("Cancel") { dialog: DialogInterface, which: Int ->
                dialog.dismiss()
            }
        return builder.create()
    }

    private fun launchPicker() {
        val intent = Intent(Intent.ACTION_GET_CONTENT)
        intent.type = "*/*"
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
        // TODO: Change to real companyId, fileDescription and fileFormat
        viewModel.uploadFile(
            authToken,
            file,
            "c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e",
            "Test",
            "pdf"
        )
    }
}