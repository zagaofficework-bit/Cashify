import React from 'react'
import Brands from '../components/Brands'
import HowCashifyWorks from '../components/HowCashifyWorks'
import Feedback from '../components/Feedback'
import FAQ from '../components/FAQ'
import StoreSection from '../components/StoreSection'
import DownloadAppBanner from '../components/DownloadAppBanner'
import Footer from '../components/Footer'


const RepairLaptop = () => {
    const services = [
    { name: "SCREEN", icon: "./assets/icons/ScreenLaptop.png" },
    { name: "BATTERY", icon: "./assets/icons/BatteryLaptop.png" },
    { name: "MOTHERBOARD", icon: "./assets/icons/MotherboardLaptop.png" },
    { name: "KEYPAD", icon: "./assets/icons/KeypadLaptop.png" },
  ];

  return (
    <div>
      <Brands title="Top Brands"/>
      <HowCashifyWorks/>
       <img src="./assets/img/WhyUs.png" alt="Why Us" />
       
       
       <section className="bg-gray-50 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Services Available
          </h2>
           <div
              className="flex overflow-x-hidden space-x-6 scrollbar-hide  scroll-smooth px-12"
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center min-w-[120px] bg-white rounded-lg shadow p-4"
                >
                  <img
                    src={service.icon}
                    alt={service.name}
                    className="h-16 w-16 mb-2 object-contain"
                  />
                  <p className="text-sm font-semibold">{service.name}</p>
                </div>
              ))}
            </div>
            </div>
       </section>

<Feedback />
      <FAQ />
      <StoreSection />
      <DownloadAppBanner />
       <div className="max-w-6xl mx-auto m-5">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Laptop Repair Services at Cashify
        </h2>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <h3>
            Cashify is a great place to get your laptop repair service easily.
            No matter what’s wrong with your beloved laptop, Cashify makes the
            repair easy and trustworthy. They have trained technicians who will
            take good care of your laptop, figure out what’s wrong, and fix it.
            If your laptop has a broken screen, a bad battery, or any other
            problem, Cashify can help with affordable repairs. You can choose to
            have them come to your home or visit a nearby store to get it fixed.
          </h3>

          <h3>
            The best thing about Cashify is the doorstep repair service. You can
            book online to have someone pick up your laptop at a time and place
            that works best for you. After the repair, your laptop will be
            safely brought back to you. If you would like to go to a store, you
            can visit a Cashify shop nearby. The technicians there will check
            your laptop, give you a quote, and fix it on the spot.
          </h3>

          <h3>
            Cashify makes laptop repair affordable. You can save up to{" "}
            <span className="font-semibold">40%</span> on repair costs compared
            to other repair services, regardless of brand. All replacements are
            done using <span className="font-semibold">Cashify Certified Parts</span>.
            These parts are tested for quality, so you know your laptop is in
            good hands. From laptop screen repair to battery replacement and
            keyboard fixes, Cashify covers a wide range of services, giving a
            professional touch every time.
          </h3>

          <h3>
            We at Cashify are committed to giving our customers the complete
            peace of mind they deserve with our reliable warranties. Our laptop
            screen repair comes with a <span className="font-semibold">6-month warranty</span>,
            while other spare parts are covered under a{" "}
            <span className="font-semibold">3-month warranty</span>. Additionally,
            we offer a <span className="font-semibold">7-day money-back guarantee</span> for
            screen and battery replacements, reflecting our confidence in the
            quality of our services.
          </h3>

          <h3>
            Your data is safe with Cashify. It is our top priority to keep your
            data safe. You can choose to create a guest login or share a
            temporary password to make sure your information is protected during
            repairs.
          </h3>

          <h3>
            Cashify is easy to find through their stores, website, or app. If
            you need to get your laptop fixed quickly and affordably, Cashify is
            the way to go!
          </h3>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default RepairLaptop
