"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Calendar, MoreVertical, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

interface Player {
  id: string;
  name: string;
  location: string;
  number: string;
  email: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Basic Auth Check
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
      else fetchPlayers();
    });
    return () => unsubscribe();
  }, [router]);

  const fetchPlayers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Player[];
      setPlayers(usersData);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    router.push("/");
  };

  const filteredPlayers = players.filter(player => 
    player.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    player.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex-1 flex items-center justify-center text-white">Loading Dashboard...</div>;

  return (
    <div className="flex-1 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage PCH player profiles (Phase 1 MVP).</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" placeholder="Search players..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
              />
            </div>
            <button onClick={handleLogout} className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl overflow-hidden border border-white/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/5 text-sm font-semibold text-gray-300">
                  <th className="p-4 pl-6">Player Name</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Join Date</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlayers.map((player, idx) => (
                  <motion.tr key={player.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }} className="border-b border-white/5 hover:bg-white/5 group">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-xs text-white">
                          {player.name?.charAt(0) || "?"}
                        </div>
                        <span className="font-medium text-white group-hover:text-primary transition-colors">{player.name || "Unknown"}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-400 text-sm">
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{player.location || "N/A"}</div>
                    </td>
                    <td className="p-4 text-gray-400 text-sm">{player.number || "N/A"}</td>
                    <td className="p-4 text-gray-400 text-sm">
                      <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{player.createdAt ? new Date(player.createdAt).toLocaleDateString() : "N/A"}</div>
                    </td>
                    <td className="p-4 text-right pr-6">
                      <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"><MoreVertical className="w-4 h-4" /></button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredPlayers.length === 0 && <div className="p-8 text-center text-gray-500">No players found.</div>}
        </motion.div>
      </div>
    </div>
  );
}
