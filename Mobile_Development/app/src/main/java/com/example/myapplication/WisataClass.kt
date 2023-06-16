package com.example.myapplication
import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
data class WisataClass(
    var destination:String="",
    var location:String="",
    var image:Int=0,
):Parcelable