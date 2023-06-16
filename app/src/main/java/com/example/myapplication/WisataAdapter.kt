package com.example.myapplication

import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.myapplication.databinding.WisatalistBinding

class WisataAdapter(private val listStory: List<DestinationResponse>):RecyclerView.Adapter<WisataAdapter.ViewHolder>(){

        class ViewHolder(binding: WisatalistBinding) : RecyclerView.ViewHolder(binding.root) {
            val tittle:TextView = binding.tittlePlace
        }

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
            val binding =
                WisatalistBinding.inflate(LayoutInflater.from(parent.context), parent, false)
            return ViewHolder(binding)
        }

        override fun onBindViewHolder(holder: ViewHolder, position: Int) {
            val wisata = listStory[position]
            holder.tittle.text = wisata.placeName
        }

        override fun getItemCount() = listStory.size

}
