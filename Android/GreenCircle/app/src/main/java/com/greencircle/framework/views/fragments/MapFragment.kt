package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.provider.CalendarContract.Instances
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.MapView
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import com.greencircle.R
//class MapFragment : Fragment(), OnMapReadyCallback {
//
//    private lateinit var mapView: MapView
//    private lateinit var googleMap: GoogleMap

//    override fun onCreateView(
//        inflater: LayoutInflater,
//        container: ViewGroup?,
//        savedInstanceState: Bundle?
//    ): View? {
//        val rootView = inflater.inflate(R.layout.fragment_map, container, false)
//        val mapView = rootView.findViewById<MapView>(R.id.mapView)
//
//        // Resto del código para configurar el mapa
//
//        return rootView
//    }
//
//    override fun onMapReady(map: GoogleMap) {
//        googleMap = map
//        val location = LatLng(37.7749, -122.4194) // Coordenadas de San Francisco
//        googleMap.addMarker(MarkerOptions().position(location).title("Marker in San Francisco"))
//        googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(location, 15f))
//    }
//
//    override fun onResume() {
//        super.onResume()
//        mapView.onResume()
//    }
//
//    override fun onPause() {
//        super.onPause()
//        mapView.onPause()
//    }
//
//    override fun onDestroy() {
//        super.onDestroy()
//        mapView.onDestroy()
//    }
//
//    override fun onLowMemory() {
//        super.onLowMemory()
//        mapView.onLowMemory()
//    }
//}

class MapFragment : Fragment(), OnMapReadyCallback {

    private var mGoogleMap:GoogleMap? = null
    override fun onCreate(saverInstances: Bundle?) {
        super.onCreate(savedInstanceState)
        activity?.setContentView(R.layout.activity_main)

        val mapFragment = activity?.supportFragmentManager?.findFragmentById(R.id.mapFragment) as SupportMapFragment
        mapFragment.getMapAsync(this)
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mGoogleMap = googleMap
    }
}
