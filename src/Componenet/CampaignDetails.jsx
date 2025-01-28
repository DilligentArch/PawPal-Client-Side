import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useCampaign from "../Hooks/useCampaign";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../AuthProvider/AuthProvider";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLICATION_KEY);

const CampaignDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { id } = useParams();
  const { camp,refetch } = useCampaign();
  const campaign = camp.find((c) => c._id === id);
  const [showModal, setShowModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");

  if (!campaign) return <div>Loading...</div>;

  const {
    petName,
    petImage,
    maxDonationAmount,
    donatedAmount,
    lastDateOfDonation,
    shortDescription,
    longDescription,
    pause,
    createdAt,
    createdBy,
    totalDonationNeeded,
  } = campaign;

  const isDonationDisabled = pause || new Date(lastDateOfDonation) < new Date();

  const handleDonateClick = () => {
    if (isDonationDisabled) {
      const reason = pause
        ? "This donation campaign is currently paused."
        : "The donation period for this campaign has ended.";
      Swal.fire({
        icon: "info",
        title: "Unable to Donate",
        text: reason,
      });
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-11">
        <img src={petImage} alt={petName} className="w-full h-96  rounded-lg mb-4" />
        <h2 className="text-3xl font-bold text-green-700 mb-4">{petName}</h2>
        <p className="text-gray-600 mb-4">{shortDescription}</p>

        {isDonationDisabled && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
            <strong>
              {pause
                ? "This donation campaign is currently paused by the creator or an admin."
                : "The donation period for this campaign has ended."}
            </strong>
          </div>
        )}

        <div className="bg-green-100 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Campaign Details</h3>
          <p>
            <strong>Total Donation Needed:</strong> {totalDonationNeeded} BDT
          </p>
          <p>
            <strong>Maximum Donation Amount:</strong> {maxDonationAmount} BDT
          </p>
          <p>
            <strong>Total donation till now:</strong> {donatedAmount} BDT
          </p>
          <p>
            <strong>Last Date of Donation:</strong>{" "}
            {new Date(lastDateOfDonation).toLocaleDateString()}
          </p>
          <p>
            <strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Created By:</strong> {createdBy}
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-700 mb-2">About the Campaign</h3>
          <p className="text-gray-700 leading-relaxed">{longDescription}</p>
        </div>

        <button
          onClick={handleDonateClick}
          disabled={isDonationDisabled}
          className={`mt-6 w-full py-2 text-white rounded-lg ${isDonationDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            } transition`}
        >
          Donate Now
        </button>
      </div>

      {showModal && (
        <Elements stripe={stripePromise}>
          <DonationModal
            setShowModal={setShowModal}
            donationAmount={donationAmount}
            setDonationAmount={setDonationAmount}
            campaignId={id}
            currentDonatedAmount={donatedAmount}
            petName={campaign.petName}
            petImage={campaign.petImage}
            email={user?.email}
            name={user?.displayName}

          />
        </Elements>
      )}
    </div>
  );
};

const DonationModal = ({
  setShowModal,
  donationAmount,
  setDonationAmount,
  campaignId,
  currentDonatedAmount,
  petName,
  petImage,
  email,
  name
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { refetch } = useCampaign();

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount: donationAmount,
      });

      const clientSecret = data.clientSecret;

      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: error.message,
        });
      } else if (paymentIntent.status === "succeeded") {
        Swal.fire({
          icon: "success",
          title: "Donation Successful",
          text: `Thank you for donating ${donationAmount} BDT!`,
        });

        const updatedDonation = {
          donatedAmount: currentDonatedAmount + parseInt(donationAmount),
        };

        await axiosSecure.put(`/campaign/${campaignId}`, updatedDonation);
        const donationDetails = {
          email,
          name,
          petName,
          petImage,
          amount: donationAmount,

        };


        // console.log(donationDetails);
        await axiosSecure.post("/donation", donationDetails).then((res) => {
              if (res.data.insertedId) {
                // navigate("/donation");
              }
            });

        setShowModal(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
      });
    }
    refetch();  
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Donate to Campaign</h2>
        <form onSubmit={handleDonationSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Donation Amount</label>
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter donation amount"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Card Details</label>
            <CardElement className="border p-3 rounded-lg" />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Donate
          </button>
        </form>
      </div>
    </div>
  );
};

export default CampaignDetails;
