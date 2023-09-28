import android.app.Activity.RESULT_OK
import android.app.AlertDialog
import android.app.Dialog
import android.content.DialogInterface
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import androidx.cardview.widget.CardView
import androidx.fragment.app.DialogFragment
import com.greencircle.R
import com.greencircle.framework.viewmodel.company.files.UploadFilesViewModel
import okhttp3.MultipartBody

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
            launchPicker()
        }

        val builder = AlertDialog.Builder(requireActivity())
        builder.setView(view)
            .setTitle(title)
            .setPositiveButton("Upload") { dialog: DialogInterface, which: Int ->
//                uploadFile(uploadFile!!)
            }
            .setNegativeButton("Cancel") { dialog: DialogInterface, which: Int ->
                dialog.dismiss()
            }
        return builder.create()
    }
    private fun launchPicker() {
        val intent = Intent(Intent.ACTION_GET_CONTENT)
        intent.addCategory(Intent.CATEGORY_OPENABLE)
        intent.type = "*/*"
        startActivityForResult(intent, 1)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        if (resultCode == RESULT_OK && data != null) {
            Log.d("DATA", data.toString())
        }
    }
}