package com.example.myapplication

import android.content.ContentValues.TAG
import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class HomeViewModel:ViewModel() {
    private val _destination = MutableLiveData<ArrayList<DestinationResponse>>()
    val destination: LiveData<ArrayList<DestinationResponse>> = _destination

    fun getDestinations() {
        val client = ApiConfig.getApiService().getDestination()
        client.enqueue(object : Callback<ArrayList<DestinationResponse>> {
            override fun onResponse(
                call: Call<ArrayList<DestinationResponse>>,
                response: Response<ArrayList<DestinationResponse>>
            ) {
                if (response.isSuccessful) {
                    _destination.value = response.body()
                } else {
                    Log.e(TAG, "onFailure: ${response.message()}")
                }
            }

            override fun onFailure(call: Call<ArrayList<DestinationResponse>>, t: Throwable) {
                Log.e(TAG, "Failure: ${t.message}")
            }
        })
    }
}