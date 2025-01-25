"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import Navigation from "../../components/navigation";
import ParticleBackground from "../../components/particle-background";
import { Button } from "@/components/ui/button";


export default function BookTicket() {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    preferredSession: '',
    paymentScreenshot: null as File | null,
    referralCode: ''
  });

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, paymentScreenshot: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('contactNumber', formData.contactNumber);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('preferredSession', formData.preferredSession);
    formDataToSend.append('referralCode', formData.referralCode);
    if (formData.paymentScreenshot) {
      formDataToSend.append('paymentScreenshot', formData.paymentScreenshot);
    }

    try {
      const response = await fetch('https://sustainx-backend.onrender.com/api/ticketBookings', {
        method: 'POST',
        body: formDataToSend,
      });
      if (response.ok) {
        console.log('Booking saved successfully');
        router.push("/book-ticket/confirmation");
      } else {
        console.error('Failed to save booking');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-green-950 overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10">
        <Navigation />

        <main className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl mx-auto bg-green-900/30 backdrop-blur-sm rounded-xl p-8 border border-green-500/10"
          >
            <h1 className="text-4xl font-bold text-white mb-8">Book Your Ticket</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full px-3 py-2 rounded"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="contactNumber">Contact Number</label>
                <input
                  type="text"
                  id="contactNumber"
                  className="w-full px-3 py-2 rounded"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 rounded"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="preferredSession">Preferred Session</label>
                <select
                  id="preferredSession"
                  className="w-full px-3 py-2 rounded"
                  value={formData.preferredSession}
                  onChange={(e) => setFormData({ ...formData, preferredSession: e.target.value })}
                  required
                >
                  <option value="">Select a session</option>
                  <option value="Talk Session">Talk Session</option>
                  <option value="Workshop">Workshop</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="paymentScreenshot">Payment Screenshot</label>
                <input
                  type="file"
                  id="paymentScreenshot"
                  className="w-full px-3 py-2 rounded"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="referralCode">Referral Code (Optional)</label>
                <input
                  type="text"
                  id="referralCode"
                  className="w-full px-3 py-2 rounded"
                  value={formData.referralCode}
                  onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                />
              </div>
              <Button type="submit" className="bg-green-500 text-green-900 hover:bg-green-400">Submit</Button>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
}