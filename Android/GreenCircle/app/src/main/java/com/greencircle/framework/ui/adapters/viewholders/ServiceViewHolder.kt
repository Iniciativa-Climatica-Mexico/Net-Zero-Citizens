package com.greencircle.framework.ui.adapters.viewholders

import android.content.Context
import androidx.recyclerview.widget.RecyclerView
import com.greencircle.databinding.ItemServiceBinding
import com.greencircle.domain.model.ServiceItem
import com.greencircle.domain.model.ServicesObject
import com.greencircle.framework.viewmodel.CompanyServicesViewModel

class ServiceViewHolder(private val binding: ItemServiceBinding) :

    RecyclerView.ViewHolder(binding.root) {
    fun bind(item: ServiceItem, context: Context) {
        val data = getServies(item.companyId)
        binding.TVSName.text = item.name
        binding.TVSDescription.text = item.description
        binding.IVSImage.setImageResource(0)
    }

    fun initMockServices(): HashMap<String, ArrayList<ServiceItem>> {
        // TODO: Implement this function with endpoint

        val serviceMap = HashMap<String, ArrayList<ServiceItem>>()
        val serviceItems: ServicesObject = CompanyServicesViewModel().getMockServicesList()

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

    fun getServies(companyId: String): ArrayList<ServiceItem> {
        val servicesMap = initMockServices()
        return servicesMap[companyId]!!
    }


}
