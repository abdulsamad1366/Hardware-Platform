"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Search, Filter, ArrowUpDown, MoreHorizontal, Plus, 
  ChevronLeft, ChevronRight, Eye, Edit2, Copy, Archive, 
  Trash2, X, CheckCircle, Info, AlertTriangle, Package,
  ExternalLink, BarChart3, ShieldAlert
} from "lucide-react";
import { Container } from "@/components/layout/container/Container";
import { products as initialProducts, Product } from "@/data/products";

// Add default admin values to products
interface AdminProduct extends Product {
  manufacturer: string;
  status: "Published" | "Draft" | "Archived";
  updatedAt: string;
  moq: number;
}

const MOCK_MANUFACTURERS = ["Yale B2B", "Assa Abloy", "Dorma Fittings", "Hettich", "SecureLink Hardware"];
const CATEGORIES = ["Locks", "Door Hardware", "Glass Hardware", "Smart Locks", "Accessories"];

export default function AdminProductsPage() {
  // 1. Initialize State
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [manufacturerFilter, setManufacturerFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOption, setSortOption] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Active row action dropdown menu ID
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Modals & Drawer States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(null); // For edit/view
  const [viewProductDetails, setViewProductDetails] = useState<AdminProduct | null>(null); // For view modal

  // Drawer Form State
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    category: "Locks",
    manufacturer: MOCK_MANUFACTURERS[0],
    price: "",
    moq: "1",
    material: "",
    finish: "",
    status: "Draft" as "Published" | "Draft" | "Archived",
    description: "",
  });

  // Dynamic Toast Notifications
  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "info" | "warning" }[]>([]);

  // 2. Load Products Mock Data on Mount
  useEffect(() => {
    const adminMapped = initialProducts.map((p, idx) => ({
      ...p,
      manufacturer: MOCK_MANUFACTURERS[idx % MOCK_MANUFACTURERS.length],
      status: (idx % 8 === 0 ? "Draft" : idx % 12 === 0 ? "Archived" : "Published") as "Published" | "Draft" | "Archived",
      updatedAt: `2026-06-${Math.max(10, 28 - (idx % 18))}`,
      moq: idx % 4 === 0 ? 10 : 1,
    }));
    setProducts(adminMapped);
  }, []);

  // 3. Helper: Toast Dispatcher
  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Close menus on click outside
  useEffect(() => {
    const handleOutsideClick = () => setActiveMenuId(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  // 4. CRUD handlers
  const handleOpenAddDrawer = () => {
    setSelectedProduct(null);
    setFormData({
      name: "",
      code: `SL-HW-${Math.floor(100 + Math.random() * 900)}`,
      category: "Locks",
      manufacturer: MOCK_MANUFACTURERS[0],
      price: "1500",
      moq: "1",
      material: "Solid Brass",
      finish: "Polished Gold",
      status: "Draft",
      description: "",
    });
    setIsDrawerOpen(true);
  };

  const handleOpenEditDrawer = (product: AdminProduct) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      code: product.code,
      category: product.category,
      manufacturer: product.manufacturer,
      price: product.price.toString(),
      moq: product.moq.toString(),
      material: product.material,
      finish: product.finish,
      status: product.status,
      description: product.description,
    });
    setIsDrawerOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.code.trim()) {
      showToast("Name and SKU/Code are required.", "warning");
      return;
    }

    if (selectedProduct) {
      // EDIT MODE
      setProducts((prev) =>
        prev.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...p,
                name: formData.name,
                code: formData.code.toUpperCase(),
                category: formData.category,
                manufacturer: formData.manufacturer,
                price: parseFloat(formData.price) || 0,
                moq: parseInt(formData.moq) || 1,
                material: formData.material,
                finish: formData.finish,
                status: formData.status,
                description: formData.description,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : p
        )
      );
      showToast(`✓ Product "${formData.name}" updated successfully.`);
    } else {
      // ADD MODE
      const newProduct: AdminProduct = {
        id: `prod-${Date.now()}`,
        name: formData.name,
        code: formData.code.toUpperCase(),
        category: formData.category,
        manufacturer: formData.manufacturer,
        price: parseFloat(formData.price) || 0,
        moq: parseInt(formData.moq) || 1,
        material: formData.material,
        finish: formData.finish,
        status: formData.status,
        description: formData.description,
        image: "/images/product-locks.png", // default
        href: `/products/${formData.name.toLowerCase().replace(/ /g, "-")}`,
        rating: 5.0,
        popularity: 1,
        dateAdded: new Date().toISOString().split("T")[0],
        application: "Both",
        updatedAt: new Date().toISOString().split("T")[0],
        specifications: {},
      };
      setProducts((prev) => [newProduct, ...prev]);
      showToast(`✓ Product "${formData.name}" created successfully.`);
    }

    setIsDrawerOpen(false);
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    if (confirm(`Are you sure you want to delete ${productName}?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      showToast(`Trash: Product "${productName}" removed.`, "info");
    }
  };

  const handleArchiveProduct = (productId: string, productName: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, status: "Archived" } : p))
    );
    showToast(`Archived: "${productName}" moved to archive directory.`, "info");
  };

  const handleDuplicateProduct = (product: AdminProduct) => {
    const duplicated: AdminProduct = {
      ...product,
      id: `prod-copy-${Date.now()}`,
      name: `${product.name} (Copy)`,
      code: `${product.code}-COPY`,
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setProducts((prev) => [duplicated, ...prev]);
    showToast(`Duplicated: Copied "${product.name}" successfully.`);
  };

  // 5. Search, Filter, Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search filter
        const matchSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.code.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Category filter
        const matchCategory = !categoryFilter || p.category === categoryFilter;

        // Manufacturer filter
        const matchManufacturer = !manufacturerFilter || p.manufacturer === manufacturerFilter;

        // Status filter
        const matchStatus = !statusFilter || p.status === statusFilter;

        return matchSearch && matchCategory && matchManufacturer && matchStatus;
      })
      .sort((a, b) => {
        if (sortOption === "Newest") {
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        }
        if (sortOption === "Oldest") {
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        }
        if (sortOption === "A-Z") {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [products, searchQuery, categoryFilter, manufacturerFilter, statusFilter, sortOption]);

  // 6. Pagination Calculations
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredProducts.slice(startIndex, startIndex + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  // Reset page on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, manufacturerFilter, statusFilter]);

  // Compute stat counts
  const stats = useMemo(() => {
    return {
      total: products.length,
      published: products.filter((p) => p.status === "Published").length,
      draft: products.filter((p) => p.status === "Draft").length,
      archived: products.filter((p) => p.status === "Archived").length,
    };
  }, [products]);

  return (
    <div className="min-h-screen bg-slate-50 pt-28 md:pt-36 pb-20 font-sans selection:bg-accent selection:text-primary relative overflow-x-hidden">
      <Container className="max-w-[1400px] space-y-8">
        
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <nav className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono select-none">
              Portal / Products
            </nav>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Products
            </h1>
            <p className="text-xs text-slate-500 font-medium font-sans">
              Manage all products available on the SecureLink platform.
            </p>
          </div>
          <button
            onClick={handleOpenAddDrawer}
            className="self-start sm:self-center px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-1.5 cursor-pointer"
          >
            <Plus size={14} className="stroke-[2.5]" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Stats Summary Cards Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Products", count: stats.total, color: "text-slate-900 bg-slate-100", icon: Package },
            { label: "Published", count: stats.published, color: "text-emerald-700 bg-emerald-50 border-emerald-100", icon: CheckCircle },
            { label: "Drafts", count: stats.draft, color: "text-amber-700 bg-amber-50 border-amber-100", icon: Info },
            { label: "Archived", count: stats.archived, color: "text-slate-600 bg-slate-50 border-slate-100", icon: ShieldAlert },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white border border-slate-150 rounded-2xl p-5 shadow-sm flex items-center justify-between select-none">
                <div className="space-y-1.5">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono">{stat.label}</span>
                  <span className="text-2xl font-black text-slate-950 font-mono tracking-tight">{stat.count}</span>
                </div>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-transparent ${stat.color}`}>
                  <Icon size={16} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Toolbar & Filters Box */}
        <div className="bg-white border border-slate-150 rounded-[20px] p-5 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            
            {/* Search Box */}
            <div className="lg:col-span-4 relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product name, SKU..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-slate-800 transition-all font-medium"
              />
            </div>

            {/* Category Dropdown */}
            <div className="lg:col-span-2 relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-slate-800 transition-all font-medium appearance-none cursor-pointer"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Filter size={11} />
              </div>
            </div>

            {/* Manufacturer Dropdown */}
            <div className="lg:col-span-2 relative">
              <select
                value={manufacturerFilter}
                onChange={(e) => setManufacturerFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-slate-800 transition-all font-medium appearance-none cursor-pointer"
              >
                <option value="">All Manufacturers</option>
                {MOCK_MANUFACTURERS.map((mfg, i) => (
                  <option key={i} value={mfg}>{mfg}</option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Filter size={11} />
              </div>
            </div>

            {/* Status Dropdown */}
            <div className="lg:col-span-2 relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-slate-800 transition-all font-medium appearance-none cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Filter size={11} />
              </div>
            </div>

            {/* Sort */}
            <div className="lg:col-span-2 relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-slate-800 transition-all font-medium appearance-none cursor-pointer"
              >
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="A-Z">A-Z</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ArrowUpDown size={11} />
              </div>
            </div>

          </div>
        </div>

        {/* SaaS Table Card */}
        {filteredProducts.length === 0 ? (
          /* EMPTY STATE */
          <div className="bg-white border border-slate-150 rounded-[20px] p-16 text-center shadow-sm space-y-5">
            <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 mx-auto">
              <Package size={26} className="stroke-[1.5]" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-sm font-bold text-slate-950 uppercase tracking-wider font-mono">No Products Found</h2>
              <p className="text-xs text-slate-500 max-w-[280px] mx-auto leading-relaxed">
                Create your first product or clear filter queries to resume listings.
              </p>
            </div>
            <button
              onClick={handleOpenAddDrawer}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              Add Product
            </button>
          </div>
        ) : (
          /* DATA TABLE */
          <div className="bg-white border border-slate-150 rounded-[20px] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono select-none">
                    <th className="py-4 px-6">Image</th>
                    <th className="py-4 px-6">Product Name</th>
                    <th className="py-4 px-6">SKU</th>
                    <th className="py-4 px-6">Manufacturer</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {paginatedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Image */}
                      <td className="py-3.5 px-6">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-100 overflow-hidden relative shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                      </td>

                      {/* Name */}
                      <td className="py-3.5 px-6 font-bold text-slate-900 max-w-[240px]">
                        <span className="block truncate">{product.name}</span>
                        <span className="text-[9px] text-slate-450 block truncate font-sans font-medium">Updated: {product.updatedAt}</span>
                      </td>

                      {/* SKU */}
                      <td className="py-3.5 px-6 font-mono font-bold text-slate-600 text-[10px] tracking-wide">
                        {product.code}
                      </td>

                      {/* Manufacturer */}
                      <td className="py-3.5 px-6 font-medium text-slate-600">
                        {product.manufacturer}
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-6">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-bold uppercase tracking-wider font-mono">
                          {product.category}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-6 select-none">
                        {product.status === "Published" && (
                          <span className="px-2 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-[9px] font-bold">
                            Published
                          </span>
                        )}
                        {product.status === "Draft" && (
                          <span className="px-2 py-0.5 rounded-full border border-amber-200 bg-amber-50 text-amber-700 text-[9px] font-bold">
                            Draft
                          </span>
                        )}
                        {product.status === "Archived" && (
                          <span className="px-2 py-0.5 rounded-full border border-slate-200 bg-slate-100 text-slate-600 text-[9px] font-bold">
                            Archived
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-6 text-right relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(activeMenuId === product.id ? null : product.id);
                          }}
                          className="p-1.5 rounded-lg hover:bg-slate-150 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer select-none"
                        >
                          <MoreHorizontal size={14} />
                        </button>

                        {/* Row action floating dropdown menu */}
                        {activeMenuId === product.id && (
                          <div className="absolute right-6 top-11 bg-white border border-slate-150 rounded-xl shadow-lg py-1.5 w-36 z-30 divide-y divide-slate-100 text-left">
                            <div className="py-1">
                              <button
                                onClick={() => setViewProductDetails(product)}
                                className="w-full px-3 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-bold text-[10px] uppercase tracking-wider font-mono flex items-center gap-1.5 cursor-pointer"
                              >
                                <Eye size={12} />
                                <span>View</span>
                              </button>
                              <button
                                onClick={() => handleOpenEditDrawer(product)}
                                className="w-full px-3 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-bold text-[10px] uppercase tracking-wider font-mono flex items-center gap-1.5 cursor-pointer"
                              >
                                <Edit2 size={12} />
                                <span>Edit</span>
                              </button>
                            </div>
                            <div className="py-1">
                              <button
                                onClick={() => handleDuplicateProduct(product)}
                                className="w-full px-3 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-bold text-[10px] uppercase tracking-wider font-mono flex items-center gap-1.5 cursor-pointer"
                              >
                                <Copy size={12} />
                                <span>Duplicate</span>
                              </button>
                              {product.status !== "Archived" && (
                                <button
                                  onClick={() => handleArchiveProduct(product.id, product.name)}
                                  className="w-full px-3 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-bold text-[10px] uppercase tracking-wider font-mono flex items-center gap-1.5 cursor-pointer"
                                >
                                  <Archive size={12} />
                                  <span>Archive</span>
                                </button>
                              )}
                            </div>
                            <div className="py-1">
                              <button
                                onClick={() => handleDeleteProduct(product.id, product.name)}
                                className="w-full px-3 py-1.5 text-red-600 hover:bg-red-50 font-bold text-[10px] uppercase tracking-wider font-mono flex items-center gap-1.5 cursor-pointer"
                              >
                                <Trash2 size={12} />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="bg-slate-50/50 border-t border-slate-100 py-3.5 px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-450 font-bold font-mono uppercase tracking-wider">
                  Page size:
                </span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(parseInt(e.target.value, 10));
                    setCurrentPage(1);
                  }}
                  className="bg-white border border-slate-200 text-slate-700 text-[10px] font-bold font-mono px-2 py-1 rounded-lg focus:outline-none"
                >
                  <option value={10}>10 rows</option>
                  <option value={25}>25 rows</option>
                  <option value={50}>50 rows</option>
                  <option value={100}>100 rows</option>
                </select>
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">
                  Showing {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredProducts.length)} of {filteredProducts.length} entries
                </span>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="p-1 rounded-lg border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const page = idx + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-7 h-7 rounded-lg text-[10px] font-bold font-mono transition-all cursor-pointer ${
                          currentPage === page
                            ? "bg-slate-900 text-white"
                            : "border border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="p-1 rounded-lg border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

      </Container>

      {/* ==================================================== */}
      {/* MOCK DRAWER: SLIDE-OVER FORM (ADD/EDIT) */}
      {/* ==================================================== */}
      <div 
        className={`fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white border-l border-slate-150 shadow-2xl z-50 flex flex-col transition-all duration-300 transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between select-none">
          <div>
            <h3 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider font-mono">
              {selectedProduct ? "Edit Product" : "Add New Product"}
            </h3>
            <span className="text-[10px] text-slate-400 font-semibold font-sans">
              {selectedProduct ? "Modify the product details below" : "Enter product specifications below"}
            </span>
          </div>
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Drawer Body Form */}
        <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-5 space-y-5 text-slate-700">
          {/* Product Name */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
              Product Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="E.g. Euro Profile Cylindrical Lock"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
            />
          </div>

          {/* SKU Code */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
              SKU Code *
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData((prev) => ({ ...prev, code: e.target.value }))}
              placeholder="SL-HW-XX"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium uppercase"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                Price (₹) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                placeholder="4500"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
              />
            </div>

            {/* MOQ */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                MOQ Units *
              </label>
              <input
                type="number"
                value={formData.moq}
                onChange={(e) => setFormData((prev) => ({ ...prev, moq: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium appearance-none cursor-pointer"
              >
                {CATEGORIES.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Manufacturer */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                Manufacturer
              </label>
              <select
                value={formData.manufacturer}
                onChange={(e) => setFormData((prev) => ({ ...prev, manufacturer: e.target.value }))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium appearance-none cursor-pointer"
              >
                {MOCK_MANUFACTURERS.map((mfg, i) => (
                  <option key={i} value={mfg}>{mfg}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Material */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                Material
              </label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) => setFormData((prev) => ({ ...prev, material: e.target.value }))}
                placeholder="Solid Brass"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
              />
            </div>

            {/* Finish */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                Finish
              </label>
              <input
                type="text"
                value={formData.finish}
                onChange={(e) => setFormData((prev) => ({ ...prev, finish: e.target.value }))}
                placeholder="Satin Gold"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium"
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
              Publish Status
            </label>
            <div className="flex gap-4">
              {["Draft", "Published", "Archived"].map((st) => (
                <label key={st} className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="status"
                    value={st}
                    checked={formData.status === st}
                    onChange={() => setFormData((prev) => ({ ...prev, status: st as any }))}
                    className="accent-slate-900"
                  />
                  <span>{st}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
              Product Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Add product highlights..."
              className="w-full p-3.5 bg-slate-50 border border-slate-200 text-slate-850 text-xs rounded-xl focus:outline-none focus:border-slate-800 transition-all font-medium font-sans leading-relaxed"
            />
          </div>

          {/* Mock Files Alert */}
          <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 flex gap-2 text-[10px] text-slate-500 leading-relaxed font-medium">
            <Info size={14} className="text-slate-400 shrink-0 mt-0.5" />
            <span>Image files and technical brochure documents can be linked via local directories. This mockup simulates form database operations.</span>
          </div>

          {/* Drawer Footer Buttons */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="w-full py-3 bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all border border-slate-200 shadow-sm cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow cursor-pointer text-center"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>

      {/* Backdrop for Drawer */}
      {isDrawerOpen && (
        <div 
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40"
        />
      )}

      {/* ==================================================== */}
      {/* MOCK MODAL: QUICK VIEW DETAILS */}
      {/* ==================================================== */}
      {viewProductDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            onClick={() => setViewProductDetails(null)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Modal Panel */}
          <div className="relative bg-white border border-slate-150 rounded-[20px] shadow-2xl w-full max-w-xl p-6 sm:p-8 space-y-6 text-slate-700 z-10 animate-in fade-in-50 zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between select-none">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-100 overflow-hidden relative shrink-0">
                  <Image
                    src={viewProductDetails.image}
                    alt={viewProductDetails.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider font-mono">
                    {viewProductDetails.name}
                  </h2>
                  <span className="text-[10px] text-slate-400 font-bold font-mono uppercase tracking-wide">
                    SKU: {viewProductDetails.code}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => setViewProductDetails(null)}
                className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Specifications Summary Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-1">
                <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono">Manufacturer</span>
                <span className="font-bold text-slate-800">{viewProductDetails.manufacturer}</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-1">
                <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono">Category</span>
                <span className="font-bold text-slate-800">{viewProductDetails.category}</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-1">
                <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono">Est. Price</span>
                <span className="font-bold text-slate-800 font-mono">₹{viewProductDetails.price.toLocaleString("en-IN")}</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-1">
                <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono">MOQ Units</span>
                <span className="font-bold text-slate-800 font-mono">{viewProductDetails.moq} Unit(s)</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-1">
                <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono">Material</span>
                <span className="font-bold text-slate-800">{viewProductDetails.material}</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-1">
                <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono">Finish</span>
                <span className="font-bold text-slate-800">{viewProductDetails.finish}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Company Description</span>
              <p className="text-xs text-slate-650 leading-relaxed font-medium">
                {viewProductDetails.description}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-150 flex items-center justify-between">
              <span className="text-[9px] font-bold text-slate-400 font-mono uppercase tracking-wider">
                ID Reference: <span className="text-slate-700">{viewProductDetails.id}</span>
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setViewProductDetails(null);
                    handleOpenEditDrawer(viewProductDetails);
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <Edit2 size={12} />
                  <span>Edit Details</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* LIVE TOAST NOTIFICATION BLOCK */}
      {/* ==================================================== */}
      <div className="fixed bottom-5 right-5 space-y-2 z-50 pointer-events-none select-none max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-xl border shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 pointer-events-auto w-full ${
              toast.type === "success"
                ? "bg-white text-emerald-800 border-emerald-100"
                : toast.type === "info"
                ? "bg-white text-slate-800 border-slate-200"
                : "bg-white text-amber-800 border-amber-100"
            }`}
          >
            {toast.type === "success" && <CheckCircle size={16} className="text-emerald-500 shrink-0" />}
            {toast.type === "info" && <Info size={16} className="text-blue-500 shrink-0" />}
            {toast.type === "warning" && <AlertTriangle size={16} className="text-amber-500 shrink-0" />}
            
            <span className="text-xs font-semibold leading-tight">{toast.message}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
