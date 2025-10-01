import { Routes, Route, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage=()=> {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex flex-col items-center justify-center flex-1 text-white px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-center drop-shadow-lg">
        Welcome to PrimeTrade. 🚀
      </h1>
      <p className="text-lg md:text-2xl text-center text-gray-200 mb-8 drop-shadow-md">
        Experience the future of productivity and organization.
      </p>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-neutral-900 text-white font-bold py-3 px-6 rounded-full shadow-lg cursor-pointer"
        onClick={() => navigate("/login")}
      >
        Get Started
      </motion.div>
    </motion.div>
  );
}

export default LandingPage;
