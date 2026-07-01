const fs = require("fs");
const path = require("path");
const productRepository = require("../repositories/productRepository");
const ApiError = require("../utils/ApiError");

const slugifyName = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

// Safe filesystem deleter
const deleteLocalFile = (relativePath) => {
  if (!relativePath) return;
  try {
    const absolutePath = path.join(__dirname, "..", relativePath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  } catch (err) {
    console.error(`[File System] Failed to delete file: ${relativePath}. Error: ${err.message}`);
  }
};

class ProductService {
  // @desc    Create a new product
  async createProduct(reqBody, reqFiles) {
    const { name, sku } = reqBody;

    // 1. Verify unique SKU
    const skuExists = await productRepository.findBySku(sku);
    if (skuExists) {
      this.cleanupUploadedFiles(reqFiles);
      throw new ApiError(400, `A product with SKU '${sku}' already exists.`);
    }

    // 2. Generate unique slug
    let slug = slugifyName(name);
    let slugExists = await productRepository.findBySlug(slug);
    if (slugExists) {
      slug = `${slug}-${Date.now()}`;
    }

    // 3. Map uploaded file paths
    const coverImage = reqFiles && reqFiles.coverImage ? `/uploads/${reqFiles.coverImage[0].filename}` : "";
    
    // Cover image is mandatory
    if (!coverImage) {
      this.cleanupUploadedFiles(reqFiles);
      throw new ApiError(400, "Product cover image is required.");
    }

    const galleryImages = [];
    if (reqFiles && reqFiles.galleryImages) {
      reqFiles.galleryImages.forEach((file) => {
        galleryImages.push(`/uploads/${file.filename}`);
      });
    }

    const brochure = reqFiles && reqFiles.brochure ? `/uploads/${reqFiles.brochure[0].filename}` : "";
    const datasheet = reqFiles && reqFiles.datasheet ? `/uploads/${reqFiles.datasheet[0].filename}` : "";
    const installationGuide = reqFiles && reqFiles.installationGuide ? `/uploads/${reqFiles.installationGuide[0].filename}` : "";
    const cadDrawing = reqFiles && reqFiles.cadDrawing ? `/uploads/${reqFiles.cadDrawing[0].filename}` : "";

    // 4. Construct DB product data object
    const productData = {
      ...reqBody,
      slug,
      coverImage,
      galleryImages,
      brochure,
      datasheet,
      installationGuide,
      cadDrawing,
      // Parse arrays/booleans if submitted as form text fields
      keywords: reqBody.keywords ? reqBody.keywords.split(",").map(k => k.trim()) : [],
      isFeatured: reqBody.isFeatured === "true" || reqBody.isFeatured === true,
      isTrending: reqBody.isTrending === "true" || reqBody.isTrending === true,
      isNewArrival: reqBody.isNewArrival === "true" || reqBody.isNewArrival === true,
      isBestSeller: reqBody.isBestSeller === "true" || reqBody.isBestSeller === true,
    };

    return await productRepository.create(productData);
  }

  // @desc    Update an existing product
  async updateProduct(id, reqBody, reqFiles) {
    const product = await productRepository.findById(id);
    if (!product) {
      this.cleanupUploadedFiles(reqFiles);
      throw new ApiError(404, "Product not found.");
    }

    const updateData = { ...reqBody };

    // 1. Verify SKU uniqueness if changed
    if (reqBody.sku && reqBody.sku.toUpperCase() !== product.sku) {
      const skuExists = await productRepository.findBySku(reqBody.sku);
      if (skuExists) {
        this.cleanupUploadedFiles(reqFiles);
        throw new ApiError(400, `A product with SKU '${reqBody.sku}' already exists.`);
      }
      updateData.sku = reqBody.sku.toUpperCase();
    }

    // 2. Generate unique slug if name changed
    if (reqBody.name && reqBody.name.trim() !== product.name) {
      let slug = slugifyName(reqBody.name);
      let slugExists = await productRepository.findBySlug(slug);
      if (slugExists && slugExists._id.toString() !== id) {
        slug = `${slug}-${Date.now()}`;
      }
      updateData.slug = slug;
    }

    // 3. Process image updates and replace disk files
    if (reqFiles) {
      if (reqFiles.coverImage) {
        deleteLocalFile(product.coverImage);
        updateData.coverImage = `/uploads/${reqFiles.coverImage[0].filename}`;
      }

      if (reqFiles.galleryImages) {
        // Option: Replace entire gallery or append. For admin CRUD, we replace previous gallery with newly uploaded list
        product.galleryImages.forEach((img) => deleteLocalFile(img));
        updateData.galleryImages = reqFiles.galleryImages.map((file) => `/uploads/${file.filename}`);
      }

      // Document downloads files
      if (reqFiles.brochure) {
        deleteLocalFile(product.brochure);
        updateData.brochure = `/uploads/${reqFiles.brochure[0].filename}`;
      }
      if (reqFiles.datasheet) {
        deleteLocalFile(product.datasheet);
        updateData.datasheet = `/uploads/${reqFiles.datasheet[0].filename}`;
      }
      if (reqFiles.installationGuide) {
        deleteLocalFile(product.installationGuide);
        updateData.installationGuide = `/uploads/${reqFiles.installationGuide[0].filename}`;
      }
      if (reqFiles.cadDrawing) {
        deleteLocalFile(product.cadDrawing);
        updateData.cadDrawing = `/uploads/${reqFiles.cadDrawing[0].filename}`;
      }
    }

    // 4. Handle removal of specific gallery images if instructed
    if (reqBody.removeGalleryImages) {
      const imagesToRemove = Array.isArray(reqBody.removeGalleryImages)
        ? reqBody.removeGalleryImages
        : reqBody.removeGalleryImages.split(",").map(i => i.trim());

      let currentGallery = updateData.galleryImages || product.galleryImages;

      imagesToRemove.forEach((img) => {
        deleteLocalFile(img);
        currentGallery = currentGallery.filter((item) => item !== img);
      });

      updateData.galleryImages = currentGallery;
    }

    // Parse array and boolean parameters
    if (reqBody.keywords) {
      updateData.keywords = reqBody.keywords.split(",").map(k => k.trim());
    }
    if (reqBody.isFeatured !== undefined) {
      updateData.isFeatured = reqBody.isFeatured === "true" || reqBody.isFeatured === true;
    }
    if (reqBody.isTrending !== undefined) {
      updateData.isTrending = reqBody.isTrending === "true" || reqBody.isTrending === true;
    }
    if (reqBody.isNewArrival !== undefined) {
      updateData.isNewArrival = reqBody.isNewArrival === "true" || reqBody.isNewArrival === true;
    }
    if (reqBody.isBestSeller !== undefined) {
      updateData.isBestSeller = reqBody.isBestSeller === "true" || reqBody.isBestSeller === true;
    }

    return await productRepository.update(id, updateData);
  }

  // @desc    Delete product & clear files
  async deleteProduct(id) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new ApiError(404, "Product not found.");
    }

    // 1. Delete all images from filesystem disk
    deleteLocalFile(product.coverImage);
    product.galleryImages.forEach((img) => deleteLocalFile(img));

    // 2. Delete all brochures and documents from filesystem disk
    deleteLocalFile(product.brochure);
    deleteLocalFile(product.datasheet);
    deleteLocalFile(product.installationGuide);
    deleteLocalFile(product.cadDrawing);

    // 3. Delete document from DB
    await productRepository.delete(id);
    return null;
  }

  // @desc    Get single product by slug
  async getProductBySlug(slug) {
    const product = await productRepository.findBySlug(slug);
    if (!product) {
      throw new ApiError(404, "Product not found.");
    }
    return product;
  }

  // @desc    Get single product by ID
  async getProductById(id) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new ApiError(404, "Product not found.");
    }
    return product;
  }

  // @desc    List products with filters, search, sorting and pagination
  async listProducts(queryParams) {
    const {
      search, manufacturer, category, collection, material, finish,
      availability, isFeatured, isTrending, minPrice, maxPrice, status,
      page = 1, limit = 10, sort
    } = queryParams;

    const filterQuery = {};

    // 1. Filter mapping
    if (manufacturer) filterQuery.manufacturer = manufacturer;
    if (category) filterQuery.category = category;
    if (collection) filterQuery.collectionRef = collection;
    if (material) filterQuery.material = { $regex: material, $options: "i" };
    if (finish) filterQuery.finish = { $regex: finish, $options: "i" };
    if (availability) filterQuery.availability = availability;
    
    if (isFeatured !== undefined) {
      filterQuery.isFeatured = isFeatured === "true" || isFeatured === true;
    }
    if (isTrending !== undefined) {
      filterQuery.isTrending = isTrending === "true" || isTrending === true;
    }

    // Price range filters
    if (minPrice || maxPrice) {
      filterQuery.price = {};
      if (minPrice) filterQuery.price.$gte = parseFloat(minPrice);
      if (maxPrice) filterQuery.price.$lte = parseFloat(maxPrice);
    }

    // Status (Draft/Published/Archived) filters
    if (status && status !== "all") {
      filterQuery.status = status;
    } else if (!status) {
      filterQuery.status = "Published"; // Default list public products only
    }

    // 2. Search query mapping
    if (search) {
      filterQuery.$or = [
        { name: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
        { material: { $regex: search, $options: "i" } }
      ];
    }

    // 3. Sort configuration
    let sortQuery = { createdAt: -1 }; // Default
    if (sort) {
      if (sort === "Newest") sortQuery = { createdAt: -1 };
      else if (sort === "Oldest") sortQuery = { createdAt: 1 };
      else if (sort === "A-Z") sortQuery = { name: 1 };
      else if (sort === "Price") sortQuery = { price: 1 };
      else if (sort === "-Price") sortQuery = { price: -1 };
    }

    // 4. Pagination
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    // 5. Query execution
    const { products, total } = await productRepository.findAndCount(filterQuery, {
      sortQuery,
      skip,
      limit: limitNumber,
    });

    return {
      products,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    };
  }

  // Helper utility: cleans up uploaded files on error to prevent junk files leaking in storage
  cleanupUploadedFiles(reqFiles) {
    if (!reqFiles) return;
    try {
      Object.keys(reqFiles).forEach((fieldName) => {
        reqFiles[fieldName].forEach((file) => {
          deleteLocalFile(`/uploads/${file.filename}`);
        });
      });
    } catch (err) {
      console.error(`[Upload Cleanup] Failed to run file deletions: ${err.message}`);
    }
  }
}

module.exports = new ProductService();
