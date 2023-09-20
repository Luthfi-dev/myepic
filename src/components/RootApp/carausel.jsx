import React, { useState, useEffect } from 'react';

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Function to change the slide
  const changeSlide = () => {
    if (!isPaused) {
      document.getElementById(`s${currentSlide}`).checked = true;
      setCurrentSlide((prevSlide) => (prevSlide % 5) + 1);
    }
  };

  // Start the auto-scroll
  useEffect(() => {
    const slideInterval = setInterval(changeSlide, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  // Function to pause the auto-scroll
  const pauseSlide = () => {
    setIsPaused(true);
  };

  // Function to resume the auto-scroll
  const resumeSlide = () => {
    setIsPaused(false);
  };

  return (<>...</>);

//   return (
//     <div>
//       <section id="slider">
//         {/* Radio buttons and labels */}
//         {[1, 2, 3, 4, 5].map((index) => (
//           <div key={index}>
//             <input
//               type="radio"
//               name="slider"
//               id={`s${index}`}
//               checked={currentSlide === index}
//             />
//             <label htmlFor={`s${index}`} id={`slide${index}`}>
//               <div className="zoom-container">
//                 <img
//                   src={`https://source.unsplash.com/random/800x600?sig=${index}`}
//                   alt={`Image ${index}`}
//                 />
//               </div>
//             </label>
//           </div>
//         ))}
//       </section>

//       <style jsx>{`
//           /* General styling */
// body {
//   margin: 0;
//   background: #484848;  /* Airbnb's dark gray */
//   user-select: none;
//   font-family: 'Helvetica Neue', sans-serif;  /* Airbnb's font */
// }

// /* Slider container */
// #slider {
//   position: relative;
//   width: 50%;
//   height: 32vw;
//   margin: 150px auto;
//   perspective: 1400px;
//   transform-style: preserve-3d;
//   border-radius: 12px;  /* Rounded corners */
// }

// /* Radio buttons for slide control */
// input[type=radio] {
//   position: relative;
//   top: 108%;
//   left: 50%;
//   width: 20px;  /* Slightly larger */
//   height: 20px;  /* Slightly larger */
//   margin: 0 15px 0 0;
//   background: #ccc;  /* Light gray */
//   border: 2px solid #ccc;  /* Light gray */
//   border-radius: 50%;  /* Rounded corners */
//   cursor: pointer;
//   transform: translateX(-83px);
//   transition: background 300ms ease, border 300ms ease;  /* Smooth transition */
// }

// input[type=radio]:checked {
//   background: #FF5A5F;  /* Airbnb's coral red */
//   border: 2px solid #FF5A5F;  /* Airbnb's coral red */
// }

// /* Labels and images */
// #slider label,
// #slider label img {
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   left: 0;
//   top: 0;
//   border-radius: 12px;  /* Rounded corners */
//   transition: transform 400ms ease, opacity 400ms ease;  /* Added opacity transition */
// }

// /* New addition for Zoom Effect */
// .zoom-container {
//   overflow: hidden; /* Hide the part of the image that extends outside the div */
// }

// /* Zoom effect */
// .zoom-container:hover {
//   cursor: default; /* Change cursor to zoom-in icon */
// }

// .zoom-container:hover img {
//   transform: scale(1.4); /* Zoom level */
//   transition: transform .5s ease-in-out;
// }

// /* Existing transition rules */
// #s1:checked ~ #slide1, 
// #s2:checked ~ #slide2, 
// #s3:checked ~ #slide3, 
// #s4:checked ~ #slide4, 
// #s5:checked ~ #slide5 {
//   box-shadow: 0 13px 26px rgba(0,0,0, 0.3), 0 12px 6px rgba(0,0,0, 0.2);
//   transform: translate3d(0%, 0, 0px);
// }

// #s1:checked ~ #slide2, 
// #s2:checked ~ #slide3, 
// #s3:checked ~ #slide4, 
// #s4:checked ~ #slide5, 
// #s5:checked ~ #slide1 {
//   box-shadow: 0 6px 10px rgba(0,0,0, 0.3), 0 2px 2px rgba(0,0,0, 0.2);
//   transform: translate3d(20%, 0, -100px);
// }

// #s1:checked ~ #slide3,
// #s2:checked ~ #slide4,
// #s3:checked ~ #slide5,
// #s4:checked ~ #slide1,
// #s5:checked ~ #slide2 {
//   box-shadow: 0 1px 4px rgba(0,0,0, 0.4);
//   transform: translate3d(40%, 0, -250px);
// }

// #s1:checked ~ #slide4,
// #s2:checked ~ #slide5,
// #s3:checked ~ #slide1,
// #s4:checked ~ #slide2,
// #s5:checked ~ #slide3 {
//   box-shadow: 0 1px 4px rgba(0,0,0, 0.4);
//   transform: translate3d(-40%, 0, -250px);
// }

// #s1:checked ~ #slide5,
// #s2:checked ~ #slide1,
// #s3:checked ~ #slide2,
// #s4:checked ~ #slide3,
// #s5:checked ~ #slide4 {
//   box-shadow: 0 6px 10px rgba(0,0,0, 0.3), 0 2px 2px rgba(0,0,0, 0.2);
//   transform: translate3d(-20%, 0, -100px);
// }

//       `}</style>

//       {/* Adding event listeners to pause and resume auto-scroll on hover */}
//       <div className="zoom-container">
//         <div
//           onMouseOver={pauseSlide}
//           onMouseOut={resumeSlide}
//           onMouseMove={(event) => {
//             if (!isPaused) return;

//             const container = event.currentTarget;
//             const boundingRect = container.getBoundingClientRect();
//             const offsetX = event.clientX - boundingRect.left;
//             const offsetY = event.clientY - boundingRect.top;

//             if (
//               offsetX < 0 ||
//               offsetX > boundingRect.width ||
//               offsetY < 0 ||
//               offsetY > boundingRect.height
//             ) {
//               resumeSlide();
//             }
//           }}
//           className={`zoom-container${isPaused ? ' zoomed' : ''}`}
//           style={{ overflow: isPaused ? 'visible' : 'hidden' }}
//         ></div>
//       </div>
//     </div>
//   );
};

export default ImageCarousel;
