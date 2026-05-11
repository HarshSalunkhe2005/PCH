"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Info, Phone, ThumbsUp } from "lucide-react";

// Mock data to visualize the read-only logistics hub
const meetups = [
  {
    id: 1,
    location: "Baner",
    venue: "Third Wave Coffee",
    timing: "Saturday, 4:00 PM - 7:00 PM",
    instructions: "Bring your own board if you have one. Look for the tables near the back window.",
    hostName: "Harsh",
    hostContact: "+91 98765 43210",
    votes: 14,
  },
  {
    id: 2,
    location: "Kalyani Nagar",
    venue: "Starbucks (Gold Adlabs)",
    timing: "Sunday, 10:00 AM - 1:00 PM",
    instructions: "Casual games only. Beginners welcome!",
    hostName: "Aditi",
    hostContact: "+91 98765 43211",
    votes: 8,
  }
];

export default function Meetups() {
  return (
    <div className="flex-1 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold text-white mb-4 text-glow">Upcoming Meetups</h1>
          <p className="text-gray-400 max-w-2xl">
            Check out this weekend's locations. Voting is still managed in the WhatsApp groups, but all logistics and updates will be posted here.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {meetups.map((meetup, idx) => (
            <motion.div 
              key={meetup.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden border border-white/5 flex flex-col"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{meetup.location}</h2>
                  <div className="flex items-center text-primary text-sm font-medium">
                    <MapPin className="w-4 h-4 mr-1" />
                    {meetup.venue}
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  <ThumbsUp className="w-4 h-4 text-secondary" />
                  <span className="font-semibold text-white">{meetup.votes} Votes</span>
                </div>
              </div>

              <div className="p-6 flex-1 space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-300">Timings</h3>
                    <p className="text-white">{meetup.timing}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-300">Instructions</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{meetup.instructions}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 mt-auto flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Host</h3>
                  <p className="font-medium text-white">{meetup.hostName}</p>
                </div>
                <a 
                  href={`https://wa.me/${meetup.hostContact.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 transition-colors rounded-lg font-medium text-sm border border-[#25D366]/30"
                >
                  <Phone className="w-4 h-4" />
                  Contact Host
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
