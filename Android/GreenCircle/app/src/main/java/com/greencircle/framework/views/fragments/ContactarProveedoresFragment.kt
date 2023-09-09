package com.greencircle.framework.views.fragments

import ContactarProveedoresViewModel
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.greencircle.R
import org.imaginativeworld.whynotimagecarousel.model.CarouselItem

class ContactarProveedoresFragment : Fragment() {

    private lateinit var viewModel: ContactarProveedoresViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        viewModel = ViewModelProvider(this)[ContactarProveedoresViewModel::class.java]
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(
            R.layout.fragment_contactar_proveedores,
            container, false
        )

        val carousel =
            view.findViewById<org.imaginativeworld.whynotimagecarousel.ImageCarousel>(R.id.carousel)

        viewModel.carouselItems.observe(
            viewLifecycleOwner,
            Observer<List<CarouselItem>>
            { items ->
                carousel.addData(items)
            }
        )

        return view
    }
}