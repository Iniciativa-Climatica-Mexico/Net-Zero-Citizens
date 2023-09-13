package com.greencircle.framework.ui.adapters.viewholders

import android.content.Context
import android.util.Log
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.R
import com.greencircle.databinding.ItemServiceBinding
import com.greencircle.domain.model.ServiceItem
import com.greencircle.domain.model.ServicesObject
import com.greencircle.framework.viewmodel.CompanyServicesViewModel

class ServiceViewHolder(private val binding: ItemServiceBinding) :

    RecyclerView.ViewHolder(binding.root) {

    private val servicesMap = initMockServices()
    fun bind(item: ServiceItem, context: Context) {
//        val serviceData = getService(item.companyId)
        Log.d("SalidaBind", item.toString())
        binding.TVSName.text = item.name
        binding.TVSDescription.text = item.description
        binding.IVSImage.setImageResource(R.drawable.ic_launcher_background)
    }

    fun initMockServices(): HashMap<String, ArrayList<ServiceItem>> {
        // TODO: Implement this function with endpoint
        val serviceMap = HashMap<String, ArrayList<ServiceItem>>()
        val serviceItems: ServicesObject = CompanyServicesViewModel().createMOckServicesList()

        for (service in serviceItems.results) {
            val companyId = service.companyId
            if (!serviceMap.containsKey(companyId)) {
                // If the companyId is not already a key in the map, create a new list for it
                serviceMap[companyId] = ArrayList()
            }
            // Add the service to the list associated with the companyId
            serviceMap[companyId]?.add(service)
        }

        return serviceMap
    }

    fun getService(companyId: String): ArrayList<ServiceItem> {
        return servicesMap[companyId]!!
    }
}
