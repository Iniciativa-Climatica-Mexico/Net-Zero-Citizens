package com.greencircle.framework.views.fragments

import android.os.Bundle
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

class MapFragment : Fragment(   ), OnMapReadyCallback {

    private var mGoogleMap: GoogleMap? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_map, container, false)

        val mapFragment = childFragmentManager.findFragmentById(R.id.mapFragment)
            as SupportMapFragment
        mapFragment.getMapAsync(this)

        return view
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mGoogleMap = googleMap

        // Coordenadas de la ubicacion deseada
        val latitude = 20.613276
        val longitude = -100.404219

        // Crear un objeto LatLng con las coordenadas
        val location = LatLng(latitude, longitude)

        // Crear un marcador en la ubicacion
        val marker = MarkerOptions()
            .position(location)
            .title("Ubicacion deseada")
            .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED))

        // Agregar el marcador al mapa
        mGoogleMap?.addMarker(marker)

        // Mover la camara al marcador (opcional)
        mGoogleMap?.moveCamera(CameraUpdateFactory.newLatLngZoom(location, 15f))
    }
}