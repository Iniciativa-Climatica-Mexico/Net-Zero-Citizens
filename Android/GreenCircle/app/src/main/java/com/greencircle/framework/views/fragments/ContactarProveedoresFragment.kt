package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.greencircle.R
import org.imaginativeworld.whynotimagecarousel.model.CarouselItem

class ContactarProveedoresFragment : Fragment() {

    private val list = mutableListOf<CarouselItem>()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_contactar_proveedores, container, false)

        val carousel = view.findViewById<org.imaginativeworld.whynotimagecarousel.ImageCarousel>(R.id.carousel)

        list.add(CarouselItem("https://eresloquecomes.es/wp-content/uploads/2021/11/Dorada.jpg", "pescado1"))
        list.add(CarouselItem("https://thefoodtech.com/wp-content/uploads/2023/04/atun-rojo-realmente-fresco-aislado-blanco.jpg", "pescado2"))
        list.add(CarouselItem("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxETEhUTEhISExIWGBYRERMXExgVFxUSGBgXFhYVGhYYHSggGB0lGxcZIjIiMSs3Li4uGB8zODMtNyotLisBCgoKDg0OGxAQGy0lHSUtKysyLTUuLi8tLy03LSstLzUtLS0tNS0vKy0tLS0tLS0yLS0tLSsvKysvLy0tNS4tLf/AABEIAMsA+QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUCAwYHAf/EAD8QAAEDAgQDBgMFBgQHAAAAAAEAAhEDIQQSMUEiUWEFBjJxgZETobFCUsHh8BQjYpKi0RUzcoJTg5OywtLx/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAIDBAEFBv/EAC0RAQACAQMCAwgBBQAAAAAAAAABAgMRITEEEkFR8AUTIjJhgdHxcRQVkaGx/9oADAMBAAIRAxEAPwD3FERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERCUBFp/aqcxnZPLMFjSx1JxhtWm48g9p+hXNYd7Z8khERdcEREBERAREQEREBERAREQY1CYMaxaefoudf3nNN2WtTEfeYZ92n+66Rcr3mwAcXCLkZhG6pzzaI1q2dFXFe/bkjaXRYLG06rc1N4c3pseRGoKkLyXA4h9J+Zjyx4t5jkRofIru+xO8jakMq5WVDAa4HgeTaBPhdO3UQTooYepi+07S0dZ7Mvh+Km9f9wv0RFpeWIiICLCtWa0S5waOZMD5qpq94qQMN4tpBBv/ALZUbWivKzHhvk+WNVyi5DF94nguBfHJrWjN/VI23IVNV7SxDpmpVLJceJ1yMswQxoAiRa/nzqnPWOGyvs7JMa2mId7iO06DPHWptOkF4mfKZVVju9dFkgAujckAG06CXf0rkmUXuhziTY5eUDiGkRaRpsesbP8ADHaAAAnUuHhkzIi9nHXkBziE5bzxC6vSYK/NOqTX714h7swD6bdQxuS9jIJcy12kWO2yosVVrPu+tVfNyC8vm9gGCBrkERvpZXLOy/t2mxiMpkcWoIvLXfocP13ZZGmwIafFJaGENynmGOg6elnVTW1uWvHlx45+CIhQV6BcDBvoIa0T44sW3JgRe9x5aKlEautExcmRALYB5h1tzGm6tsd2cWcUywZXWZmEZg0mN5yC0Xn7ohQvhEDIcos9h/eEiTSZxdQcpE6vJgQFXNIhprmvaNpY4btapRMU6tVl7Q7M2A8sJy3BE5fcgTt0HZvfyrpUYyp1HA7rMSLX2Hh2VI7DZg4nU5nascf3lGTrq+WuLiLMAhuhWptJrTILQeJ0AQBlOdkAu5PtHPWXOInW1q8SoyYaZfmjd6Fgu+GFf4nGmf4hb3Eq6w+Jp1BLHteObSD9F5JiWNboJ1IykHR3BvAkSJjTQfaMRnxKb81F72OBtlJ0tvaZidN1d/UTHLL/AGuL/LOj2xF5/wBj9/HMc2ni2ktNhWa02/1NAv6exXe0KzXtDmODmkSHAyCPNX0yVvw83P02TDOl4+/gzREU1AiIgIiICIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiD//2Q==", "pescado3"))
        carousel.addData(list)

        return view
    }
}
