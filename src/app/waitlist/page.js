"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Mail, ShieldCheck, Heart, Zap, Bell, Ticket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Waitlist() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    province: "",
    ageGroup: "",
    interests: [],
    howDidYouHear: "",
    message: "",
    newsletterOptIn: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInterestChange = (interest) => {
    setFormData((prev) => {
      if (prev.interests.includes(interest)) {
        return { ...prev, interests: prev.interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitSuccess(true);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } catch (err) {
      setErrorMsg("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const interestOptions = [
    "Music Arena", "Food Festival", "Shopping Village", "Creators Space",
    "Beauty District", "Kids & Family Zone", "Youth Hub", "Vendor Opportunities",
    "Sponsorships", "Volunteering", "VIP Experiences"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb] text-[#1a1a1a] font-sans">
      <Header />

      <main className="flex-1 w-full pt-32 pb-24 relative overflow-hidden">
        
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-[#f4ebfa] via-[#fff0f5] to-transparent z-0 opacity-70 pointer-events-none" />
        <div className="absolute top-40 right-[-10%] w-[600px] h-[600px] bg-gradient-to-r from-[#b22cff]/10 to-[#ff4fa3]/10 rounded-full blur-[120px] z-0 pointer-events-none" />
        <div className="absolute top-80 left-[-10%] w-[500px] h-[500px] bg-gradient-to-r from-[#ff4fa3]/10 to-[#ff8c00]/10 rounded-full blur-[120px] z-0 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">
            
            {/* Left Side: Info & Image Card */}
            <div className="w-full lg:w-[40%] bg-white rounded-[2rem] shadow-xl border border-gray-100 flex flex-col overflow-hidden">
              <div className="p-8 sm:p-10 xl:p-12 flex-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4fa3] mb-4 block">
                  JOIN THE TVIBE
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-qurova font-black uppercase tracking-tight text-[#1a1a1a] leading-[0.9] mb-6">
                  BE THE FIRST <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b22cff] to-[#ff4fa3]">TO KNOW.</span>
                </h1>
                
                <p className="text-sm font-satoshi font-bold text-[#666666] mb-12 max-w-sm leading-relaxed">
                  Join the TVIBE 2026 waitlist and be the first to get updates, early access, special offers and more!
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#ff4fa3]/10 flex items-center justify-center flex-shrink-0">
                      <Bell className="h-5 w-5 text-[#ff4fa3]" />
                    </div>
                    <div>
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-[#0055ff] mb-1">EARLY ACCESS</h3>
                      <p className="text-xs font-satoshi font-medium text-[#1a1a1a]">Get first access to tickets and announcements.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#b22cff]/10 flex items-center justify-center flex-shrink-0">
                      <Ticket className="h-5 w-5 text-[#b22cff]" />
                    </div>
                    <div>
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-[#0055ff] mb-1">EXCLUSIVE UPDATES</h3>
                      <p className="text-xs font-satoshi font-medium text-[#1a1a1a]">Be the first to know about lineup, activations and more.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#ff8c00]/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-5 w-5 text-[#ff8c00]" />
                    </div>
                    <div>
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-[#0055ff] mb-1">SPECIAL PERKS</h3>
                      <p className="text-xs font-satoshi font-medium text-[#1a1a1a]">Enjoy waitlist-only offers and surprises.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image filling the bottom of the card */}
              <div className="w-full h-64 sm:h-80 relative mt-auto">
                <img 
                  src="https://tvibe.ca/wp-content/uploads/2026/05/MUSIC-ARENA-IMG-1-768x512.png" 
                  alt="TVIBE Stage" 
                  className="absolute inset-0 w-full h-full object-cover object-bottom"
                />
                {/* Gradient overlay to blend bottom if needed, though raw image looks fine */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                  <h3 className="text-4xl font-qurova font-black text-white uppercase tracking-widest drop-shadow-2xl">
                    TVIBE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4fa3] to-[#ff8c00]">2026</span>
                  </h3>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-[60%]">
              <div className="bg-white rounded-[2rem] shadow-xl border border-gray-200 p-8 sm:p-10 xl:p-12 h-full">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#b22cff] via-[#ff4fa3] to-[#ff8c00]" />
                
                <h2 className="text-xl sm:text-2xl font-qurova font-black uppercase tracking-widest text-center text-[#ff4fa3] mb-4">
                  JOIN THE TVIBE 2026 WAITLIST
                </h2>
                <p className="text-xs font-satoshi font-bold text-center text-[#666666] mb-10">
                  Fill in your details below to secure your spot for Toronto's biggest music & culture festival experience.
                </p>

                {submitSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <Check className="h-10 w-10 text-green-600" strokeWidth={3} />
                    </div>
                    <h3 className="text-2xl font-qurova font-black uppercase tracking-widest text-[#1a1a1a] mb-4">
                      YOU'RE ON THE LIST!
                    </h3>
                    <p className="text-sm font-satoshi text-gray-600 max-w-sm">
                      Keep an eye on your inbox. We'll be sending you exclusive updates very soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative">
                    {/* Full Name & Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] mb-2">FULL NAME <span className="text-[#ff4fa3]">*</span></label>
                        <input 
                          type="text" 
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          placeholder="Enter your full name" 
                          className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-sm font-satoshi focus:outline-none focus:border-[#b22cff] transition-colors rounded-none placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] mb-2">EMAIL ADDRESS <span className="text-[#ff4fa3]">*</span></label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="Enter your email address" 
                          className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-sm font-satoshi focus:outline-none focus:border-[#b22cff] transition-colors rounded-none placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {/* Phone Row */}
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] mb-2">PHONE NUMBER <span className="text-[#ff4fa3]">*</span></label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="Enter your phone number" 
                        className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-sm font-satoshi focus:outline-none focus:border-[#b22cff] transition-colors rounded-none placeholder-gray-400"
                      />
                    </div>

                    {/* City & Province Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] mb-2">CITY</label>
                        <input 
                          type="text" 
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          placeholder="Enter your city" 
                          className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-sm font-satoshi focus:outline-none focus:border-[#b22cff] transition-colors rounded-none placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] mb-2">PROVINCE / STATE</label>
                        <select 
                          value={formData.province}
                          onChange={(e) => setFormData({...formData, province: e.target.value})}
                          className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-sm font-satoshi focus:outline-none focus:border-[#b22cff] transition-colors rounded-none text-[#1a1a1a] cursor-pointer"
                        >
                          <option value="">Select</option>
                          <option value="ON">Ontario</option>
                          <option value="QC">Quebec</option>
                          <option value="BC">British Columbia</option>
                          <option value="AB">Alberta</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Age Group */}
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] mb-2">AGE GROUP <span className="text-[#ff4fa3]">*</span></label>
                      <select 
                        required
                        value={formData.ageGroup}
                        onChange={(e) => setFormData({...formData, ageGroup: e.target.value})}
                        className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-sm font-satoshi focus:outline-none focus:border-[#b22cff] transition-colors rounded-none text-[#1a1a1a] cursor-pointer"
                      >
                        <option value="">Select</option>
                        <option value="18-24">18 - 24</option>
                        <option value="25-34">25 - 34</option>
                        <option value="35-44">35 - 44</option>
                        <option value="45+">45+</option>
                      </select>
                    </div>

                    {/* Interests Checkboxes */}
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] mb-3">I'M INTERESTED IN (SELECT ALL THAT APPLY)</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
                        {interestOptions.map((interest) => (
                          <label key={interest} className="flex items-center space-x-2 cursor-pointer group">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${formData.interests.includes(interest) ? 'bg-[#ff4fa3] border-[#ff4fa3]' : 'border-gray-300 group-hover:border-[#ff4fa3]'}`}>
                              {formData.interests.includes(interest) && <Check className="h-3 w-3 text-white" strokeWidth={4} />}
                            </div>
                            <input 
                              type="checkbox" 
                              className="hidden" 
                              checked={formData.interests.includes(interest)}
                              onChange={() => handleInterestChange(interest)}
                            />
                            <span className="text-[11px] font-satoshi font-medium text-gray-700">{interest}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* How did you hear */}
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] mb-2">HOW DID YOU HEAR ABOUT TVIBE?</label>
                      <select 
                        value={formData.howDidYouHear}
                        onChange={(e) => setFormData({...formData, howDidYouHear: e.target.value})}
                        className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-sm font-satoshi focus:outline-none focus:border-[#b22cff] transition-colors rounded-none text-[#1a1a1a] cursor-pointer"
                      >
                        <option value="">Select</option>
                        <option value="Instagram">Instagram</option>
                        <option value="TikTok">TikTok</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Friends & Family">Friends & Family</option>
                        <option value="Google Search">Google Search</option>
                        <option value="Influencer / Creator">Influencer / Creator</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Community Groups">Community Groups</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Message Area */}
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] mb-2">MESSAGE</label>
                      <textarea 
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="" 
                        className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-sm font-satoshi focus:outline-none focus:border-[#b22cff] transition-colors rounded-none placeholder-gray-400 resize-none"
                      />
                    </div>

                    {/* Newsletter Checkbox */}
                    <div className="pt-4">
                      <label className="flex items-start space-x-3 cursor-pointer group">
                        <div className={`mt-0.5 w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${formData.newsletterOptIn ? 'bg-[#ff4fa3] border-[#ff4fa3]' : 'border-gray-300 group-hover:border-[#ff4fa3]'}`}>
                          {formData.newsletterOptIn && <Check className="h-3 w-3 text-white" strokeWidth={4} />}
                        </div>
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={formData.newsletterOptIn}
                          onChange={(e) => setFormData({...formData, newsletterOptIn: !formData.newsletterOptIn})}
                        />
                        <span className="text-[11px] font-satoshi font-bold text-[#1a1a1a] leading-tight">
                          Yes! I'd like to receive event updates, lineup announcements, offers and exclusive experiences from TVIBE 2026.
                        </span>
                      </label>
                    </div>

                    {errorMsg && (
                      <p className="text-red-500 text-xs font-bold text-center mt-4">{errorMsg}</p>
                    )}

                    {/* Submit Button */}
                    <div className="pt-6 flex justify-center lg:justify-end">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full lg:w-auto relative flex items-center justify-center space-x-2 rounded-lg px-12 py-4 transition-transform hover:scale-[1.02] active:scale-95 cursor-pointer shadow-lg text-white font-qurova text-xs tracking-widest uppercase disabled:opacity-70"
                        style={{ background: "linear-gradient(to right, #ff4fa3, #ff8c00)" }}
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <span>JOIN WAITLIST</span>
                        )}
                      </button>
                    </div>

                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* HORIZONTAL FEATURES BANNER */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            
            <div className="flex items-center space-x-4 pl-0 sm:pl-4">
              <Mail className="h-8 w-8 text-[#b22cff] flex-shrink-0" />
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]">INSTANT CONFIRMATION</h4>
                <p className="text-[10px] text-gray-500 mt-1">You'll receive a confirmation email right after you sign up.</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 pl-4 sm:pl-8">
              <ShieldCheck className="h-8 w-8 text-[#ff4fa3] flex-shrink-0" />
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]">NO SPAM, PROMISE</h4>
                <p className="text-[10px] text-gray-500 mt-1">We'll only send you important updates and offers.</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 pl-4 sm:pl-8">
              <Zap className="h-8 w-8 text-[#b22cff] flex-shrink-0" />
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]">SECURE & PRIVATE</h4>
                <p className="text-[10px] text-gray-500 mt-1">Your data is protected and never shared.</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 pl-4 sm:pl-8">
              <Heart className="h-8 w-8 text-[#ff4fa3] flex-shrink-0" />
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]">THANK YOU!</h4>
                <p className="text-[10px] text-gray-500 mt-1">You're officially part of the TVIBE fam!</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* THE TVIBE AWAITS YOU SECTION */}
      <section className="bg-white pt-24 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-qurova font-black uppercase tracking-widest text-[#0055ff]">
            THE TVIBE AWAITS YOU
          </h2>
          <svg className="mx-auto mt-4 w-32" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10" stroke="#ff4fa3" strokeWidth="3" fill="none" />
          </svg>
        </div>

        <div className="w-full flex flex-col md:flex-row h-[300px] sm:h-[400px]">
          <div className="flex-1 relative overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Creators Space" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-2xl font-qurova font-black text-white uppercase tracking-widest">CREATORS SPACE</h3>
            </div>
          </div>
          <div className="flex-1 relative overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Beauty District" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-2xl font-qurova font-black text-white uppercase tracking-widest">BEAUTY DISTRICT</h3>
            </div>
          </div>
          <div className="flex-1 relative overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Food Festival" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-2xl font-qurova font-black text-white uppercase tracking-widest">FOOD FESTIVAL</h3>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CALLOUT */}
      <section className="bg-[#ff4fa3] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            <div className="h-16 w-16 rounded-full border-2 border-white flex items-center justify-center">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-qurova font-black uppercase tracking-tight text-white leading-tight">
                ONE EVENT. ENDLESS VIBES. <br/>
                TVIBE 2026.
              </h2>
            </div>
          </div>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-2 rounded-full px-8 py-4 transition-transform hover:scale-105 cursor-pointer border-2 border-white text-white font-qurova text-xs tracking-widest uppercase bg-[#ff8c00] hover:bg-[#ff8c00]/90"
          >
            <span>EXPLORE THE EXPERIENCE →</span>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
