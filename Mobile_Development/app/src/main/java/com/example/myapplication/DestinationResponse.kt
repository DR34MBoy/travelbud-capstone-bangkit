package com.example.myapplication

import com.google.gson.annotations.SerializedName

data class Response<T>(

    @field:SerializedName("Response")
    val response: List<DestinationResponse>
)

data class DestinationResponse(
    @field:SerializedName("Place_Id")
    val Id: Int,

    @field:SerializedName("Place_Name")
    val placeName: String?,

    @field:SerializedName("Description")
    val description: String?,

    @field:SerializedName("Category")
    val category: String?,

    @field:SerializedName("City")
    val city: String?,

    @field:SerializedName("Price")
    val price: Int,

    @field:SerializedName("Rating")
    val rating: Float,

)
