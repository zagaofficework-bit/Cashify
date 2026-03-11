import React from "react";
import NavMenu from "../../components/NavMenu";
import BuyRefurbishedDevices from "../../components/Home-page/BuyRefurbishedDevices";
import Footer from "../../components/Home-page/Footer";

export default function NewAccessories() {
  return (
    <>
      <NavMenu />

      <section className="text-white px-6 py-12">
        <div className="mx-6 border border-2">
          <div className="flex flex-wrap justify-center gap-6">
            <img
              alt="https://s3n.Phonify.in/estore/406da96e57f4498db9ce805837113b44.webp"
              class="cursor-pointer h-auto w-full gm-added gm-lazy"
              loading="lazy"
              fetchpriority="low"
              width="400"
              height="100"
              data-gumlet="false"
              src="https://s3ng.Phonify.in/estore/406da96e57f4498db9ce805837113b44.webp"
            ></img>
          </div>
        </div>

        <section className="bg-gray-50 p-5 my-6">
          <div className="flex flex-2 gap-6 my-6 mx-6 justify-center">
            <img
              alt="https://s3n.Phonify.in/estore/c01a19a21cec428dbf47e6e1f0e99380.webp"
              class="flex h-150 w-140 gm-added gm-lazy"
              loading="lazy"
              fetchpriority="low"
              data-gumlet="false"
              src="https://s3ng.Phonify.in/estore/c01a19a21cec428dbf47e6e1f0e99380.webp"
            ></img>

            <img
              alt="https://s3n.Phonify.in/estore/0675945ec3bc4725832f74e498880a95.webp"
              class="flex h-150 w-140 gm-added gm-lazy"
              loading="lazy"
              fetchpriority="low"
              data-gumlet="false"
              src="https://s3ng.Phonify.in/estore/0675945ec3bc4725832f74e498880a95.webp"
            ></img>
          </div>
        </section>
        <img
          alt="-infographics"
          class="h-auto w-full gm-added gm-lazy"
          loading="lazy"
          fetchpriority="low"
          width="400"
          height="100"
          data-gumlet="false"
          src="https://s3ng.Phonify.in/estore/3ee66265f9a84ab68507a931dd01b8ea.webp"
        ></img>

        <BuyRefurbishedDevices title="Best Selling" />
      </section>
      <img src="./assets/img/WhySugato.png" alt="why sugato" />
      <Footer />
    </>
  );
}
