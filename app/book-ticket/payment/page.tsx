"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

// Define interfaces for form data types
interface BookingFormData {
  name?: string;
  email?: string;
  phone?: string;
  [key: string]: string | undefined; // Allow for additional string fields
}

interface PaymentFormData {
  paymentScreenshot: File | null;
  transactionId: string;
}

export default function PaymentPage() {
  const [formData, setFormData] = useState<PaymentFormData>({
    paymentScreenshot: null,
    transactionId: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [previousFormData, setPreviousFormData] = useState<BookingFormData | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('bookingFormData');
    if (savedData) {
      setPreviousFormData(JSON.parse(savedData));
    } else {
      router.push('/book-ticket');
    }
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, paymentScreenshot: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    if (previousFormData) {
      Object.entries(previousFormData).forEach(([key, value]) => {
        if (value) {
          formDataToSend.append(key, value);
        }
      });
    }
    if (formData.paymentScreenshot) {
      formDataToSend.append('paymentScreenshot', formData.paymentScreenshot);
    }
    formDataToSend.append('transactionId', formData.transactionId);

    try {
      const response = await fetch("https://sustainx-backend.onrender.com/api/ticketBookings", {
        method: "POST",
        body: formDataToSend,
      });
      if (response.ok) {
        localStorage.removeItem('bookingFormData');
        router.push("/book-ticket/confirmation");
      } else {
        console.error("Failed to save booking");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#00471B] text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-4xl bg-[#116530] backdrop-blur-lg rounded-2xl shadow-xl p-10"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Complete Payment</h1>
        <div className="flex justify-center mb-6">
          <Image src="/images/igbcqrnew.jpg" alt="Payment QR Code" width={200} height={200} className="rounded-lg shadow-lg" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="paymentScreenshot" className="block text-sm font-medium">Payment Screenshot</label>
            <input
              type="file"
              id="paymentScreenshot"
              className="w-full px-4 py-2 text-base bg-gray-200 text-black rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700 placeholder-gray-600 transition duration-200"
              onChange={handleFileChange}
              required
            />
          </div>
          <div>
            <label htmlFor="transactionId" className="block text-sm font-medium">UPI Transaction ID</label>
            <input
              type="text"
              id="transactionId"
              className="w-full px-4 py-2 text-base bg-gray-200 text-black rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700 transition duration-200"
              value={formData.transactionId}
              onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
              required
            />
          </div>
          <div className="mt-4 flex flex-col items-center">
            <Button
              type="submit"
              className="w-full py-3 rounded-lg bg-green-700 text-white hover:bg-green-600 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Submit"}
            </Button>
            {loading && (
              <p className="mt-4 text-sm text-gray-300">Please wait a minute...</p>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
