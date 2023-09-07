package com.greencircle.domain.model

import androidx.annotation.DrawableRes

data class CarouselItem constructor(
    val imageUrl: String? = null,
    @DrawableRes val imageDrawable: Int? = null,
    val description: String? = null
) {

    constructor(@DrawableRes imageDrawable: Int, description: String) : this(
        null, imageDrawable, description
    )

    constructor(imageUrl: String, description: String) : this(
        imageUrl, null, description
    )

    constructor(@DrawableRes imageDrawable: Int) : this(
        null, imageDrawable, null
    )
}