package com.greencircle.framework.views.fragments.profile

import android.app.AlertDialog
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.greencircle.R
import com.greencircle.databinding.FragmentEditProfileBinding
import com.greencircle.domain.model.profile.Profile
import com.greencircle.domain.usecase.auth.RecoverUserSessionRequirement
import com.greencircle.framework.viewmodel.ViewModelFactory
import com.greencircle.framework.viewmodel.profile.ProfileViewModel
import com.greencircle.framework.views.activities.LoginActivity
import java.util.UUID

class EditProfileFragment : Fragment() {
    private var _binding: FragmentEditProfileBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel: ProfileViewModel
    private lateinit var recoverUserSession: RecoverUserSessionRequirement
    private lateinit var user: Profile
    private lateinit var uuid: UUID

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        viewModel = ViewModelProvider(
            this,
            ViewModelFactory(requireContext(), ProfileViewModel::class.java)
        )[ProfileViewModel::class.java]

        // Inicializar variables
        recoverUserSession = RecoverUserSessionRequirement(requireContext())

        // Obtener la sesión del usuario
        val userSession = recoverUserSession()
        uuid = userSession.uuid

        viewModel.setUserId(uuid)
        viewModel.getUserProfile()
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentEditProfileBinding.inflate(inflater, container, false)
        var root: View = binding.root
        initializeObservers()
        initializeAceptarCambiosButton()
        initializeCancelarCambiosButton()
        deleteUserOnClickListener()

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun initializeObservers() {
        viewModel.userLiveData.observe(viewLifecycleOwner) {
            user = it
            setUserData()
        }
    }

    private fun setUserData() {
        val name = user.firstName + " " + user.lastName
        binding.username.text = name
        binding.inputNombre.setText(user.firstName)
        binding.inputPrimerApellido.setText(user.lastName)
        binding.inputEdad.setText(user.age.toString())
        binding.inputSexo.setText(user.gender)
        binding.inputTelefono.setText(user.phoneNumber)
        binding.inputEstado.setText(user.state, false)
        // binding.profileImage.setImageResource(user.profilePicture)
    }

    // call to update user from viewmodel and repository
    private fun updateUser() {
        val user = Profile(
            user.userId,
            binding.inputNombre.text.toString(),
            binding.inputPrimerApellido.text.toString(),
            user.secondLastName,
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

    private fun initializeAceptarCambiosButton() {
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
    private fun initializeCancelarCambiosButton() {
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

    private fun deleteUserOnClickListener() {
        val deleteUserButton = binding.root.findViewById<Button>(R.id.delete_user)
        deleteUserButton.setOnClickListener {
            val alertDialogBuilder = AlertDialog.Builder(requireContext())
            alertDialogBuilder.setTitle("¿Quieres eliminar tu cuenta?")
            alertDialogBuilder.setMessage(
                "Esta acción no se puede deshacer."
            )
            alertDialogBuilder.setPositiveButton("Eliminar") { dialog, _ ->
                // Lógica para eliminar
                dialog.dismiss()
                viewModel.deleteUser(uuid)
                navigateToLogin()
            }
            alertDialogBuilder.setNegativeButton("Cancelar") { dialog, _ ->
                // Lógica para cancelar
                dialog.dismiss()
            }
            // alertDialogBuilder.setNeutralButton("Cancelar") { dialog, _ ->
            val alertDialog = alertDialogBuilder.create()
            alertDialog.show()
        }
    }

    private fun navigateToLogin() {
        val intent: Intent = Intent(requireContext(), LoginActivity::class.java)
        startActivity(intent)
        requireActivity().finish()
    }
}