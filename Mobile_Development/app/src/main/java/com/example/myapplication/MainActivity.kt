package com.example.myapplication

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.Menu
import androidx.fragment.app.Fragment
import com.example.myapplication.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private  lateinit var binding : ActivityMainBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        replaceFragment(FragmentHome())
        binding.bottomView.setOnItemSelectedListener {
            when(it.itemId){
                R.id.nav_home->replaceFragment(FragmentHome())
                R.id.nav_search->replaceFragment(SearchFragment())
                R.id.nav_profile->replaceFragment(ProfileFragment())
                else->{
                }
            }
            true
        }

    }
    private fun replaceFragment(fragment: Fragment){
        val fragmentManager  = supportFragmentManager
        val fragmentTransaction = fragmentManager.beginTransaction()
        fragmentTransaction.replace(R.id.frame_container,fragment)
        fragmentTransaction.commit()
    }

}