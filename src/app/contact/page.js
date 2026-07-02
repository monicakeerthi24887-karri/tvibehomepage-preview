"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, Instagram, Check, Send } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    phone: "",
    email: "",
    socialMedia: "",
    connectingFor: [],
    howDidYouHear: "",
    message: ""
  });

  const connectingOptions = [
    "Corporate sponsorships", "Food stalls", "Shopping booths", 
    "LED advertising", "Zone naming rights", "Stage performances", 
    "Art installations", "Club collaboration", "Volunteering", 
    "Attending", "Other services", "General Enquiries"
  ];

  const hearOptions = [
    "Digital marketing (Instagram, Facebook, tiktok ads from TVIBE)",
    "Flyers, posters at stores or businesses",
    "Community, associations or friends network",
    "TVIBE organizing team interacted with me",
    "Others"
  ];

  const handleCheckboxChange = (option) => {
    setFormData((prev) => {
      const current = prev.connectingFor;
      if (current.includes(option)) {
        return { ...prev, connectingFor: current.filter(item => item !== option) };
      } else {
        return { ...prev, connectingFor: [...current, option] };
      }
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            fullName: "",
            businessName: "",
            phone: "",
            email: "",
            socialMedia: "",
            connectingFor: [],
            howDidYouHear: "",
            message: ""
          });
        }, 5000);
      } else {
        alert("Failed to send inquiry. Please try again or email info@tvibe.ca directly.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactOptions = [
    { icon: Phone, title: "WhatsApp Support", details: "+1 (647) 495-4460", link: "https://wa.me/16474954460", color: "#34c759" },
    { icon: Mail, title: "Email Inquiries", details: "info@tvibe.ca", link: "mailto:info@tvibe.ca", color: "#00F0FF" },
    { icon: Instagram, title: "Official Instagram", details: "@tvibe.ca", link: "https://instagram.com/tvibe.ca", color: "#ff6b00" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-[#1a1a1a] font-sans relative">
      <Header />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        
        {/* Title Section */}
        <div className="text-center mb-16 relative z-10 mt-12">
          <h1 className="text-4xl sm:text-6xl font-qurova font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#e91e63] to-[#b22cff] inline-block mb-4">
            CONTACT US
          </h1>
          <p className="text-xs sm:text-sm font-satoshi font-bold text-[#666666] uppercase tracking-widest max-w-2xl mx-auto">
            We'd love to hear from you. Fill out the form below and our team will get back to you shortly.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start relative z-10">
          
          {/* Quick Contact Info Sidebar */}
          <div className="w-full lg:w-1/4 space-y-6">
            {contactOptions.map((opt, idx) => {
              const Icon = opt.icon;
              return (
                <a 
                  key={idx}
                  href={opt.link}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/80 backdrop-blur-md p-6 rounded-3xl flex flex-col items-center text-center shadow-lg hover:-translate-y-1 transition-transform border border-white group block"
                >
                  <div className="h-12 w-12 rounded-full mb-4 flex items-center justify-center shadow-md transition-colors" style={{ backgroundColor: opt.color }}>
                    <Icon strokeWidth={2.5} className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xs font-qurova font-black uppercase tracking-wider text-[#1a1a1a] mb-1 group-hover:text-[#ff4fa3] transition-colors">
                    {opt.title}
                  </h3>
                  <p className="text-[11px] font-satoshi font-bold text-[#666666]">
                    {opt.details}
                  </p>
                </a>
              );
            })}
          </div>

          {/* Main Form Container */}
          <div className="w-full lg:w-3/4 bg-white/95 backdrop-blur-xl p-8 sm:p-12 rounded-[2rem] shadow-2xl relative border border-[#ff4fa3]/20">
            {/* Subtle glow behind the form */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#b22cff]/20 to-[#ff4fa3]/20 rounded-[3rem] blur-xl z-[-1] opacity-50" />
            
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-pulse">
                <div className="w-20 h-20 bg-[#ff4fa3]/10 rounded-full flex items-center justify-center mb-6">
                  <Check strokeWidth={3} className="w-10 h-10 text-[#ff4fa3]" />
                </div>
                <h3 className="text-2xl font-qurova font-black uppercase tracking-wider text-[#1a1a1a] mb-2">
                  Inquiry Sent Successfully!
                </h3>
                <p className="text-sm font-satoshi font-bold text-[#666666]">
                  Thank you for reaching out. Our team will review your details and contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-8">
                
                {/* Basic Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-satoshi font-black text-[#1a1a1a] mb-2">
                      Full name <span className="text-[#ff4fa3]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white border border-[#e0e5ed] rounded-xl text-sm text-[#1a1a1a] p-4 font-medium focus:outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-[#ff4fa3]/10 transition-all shadow-sm"
                      placeholder="e.g. Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-satoshi font-black text-[#1a1a1a] mb-2">
                      Name of the business <span className="text-[#ff4fa3]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full bg-white border border-[#e0e5ed] rounded-xl text-sm text-[#1a1a1a] p-4 font-medium focus:outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-[#ff4fa3]/10 transition-all shadow-sm"
                      placeholder="e.g. Toronto Beats Co."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-satoshi font-black text-[#1a1a1a] mb-2">
                      Phone number <span className="text-[#ff4fa3]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-[#e0e5ed] rounded-xl text-sm text-[#1a1a1a] p-4 font-medium focus:outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-[#ff4fa3]/10 transition-all shadow-sm"
                      placeholder="e.g. +1 555 123 4567"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-satoshi font-black text-[#1a1a1a] mb-2">
                      Email <span className="text-[#ff4fa3]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-[#e0e5ed] rounded-xl text-sm text-[#1a1a1a] p-4 font-medium focus:outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-[#ff4fa3]/10 transition-all shadow-sm"
                      placeholder="e.g. jane@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-satoshi font-black text-[#1a1a1a] mb-2">
                    Social media handle
                  </label>
                  <input
                    type="text"
                    value={formData.socialMedia}
                    onChange={(e) => setFormData({ ...formData, socialMedia: e.target.value })}
                    className="w-full bg-white border border-[#e0e5ed] rounded-xl text-sm text-[#1a1a1a] p-4 font-medium focus:outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-[#ff4fa3]/10 transition-all shadow-sm"
                    placeholder="e.g. @janedoe"
                  />
                </div>

                {/* Connecting For (Checkboxes) */}
                <div>
                  <label className="block text-sm font-satoshi font-black text-[#1a1a1a] mb-4">
                    Connecting for
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {connectingOptions.map((opt, idx) => (
                      <label key={idx} className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0 group-hover:border-[#ff4fa3] transition-colors">
                          <input
                            type="checkbox"
                            checked={formData.connectingFor.includes(opt)}
                            onChange={() => handleCheckboxChange(opt)}
                            className="opacity-0 absolute inset-0 cursor-pointer"
                          />
                          {formData.connectingFor.includes(opt) && (
                            <Check strokeWidth={4} className="w-3.5 h-3.5 text-[#ff4fa3]" />
                          )}
                        </div>
                        <span className="text-xs font-satoshi font-bold text-[#4a4a4a] select-none group-hover:text-[#1a1a1a] transition-colors">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* How did you hear (Dropdown) */}
                <div>
                  <label className="block text-sm font-satoshi font-black text-[#1a1a1a] mb-2">
                    How did you hear about TVIBE festival ? <span className="text-[#ff4fa3]">*</span>
                  </label>
                  <select
                    required
                    value={formData.howDidYouHear}
                    onChange={(e) => setFormData({ ...formData, howDidYouHear: e.target.value })}
                    className="w-full bg-white border border-[#e0e5ed] rounded-xl text-sm text-[#1a1a1a] p-4 font-medium focus:outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-[#ff4fa3]/10 transition-all shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select an option...</option>
                    {hearOptions.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-satoshi font-black text-[#1a1a1a] mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-[#e0e5ed] rounded-xl text-sm text-[#1a1a1a] p-4 font-medium focus:outline-none focus:border-[#ff4fa3] focus:ring-4 focus:ring-[#ff4fa3]/10 transition-all shadow-sm resize-none"
                    placeholder="Tell us a bit more about what you're looking for..."
                  />
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center space-x-2 bg-[#3f51b5] text-white px-12 py-4 rounded-xl text-xs font-qurova font-bold uppercase tracking-widest shadow-lg hover:bg-[#303f9f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                  >
                    <span>{isSubmitting ? "Sending..." : "Submit"}</span>
                    {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
