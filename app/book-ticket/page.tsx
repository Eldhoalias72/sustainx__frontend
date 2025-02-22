"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface FormData {
  fullName: string;
  contactNumber: string;
  email: string;
  reEnterEmail: string;
  referralCode: string;
  foodPreference: string;
  college: string;
}

type FormInputEvent = ChangeEvent<HTMLInputElement>;
type FormSelectEvent = ChangeEvent<HTMLSelectElement>;

export default function BookTicket(): JSX.Element {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    contactNumber: "",
    email: "",
    reEnterEmail: "",
    referralCode: "",
    foodPreference: "",
    college: "",
  });

  const [emailError, setEmailError] = useState<string>("");

  const handleChange = (e: FormInputEvent | FormSelectEvent): void => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (formData.email !== formData.reEnterEmail) {
      setEmailError("Emails do not match");
      return;
    }
    setEmailError("");
    localStorage.setItem("bookingFormData", JSON.stringify(formData));

    // Navigate based on referral code
    if (formData.referralCode.trim().length === 5) {
      router.push("/book-ticket/paymentrefer");
    } else {
      router.push("/book-ticket/payment");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#00471B] text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-4xl bg-[#116530] backdrop-blur-lg rounded-2xl shadow-xl p-10 flex flex-col md:flex-row items-center"
      >
        {/* Right Section (Image & Welcome Message) - Moves to Top on Mobile */}
        <div className="w-full flex flex-col items-center justify-center text-center py-6 mt-[-80px] md:mt-[-270px]">
        <Image src="/images/wallehang.png" alt="WALL-E" width={180} height={180} className="object-contain" />
        <p className="text-white text-3xl font-bold mt-4">Welcome, {formData.fullName || "Future Attendee"}!</p>
        </div>


        {/* Left Section (Form) - Positioned Slightly Upwards */}
        <div className="w-full md:w-1/2 ">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white">Book Your Ticket</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {["fullName", "contactNumber", "email", "reEnterEmail","college", "referralCode"].map((id) => (
              <div key={id}>
                <input
                  type={id.includes("email") ? "email" : "text"}
                  id={id}
                  value={formData[id as keyof FormData]}
                  onChange={handleChange}
                  placeholder={
                    id === "fullName"
                      ? "Full Name"
                      : id === "contactNumber"
                      ? "Phone Number"
                      : id === "email"
                      ? "Email Address"
                      : id === "reEnterEmail"
                      ? "Re-enter Email"
                      : id === "college"
                      ? "College/School Name"
                      : "Referral Code (Optional)"
                  }
                  required={id !== "referralCode"}
                  className="w-full px-4 py-2 text-base bg-gray-200 text-black rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700 placeholder-gray-600 transition duration-200"
                />
                {id === "reEnterEmail" && emailError && <p className="text-red-600 text-sm">{emailError}</p>}
              </div>
            ))}

            {/* Food Preference Dropdown */}
            <div>
              <select
                id="foodPreference"
                value={formData.foodPreference}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-base bg-gray-200 text-black rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700 placeholder-gray-600 transition duration-200"
              >
                <option value="">Select Food Preference</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Non-Veg">Iftar</option>
              </select>
            </div>

            <div className="mt-4">
              <Button
                type="submit"
                className="w-full py-3 rounded-lg bg-green-700 text-white hover:bg-green-600 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Pay
              </Button>
            </div>
            <br />  
           Note: Workshop tickets are sold out
          </form>
        </div>
      </motion.div>
    </div>
  );
}
