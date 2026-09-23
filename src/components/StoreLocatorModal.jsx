import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Store, Send, CheckCircle2 } from 'lucide-react';

export default function StoreLocatorModal({ isOpen, onClose, activeFlavour }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', city: '', note: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const sampleStores = [
    { name: 'City Supermarket', address: 'Main Market Road, Sector 14', distance: '0.8 km' },
    { name: 'Gourmet Food Mart', address: 'Central Avenue Plaza', distance: '1.4 km' },
    { name: 'Shree Krishna Stores', address: 'Station Road, Near Bus Terminal', distance: '2.1 km' }
  ];

  const primaryColor = activeFlavour?.colors?.primary || '#FF9E00';
  const darkColor = activeFlavour?.colors?.dark || '#3A1C00';
  const bgColor = activeFlavour?.colors?.background || '#FFF6DB';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-white border-3 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-left"
          style={{ borderColor: darkColor, color: darkColor }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border"
            style={{ color: darkColor, borderColor: `${darkColor}30` }}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold border-2 shadow-sm"
              style={{ backgroundColor: primaryColor, borderColor: darkColor }}
            >
              <Store className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-sheetal font-black text-2xl" style={{ color: darkColor }}>
                Find Retailers & Inquire
              </h3>
              <p className="text-xs font-semibold opacity-75" style={{ color: darkColor }}>
                Visual UI Demo — Search nearby stores or send distribution inquiry for {activeFlavour.name}.
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 shadow-sm"
                style={{ backgroundColor: bgColor, borderColor: darkColor }}
              >
                <CheckCircle2 className="w-8 h-8" style={{ color: primaryColor }} />
              </div>
              <h4 className="font-sheetal font-black text-2xl mb-2" style={{ color: darkColor }}>
                Inquiry Received!
              </h4>
              <p className="text-sm max-w-md mx-auto mb-6 opacity-90" style={{ color: darkColor }}>
                Thank you for your inquiry regarding <span className="font-bold underline">{activeFlavour.name}</span>. Our distribution team will contact you shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-full text-xs font-sheetal font-black uppercase tracking-wider text-white cursor-pointer shadow-md border-2"
                style={{ backgroundColor: primaryColor, borderColor: darkColor }}
              >
                Close Window
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Search Bar */}
              <div className="text-left">
                <label className="text-xs uppercase font-sheetal font-black tracking-wider block mb-2" style={{ color: darkColor }}>
                  Search Retailers by Pincode or City:
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-4 top-3.5 opacity-60" style={{ color: darkColor }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter pincode or city name (e.g. 400001, Mumbai)..."
                    className="w-full bg-slate-50 border-2 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none transition-colors"
                    style={{ borderColor: `${darkColor}30`, color: darkColor }}
                  />
                </div>
              </div>

              {/* Sample Retailer Cards */}
              <div className="space-y-2 text-left">
                <span className="text-[11px] uppercase font-bold tracking-wider block opacity-75" style={{ color: darkColor }}>
                  Sample Nearby Authorized Stores:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {sampleStores.map((st, i) => (
                    <div 
                      key={i} 
                      className="p-3 rounded-xl border text-left bg-slate-50 shadow-sm"
                      style={{ borderColor: `${darkColor}20` }}
                    >
                      <div className="text-xs font-bold truncate" style={{ color: darkColor }}>{st.name}</div>
                      <div className="text-[10px] opacity-75 truncate" style={{ color: darkColor }}>{st.address}</div>
                      <div className="text-[10px] font-bold mt-1" style={{ color: primaryColor }}>{st.distance} away</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Distribution Inquiry Form */}
              <form 
                onSubmit={handleSubmit} 
                className="pt-4 border-t-2 space-y-4 text-left"
                style={{ borderColor: `${darkColor}20` }}
              >
                <div className="text-xs font-sheetal font-black uppercase tracking-wider" style={{ color: darkColor }}>
                  Bulk / Retailer Distribution Inquiry:
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name / Store Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-slate-50 border-2 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                    style={{ borderColor: `${darkColor}30`, color: darkColor }}
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-slate-50 border-2 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                    style={{ borderColor: `${darkColor}30`, color: darkColor }}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold border hover:bg-slate-100 cursor-pointer"
                    style={{ color: darkColor, borderColor: `${darkColor}30` }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-sheetal font-black uppercase tracking-wider text-white flex items-center gap-2 cursor-pointer shadow-md border-2"
                    style={{ backgroundColor: primaryColor, borderColor: darkColor }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Inquiry
                  </button>
                </div>
              </form>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
