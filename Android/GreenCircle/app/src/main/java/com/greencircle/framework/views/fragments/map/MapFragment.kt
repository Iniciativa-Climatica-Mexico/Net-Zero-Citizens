package com.greencircle.framework.views.fragments.map

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.greencircle.R
import com.greencircle.data.repository.GoogleMapsRepository
import com.greencircle.domain.model.googlemaps.Company
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MapFragment : Fragment(), OnMapReadyCallback {
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

        getCompanyList()

        return view
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mGoogleMap = googleMap

        mGoogleMap?.uiSettings?.isZoomControlsEnabled = true
        mGoogleMap?.uiSettings?.isZoomGesturesEnabled = true

        if (ContextCompat.checkSelfPermission(
                requireContext(),
                Manifest.permission.ACCESS_FINE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED
        ) {
            mGoogleMap?.isMyLocationEnabled = true

            val locationManager = requireActivity().getSystemService(
                android.content.Context.LOCATION_SERVICE
            ) as android.location.LocationManager

            val location = locationManager.getLastKnownLocation(
                android.location.LocationManager.GPS_PROVIDER
            )

            location?.let {
                val currentLatLng = LatLng(it.latitude, it.longitude)
                mGoogleMap?.moveCamera(CameraUpdateFactory.newLatLngZoom(currentLatLng, 15f))
            }
        } else {
            Toast.makeText(
                requireContext(),
                "No se ha otorgado permiso para acceder a la ubicación",
                Toast.LENGTH_LONG
            ).show()
        }
    }

    private fun getCompanyList() {
        CoroutineScope(Dispatchers.IO).launch {
            val companyRepository = GoogleMapsRepository()
            val result: List<Company>? = companyRepository.getCompanyList()
            Log.d("CompanyObject", result.toString())
        }
    }
}