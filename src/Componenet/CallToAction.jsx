import React from "react";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
    const navigate=useNavigate();
    const handleNavi=()=>{
        navigate('/pets');

    }
  return (
    <div className="bg-green-600 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center">
       

        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left px-6">
          <h2 className="text-4xl font-bold text-green-50 mb-4">
            Give Them a Loving Home
          </h2>
          <p className="text-lg text-green-50 mb-6">
            Every pet deserves a second chance. By adopting, you’re not only
            changing their lives but also enriching yours with unconditional
            love and companionship. Start your journey today!
          </p>
          <button onClick={handleNavi} className="bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 font-bold text-base mb-2 md:mb-0">
            Adopt a Pet Now
          </button>
        </div>
         {/* Image Section */}
         <div className="lg:w-1/2 flex justify-center mb-8 lg:mb-0">
          <img
            src="/quote.jpg" // Replace with the actual path to the image
            alt="Adopt Pets"
            className="rounded-lg shadow-lg w-4/5 lg:w-3/4"
          />
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
