"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { User, Building, Mail, Phone, MapPin, Hash, Lock, AlertCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Button from "../common/button";

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gst, setGst] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Validation States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerFailed, setRegisterFailed] = useState(false);

  // Retrieve redirect parameter
  const redirectPath = searchParams.get("redirect") || "/";

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Full name is required";
    if (!company.trim()) newErrors.company = "Company name is required";
    if (!city.trim()) newErrors.city = "City is required";

    // Email
    if (!email) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone.replace(/[\s-]/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // Password
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm Password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // GST Optional check
    if (gst && !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(gst.trim().toUpperCase())) {
      newErrors.gst = "Invalid GSTIN format (e.g. 22AAAAA1111A1Z1)";
    }

    // Terms
    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the Terms & Privacy Policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterFailed(false);

    if (!validateForm()) return;

    setIsSubmitting(true);
    const success = await register({
      name,
      company,
      email,
      phone,
      city,
      gst: gst.trim().toUpperCase(),
      password
    });
    setIsSubmitting(false);

    if (success) {
      router.push(redirectPath);
    } else {
      setRegisterFailed(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-accent selection:text-primary relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 my-8"
      >
        <div className="mb-8">
          <Link href="/" className="inline-block text-lg font-black tracking-wider uppercase text-white mb-2">
            Secure<span className="text-accent">Link</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Create Business Account
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Sign up to unlock bulk pricing and custom B2B specifications.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {registerFailed && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-red-400">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>An account with this email address already exists. Try signing in.</span>
            </div>
          )}

          {/* Grid Layout Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                Full Name
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                  }}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-950 border text-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium ${
                    errors.name ? "border-red-500/40" : "border-slate-800 focus:border-accent"
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="text-[10px] text-red-400 font-semibold flex items-center gap-1">
                  <AlertCircle size={11} />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Company Name */}
            <div className="space-y-1.5">
              <label htmlFor="company" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                Company Name
              </label>
              <div className="relative">
                <Building size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="company"
                  type="text"
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value);
                    if (errors.company) setErrors(prev => ({ ...prev, company: "" }));
                  }}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-950 border text-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium ${
                    errors.company ? "border-red-500/40" : "border-slate-800 focus:border-accent"
                  }`}
                  placeholder="Acme Hardware Corp"
                />
              </div>
              {errors.company && (
                <p className="text-[10px] text-red-400 font-semibold flex items-center gap-1">
                  <AlertCircle size={11} />
                  <span>{errors.company}</span>
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                  }}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-950 border text-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium ${
                    errors.email ? "border-red-500/40" : "border-slate-800 focus:border-accent"
                  }`}
                  placeholder="name@company.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="text-[10px] text-red-400 font-semibold flex items-center gap-1">
                  <AlertCircle size={11} />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                Phone Number
              </label>
              <div className="relative">
                <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
                  }}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-950 border text-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium ${
                    errors.phone ? "border-red-500/40" : "border-slate-800 focus:border-accent"
                  }`}
                  placeholder="9876543210"
                />
              </div>
              {errors.phone && (
                <p className="text-[10px] text-red-400 font-semibold flex items-center gap-1">
                  <AlertCircle size={11} />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>

            {/* City */}
            <div className="space-y-1.5">
              <label htmlFor="city" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                City / Location
              </label>
              <div className="relative">
                <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (errors.city) setErrors(prev => ({ ...prev, city: "" }));
                  }}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-950 border text-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium ${
                    errors.city ? "border-red-500/40" : "border-slate-800 focus:border-accent"
                  }`}
                  placeholder="Mumbai"
                />
              </div>
              {errors.city && (
                <p className="text-[10px] text-red-400 font-semibold flex items-center gap-1">
                  <AlertCircle size={11} />
                  <span>{errors.city}</span>
                </p>
              )}
            </div>

            {/* GST (Optional) */}
            <div className="space-y-1.5">
              <label htmlFor="gst" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                GST Number <span className="text-slate-500 font-normal italic">(Optional)</span>
              </label>
              <div className="relative">
                <Hash size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="gst"
                  type="text"
                  value={gst}
                  onChange={(e) => {
                    setGst(e.target.value);
                    if (errors.gst) setErrors(prev => ({ ...prev, gst: "" }));
                  }}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-950 border text-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium uppercase ${
                    errors.gst ? "border-red-500/40" : "border-slate-800 focus:border-accent"
                  }`}
                  placeholder="22AAAAA1111A1Z1"
                />
              </div>
              {errors.gst && (
                <p className="text-[10px] text-red-400 font-semibold flex items-center gap-1">
                  <AlertCircle size={11} />
                  <span>{errors.gst}</span>
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
                  }}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-950 border text-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium ${
                    errors.password ? "border-red-500/40" : "border-slate-800 focus:border-accent"
                  }`}
                  placeholder="Min. 8 characters"
                />
              </div>
              {errors.password && (
                <p className="text-[10px] text-red-400 font-semibold flex items-center gap-1">
                  <AlertCircle size={11} />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: "" }));
                  }}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-950 border text-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium ${
                    errors.confirmPassword ? "border-red-500/40" : "border-slate-800 focus:border-accent"
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-[10px] text-red-400 font-semibold flex items-center gap-1">
                  <AlertCircle size={11} />
                  <span>{errors.confirmPassword}</span>
                </p>
              )}
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="space-y-2 pt-2">
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                  if (errors.terms) setErrors(prev => ({ ...prev, terms: "" }));
                }}
                className="w-4 h-4 mt-0.5 bg-slate-950 border-slate-800 text-accent focus:ring-accent/50 rounded cursor-pointer shrink-0"
              />
              <label htmlFor="terms" className="ml-2.5 text-xs text-slate-400 leading-normal font-medium cursor-pointer">
                I agree to the SecureLink Partner Agreement, Terms of Service, and Privacy Policy.
              </label>
            </div>
            {errors.terms && (
              <p className="text-[10px] text-red-400 font-semibold flex items-center gap-1">
                <AlertCircle size={11} />
                <span>{errors.terms}</span>
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="accent"
            disabled={isSubmitting}
            className="w-full bg-accent hover:bg-[#c49015] text-primary font-extrabold h-12 rounded-xl flex items-center justify-center gap-2 mt-4"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            ) : (
              <>
                <span>Create Business Account</span>
                <ArrowRight size={14} className="stroke-[2.5]" />
              </>
            )}
          </Button>
        </form>

        {/* Footer Login Link */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 text-center text-xs">
          <span className="text-slate-400">Already have an account? </span>
          <Link 
            href={`/login${searchParams.toString() ? `?${searchParams.toString()}` : ""}`} 
            className="font-bold text-accent hover:text-amber-500 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default RegisterForm;
