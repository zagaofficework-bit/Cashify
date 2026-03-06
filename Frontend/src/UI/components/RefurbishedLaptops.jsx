// import React, { useState } from "react";

// export default function RefurbishedLaptops() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const laptops = [
//     {
//       name: "Apple MacBook Pro 2023 A2992 (Apple M3 Pro Chip)",
//       discount: "₹63,000 OFF",
//       saleTag: "Holi Sale",
//       rating: "5.0★",
//       percent: "-31%",
//       price: "₹1,38,999",
//       original: "₹2,01,999",
//       gold: "₹1,36,219 with GOLD",
//       stock: "2 left",
//       image: "https://m.media-amazon.com/images/I/510uTHyDqGL._AC_UF1000,1000_QL80_.jpg",
//     },
//     {
//       name: "Apple MacBook Pro 2024 A3112 (Apple M4 Chip)",
//       discount: "₹29,500 OFF",
//       saleTag: "Flash Sale",
//       rating: "4.7★",
//       percent: "-18%",
//       price: "₹1,29,999",
//       original: "₹1,59,499",
//       gold: "₹1,26,811 with GOLD",
//       stock: "3 left",
//       image: "/images/macbook-m4.jpg",
//     },
//     {
//       name: "Apple MacBook Pro 2023 A2779 (Apple M2 Pro Chip)",
//       discount: "₹20,600 OFF",
//       saleTag: "Holi Sale",
//       rating: "4.6★",
//       percent: "-16%",
//       price: "₹1,04,799",
//       original: "₹1,25,399",
//       gold: "₹1,02,115 with GOLD",
//       stock: "1 left",
//       image: "/images/macbook-m2pro.jpg",
//     },
//     {
//       name: "Lenovo IdeaPad 5 Pro Series 14IMH9 (Intel Core Ultra 9)",
//       discount: "₹37,001 OFF",
//       saleTag: "Holi Sale",
//       rating: "4.8★",
//       percent: "-27%",
//       price: "₹97,999",
//       original: "₹1,35,000",
//       gold: "₹95,451 with GOLD",
//       stock: "1 left",
//       image: "/images/lenovo-ideapad.jpg",
//     },
//     {
//       name: "Lenovo Thinkpad T Series T1 Gen 5 (Intel Core Ultra 7)",
//       discount: "₹32,500 OFF",
//       saleTag: "Flash Sale",
//       rating: "3.7★",
//       percent: "-29%",
//       price: "₹79,999",
//       original: "₹1,12,499",
//       gold: "₹78,399 with GOLD",
//       stock: "1 left",
//       image: "/images/lenovo-thinkpad.jpg",
//     },
//     {
//       name: "Apple MacBook Pro 2024 A3112 (Apple M4 Chip)",
//       discount: "₹29,500 OFF",
//       saleTag: "Flash Sale",
//       rating: "4.7★",
//       percent: "-18%",
//       price: "₹1,29,999",
//       original: "₹1,59,499",
//       gold: "₹1,26,811 with GOLD",
//       stock: "3 left",
//       image: "/images/macbook-m4.jpg",
//     },
//   ];

//   const visibleItems = 5;

//   const nextSlide = () => {
//     setCurrentIndex((prev) =>
//       prev < laptops.length - visibleItems ? prev + 1: prev
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) =>
//       prev > 0 ? prev - 1 : 0
//     );
//   };

//   return (
//      <div className="max-w-7xl mx-auto px-6 py-6">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">
//         Refurbished Laptops
//       </h2>

//       <div className="overflow-hidden">
//         <div
//           className="flex transition-transform duration-500"
//           style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
//         >
//           {laptops.map((laptop, index) => (
//             <div
//               key={index}
//               className="w-1/5 flex-shrink-0 p-4 bg-white rounded-lg shadow-md mx-2"
//             >
//               <img
//                 src={laptop.image}
//                 alt={laptop.name}
//                 className="w-full h-40 object-contain mb-3"
//               />
//               <p className="text-green-600 font-bold">{laptop.discount}</p>
//               <h3 className="text-sm font-semibold text-gray-800 mt-2">
//                 {laptop.name}
//               </h3>
//               <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
//                 <span>{laptop.saleTag}</span>
//                 <span>{laptop.rating}</span>
//               </div>
//               <p className="text-red-600 font-bold mt-2">{laptop.percent}</p>
//               <p className="text-lg font-bold text-gray-800">{laptop.price}</p>
//               <p className="line-through text-gray-500">{laptop.original}</p>
//               <p className="text-teal-600 font-medium mt-1">{laptop.gold}</p>
//               <p className="text-xs text-gray-500 mt-1">{laptop.stock}</p>
//               <span className="mt-3 inline-block bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded">
//                 Cashify Assured
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Arrows */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-40"
//       >
//         &#x3c;
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-40"
//       >
//         &#x3e;
//       </button>
//    </div>
//   );
// }
import React, { useState } from "react";

