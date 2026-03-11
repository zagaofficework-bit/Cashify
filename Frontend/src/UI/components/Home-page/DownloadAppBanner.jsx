import React from "react";

export default function DownloadAppBanner() {
  return (
    <section className="bg-teal-600 rounded text-white px-6 py-12 ml-12 mr-12 mb-12 rounded-lg " >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* Left: Text + Buttons */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">Download the App</h2>
          <p className="text-lg mb-6">
            Sell your old phone | Buy top-quality refurbished phones | Get your phone repaired
          </p>

          <div className="flex gap-4">
            {/* Google Play */}
            <a
              href="https://play.google.com/store/apps/details?id=com.Phonify"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src="./assets/img/GooglePlay.png"
                alt="Get it on Google Play"
                className="h-25 w-auto object-contain"
              />
            </a>

            {/* App Store */}
            <a
              href="https://apps.apple.com/in/app/Phonify/id123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src="./assets/img/AppStore.png"
                alt="Download on the App Store"
                className="h-25 w-auto object-contain"
              />
            </a>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="/images/app-preview.png" // replace with actual app preview image
            alt="App Preview"
            className="w-72 h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
