package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.R
import com.greencircle.data.remote.ecoinfo.EcoInfoRetrofit
import com.greencircle.data.repository.EcoInfoRepository
import com.greencircle.databinding.FragmentErrorBinding
import com.greencircle.databinding.FragmentHomeBinding
import com.greencircle.domain.usecase.auth.RecoverTokensRequirement
import com.greencircle.framework.ui.adapters.ecoinfo.EcoInfoAdapter
import com.greencircle.framework.viewmodel.ecoinfo.EcoInfoViewModel
import com.greencircle.framework.viewmodel.ecoinfo.EcoInfoViewModelFactory
import kotlinx.coroutines.launch

/**
 * Fragmento para la pantalla principal
 */
class HomeFragment : Fragment() {
    private lateinit var viewModel: EcoInfoViewModel
    private lateinit var recyclerView: RecyclerView
    private lateinit var recoverTokens: RecoverTokensRequirement
    private lateinit var binding: FragmentHomeBinding

    /**
     * Infla el layout del fragmento y configura el RecyclerView
     * @param inflater LayoutInflater
     * @param container ViewGroup?
     * @param savedInstanceState Bundle?
     * @return View? Vista del fragmento
     */
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val view = inflateView(inflater, container)

        setUpRecyclerView(view!!)
        fetchData()
        observeData()

        return view
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setUpViewModel()
    }

    /**
     * Infla el layout del fragmento
     * @param inflater LayoutInflater
     * @param container ViewGroup?
     * @return View? Vista del fragmento
     */
    private fun inflateView(inflater: LayoutInflater, container: ViewGroup?): View? {
        binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    /**
     * Configura el ViewModel
     */
    private fun setUpViewModel() {
        recoverTokens = RecoverTokensRequirement(requireContext())
        val tokens = recoverTokens() ?: return
        val authToken = tokens.authToken

        val ecoInfoRetroFit = EcoInfoRetrofit(authToken)
        val repository = EcoInfoRepository(ecoInfoRetroFit.api)
        val viewModelFactory = EcoInfoViewModelFactory(repository)

        viewModel = ViewModelProvider(this, viewModelFactory)[EcoInfoViewModel::class.java]
    }

    /**
     * Configura el RecyclerView
     * @param view View
     */
    private fun setUpRecyclerView(view: View) {
        recyclerView = view.findViewById(R.id.recyclerView)
        recyclerView.layoutManager = LinearLayoutManager(context)
    }

    private fun fetchData() {
        lifecycleScope.launch {
            try {
                viewModel.fetchEcoInfos()
            } catch (e: Exception) {
                // insert error view
                val errorView = FragmentErrorBinding.inflate(layoutInflater)
                binding.root.removeView(recyclerView)
                binding.LLContainer.addView(errorView.root)
                errorView.root.layoutParams.height = ViewGroup.LayoutParams.MATCH_PARENT
                removeSkeleton()
                Log.e("HomeFragment", "Error al obtener los datos")
                Log.e("HomeFragment", e.message.toString())
            }
        }
    }

    /**
     * Observa los datos del ViewModel
     */
    private fun observeData() {
        viewModel.ecoInfos.observe(viewLifecycleOwner) { ecoInfos ->
            // delete the skeleton
            removeSkeleton()
            recyclerView.adapter = EcoInfoAdapter(ecoInfos)
        }
    }

    private fun removeSkeleton() {
        try {
            val skeleton = binding.fragmentHomeSkeleton.root
            binding.root.removeView(skeleton)
        } catch (e: Exception) {
            Log.e("HomeFragment", "Error al eliminar el skeleton")
            Log.e("HomeFragment", e.message.toString())
        }
    }
}
