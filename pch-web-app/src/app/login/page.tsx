"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", location: "", number: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        window.location.href = "/admin"; // Redirect on success
      } else {
        const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        // Create basic user profile in Firestore
        await setDoc(doc(db, "users", user.uid), {
          name: formData.name,
          email: formData.email,
          location: formData.location,
          number: formData.number,
          createdAt: new Date().toISOString()
        });
        window.location.href = "/admin";
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // Reusable input component for modularity
  const Input = ({ name, type = "text", placeholder }: { name: string, type?: string, placeholder: string }) => (
    <input 
      type={type} name={name} placeholder={placeholder} required
      value={formData[name as keyof typeof formData]} onChange={handleChange}
      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:ring-1 focus:ring-primary/50 transition-all mb-4"
    />
  );

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-md p-8 rounded-2xl border border-white/10"
      >
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <LogIn className="w-6 h-6" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          {isLogin ? "Welcome Back" : "Join the Community"}
        </h2>

        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col">
          {!isLogin && (
            <>
              <Input name="name" placeholder="Full Name" />
              <div className="flex gap-4">
                <Input name="location" placeholder="Location (e.g. Baner)" />
                <Input name="number" placeholder="Phone Number" />
              </div>
            </>
          )}
          
          <Input name="email" type="email" placeholder="Email Address" />
          <Input name="password" type="password" placeholder="Password" />

          <button 
            type="submit"
            className="w-full py-3 mt-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            {isLogin ? "Sign In" : "Create Profile"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-primary hover:underline font-medium"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
