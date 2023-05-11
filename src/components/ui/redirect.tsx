import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

interface CountdownProps {
  redirectTo: string;
}

const Countdown: React.FC<CountdownProps> = ({ redirectTo }) => {
  const [count, setCount] = useState(5);
  const router = useRouter();

  useEffect(() => {
    if (count === 1) {
      setTimeout(() => router.push(redirectTo), 1000);
    } else {
      const timer = setInterval(() => {
        setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 5));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [count, redirectTo, router]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      Redirecting you in {count}
    </motion.div>
  );
};

export default Countdown;
