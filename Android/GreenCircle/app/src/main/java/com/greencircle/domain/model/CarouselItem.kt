package com.greencircle.domain.model

import androidx.annotation.DrawableRes

/*
* Clase que representa el item de un carousel
 */
data class CarouselItem constructor(
    val imageUrl: String? = null,
    @DrawableRes val imageDrawable: Int? = null
) {
    constructor(@DrawableRes imageDrawable: Int) : this(null, imageDrawable)

    constructor(imageUrl: String) : this(imageUrl, null)
}