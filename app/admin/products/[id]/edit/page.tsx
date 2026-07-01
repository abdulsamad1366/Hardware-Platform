"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, Eye, Upload, Trash2, ChevronLeft, ChevronRight, 
  FileText, Settings, Compass, DollarSign, Image as ImageIcon, 
  Sparkles, Check, Plus, AlertTriangle, ShieldAlert, Archive, 
  Copy, Info, ArrowUp, ArrowDown, X, Trash, RefreshCw
} from "lucide-react";
import { Container } from "@/components/layout/container/Container";
import { products as initialProducts, Product } from "@/data/products";

// Config specs
const MOCK_MANUFACTURERS = ["Yale B2B", "Assa Abloy", "Dorma Fittings", "Hettich", "SecureLink Hardware"];
const MOCK_COLLECTIONS = ["Imperial Collection", "Aero Series", "GlassFit Elite", "SmartHome Essentials", "NeoBrass Classic"];
const CATEGORIES = ["Locks", "Door Hardware", "Glass Hardware", "Smart Locks", "Accessories"];

const STEPS = [
  { number: 1, label: "Basic Information", icon: Compass },
  { number: 2, label: "Images", icon: ImageIcon },
  { number: 3, label: "Specifications", icon: Settings },
  { number: 4, label: "Pricing & Inventory", icon: DollarSign },
  { number: 5, label: "Downloads", icon: FileText },
  { number: 6, label: "SEO & Publish", icon: Sparkles },
];

interface SpecItem {
  name: string;
  value: string;
}

interface DownloadFile {
  key: string;
  label: string;
  filename: string;
  lastUpdated: string;
  uploading?: boolean;
  progress?: number;
}

