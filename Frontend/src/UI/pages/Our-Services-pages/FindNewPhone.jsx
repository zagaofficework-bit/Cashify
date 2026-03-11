import React from 'react'
import SlidingAnimations from '../../components/Home-page/SlidingAnimation'
import NavBar from '../../components/NavBar'
import NavMenu from '../../components/NavMenu'
import SearchByModel from '../../components/SearchByModel'
import Recents from '../../components/Home-page/Recents'
import Footer from '../../components/Home-page/Footer'

const FindNewPhone = () => {
    const videos = [
    {
      title: "How to sell your phone on Cashify?",
      description: "Sell your old phone at Cashify. Check your old phone's value in just 60 seconds",
      
    },
    {
      title: "How to Change iPhone 7 Battery at Home",
      description: "Phone broke down? Now get repair repaired at your doorstep using Cashify Repair",
      
    },
  ];
  return (
    <div>
        <NavBar/>
        <NavMenu/>
      <SlidingAnimations/>
      <SearchByModel/>
      <Recents/>
       <section className="bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Just For You</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              {/* YouTube Embed */}
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://youtu.be/zG3hNL08Dro?si=Pe8YzQlG3KhrXNYW"
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Text Content */}
              <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
              <p className="text-gray-600 text-sm">{video.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer/>
    </div>
  )
}

export default FindNewPhone
