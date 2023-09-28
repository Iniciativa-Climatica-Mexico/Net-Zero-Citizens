package com.greencircle.framework.views.fragments.profile

import android.app.AlertDialog
import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.greencircle.R
import com.greencircle.databinding.FragmentEditProfileBinding
import com.greencircle.domain.model.profile.Profile
import com.greencircle.framework.viewmodel.ViewModelFactory
import com.greencircle.framework.viewmodel.profile.ProfileViewModel
import java.util.UUID
import org.json.JSONObject

class EditProfileFragment : Fragment() {
    private var _binding: FragmentEditProfileBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel: ProfileViewModel
    private lateinit var user: Profile

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val userId: UUID

        val sharedPreferences =
            context?.getSharedPreferences("my_preferences", Context.MODE_PRIVATE)
        val userJson = sharedPreferences?.getString("user_session", null)
        val userJSON = JSONObject(userJson!!)
        Log.d("SalidaUserJson", userJSON.getString("uuid"))
        userId = UUID.fromString(userJSON.getString("uuid"))
        viewModel = ViewModelProvider(
            this,
            ViewModelFactory(requireContext(), ProfileViewModel::class.java)
        )[ProfileViewModel::class.java]
        viewModel.setUserId(userId)
        viewModel.getUserProfile()
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentEditProfileBinding.inflate(inflater, container, false)
        var root: View = binding.root

        InitializeObservers()
        InitializeAceptarCambiosButton()
        InitializeCancelarCambiosButton()

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun InitializeObservers() {
        viewModel.userLiveData.observe(viewLifecycleOwner, {
            user = it
            setUserData()
        })
    }

    private fun setUserData() {
        val name = user.firstName + " " + user.lastName
        binding.username.text = name
        binding.inputNombre.setText(user.firstName)
        binding.inputPrimerApellido.setText(user.lastName)
        binding.inputSegundoApellido.setText(user.secondLastName)
        binding.inputEdad.setText(user.age.toString())
        binding.inputSexo.setText(user.gender)
        binding.inputTelefono.setText(user.phoneNumber)
        binding.inputEstado.setText(user.state)
        // binding.profileImage.setImageResource(user.profilePicture)
    }

    // call to update user from viewmodel and repository
    private fun updateUser() {
        val user = Profile(
            user.userId,
            binding.inputNombre.text.toString(),
            binding.inputPrimerApellido.text.toString(),
            binding.inputSegundoApellido.text.toString(),
            user.email,
            user.password ?: "EstoNoDeberiaEstarAqui",
            binding.inputTelefono.text.toString(),
            binding.inputEdad.text.toString().toInt(),
            binding.inputEstado.text.toString(),
            binding.inputSexo.text.toString(),
            user.profilePicture,
            user.createdAt,
            user.updatedAt
        )
        viewModel.updateUser(user)
    }

    private fun InitializeAceptarCambiosButton() {
        binding.aceptarCambiosButton.setOnClickListener {
            updateUser()
            Toast.makeText(
                requireContext(), "Los cambios fueron realizados con éxito", Toast.LENGTH_SHORT
            ).show()
            val transaction = requireActivity().supportFragmentManager.beginTransaction()
            transaction.replace(R.id.frame_layout, ProfileFragment())
            transaction.addToBackStack("profileFragment")
            transaction.commit()
        }
    }

    // function to go back to fragment profile if user cancels changes
    private fun InitializeCancelarCambiosButton() {
        binding.cancelarCambiosButton.setOnClickListener {
            val alertDialogBuilder = AlertDialog.Builder(requireContext())
            alertDialogBuilder.setTitle("¿Quieres dejar de editar?")
            alertDialogBuilder.setMessage(
                "Los cambios realizados no se guardarán."
            )
            alertDialogBuilder.setPositiveButton("Salir") { dialog, _ ->
                // Lógica para salir
                dialog.dismiss()
                val transaction = requireActivity().supportFragmentManager.beginTransaction()
                transaction.replace(R.id.frame_layout, ProfileFragment())
                transaction.addToBackStack("profileFragment")
                transaction.commit()
            }
            alertDialogBuilder.setNegativeButton("Seguir editando") { dialog, _ ->
                // Lógica para seguir editando
                dialog.dismiss()
            }
            // alertDialogBuilder.setNeutralButton("Cancelar") { dialog, _ ->
            val alertDialog = alertDialogBuilder.create()
            alertDialog.show()
        }
    }
}