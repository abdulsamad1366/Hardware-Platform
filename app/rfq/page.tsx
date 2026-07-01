"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Building, User, Mail, Phone, MapPin, Hash, Globe, 
  Calendar, Briefcase, DollarSign, FileText, ArrowRight, 
  Info, ShieldCheck, Check, ArrowLeft 
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Container } from "@/components/layout/container/Container";
import Button from "@/components/common/button";

export default function RFQPage() {
  const router = useRouter();
  const { cartItems, cartCount, subtotal, clearCart } = useCart();
  const { user } = useAuth();

  // SECTION 1: Company Information
  const [company, setCompany] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gst, setGst] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");

  // SECTION 2: Project Information
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [budget, setBudget] = useState("");

  // SECTION 3: Additional Requirements
  const [requirements, setRequirements] = useState("");

  // Validation States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-populate user details from context on load
  useEffect(() => {
    if (user) {
      setCompany(user.company || "");
      setContactPerson(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setGst(user.gst || "");
      setCity(user.city || "");
    }
  }, [user]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!company.trim()) newErrors.company = "Company name is required";
    if (!contactPerson.trim()) newErrors.contactPerson = "Contact person name is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!state.trim()) newErrors.state = "State is required";
    if (!country.trim()) newErrors.country = "Country is required";

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
      newErrors.phone = "Please enter a 10-digit phone number";
    }

    // GSTIN optional check
    if (gst && !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(gst.trim().toUpperCase())) {
      newErrors.gst = "Invalid GSTIN format (e.g. 22AAAAA1111A1Z1)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to the first error input
      const firstErrorKey = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorKey);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);
    
    // Simulate B2B API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    clearCart(); // Clear selection cart on success
    router.push("/rfq/success");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-accent selection:text-primary pt-28 md:pt-36 pb-20">
      <Container className="max-w-[1400px] space-y-12">
        
        {/* Breadcrumbs and Header */}
        <div className="space-y-3">
          <nav className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-2 select-none">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/cart" className="hover:text-primary transition-colors">Selection Cart</Link>
            <span>/</span>
            <span className="text-slate-900">Request RFQ</span>
          </nav>

          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Request for Quotation
            </h1>
            <p className="text-xs text-slate-500 font-medium font-sans">
              Complete your project details and submit your selected products for a customised quotation.
            </p>
          </div>
        </div>

        {/* Empty selections fallback notice */}
        {cartItems.length === 0 ? (
          <div className="bg-white border border-slate-150 rounded-[20px] p-10 text-center shadow-sm space-y-5 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 mx-auto">
              <FileText size={20} />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-sm font-bold text-slate-950 uppercase tracking-wider font-mono">No Selected Products</h2>
              <p className="text-xs text-slate-500 max-w-[280px] mx-auto leading-relaxed">
                You must select products in your selection cart before requesting an RFQ.
              </p>
            </div>
            <Link href="/products" className="inline-block">
              <button className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer">
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          /* RFQ Grid (70 / 30) */
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
            
            {/* Left Column: Form Details (70%) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* SECTION 1: Company Information */}
              <div className="bg-white border border-slate-150 rounded-[20px] p-6 sm:p-8 shadow-sm space-y-6">
                <div className="pb-3 border-b border-slate-100 flex items-center gap-2 text-slate-900">
                  <div className="w-7 h-7 bg-accent/10 rounded-lg flex items-center justify-center text-accent shrink-0">
                    <Building size={14} className="stroke-[2.5]" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-widest font-mono">
                    1. Company Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-slate-700">
                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="company" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-450" />
                      <input
                        id="company"
                        type="text"
                        value={company}
                        onChange={(e) => {
                          setCompany(e.target.value);
                          if (errors.company) setErrors(prev => ({ ...prev, company: "" }));
                        }}
                        className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border text-slate-800 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium ${
                          errors.company ? "border-red-500/40" : "border-slate-200 focus:border-slate-800"
                        }`}
                        placeholder="Company name Ltd"
                      />
                    </div>
                    {errors.company && <p className="text-[9px] text-red-500 font-semibold">{errors.company}</p>}
                  </div>

                  {/* Contact Person */}
                  <div className="space-y-1.5">
                    <label htmlFor="contactPerson" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                      Contact Person Name *
                    </label>
                    <div className="relative">
                      <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-455" />
                      <input
                        id="contactPerson"
                        type="text"
                        value={contactPerson}
                        onChange={(e) => {
                          setContactPerson(e.target.value);
                          if (errors.contactPerson) setErrors(prev => ({ ...prev, contactPerson: "" }));
                        }}
                        className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border text-slate-800 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium ${
                          errors.contactPerson ? "border-red-500/40" : "border-slate-200 focus:border-slate-800"
                        }`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.contactPerson && <p className="text-[9px] text-red-500 font-semibold">{errors.contactPerson}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                      Business Email *
                    </label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-450" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                        }}
                        className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border text-slate-800 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium ${
                          errors.email ? "border-red-500/40" : "border-slate-200 focus:border-slate-800"
                        }`}
                        placeholder="name@company.com"
                      />
                    </div>
                    {errors.email && <p className="text-[9px] text-red-500 font-semibold">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-455" />
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
                        }}
                        className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border text-slate-800 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium ${
                          errors.phone ? "border-red-500/40" : "border-slate-200 focus:border-slate-800"
                        }`}
                        placeholder="9876543210"
                      />
                    </div>
                    {errors.phone && <p className="text-[9px] text-red-500 font-semibold">{errors.phone}</p>}
                  </div>

                  {/* GSTIN (Optional) */}
                  <div className="space-y-1.5">
                    <label htmlFor="gst" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                      GSTIN Number <span className="text-slate-450 font-normal italic">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Hash size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-450" />
                      <input
                        id="gst"
                        type="text"
                        value={gst}
                        onChange={(e) => {
                          setGst(e.target.value);
                          if (errors.gst) setErrors(prev => ({ ...prev, gst: "" }));
                        }}
                        className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border text-slate-800 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium uppercase ${
                          errors.gst ? "border-red-500/40" : "border-slate-200 focus:border-slate-800"
                        }`}
                        placeholder="22AAAAA1111A1Z1"
                      />
                    </div>
                    {errors.gst && <p className="text-[9px] text-red-500 font-semibold">{errors.gst}</p>}
                  </div>

                  {/* City */}
                  <div className="space-y-1.5">
                    <label htmlFor="city" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                      City *
                    </label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-455" />
                      <input
                        id="city"
                        type="text"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          if (errors.city) setErrors(prev => ({ ...prev, city: "" }));
                        }}
                        className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border text-slate-800 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium ${
                          errors.city ? "border-red-500/40" : "border-slate-200 focus:border-slate-800"
                        }`}
                        placeholder="Mumbai"
                      />
                    </div>
                    {errors.city && <p className="text-[9px] text-red-500 font-semibold">{errors.city}</p>}
                  </div>

                  {/* State */}
                  <div className="space-y-1.5">
                    <label htmlFor="state" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                      State *
                    </label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-450" />
                      <input
                        id="state"
                        type="text"
                        value={state}
                        onChange={(e) => {
                          setState(e.target.value);
                          if (errors.state) setErrors(prev => ({ ...prev, state: "" }));
                        }}
                        className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border text-slate-800 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium ${
                          errors.state ? "border-red-500/40" : "border-slate-200 focus:border-slate-800"
                        }`}
                        placeholder="Maharashtra"
                      />
                    </div>
                    {errors.state && <p className="text-[9px] text-red-500 font-semibold">{errors.state}</p>}
                  </div>

                  {/* Country */}
                  <div className="space-y-1.5">
                    <label htmlFor="country" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                      Country *
                    </label>
                    <div className="relative">
                      <Globe size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-455" />
                      <input
                        id="country"
                        type="text"
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          if (errors.country) setErrors(prev => ({ ...prev, country: "" }));
                        }}
                        className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border text-slate-800 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium ${
                          errors.country ? "border-red-500/40" : "border-slate-200 focus:border-slate-800"
                        }`}
                        placeholder="India"
                      />
                    </div>
                    {errors.country && <p className="text-[9px] text-red-500 font-semibold">{errors.country}</p>}
                  </div>
                </div>
              </div>

              {/* SECTION 2: Project Information */}
              <div className="bg-white border border-slate-150 rounded-[20px] p-6 sm:p-8 shadow-sm space-y-6">
                <div className="pb-3 border-b border-slate-100 flex items-center gap-2 text-slate-900">
                  <div className="w-7 h-7 bg-accent/10 rounded-lg flex items-center justify-center text-accent shrink-0">
                    <Briefcase size={14} className="stroke-[2.5]" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-widest font-mono">
                    2. Project Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-slate-700">
                  {/* Project Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="projectName" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                      Project Name
                    </label>
                    <div className="relative">
                      <Briefcase size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-450" />
                      <input
                        id="projectName"
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-slate-800 transition-all font-medium"
                        placeholder="E.g. Oberoi Heights Fitted Project"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="space-y-1.5">
                    <label htmlFor="projectType" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                      Project Type
                    </label>
                    <div className="relative">
                      <Briefcase size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-455 pointer-events-none" />
                      <select
                        id="projectType"
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-slate-800 transition-all font-medium appearance-none cursor-pointer"
                      >
                        <option value="">Select type...</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Government">Government</option>
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                      </div>
                    </div>
                  </div>

                  {/* Expected Delivery Date */}
                  <div className="space-y-1.5">
                    <label htmlFor="deliveryDate" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                      Expected Delivery Date
                    </label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-450 pointer-events-none" />
                      <input
                        id="deliveryDate"
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-slate-800 transition-all font-medium cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Estimated Project Budget */}
                  <div className="space-y-1.5">
                    <label htmlFor="budget" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                      Estimated Project Budget <span className="text-slate-450 font-normal italic">(Optional)</span>
                    </label>
                    <div className="relative">
                      <DollarSign size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-455" />
                      <input
                        id="budget"
                        type="text"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-slate-800 transition-all font-medium"
                        placeholder="E.g. ₹5,00,000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Additional Requirements */}
              <div className="bg-white border border-slate-150 rounded-[20px] p-6 sm:p-8 shadow-sm space-y-6">
                <div className="pb-3 border-b border-slate-100 flex items-center gap-2 text-slate-900">
                  <div className="w-7 h-7 bg-accent/10 rounded-lg flex items-center justify-center text-accent shrink-0">
                    <FileText size={14} className="stroke-[2.5]" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-widest font-mono">
                    3. Additional Requirements
                  </h3>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="requirements" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                    Specifications & Instructions
                  </label>
                  <textarea
                    id="requirements"
                    rows={5}
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 text-slate-850 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-slate-800 transition-all font-medium font-sans leading-relaxed"
                    placeholder="Please mention finishes, colors, custom OEM dimensions, branding configurations, packaging requirements or any special logistics instructions."
                  />
                </div>
              </div>

              {/* Large Submit Button */}
              <Button
                type="submit"
                variant="accent"
                disabled={isSubmitting}
                className="w-full py-4 bg-accent hover:bg-[#c49015] text-primary font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg hover:shadow-accent/10 flex items-center justify-center gap-2 cursor-pointer h-12"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                ) : (
                  <>
                    <span>Submit RFQ</span>
                    <ArrowRight size={14} className="stroke-[2.5]" />
                  </>
                )}
              </Button>

            </div>

            {/* Right Column: Sticky Summary Sidebar (30%) */}
            <div className="lg:col-span-3 lg:sticky lg:top-28 space-y-4">
              {/* Summary Card */}
              <div className="bg-white border border-slate-150 rounded-[20px] p-6 shadow-sm space-y-4">
                <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-mono">
                    Selected Items
                  </h3>
                  <Link 
                    href="/cart"
                    className="text-[9px] font-bold text-accent hover:text-amber-500 uppercase tracking-widest font-mono flex items-center gap-0.5"
                  >
                    <ArrowLeft size={10} />
                    <span>Edit Selection</span>
                  </Link>
                </div>

                {/* Items List Preview */}
                <div className="divide-y divide-slate-100 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-3 flex justify-between gap-3 text-xs">
                      <div className="min-w-0">
                        <span className="font-extrabold text-slate-800 block truncate">{item.name}</span>
                        <span className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest">Qty: {item.quantity}</span>
                      </div>
                      <span className="font-bold text-slate-700 font-mono shrink-0">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Estimated Total Display */}
                <div className="border-t border-slate-150 pt-4 flex items-baseline justify-between">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                    Est. Total Value
                  </span>
                  <span className="text-lg font-black text-slate-900 font-mono tracking-tight">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* B2B why request info card */}
              <div className="bg-white border border-slate-150 rounded-[20px] p-6 shadow-sm space-y-4">
                <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest font-mono border-b border-slate-100 pb-2">
                  Why Request an RFQ?
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-600 font-medium font-sans">
                  {[
                    "Best volume-based pricing models",
                    "Custom shipping & bulk discounts",
                    "OEM manufacturing assistance",
                    "Dedicated technical support"
                  ].map((benefit, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} className="stroke-[3]" />
                      </div>
                      <span className="leading-tight text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Secure transaction summary card */}
              <div className="bg-slate-900 border border-slate-800 text-slate-400 rounded-[20px] p-4 text-center text-[9px] font-mono font-bold flex items-center justify-center gap-1.5 select-none shadow-sm">
                <ShieldCheck size={14} className="text-accent shrink-0" />
                <span>AES-128 RFQ TRANSMISSION SECURED</span>
              </div>
            </div>

          </form>
        )}

      </Container>
    </div>
  );
}