export default function RefurbishedLaptops() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const laptops = [
    {
      name: "Apple MacBook Pro 2023 A2992 (Apple M3 Pro Chip)",
      discount: "₹63,000 OFF",
      saleTag: "Holi Sale",
      rating: "5.0★",
      percent: "-31%",
      price: "₹1,38,999",
      original: "₹2,01,999",
      gold: "₹1,36,219 with GOLD",
      stock: "2 left",
      image: "https://m.media-amazon.com/images/I/510uTHyDqGL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      name: "Apple MacBook Pro 2024 A3112 (Apple M4 Chip)",
      discount: "₹29,500 OFF",
      saleTag: "Flash Sale",
      rating: "4.7★",
      percent: "-18%",
      price: "₹1,29,999",
      original: "₹1,59,499",
      gold: "₹1,26,811 with GOLD",
      stock: "3 left",
      image: "/images/macbook-m4.jpg",
    },
    {
      name: "Apple MacBook Pro 2023 A2779 (Apple M2 Pro Chip)",
      discount: "₹20,600 OFF",
      saleTag: "Holi Sale",
      rating: "4.6★",
      percent: "-16%",
      price: "₹1,04,799",
      original: "₹1,25,399",
      gold: "₹1,02,115 with GOLD",
      stock: "1 left",
      image: "/images/macbook-m2pro.jpg",
    },
    {
      name: "Lenovo IdeaPad 5 Pro Series 14IMH9 (Intel Core Ultra 9)",
      discount: "₹37,001 OFF",
      saleTag: "Holi Sale",
      rating: "4.8★",
      percent: "-27%",
      price: "₹97,999",
      original: "₹1,35,000",
      gold: "₹95,451 with GOLD",
      stock: "1 left",
      image: "/images/lenovo-ideapad.jpg",
    },
    {
      name: "Lenovo Thinkpad T Series T1 Gen 5 (Intel Core Ultra 7)",
      discount: "₹32,500 OFF",
      saleTag: "Flash Sale",
      rating: "3.7★",
      percent: "-29%",
      price: "₹79,999",
      original: "₹1,12,499",
      gold: "₹78,399 with GOLD",
      stock: "1 left",
      image: "/images/lenovo-thinkpad.jpg",
    },
    {
      name: "Apple MacBook Pro 2024 A3112 (Apple M4 Chip)",
      discount: "₹29,500 OFF",
      saleTag: "Flash Sale",
      rating: "4.7★",
      percent: "-18%",
      price: "₹1,29,999",
      original: "₹1,59,499",
      gold: "₹1,26,811 with GOLD",
      stock: "3 left",
      image: "/images/macbook-m4.jpg",
    },
  ];

  const visibleItems = 5;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev < laptops.length - visibleItems ? prev + 1 : prev
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Refurbished Laptops</h2>

        {/* Slider container relative for absolute arrows */}
        <div className="relative overflow-hidden">

          {/* Slider flex container */}
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
          >
            {laptops.map((laptop, index) => (
              <div
                key={index}
                className="w-1/5 flex-shrink-0 p-4 bg-white rounded-lg shadow-md mx-2"
              >
                <img
                  src={laptop.image}
                  alt={laptop.name}
                  className="w-full h-40 object-contain mb-3"
                />
                <p className="text-green-600 font-bold">{laptop.discount}</p>
                <h3 className="text-sm font-semibold text-gray-800 mt-2">{laptop.name}</h3>
                <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
                  <span>{laptop.saleTag}</span>
                  <span>{laptop.rating}</span>
                </div>
                <p className="text-red-600 font-bold mt-2">{laptop.percent}</p>
                <p className="text-lg font-bold text-gray-800">{laptop.price}</p>
                <p className="line-through text-gray-500">{laptop.original}</p>
                <p className="text-teal-600 font-medium mt-1">{laptop.gold}</p>
                <p className="text-xs text-gray-500 mt-1">{laptop.stock}</p>
                <span className="mt-3 inline-block bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded">
                  Cashify Assured
                </span>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-40"
            aria-label="Previous Slide"
          >
            &#x3c;
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= laptops.length - visibleItems}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-40"
            aria-label="Next Slide"
          >
            &#x3e;
          </button>
        </div>
      </div>
    </section>
  );
}