import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      feedback:
        "Adopting my dog through PawPal was the best decision I ever made. The process was smooth, and now I have a loyal companion who brightens my days!",
    },
    {
      id: 2,
      name: "Emily Smith",
      feedback:
        "Contributing to donation campaigns on PawPal has been a fulfilling experience. Knowing that my donations help provide food and shelter for these animals is heartwarming.",
    },
    {
      id: 3,
      name: "Michael Brown",
      feedback:
        "I was able to adopt a beautiful kitten who was in need of a home. PawPal made it easy to connect with the shelter and complete the adoption process.",
    },
  ];

  return (
    <div className="bg-green-600 py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-8">
          What People Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {testimonials.map(({ id, name, feedback }) => (
            <div
              key={id}
              className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-green-600"
            >
              <h3 className="text-xl font-bold text-green-700 mb-2 text-center">
                {name}
              </h3>
              <p className="text-gray-700 leading-relaxed text-center">
                "{feedback}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
