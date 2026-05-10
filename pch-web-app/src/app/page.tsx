"use client";

import { motion } from "framer-motion";
import { ArrowRight, Camera, MessageCircle, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center min-h-[80vh] px-4 py-20">
        <div className="max-w-4xl mx-auto text-center z-10 relative">

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
          >
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-glow">
              Pune Chess Hangouts!
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Connect, compete, and grow. Ditch the endless WhatsApp chatter and join the centralized hub for all PCH sports events, profiles, and community action.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/login"
              className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <span className="flex items-center justify-center gap-2">
                Join Community
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link 
              href="/about"
              className="px-8 py-4 glass-card text-white font-semibold rounded-full hover:bg-white/5 transition-colors w-full sm:w-auto"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-2xl flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 text-primary">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Player Profiles</h3>
              <p className="text-gray-400 text-sm">Create your identity, show off your stats, and find other players easily.</p>
            </motion.div>

            <motion.a
              href="https://whatsapp.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-2xl flex flex-col items-center text-center border border-[#25D366]/20 hover:border-[#25D366]/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center mb-4 text-[#25D366]">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Official WhatsApp</h3>
              <p className="text-gray-400 text-sm">Still our secondary hub. Get instant notifications and chat with members.</p>
            </motion.a>

            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-2xl flex flex-col items-center text-center border border-[#E1306C]/20 hover:border-[#E1306C]/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[#E1306C]/20 flex items-center justify-center mb-4 text-[#E1306C]">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Follow on IG</h3>
              <p className="text-gray-400 text-sm">Check out the latest photos, tournament highlights, and community moments.</p>
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}
