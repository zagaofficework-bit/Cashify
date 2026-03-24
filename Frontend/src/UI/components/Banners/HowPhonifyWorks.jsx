import React from "react";

const HowPhonifyWorks = () => {
  return (
    <div>
      <section className="bg-gray-50 px-6 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">How Phonify Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1: Check Price */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img
                src="./assets/img/CheckPrice.png"
                alt="Check Price"
                className="h-16 w-16 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Check Price</h3>
              <p className="text-gray-600 text-sm">
                Select your device & tell us about its current condition, and
                our advanced AI tech will tailor make the perfect price for you.
              </p>
            </div>

            {/* Step 2: Schedule Pickup */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img
                src="./assets/img/SchedulePickup.png" // replace with actual icon
                alt="Schedule Pickup"
                className="h-16 w-16 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Schedule Pickup</h3>
              <p className="text-gray-600 text-sm">
                Book a free pickup from your home or work at a time slot that
                best suits your convenience.
              </p>
            </div>

            {/* Step 3: Get Paid */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img
                src="./assets/img/GetPaid.png" // replace with actual icon
                alt="Get Paid"
                className="h-16 w-16 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Get Paid</h3>
              <p className="text-gray-600 text-sm">
                Did we mention you get paid as soon as our executive picks up
                your device? It's instant payment all the way!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowPhonifyWorks;
