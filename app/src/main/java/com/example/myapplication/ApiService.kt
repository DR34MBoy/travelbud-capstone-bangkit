package com.example.myapplication
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Query

interface ApiService {
    @GET("api/places")
    fun getDestination(): Call<ArrayList<DestinationResponse>>
}
