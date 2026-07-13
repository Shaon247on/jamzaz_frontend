
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import logo from "../../../public/assets/svg_logo.svg";
import { GetStartedButton } from "../buttons/ButtonVariants";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
];

const rightNavItems = [{ label: "Contact us", href: "/contact" }];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-primary/10"
      style={{ backgroundColor: "#0D181B" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex justify-between items-center py-3">
          {/* Left Side: Logo + Navigation Items */}
          <div className="flex items-center gap-12">
            {/* Logo Section */}
            <Link href="/" className="shrink-0">
              <Image src={logo} width={168} height={68} alt="TrendBurst Logo" />
            </Link>

            {/* Desktop Navigation - Left Items */}
            <div className="hidden md:flex items-center gap-8 pt-7">
              {navItems.map((item) => (
                <motion.div key={item.href} whileHover={{ y: -2 }}>
                  <Link
                    href={item.href}
                    className={`text-lg  transition-colors whitespace-nowrap ${
                      isActive(item.href)
                        ? "text-primary border-b-2 border-primary"
                        : "text-white hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Contact + Get Started Button */}
          <div className="hidden md:flex items-center gap-8 pt-7">
            {rightNavItems.map((item) => (
              <motion.div key={item.href} whileHover={{ y: -2 }}>
                <Link
                  href={item.href}
                  className={`text-lg  transition-colors whitespace-nowrap ${
                    isActive(item.href)
                      ? "text-primary border-b-2 border-primary"
                      : "text-white hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <GetStartedButton
              showArrow={false}
              // className="bg-primary hover:bg-primary/90 text-background font-semibold px-6"
              onClick={() => router.push("/signup")}
            >
              Get Started
            </GetStartedButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary ml-auto"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {rightNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-primary/10">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-background font-semibold"
                  onClick={() => {
                    router.push("/signup");
                    setIsOpen(false);
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
