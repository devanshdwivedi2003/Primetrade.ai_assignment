import React from "react";
import ProfileCard from "./ProfileCard";
import Posts from "./Posts";
import { motion } from "framer-motion";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-100 to-neutral-200 p-18">
     
      <br />

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Section */}
        <motion.div
          className="col-span-1 bg-white rounded-3xl shadow-xl p-6 border-t-4 border-black"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ProfileCard />
        </motion.div>

        {/* Posts Section */}
        <motion.div
          className="col-span-1 md:col-span-2 bg-white rounded-3xl shadow-xl p-6 border-t-4
           border-black"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-6 border-b border-black pb-2">
            Posts
          </h2>
          <Posts />
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
