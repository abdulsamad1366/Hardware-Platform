"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, Save, Eye, Upload, Trash2, HelpCircle, 
  ChevronLeft, ChevronRight, FileText, Settings, Compass,
  DollarSign, Image as ImageIcon, Sparkles, Check, Plus,
  CheckCircle, Info
} from "lucide-react";
import { Container } from "@/components/layout/container/Container";

const MOCK_MANUFACTURERS = ["Yale B2B", "Assa Abloy", "Dorma Fittings", "Hettich", "SecureLink Hardware"];
const MOCK_COLLECTIONS = ["Imperial Collection", "Aero Series", "GlassFit Elite", "SmartHome Essentials", "NeoBrass Classic"];
const CATEGORIES = ["Locks", "Door Hardware", "Glass Hardware", "Smart Locks", "Accessories"];

const STEPS = [
  { number: 1, label: "Basic Information", icon: Compass },
  { number: 2, label: "Images", icon: ImageIcon },
  { number: 3, label: "Specifications", icon: Settings },
  { number: 4, label: "Pricing", icon: DollarSign },
  { number: 5, label: "Downloads", icon: FileText },
  { number: 6, label: "SEO & Publish", icon: Sparkles },
];

export default function CreateProductWizardPage() {
  const [activeStep, setActiveStep] = useState(1);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: CATEGORIES[0],
    manufacturer: MOCK_MANUFACTURERS[0],
    collection: MOCK_COLLECTIONS[0],
    shortDesc: "",
    longDesc: "",
    material: "",
    finish: "",
    dimensions: "",
    weight: "",
    warranty: "",
    installType: "Surface Mounted",
    price: "",
    moq: "1",
    availability: "In Stock",
    metaTitle: "",
    metaDesc: "",
    keywords: "",
    status: "Draft",
  });

  // Mock Upload state previews
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [brochureFile, setBrochureFile] = useState<string | null>(null);
  const [datasheetFile, setDatasheetFile] = useState<string | null>(null);

  // Toast Notifications State
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleNext = () => {
    if (activeStep < 6) {
      setActiveStep((prev) => prev + 1);
    } else {
      handlePublish();
    }
  };

  const handlePrev = () => {
    if (activeStep > 1) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleSaveDraft = () => {
    showToast("✓ Progress saved as Draft in memory.", "info");
  };

  const handlePreview = () => {
    showToast("✓ Fetching product catalog preview sheet...", "info");
  };

  const handlePublish = () => {
    showToast("✓ Product catalog entry published successfully!");
  };

  // Mock Image Picker simulations
  const simulateCoverUpload = () => {
    setCoverImage("/images/product-locks.png");
    showToast("✓ Cover image uploaded.");
  };

  const simulateGalleryUpload = () => {
    setGalleryImages((prev) => [...prev, "/images/hero-handle.png"]);
    showToast("✓ Image added to gallery.");
  };

  const simulateBrochureUpload = () => {
    setBrochureFile("locks-brochure.pdf");
    showToast("✓ Brochure brochure pdf catalog attached.");
  };

  const simulateDatasheetUpload = () => {
    setDatasheetFile("technical-spec-sheet.pdf");
    showToast("✓ Technical datasheet pdf attached.");
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 md:pt-36 pb-20 font-sans selection:bg-accent selection:text-primary relative overflow-x-hidden">
      <Container className="max-w-[1100px] space-y-8">
        
        {/* Top Header Section */}
        <div className="space-y-4">
          <Link 
            href="/admin/products"
            className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest font-mono select-none transition-colors"
          >
            <ArrowLeft size={12} className="stroke-[2.5]" />
            <span>Back to Products</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-0.5">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Create New Product
              </h1>
              <p className="text-xs text-slate-500 font-medium font-sans">
                Setup detailed configurations, specs, and downloads step-by-step.
              </p>
            </div>

            {/* Quick Action Headers */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleSaveDraft}
                className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-205 text-slate-700 font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Save as Draft
              </button>
              <button
                onClick={handlePreview}
                className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-205 text-slate-700 font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Eye size={12} />
                <span>Preview</span>
              </button>
              <button
                onClick={handlePublish}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Publish Product
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Wizard Progress Stepper */}
        <div className="bg-white border border-slate-150 rounded-[20px] p-5 shadow-sm overflow-x-auto select-none">
          <div className="flex items-center justify-between min-w-[760px] px-4">
            {STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = activeStep === step.number;
              const isCompleted = activeStep > step.number;

              return (
                <React.Fragment key={step.number}>
                  {/* Step Item */}
                  <button
                    onClick={() => setActiveStep(step.number)}
                    className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs border transition-all ${
                      isActive 
                        ? "bg-[#D4A017]/10 border-[#D4A017] text-[#D4A017] ring-4 ring-[#D4A017]/5" 
                        : isCompleted 
                        ? "bg-slate-900 border-slate-900 text-white" 
                        : "bg-slate-50 border-slate-200 text-slate-400 group-hover:border-slate-400 group-hover:text-slate-750"
                    }`}>
                      {isCompleted ? <Check size={12} className="stroke-[3]" /> : step.number}
                    </div>
                    <div className="text-left">
                      <span className={`block text-[9px] font-extrabold uppercase tracking-widest font-mono ${
                        isActive ? "text-[#D4A017]" : isCompleted ? "text-slate-905" : "text-slate-400"
                      }`}>
                        Step 0{step.number}
                      </span>
                      <span className={`block text-[11px] font-bold ${
                        isActive ? "text-slate-950 font-black" : "text-slate-500"
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  </button>

                  {/* Connecting Line */}
                  {idx < STEPS.length - 1 && (
                    <div className={`flex-1 h-[2px] mx-4 transition-all duration-300 ${
                      activeStep > step.number ? "bg-slate-900" : "bg-slate-150"
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Large Rounded Content Wizard Card */}
        <div className="bg-white border border-slate-150 rounded-[24px] shadow-sm overflow-hidden flex flex-col min-h-[460px]">
          
          {/* Card Body */}
          <div className="p-8 flex-1 text-slate-700">
            {/* ==================================================== */}
            {/* STEP 1: BASIC INFORMATION */}
            {/* ==================================================== */}
            {activeStep === 1 && (
              <div className="space-y-6 max-w-3xl animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono">Basic Information</h2>
                  <p className="text-[11px] text-slate-450 mt-0.5">Enter product title, SKU code, category mappings, and descriptive summaries.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Product Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="E.g. Classic Mortise Lock Body"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">SKU / Code *</label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                      placeholder="E.g. SL-ML-85S"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium cursor-pointer"
                    >
                      {CATEGORIES.map((cat, i) => (
                        <option key={i} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Manufacturer</label>
                    <select
                      value={formData.manufacturer}
                      onChange={(e) => setFormData(prev => ({ ...prev, manufacturer: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium cursor-pointer"
                    >
                      {MOCK_MANUFACTURERS.map((m, i) => (
                        <option key={i} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Collection</label>
                    <select
                      value={formData.collection}
                      onChange={(e) => setFormData(prev => ({ ...prev, collection: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium cursor-pointer"
                    >
                      {MOCK_COLLECTIONS.map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Short Description</label>
                  <textarea
                    rows={2}
                    value={formData.shortDesc}
                    onChange={(e) => setFormData(prev => ({ ...prev, shortDesc: e.target.value }))}
                    placeholder="Brief B2B summary highlight (max 2 sentences)..."
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Long Description</label>
                  <textarea
                    rows={4}
                    value={formData.longDesc}
                    onChange={(e) => setFormData(prev => ({ ...prev, longDesc: e.target.value }))}
                    placeholder="Detailed specifications introduction and application scopes..."
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium font-sans leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* STEP 2: IMAGES */}
            {/* ==================================================== */}
            {activeStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono">Product Images</h2>
                  <p className="text-[11px] text-slate-450 mt-0.5">Attach a high-resolution cover image and up to 10 gallery catalog images.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Cover Image Upload Card */}
                  <div className="md:col-span-5 space-y-2">
                    <span className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Cover Image</span>
                    
                    {coverImage ? (
                      <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 relative group">
                        <div className="aspect-[4/3] w-full relative rounded-xl overflow-hidden bg-white border">
                          <Image src={coverImage || ""} alt="Cover Preview" fill className="object-contain p-2" />
                        </div>
                        <button
                          onClick={() => setCoverImage(null)}
                          className="absolute top-6 right-6 p-1.5 rounded-lg bg-red-650 hover:bg-red-700 text-white shadow transition-all cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ) : (
                      <div 
                        onClick={simulateCoverUpload}
                        className="border-2 border-dashed border-slate-250 hover:border-slate-450 rounded-2xl p-8 bg-slate-50 hover:bg-slate-100/50 transition-all text-center space-y-3 cursor-pointer flex flex-col items-center justify-center min-h-[220px]"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white border shadow-xs flex items-center justify-center text-slate-400">
                          <Upload size={16} />
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-slate-800 block">Click to upload cover image</span>
                          <span className="text-[10px] text-slate-400 block font-medium">JPEG, PNG, WEBP up to 2MB</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Gallery Grid Upload Box */}
                  <div className="md:col-span-7 space-y-2">
                    <span className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Gallery Images</span>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {galleryImages.map((img, i) => (
                        <div key={i} className="border border-slate-200 rounded-xl p-2 bg-slate-50 relative group">
                          <div className="aspect-square w-full relative rounded-lg overflow-hidden bg-white border">
                            <Image src={img} alt={`Gallery ${i}`} fill className="object-contain p-1.5" />
                          </div>
                          <button
                            onClick={() => setGalleryImages(prev => prev.filter((_, idx) => idx !== i))}
                            className="absolute top-3 right-3 p-1 rounded-lg bg-red-650 text-white shadow opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      ))}

                      {galleryImages.length < 10 && (
                        <div 
                          onClick={simulateGalleryUpload}
                          className="border-2 border-dashed border-slate-250 hover:border-slate-450 rounded-xl aspect-square bg-slate-50 hover:bg-slate-100/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5"
                        >
                          <Plus size={14} className="text-slate-400" />
                          <span className="text-[9px] font-bold text-slate-550 uppercase tracking-wider font-mono">Add Image</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* STEP 3: SPECIFICATIONS */}
            {/* ==================================================== */}
            {activeStep === 3 && (
              <div className="space-y-6 max-w-3xl animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono">Technical Specifications</h2>
                  <p className="text-[11px] text-slate-450 mt-0.5">Specify hardware material parameters, finishes, weight, and installation bounds.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Material</label>
                    <input
                      type="text"
                      value={formData.material}
                      onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
                      placeholder="E.g. Stainless Steel 316, Solid Brass"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Finish</label>
                    <input
                      type="text"
                      value={formData.finish}
                      onChange={(e) => setFormData(prev => ({ ...prev, finish: e.target.value }))}
                      placeholder="E.g. Satin Gold Anodized, Matte Black"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Dimensions</label>
                    <input
                      type="text"
                      value={formData.dimensions}
                      onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
                      placeholder="E.g. 120mm x 50mm"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Weight</label>
                    <input
                      type="text"
                      value={formData.weight}
                      onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                      placeholder="E.g. 750g"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Warranty</label>
                    <input
                      type="text"
                      value={formData.warranty}
                      onChange={(e) => setFormData(prev => ({ ...prev, warranty: e.target.value }))}
                      placeholder="E.g. 5 Years Warranty"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Installation Type</label>
                  <select
                    value={formData.installType}
                    onChange={(e) => setFormData(prev => ({ ...prev, installType: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium cursor-pointer"
                  >
                    <option value="Surface Mounted">Surface Mounted</option>
                    <option value="Mortised / Recessed">Mortised / Recessed</option>
                    <option value="Pivot Connected">Pivot Connected</option>
                    <option value="Glass Patch Clamped">Glass Patch Clamped</option>
                  </select>
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* STEP 4: PRICING & B2B TERMS */}
            {/* ==================================================== */}
            {activeStep === 4 && (
              <div className="space-y-6 max-w-3xl animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono">Pricing & Procurement</h2>
                  <p className="text-[11px] text-slate-450 mt-0.5">Determine indicative B2B price ranges, minimum order quantity values, and stock lines.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Estimated Price (₹) *</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="4500"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">MOQ Units *</label>
                    <input
                      type="number"
                      value={formData.moq}
                      onChange={(e) => setFormData(prev => ({ ...prev, moq: e.target.value }))}
                      placeholder="1"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Availability Status</label>
                    <select
                      value={formData.availability}
                      onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium cursor-pointer"
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                      <option value="Made to Order">Made to Order</option>
                    </select>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 flex gap-3 text-xs leading-relaxed text-slate-550 font-medium">
                  <Info size={16} className="text-slate-400 shrink-0 mt-0.5" />
                  <span>RFQ systems will check these parameters dynamically during checkout. Prices are indicative and B2B quotation discounts apply.</span>
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* STEP 5: DOWNLOADS */}
            {/* ==================================================== */}
            {activeStep === 5 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono">Technical Documents</h2>
                  <p className="text-[11px] text-slate-450 mt-0.5">Attach catalog PDFs, datasheets, or CAD architectural files.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Brochure PDF */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Product Brochure (PDF)</span>
                    
                    {brochureFile ? (
                      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <FileText size={16} className="text-accent" />
                          <span className="text-xs font-bold text-slate-800">{brochureFile}</span>
                        </div>
                        <button
                          onClick={() => setBrochureFile(null)}
                          className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ) : (
                      <div 
                        onClick={simulateBrochureUpload}
                        className="border border-dashed border-slate-250 hover:border-slate-450 rounded-xl p-5 bg-slate-50 hover:bg-slate-100/50 transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-2"
                      >
                        <Upload size={14} className="text-slate-400" />
                        <span className="text-[11px] font-bold text-slate-700">Attach Brochure PDF</span>
                      </div>
                    )}
                  </div>

                  {/* Technical Datasheet */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Technical Datasheet (PDF)</span>
                    
                    {datasheetFile ? (
                      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <FileText size={16} className="text-accent" />
                          <span className="text-xs font-bold text-slate-800">{datasheetFile}</span>
                        </div>
                        <button
                          onClick={() => setDatasheetFile(null)}
                          className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ) : (
                      <div 
                        onClick={simulateDatasheetUpload}
                        className="border border-dashed border-slate-250 hover:border-slate-450 rounded-xl p-5 bg-slate-50 hover:bg-slate-100/50 transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-2"
                      >
                        <Upload size={14} className="text-slate-400" />
                        <span className="text-[11px] font-bold text-slate-700">Attach Datasheet PDF</span>
                      </div>
                    )}
                  </div>

                  {/* Installation Guide */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Installation Guide</span>
                    <div className="border border-dashed border-slate-200 rounded-xl p-5 bg-slate-50 text-center flex flex-col items-center justify-center gap-2 select-none opacity-60">
                      <Upload size={14} className="text-slate-400" />
                      <span className="text-[11px] font-bold text-slate-500">Guide PDF (Coming Soon)</span>
                    </div>
                  </div>

                  {/* CAD Drawings */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">CAD Drawings (DXF/DWG)</span>
                    <div className="border border-dashed border-slate-200 rounded-xl p-5 bg-slate-50 text-center flex flex-col items-center justify-center gap-2 select-none opacity-60">
                      <Upload size={14} className="text-slate-400" />
                      <span className="text-[11px] font-bold text-slate-500">CAD dwg (Coming Soon)</span>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* STEP 6: SEO & PUBLISHING CONFIGS */}
            {/* ==================================================== */}
            {activeStep === 6 && (
              <div className="space-y-6 max-w-3xl animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono">SEO & Publishing</h2>
                  <p className="text-[11px] text-slate-450 mt-0.5">Setup meta parameters, tags, and set publishing visibility.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Meta Title</label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                    placeholder="E.g. Premium Solid Brass Locks | SecureLink B2B"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Meta Description</label>
                  <textarea
                    rows={2.5}
                    value={formData.metaDesc}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaDesc: e.target.value }))}
                    placeholder="Enter search snippet (max 160 characters)..."
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Keywords</label>
                    <input
                      type="text"
                      value={formData.keywords}
                      onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                      placeholder="locks, architectural, security, brass"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                    />
                  </div>

                  {/* Publishing Status options */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-slate-455 uppercase tracking-widest block font-mono">Publish Status</span>
                    <div className="flex gap-4">
                      {["Draft", "Published", "Archived"].map((st) => (
                        <label key={st} className="flex items-center gap-1.5 text-xs font-semibold text-slate-650 cursor-pointer select-none">
                          <input
                            type="radio"
                            name="wizard-status"
                            value={st}
                            checked={formData.status === st}
                            onChange={() => setFormData(prev => ({ ...prev, status: st }))}
                            className="accent-slate-905 w-3.5 h-3.5"
                          />
                          <span>{st}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Footer Navigation Bar */}
          <div className="bg-slate-50/50 border-t border-slate-100 p-6 flex items-center justify-between select-none">
            <button
              disabled={activeStep === 1}
              onClick={handlePrev}
              className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-350 disabled:opacity-40 disabled:hover:bg-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft size={13} className="stroke-[2.5]" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              className="px-4.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <span>{activeStep === 6 ? "Publish Product" : "Next Step"}</span>
              <ChevronRight size={13} className="stroke-[2.5]" />
            </button>
          </div>

        </div>

      </Container>

      {/* ==================================================== */}
      {/* LIVE TOAST NOTIFICATION BLOCK */}
      {/* ==================================================== */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 pointer-events-none select-none max-w-sm w-full">
          <div className="p-4 bg-white text-slate-800 border border-slate-200 rounded-xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 pointer-events-auto">
            <CheckCircle size={16} className="text-emerald-500 shrink-0" />
            <span className="text-xs font-semibold leading-tight">{toast.message}</span>
          </div>
        </div>
      )}

    </div>
  );
}
