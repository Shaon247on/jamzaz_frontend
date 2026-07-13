/**
 * Footer Component
 * Footer shown in public layouts
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Rocket,
} from "lucide-react";
import logo from "../../../public/assets/svg_logo.svg";
import Image from "next/image";
const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left Side: Brand Section */}
          <motion.div variants={itemVariants} className="max-w-sm">
            <Link href="/" className="shrink-0">
              <Image src={logo} width={168} height={68} alt="TrendBurst Logo" />
            </Link>
            <p className="mt-6 text-sm text-gray-400 leading-relaxed">
              Discover trending products with real-time analytics. Make
              data-driven decisions for your drop shipping business.
            </p>
          </motion.div>

          {/* Right Side: Navigation and Socials */}
          <div className="flex flex-col sm:flex-row gap-12 md:gap-24">
            {/* About Us Link Section */}
            <motion.div variants={itemVariants}>
              <Link
                href="/about"
                className="text-lg font-semibold text-white hover:text-[#00E5FF] transition-colors"
              >
                About Us
              </Link>
            </motion.div>

            {/* Get In Touch Section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
              <div className="flex gap-5">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, color: "#00E5FF" }}
                    className="text-white hover:text-[#00E5FF] transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={22} strokeWidth={2} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/10 w-full mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2026 TrendBurst. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