export default function EditProductWizardPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [activeStep, setActiveStep] = useState(1);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  // 1. Wizard Form State
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
    // Pricing
    mrp: 0,
    dealerPrice: 0,
    distributorPrice: 0,
    moq: 1,
    // Inventory
    stockQty: 45,
    lowStockAlert: 10,
    inventoryStatus: "In Stock" as "In Stock" | "Low Stock" | "Out of Stock",
    // SEO
    metaTitle: "",
    metaDesc: "",
    slug: "",
    keywords: "",
    status: "Published" as "Published" | "Draft" | "Archived",
  });

  // Specifications state
  const [specifications, setSpecifications] = useState<SpecItem[]>([]);

  // Images state (Cover at index 0)
  const [images, setImages] = useState<{ id: string; url: string; uploading?: boolean; progress?: number }[]>([]);

  // Downloads state
  const [downloads, setDownloads] = useState<DownloadFile[]>([]);

  // Initial loaded baseline reference for detecting dirty/unsaved states
  const [initialDataState, setInitialDataState] = useState<string>("");

  // 2. Fetch Product Baseline Data on Mount
  useEffect(() => {
    // Find target product or fallback
    const product = initialProducts.find((p) => p.id === id) || initialProducts[0];
    
    if (product) {
      const idx = initialProducts.indexOf(product);
      
      const baselineForm = {
        name: product.name,
        sku: product.code,
        category: product.category,
        manufacturer: MOCK_MANUFACTURERS[idx % MOCK_MANUFACTURERS.length],
        collection: MOCK_COLLECTIONS[idx % MOCK_COLLECTIONS.length],
        shortDesc: product.description,
        longDesc: `Advanced specifications details for B2B architectural deployments. Engineered for high structural tolerances and cycle endurance.`,
        material: product.material,
        finish: product.finish,
        mrp: product.price,
        dealerPrice: Math.round(product.price * 0.8),
        distributorPrice: Math.round(product.price * 0.7),
        moq: idx % 4 === 0 ? 10 : 1,
        stockQty: idx % 3 === 0 ? 8 : idx % 5 === 0 ? 0 : 50,
        lowStockAlert: 10,
        inventoryStatus: (idx % 3 === 0 ? "Low Stock" : idx % 5 === 0 ? "Out of Stock" : "In Stock") as any,
        metaTitle: product.name,
        metaDesc: product.description,
        slug: product.id,
        keywords: "architectural, hardware, securelink, locks",
        status: "Published" as "Published" | "Draft" | "Archived",
      };

      setFormData(baselineForm);

      // Parse specifications
      const specsList = Object.entries(product.specifications || {}).map(([name, value]) => ({
        name,
        value,
      }));
      setSpecifications(specsList);

      // Setup images
      setImages([
        { id: "img-1", url: product.image },
        { id: "img-2", url: "/images/hero-handle.png" },
        { id: "img-3", url: "/images/cat-glass.png" },
      ]);

      // Setup downloads
      setDownloads([
        { key: "datasheet", label: "Datasheet", filename: "technical_data_sheet.pdf", lastUpdated: "2026-05-15" },
        { key: "guide", label: "Installation Guide", filename: "installation_guide_v2.pdf", lastUpdated: "2026-04-10" },
        { key: "warranty", label: "Warranty", filename: "securelink_warranty_card.pdf", lastUpdated: "2026-01-01" },
        { key: "cad", label: "CAD Files", filename: "2d_cad_drawings.dxf", lastUpdated: "2026-06-20" },
        { key: "brochure", label: "Brochure", filename: "full_product_brochure.pdf", lastUpdated: "2026-06-25" },
      ]);

      // Save initial baseline state string
      const baselineString = JSON.stringify({
        form: baselineForm,
        specs: specsList,
        imgs: [product.image, "/images/hero-handle.png", "/images/cat-glass.png"],
        files: ["technical_data_sheet.pdf", "installation_guide_v2.pdf", "securelink_warranty_card.pdf", "2d_cad_drawings.dxf", "full_product_brochure.pdf"],
      });
      setInitialDataState(baselineString);
    }
  }, [id]);

  // 3. Helper: Toast dispatcher
  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // 4. Unsaved Edits Detection
  const hasChanges = useMemo(() => {
    if (!initialDataState) return false;
    
    const currentString = JSON.stringify({
      form: formData,
      specs: specifications,
      imgs: images.map((img) => img.url),
      files: downloads.map((f) => f.filename),
    });

    return currentString !== initialDataState;
  }, [formData, specifications, images, downloads, initialDataState]);

  // Handle Discard Edits
  const handleDiscard = () => {
    if (!initialDataState) return;
    const parsed = JSON.parse(initialDataState);
    
    setFormData(parsed.form);
    setSpecifications(parsed.specs);
    setImages(parsed.imgs.map((url: string, idx: number) => ({ id: `img-${idx + 1}`, url })));
    
    setDownloads((prev) =>
      prev.map((f, idx) => ({
        ...f,
        filename: parsed.files[idx],
      }))
    );

    showToast("Edits discarded. Reverted to baseline values.", "info");
  };

  // Handle Save Edits
  const handleSaveChanges = () => {
    const currentString = JSON.stringify({
      form: formData,
      specs: specifications,
      imgs: images.map((img) => img.url),
      files: downloads.map((f) => f.filename),
    });
    setInitialDataState(currentString);
    showToast("✓ Product changes saved successfully.");
  };

  // 5. Wizard Navigation
  const handleNext = () => {
    if (activeStep < 6) setActiveStep((prev) => prev + 1);
    else handleSaveChanges();
  };

  const handlePrev = () => {
    if (activeStep > 1) setActiveStep((prev) => prev - 1);
  };

  // 6. Step-specific handlers

  // Step 2: Images Operations
  const handleReplaceImage = (imageId: string) => {
    // Simulate upload loader progress loop
    setImages((prev) =>
      prev.map((img) => (img.id === imageId ? { ...img, uploading: true, progress: 10 } : img))
    );

    let progress = 10;
    const interval = setInterval(() => {
      progress += 30;
      if (progress >= 100) {
        clearInterval(interval);
        setImages((prev) =>
          prev.map((img) =>
            img.id === imageId
              ? { ...img, url: "/images/hero-handle.png", uploading: false, progress: 100 }
              : img
          )
        );
        showToast("✓ Image replaced successfully.");
      } else {
        setImages((prev) =>
          prev.map((img) => (img.id === imageId ? { ...img, progress } : img))
        );
      }
    }, 400);
  };

  const handleDeleteImage = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
    showToast("Image removed.", "info");
  };

  const handleSetCover = (index: number) => {
    if (index === 0) return;
    setImages((prev) => {
      const copy = [...prev];
      const target = copy.splice(index, 1)[0];
      return [target, ...copy];
    });
    showToast("Set as primary cover image.");
  };

  const handleMoveImage = (index: number, direction: "up" | "down") => {
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= images.length) return;

    setImages((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[nextIndex];
      copy[nextIndex] = temp;
      return copy;
    });
  };

  // Step 3: Technical specifications state operations
  const handleAddSpecRow = () => {
    setSpecifications((prev) => [...prev, { name: "", value: "" }]);
  };

  const handleUpdateSpec = (index: number, field: "name" | "value", text: string) => {
    setSpecifications((prev) =>
      prev.map((spec, idx) => (idx === index ? { ...spec, [field]: text } : spec))
    );
  };

  const handleDeleteSpecRow = (index: number) => {
    setSpecifications((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Step 5: Downloads PDF replacements
  const handleReplaceDownload = (key: string) => {
    setDownloads((prev) =>
      prev.map((f) => (f.key === key ? { ...f, uploading: true, progress: 20 } : f))
    );

    let progress = 20;
    const interval = setInterval(() => {
      progress += 40;
      if (progress >= 100) {
        clearInterval(interval);
        setDownloads((prev) =>
          prev.map((f) =>
            f.key === key
              ? {
                  ...f,
                  filename: `${f.key}_datasheet_updated_${Math.floor(Math.random() * 10)}.pdf`,
                  lastUpdated: new Date().toISOString().split("T")[0],
                  uploading: false,
                }
              : f
          )
        );
        showToast(`✓ Attachment file for ${key} updated.`);
      }
    }, 450);
  };

  const handleDeleteDownload = (key: string) => {
    setDownloads((prev) =>
      prev.map((f) => (f.key === key ? { ...f, filename: "Unattached" } : f))
    );
    showToast(`Removed attachment file.`, "info");
  };

  // Step 6: Danger actions triggers
  const handleArchive = () => {
    setFormData((prev) => ({ ...prev, status: "Archived" }));
    showToast("Product status set to Archived.", "info");
  };

  const handleDuplicate = () => {
    showToast(`✓ Duplicated catalog copy of "${formData.name}".`);
  };

  const handleDelete = () => {
    if (confirm(`CRITICAL ACTION: Are you sure you want to permanently delete "${formData.name}" from database?`)) {
      showToast("✓ Product catalog entry deleted successfully.", "info");
      router.push("/admin/products");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 md:pt-36 pb-32 font-sans selection:bg-accent selection:text-primary relative overflow-x-hidden">
      <Container className="max-w-[1100px] space-y-8">
        
        {/* Top Header Block */}
        <div className="space-y-4">
          <Link 
            href="/admin/products"
            className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest font-mono select-none transition-colors"
          >
            <ArrowLeft size={12} className="stroke-[2.5]" />
            <span>Back to Products</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {formData.name || "Classic Mortise Lock Body"}
                </h1>
                
                {/* Status Badges */}
                {formData.status === "Published" && (
                  <span className="px-2 py-0.5 rounded-full border border-emerald-250 bg-emerald-50 text-emerald-700 text-[9px] font-bold uppercase tracking-wider select-none font-mono">
                    Published
                  </span>
                )}
                {formData.status === "Draft" && (
                  <span className="px-2 py-0.5 rounded-full border border-amber-250 bg-amber-50 text-amber-700 text-[9px] font-bold uppercase tracking-wider select-none font-mono">
                    Draft
                  </span>
                )}
                {formData.status === "Archived" && (
                  <span className="px-2 py-0.5 rounded-full border border-slate-250 bg-slate-100 text-slate-600 text-[9px] font-bold uppercase tracking-wider select-none font-mono">
                    Archived
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-400 font-bold font-mono uppercase tracking-wider block">
                SKU Reference: {formData.sku || "SL-ML-85S"}
              </span>
            </div>

            {/* Quick Actions Header */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast("✓ Loading live website preview...", "info")}
                className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-205 text-slate-700 font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Preview Product
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Stepper Wizard Indicator */}
        <div className="bg-white border border-slate-150 rounded-[20px] p-5 shadow-sm overflow-x-auto select-none">
          <div className="flex items-center justify-between min-w-[760px] px-4">
            {STEPS.map((step, idx) => {
              const isActive = activeStep === step.number;
              const isCompleted = activeStep > step.number;

              return (
                <React.Fragment key={step.number}>
                  {/* Step Button */}
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
                  <p className="text-[11px] text-slate-450 mt-0.5">Modify product name, categories, manufacturers, and text summaries.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Product Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-205 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">SKU / Code *</label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-205 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium uppercase"
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
                    className="w-full p-3.5 bg-slate-50 border border-slate-205 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Long Description</label>
                  <textarea
                    rows={4}
                    value={formData.longDesc}
                    onChange={(e) => setFormData(prev => ({ ...prev, longDesc: e.target.value }))}
                    className="w-full p-3.5 bg-slate-50 border border-slate-205 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium font-sans leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* STEP 2: IMAGES MANAGEMENT */}
            {/* ==================================================== */}
            {activeStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono">Uploaded Images</h2>
                  <p className="text-[11px] text-slate-450 mt-0.5">Manage gallery ordering, designate the cover image, or replace files.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {images.map((img, idx) => (
                    <div 
                      key={img.id} 
                      className={`border rounded-2xl p-4 bg-slate-50 relative group flex flex-col justify-between transition-all ${
                        idx === 0 ? "border-accent ring-2 ring-accent/15" : "border-slate-200"
                      }`}
                    >
                      {/* Image Preview */}
                      <div>
                        <div className="aspect-[4/3] w-full relative rounded-xl overflow-hidden bg-white border">
                          <Image src={img.url} alt={`Preview ${idx}`} fill className="object-contain p-2" />
                          
                          {/* Upload Progress Loader */}
                          {img.uploading && (
                            <div className="absolute inset-0 bg-slate-950/60 flex flex-col items-center justify-center p-4 text-white z-10">
                              <span className="text-[9px] font-bold font-mono tracking-widest uppercase mb-1">Replacing...</span>
                              <div className="w-full bg-slate-850 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  className="bg-accent h-full transition-all duration-300"
                                  style={{ width: `${img.progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Labels */}
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[9px] font-extrabold text-slate-400 font-mono uppercase tracking-wider">
                            {idx === 0 ? "Primary Cover" : `Gallery Item 0${idx}`}
                          </span>
                          
                          {/* Reordering indicators */}
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleMoveImage(idx, "up")}
                              disabled={idx === 0}
                              className="p-1 rounded bg-white hover:bg-slate-150 text-slate-500 disabled:opacity-30 disabled:hover:bg-white cursor-pointer"
                            >
                              <ArrowUp size={11} />
                            </button>
                            <button
                              onClick={() => handleMoveImage(idx, "down")}
                              disabled={idx === images.length - 1}
                              className="p-1 rounded bg-white hover:bg-slate-150 text-slate-500 disabled:opacity-30 disabled:hover:bg-white cursor-pointer"
                            >
                              <ArrowDown size={11} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Control CTAs */}
                      <div className="mt-4 pt-3.5 border-t border-slate-200/50 flex items-center justify-between gap-2">
                        {idx !== 0 && (
                          <button
                            onClick={() => handleSetCover(idx)}
                            className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-bold text-[9px] text-slate-650 uppercase tracking-wider cursor-pointer"
                          >
                            Set Cover
                          </button>
                        )}
                        <button
                          onClick={() => handleReplaceImage(img.id)}
                          className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-bold text-[9px] text-slate-650 uppercase tracking-wider cursor-pointer"
                        >
                          Replace
                        </button>
                        <button
                          onClick={() => handleDeleteImage(img.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-650 transition-colors cursor-pointer"
                          title="Delete image"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add Image trigger */}
                  {images.length < 10 && (
                    <div 
                      onClick={() => {
                        setImages((prev) => [...prev, { id: `img-${Date.now()}`, url: "/images/hero-handle.png" }]);
                        showToast("✓ Placeholder image added.");
                      }}
                      className="border-2 border-dashed border-slate-250 hover:border-slate-450 rounded-2xl bg-slate-50 hover:bg-slate-100/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-2.5 min-h-[220px]"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border flex items-center justify-center text-slate-400">
                        <Upload size={16} />
                      </div>
                      <div className="space-y-1 text-center">
                        <span className="text-xs font-bold text-slate-800 block">Upload Gallery Image</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Max 10 images</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* STEP 3: TECHNICAL SPECIFICATIONS */}
            {/* ==================================================== */}
            {activeStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono">Specifications Editor</h2>
                    <p className="text-[11px] text-slate-450 mt-0.5">Customize keys and values dynamically to update technical tables.</p>
                  </div>
                  
                  <button
                    onClick={handleAddSpecRow}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus size={11} className="stroke-[3]" />
                    <span>Add Specification</span>
                  </button>
                </div>

                {/* Specs Table */}
                <div className="bg-slate-50 border border-slate-200 rounded-[20px] p-5 space-y-3.5 max-w-4xl">
                  <div className="grid grid-cols-12 gap-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono px-3 select-none">
                    <div className="col-span-5">Specification Name</div>
                    <div className="col-span-6">Specification Value</div>
                    <div className="col-span-1 text-right">Delete</div>
                  </div>

                  <div className="space-y-3.5 divide-y divide-slate-100">
                    {specifications.map((spec, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-4 items-center pt-3.5 first:pt-0 border-transparent">
                        <div className="col-span-5">
                          <input
                            type="text"
                            value={spec.name}
                            onChange={(e) => handleUpdateSpec(idx, "name", e.target.value)}
                            placeholder="E.g. Backset"
                            className="w-full px-3.5 py-2 bg-white border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                          />
                        </div>
                        <div className="col-span-6">
                          <input
                            type="text"
                            value={spec.value}
                            onChange={(e) => handleUpdateSpec(idx, "value", e.target.value)}
                            placeholder="E.g. 60mm"
                            className="w-full px-3.5 py-2 bg-white border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                          />
                        </div>
                        <div className="col-span-1 text-right">
                          <button
                            onClick={() => handleDeleteSpecRow(idx)}
                            className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-650 transition-colors cursor-pointer"
                          >
                            <Trash size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* STEP 4: PRICING & INVENTORY */}
            {/* ==================================================== */}
            {activeStep === 4 && (
              <div className="space-y-6 max-w-3xl animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono">Pricing & Inventory</h2>
                  <p className="text-[11px] text-slate-450 mt-0.5">Manage pricing brackets, stock count lines, and alert controls.</p>
                </div>

                {/* Pricing Fields */}
                <div className="space-y-3">
                  <span className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">Pricing Brackets</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 block">MRP (₹)</label>
                      <input
                        type="number"
                        value={formData.mrp}
                        onChange={(e) => setFormData(prev => ({ ...prev, mrp: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-205 text-slate-850 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 block">Dealer Price (₹)</label>
                      <input
                        type="number"
                        value={formData.dealerPrice}
                        onChange={(e) => setFormData(prev => ({ ...prev, dealerPrice: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-205 text-slate-850 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 block">Distributor Price (₹)</label>
                      <input
                        type="number"
                        value={formData.distributorPrice}
                        onChange={(e) => setFormData(prev => ({ ...prev, distributorPrice: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-205 text-slate-850 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Inventory Fields */}
                <div className="space-y-3 pt-3.5 border-t border-slate-100">
                  <span className="text-[9px] font-bold text-slate-455 uppercase tracking-widest block font-mono">Inventory Management</span>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 block">MOQ Units</label>
                      <input
                        type="number"
                        value={formData.moq}
                        onChange={(e) => setFormData(prev => ({ ...prev, moq: parseInt(e.target.value) || 1 }))}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-205 text-slate-850 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 block">Stock Quantity</label>
                      <input
                        type="number"
                        value={formData.stockQty}
                        onChange={(e) => setFormData(prev => ({ ...prev, stockQty: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-205 text-slate-850 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 block">Low Stock Alert Level</label>
                      <input
                        type="number"
                        value={formData.lowStockAlert}
                        onChange={(e) => setFormData(prev => ({ ...prev, lowStockAlert: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-205 text-slate-850 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 block">Inventory Status</label>
                      <select
                        value={formData.inventoryStatus}
                        onChange={(e) => setFormData(prev => ({ ...prev, inventoryStatus: e.target.value as any }))}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium cursor-pointer"
                      >
                        <option value="In Stock">In Stock</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Stock Warning Box */}
                {formData.stockQty <= formData.lowStockAlert && formData.stockQty > 0 && (
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 flex gap-3 text-xs font-semibold leading-relaxed">
                    <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                    <span>Inventory warning: Stock quantity ({formData.stockQty}) has dropped to or below the low stock threshold limit ({formData.lowStockAlert}).</span>
                  </div>
                )}
                {formData.stockQty === 0 && (
                  <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 flex gap-3 text-xs font-semibold leading-relaxed">
                    <ShieldAlert size={16} className="text-red-600 shrink-0 mt-0.5" />
                    <span>Out of Stock warning: Stock quantity has dropped to 0. RFQ selection checkout lines will flag this item as Made to Order/Backordered.</span>
                  </div>
                )}
              </div>
            )}

            {/* ==================================================== */}
            {/* STEP 5: DOWNLOADS DOCUMENT CARDS */}
            {/* ==================================================== */}
            {activeStep === 5 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono">Downloads Management</h2>
                  <p className="text-[11px] text-slate-450 mt-0.5">Attach, replace, or delete specifications files, guides, or CAD catalog blocks.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {downloads.map((f) => (
                    <div 
                      key={f.key}
                      className="border border-slate-200 rounded-2xl p-4 bg-slate-50 flex items-center justify-between relative overflow-hidden"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border flex items-center justify-center text-[#D4A017] shrink-0">
                          <FileText size={18} />
                        </div>
                        <div>
                          <span className="text-[8px] font-extrabold text-slate-400 font-mono uppercase tracking-widest block">
                            {f.label} File
                          </span>
                          <span className="text-xs font-extrabold text-slate-800 line-clamp-1 pr-4">
                            {f.filename}
                          </span>
                          <span className="text-[9px] text-slate-450 block font-medium">
                            Updated: {f.lastUpdated}
                          </span>
                        </div>
                      </div>

                      {/* File Operations */}
                      <div className="flex items-center gap-1.5 z-10">
                        {f.filename !== "Unattached" && (
                          <button
                            onClick={() => handleReplaceDownload(f.key)}
                            className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-bold text-[9px] text-slate-650 uppercase tracking-wider cursor-pointer flex items-center gap-1"
                          >
                            <RefreshCw size={9} />
                            <span>Replace</span>
                          </button>
                        )}
                        {f.filename === "Unattached" ? (
                          <button
                            onClick={() => handleReplaceDownload(f.key)}
                            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-[9px] uppercase tracking-wider cursor-pointer"
                          >
                            Attach
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDeleteDownload(f.key)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-650 transition-colors cursor-pointer"
                            title="Delete file"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>

                      {/* Upload Loading indicator */}
                      {f.uploading && (
                        <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center px-6 text-white">
                          <span className="text-[9px] font-bold font-mono tracking-widest uppercase mr-3">Uploading File...</span>
                          <div className="flex-1 bg-slate-850 h-1 rounded-full overflow-hidden">
                            <div className="bg-accent h-full animate-pulse w-2/3" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* STEP 6: SEO & LIVE PREVIEW & DANGER ZONE */}
            {/* ==================================================== */}
            {activeStep === 6 && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono">SEO & Publishing</h2>
                  <p className="text-[11px] text-slate-450 mt-0.5">Edit meta parameters, inspect live search engines preview, or manage Danger configurations.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Form Fields */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-455 uppercase tracking-widest block font-mono">Meta Title</label>
                      <input
                        type="text"
                        value={formData.metaTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-205 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-455 uppercase tracking-widest block font-mono">Meta Description</label>
                      <textarea
                        rows={3}
                        value={formData.metaDesc}
                        onChange={(e) => setFormData(prev => ({ ...prev, metaDesc: e.target.value }))}
                        className="w-full p-3.5 bg-slate-50 border border-slate-205 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium font-sans leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-455 uppercase tracking-widest block font-mono">URL Slug</label>
                        <input
                          type="text"
                          value={formData.slug}
                          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/ /g, "-") }))}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-205 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-455 uppercase tracking-widest block font-mono">Keywords</label>
                        <input
                          type="text"
                          value={formData.keywords}
                          onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-205 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Live Google Preview */}
                  <div className="lg:col-span-5 space-y-2">
                    <span className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono select-none">Live Google Search Preview</span>
                    
                    <div className="border border-slate-200 rounded-[20px] p-5 bg-white shadow-xs space-y-1.5 font-sans leading-normal">
                      <span className="text-[10px] text-slate-500 block font-normal">https://securelink.in/products/{formData.slug || "url"}</span>
                      <h4 className="text-sm font-bold text-[#1a0dab] hover:underline cursor-pointer font-sans leading-snug">
                        {formData.metaTitle || formData.name || "Product Catalog Details"}
                      </h4>
                      <p className="text-[11px] text-slate-650 font-medium leading-relaxed font-sans">
                        {formData.metaDesc || formData.shortDesc || "No metadata description configured. Google will fall back to page-level content snippets."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* DANGER ZONE */}
                <div className="border border-red-100 rounded-[20px] overflow-hidden shadow-sm">
                  <div className="bg-red-50/50 border-b border-red-100 px-5 py-4 flex items-center gap-2 select-none">
                    <ShieldAlert size={15} className="text-red-650" />
                    <h3 className="text-xs font-black text-red-950 uppercase tracking-wider font-mono">Danger Zone</h3>
                  </div>

                  <div className="p-5 bg-white divide-y divide-slate-100">
                    {/* Archive Product */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Archive Product</span>
                        <span className="text-[10px] text-slate-450 block font-medium">Remove from public catalog views without deleting database records.</span>
                      </div>
                      <button
                        onClick={handleArchive}
                        className="px-3.5 py-2 border border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50 text-slate-700 font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                      >
                        <Archive size={12} />
                        <span>Archive Product</span>
                      </button>
                    </div>

                    {/* Duplicate Product */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-4">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Duplicate Catalog Entry</span>
                        <span className="text-[10px] text-slate-450 block font-medium">Copy name, tech specifications, and downloads into a new draft.</span>
                      </div>
                      <button
                        onClick={handleDuplicate}
                        className="px-3.5 py-2 border border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50 text-slate-700 font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                      >
                        <Copy size={12} />
                        <span>Duplicate Entry</span>
                      </button>
                    </div>

                    {/* Delete Product */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4">
                      <div>
                        <span className="text-xs font-bold text-red-650 block">Permanently Delete Product</span>
                        <span className="text-[10px] text-slate-450 block font-medium">Delete item specifications and clean up downloads files from storage.</span>
                      </div>
                      <button
                        onClick={handleDelete}
                        className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                      >
                        <Trash2 size={12} />
                        <span>Delete Product</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Card Footer Navigation */}
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
              <span>{activeStep === 6 ? "Save Changes" : "Next Step"}</span>
              <ChevronRight size={13} className="stroke-[2.5]" />
            </button>
          </div>

        </div>

      </Container>

      {/* ==================================================== */}
      {/* FLOATING BOTOM DRAWER: UNSAVED CHANGES DETECTOR */}
      {/* ==================================================== */}
      {hasChanges && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-950 border border-slate-850 text-white rounded-2xl shadow-2xl p-4 z-40 flex items-center justify-between gap-6 sm:gap-8 max-w-lg w-[calc(100%-32px)] sm:w-full select-none animate-in slide-in-from-bottom-8 duration-300">
          <div className="flex items-center gap-2.5">
            <AlertTriangle size={15} className="text-amber-500 shrink-0" />
            <div className="space-y-0.5">
              <span className="text-xs font-bold block text-slate-100 leading-tight">Unsaved Changes</span>
              <span className="text-[10px] text-slate-400 block font-medium leading-none">You have unsaved edits on this product.</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDiscard}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs text-slate-350 hover:text-white font-bold rounded-lg transition-all cursor-pointer text-[10px] uppercase tracking-wider"
            >
              Discard
            </button>
            <button
              onClick={handleSaveChanges}
              className="px-3.5 py-1.5 bg-accent hover:bg-[#c49015] text-primary font-black text-xs rounded-lg transition-all cursor-pointer text-[10px] uppercase tracking-wider"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TOAST ALERT NOTIFICATION BLOCK */}
      {/* ==================================================== */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 pointer-events-none select-none max-w-sm w-full">
          <div className="p-4 bg-white text-slate-800 border border-slate-200 rounded-xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 pointer-events-auto">
            <Check size={16} className="text-emerald-500 shrink-0 stroke-[3]" />
            <span className="text-xs font-semibold leading-tight">{toast.message}</span>
          </div>
        </div>
      )}

    </div>
  );
}
