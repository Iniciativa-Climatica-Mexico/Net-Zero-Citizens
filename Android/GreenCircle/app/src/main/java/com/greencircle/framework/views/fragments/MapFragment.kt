package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import com.greencircle.R
import com.greencircle.data.repository.GoogleMapsRepository
import com.greencircle.domain.model.CompanyObject
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MapFragment : Fragment(), OnMapReadyCallback {

    private var mGoogleMap: GoogleMap? = null

    private fun getCompanyList() {
        CoroutineScope(Dispatchers.IO).launch {
            val companyRepository = GoogleMapsRepository()
            val result: CompanyObject? = companyRepository.getCompanyList()
            Log.d("Salida", result.toString())
        }
    }
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_map, container, false)

        val mapFragment = childFragmentManager.findFragmentById(R.id.mapFragment)
            as SupportMapFragment
        mapFragment.getMapAsync(this)

        getCompanyList()

        return view
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mGoogleMap = googleMap

        getCompanyList()

        // Coordenadas de la ubicacion deseada
        val latitude = 20.613276
        val longitude = -100.404219

        // Crear un objeto LatLng con las coordenadas
        val location = LatLng(latitude, longitude)

        // Crear un marcador en la ubicacion
        val marker = MarkerOptions()
            .position(location)
            .title("Empresa paneles solares ejemplo")
            .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED))

        // Agregar el marcador al mapa
        mGoogleMap?.addMarker(marker)

        // Mover la camara al marcador (opcional)
        mGoogleMap?.moveCamera(CameraUpdateFactory.newLatLngZoom(location, 15f))
    }
}