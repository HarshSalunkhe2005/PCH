"use client";

import { motion } from "framer-motion";
import { Coffee, MapPin, Smile, Users } from "lucide-react";

export default function About() {
  const features = [
    { icon: Coffee, title: "Café Meetups", desc: "We meet up at various cafés across Pune. Pay only for what you order!" },
    { icon: Users, title: "Everyone Welcome", desc: "From absolute beginners to FIDE-rated players, everyone finds a game here." },
    { icon: Smile, title: "Stress-Free", desc: "No tournament pressure, no ratings, and absolutely no membership fees." },
    { icon: MapPin, title: "Multiple Locations", desc: "Baner, Pimpri-Chinchwad, Kothrud, Kalyani Nagar, and growing!" },
  ];

  return (
    <div className="flex-1 py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-20">
        
        {/* Intro Section */}
        <section className="text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white text-glow"
          >
            About Pune Chess Hangouts
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            PCH is a community-driven initiative in Pune designed to make chess social, accessible, and fun. 
            We organize casual, over-the-board meetups where the focus is on meeting people and enjoying the game.
          </motion.p>
        </section>

        {/* Features Grid */}
        <section className="grid md:grid-cols-2 gap-6">
          {features.map((feat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 + 0.2 }}
              className="glass-card p-6 rounded-2xl flex items-start gap-4"
            >
              <div className="p-3 rounded-lg bg-primary/20 text-primary">
                <feat.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{feat.title}</h3>
                <p className="text-gray-400">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Reviews/Testimonials (Mocked for MVP) */}
        <section className="text-center space-y-10">
          <h2 className="text-3xl font-bold text-white">Community Love</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-white/5 italic text-gray-300">
              "The most welcoming chess community I've ever seen. No pressure, just great games and great coffee!"
              <div className="mt-4 font-semibold text-primary not-italic">- Aditi R., Baner</div>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-white/5 italic text-gray-300">
              "I hadn't played in 10 years, but PCH got me back into it. The casual vibe is perfect."
              <div className="mt-4 font-semibold text-primary not-italic">- Rohan M., Viman Nagar</div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
