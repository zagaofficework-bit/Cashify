import React from "react";

export default function WhyPhonify() {
  return (
    <section className="bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Why Choose Phonify?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Video 1 */}
          <div className="bg-white rounded-lg shadow p-4">
            <video
              src="/videos/refurbished-intro.mp4" // replace with actual video file
              controls
              poster="/images/refurbished-thumb.png" // optional thumbnail
              className="w-full rounded-lg"
            />
            <p className="mt-3 text-sm font-medium text-gray-700">
              All About Phonify's Refurbished Phones
            </p>
          </div>

          {/* Video 2 */}
          <div className="bg-white rounded-lg shadow p-4">
            <video
              src="/videos/be-the-change.mp4" // replace with actual video file
              controls
              poster="/images/be-the-change-thumb.png"
              className="w-full rounded-lg"
            />
            <p className="mt-3 text-sm font-medium text-gray-700">
              Be The Change – Packaging & Accessories
            </p>
          </div>

          {/* Video 3 */}
          <div className="bg-white rounded-lg shadow p-4">
            <video
              src="/videos/used-iphone13.mp4" // replace with actual video file
              controls
              poster="/images/iphone13-thumb.png"
              className="w-full rounded-lg"
            />
            <p className="mt-3 text-sm font-medium text-gray-700">
              Used iPhone 13 from Phonify
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}