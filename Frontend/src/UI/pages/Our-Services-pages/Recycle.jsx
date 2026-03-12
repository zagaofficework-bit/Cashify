import React from 'react'
import NavBar from '../../components/NavBar'
import NavMenu from '../../components/NavMenu'
import SellCard from '../../components/SellCard'
import { FaMobileAlt, FaMotorcycle, FaAward, FaSeedling, FaLeaf,FaGift, FaRecycle, FaTools } from "react-icons/fa";
import FAQ from '../../components/FAQ';
import Brands from '../../components/Brands';
import Footer from '../../components/Footer';

const Recycle = () => {
    const steps = [
    {
      icon: <FaMobileAlt className="text-teal-600 text-3xl" />,
      title: "Select Device",
      description: "Tell us a little about the device you'd like to recycle",
    },
    {
      icon: <FaMotorcycle className="text-teal-600 text-3xl" />,
      title: "Book Pickup",
      description: "We'll then assign a date & time for the pickup from your address",
    },
    {
      icon: <FaAward className="text-teal-600 text-3xl" />,
      title: "Get Reward",
      description: "Get the special reward we have in store for you",
    },
    {
      icon: <FaSeedling className="text-teal-600 text-3xl" />,
      title: "We Plant a Tree",
      description: "We plant a tree for every device recycled by us. - 10200+ trees planted so far*",
    },
  ];

  const infoBlocks = [
    {
      icon: <FaLeaf className="text-teal-600 text-2xl" />,
      title: "Need of the hour",
      description:
        "More smartphones, more e-waste. There has never been a more critical time to use our tech responsibly and dispose the same way.",
    },
    {
      icon: <FaMobileAlt className="text-teal-600 text-2xl" />,
      title: "We know our phones",
      description:
        "For years, we’ve been exclusively working with mobile phones. Each device is equally crucial to us and we make sure it is effectively recycled through our expertise.",
    },
    {
      icon: <FaGift className="text-teal-600 text-2xl" />,
      title: "Special Rewards",
      description:
        "We realize the importance of recycling and value each contribution equally. To show the same, we have some special rewards for all our amazing recyclers.",
    },
    {
      icon: <FaRecycle className="text-teal-600 text-2xl" />,
      title: "For the sake of the ecosystem",
      description:
        "Recycling, as opposed to dumping e-waste into landfills, can help us do our bit in reducing carbon footprint, pollution and global warming.",
    },
    {
      icon: <FaTools className="text-teal-600 text-2xl" />,
      title: "To avoid resource wastage",
      description:
        "By recycling, you salvage the usable elements in your phone. Some of these are precious non-renewable resources and need years to be produced.",
    },
  ];
  return (
    <>
      <NavMenu/>
      <div className="m-10 rounded rounded-lg">
      <SellCard title="Let's make the world a better place"/>
       <section className="bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Recycle in 4 Easy Steps</h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              {/* Icon */}
              <div className="mb-4">{step.icon}</div>
              {/* Title */}
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              {/* Description */}
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>

     <section className="bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left: Video Player */}
        <div className="bg-black w-full h-full  rounded-lg shadow-lg p-4 flex flex-col items-center">
          <iframe
          className="w-full h-full rounded-lg"
          src="https://www.youtube.com/embed/YOUR_VIDEO_ID" // replace with your YouTube link
          title="Recycle Awareness Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        </div>

        {/* Right: Info Blocks */}
        <div className="space-y-6">
          {infoBlocks.map((block, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div>{block.icon}</div>
              <div>
                <h3 className="font-semibold text-lg">{block.title}</h3>
                <p className="text-gray-600 text-sm">{block.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>


    <FAQ/>
    <Brands title="Top Recycle Brands"/>
    <Footer/>
    </>
  )
}

export default Recycle
