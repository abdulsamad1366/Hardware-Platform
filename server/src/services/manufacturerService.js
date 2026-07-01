const fs = require("fs");
const path = require("path");
const manufacturerRepository = require("../repositories/manufacturerRepository");
const Collection = require("../models/Collection");
const Product = require("../models/Product");
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

// Safe filesystem file deleter
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

class ManufacturerService {
  // @desc    Create a new manufacturer
  async createManufacturer(reqBody, reqFiles) {
    const { companyName, email, gst } = reqBody;

    // 1. Verify unique constraints
    const companyExists = await manufacturerRepository.count({ companyName: companyName.trim() });
    if (companyExists > 0) {
      this.cleanupUploadedFiles(reqFiles);
      throw new ApiError(400, "A manufacturer with this company name already exists.");
    }

    const emailExists = await manufacturerRepository.findByEmail(email);
    if (emailExists) {
      this.cleanupUploadedFiles(reqFiles);
      throw new ApiError(400, `A manufacturer with email '${email}' already exists.`);
    }

    const gstExists = await manufacturerRepository.findByGst(gst);
    if (gstExists) {
      this.cleanupUploadedFiles(reqFiles);
      throw new ApiError(400, `A manufacturer with GST number '${gst}' already exists.`);
    }

    // 2. Generate unique slug
    let slug = slugifyName(companyName);
    const slugExists = await manufacturerRepository.findBySlug(slug);
    if (slugExists) {
      slug = `${slug}-${Date.now()}`;
    }

    // 3. Map uploaded files
    const logo = reqFiles && reqFiles.logo ? `/uploads/${reqFiles.logo[0].filename}` : "";
    const banner = reqFiles && reqFiles.banner ? `/uploads/${reqFiles.banner[0].filename}` : "";

    const factoryImages = [];
    if (reqFiles && reqFiles.factoryImages) {
      reqFiles.factoryImages.forEach((file) => {
        factoryImages.push(`/uploads/${file.filename}`);
      });
    }

    const companyBrochure = reqFiles && reqFiles.companyBrochure ? `/uploads/${reqFiles.companyBrochure[0].filename}` : "";
    const factoryVideo = reqFiles && reqFiles.factoryVideo ? `/uploads/${reqFiles.factoryVideo[0].filename}` : "";

    // 4. Construct DB manufacturer data
    const manufacturerData = {
      ...reqBody,
      slug,
      logo,
      banner,
      factoryImages,
      companyBrochure,
      factoryVideo,
      // Parse arrays and booleans
      otherCertifications: reqBody.otherCertifications ? reqBody.otherCertifications.split(",").map(c => c.trim()) : [],
      keywords: reqBody.keywords ? reqBody.keywords.split(",").map(k => k.trim()) : [],
      oemAvailable: reqBody.oemAvailable === "true" || reqBody.oemAvailable === true,
      exportAvailable: reqBody.exportAvailable === "true" || reqBody.exportAvailable === true,
      bulkSupply: reqBody.bulkSupply !== "false" && reqBody.bulkSupply !== false, // default true
      customManufacturing: reqBody.customManufacturing === "true" || reqBody.customManufacturing === true,
      iso: reqBody.iso === "true" || reqBody.iso === true,
      bis: reqBody.bis === "true" || reqBody.bis === true,
      ce: reqBody.ce === "true" || reqBody.ce === true,
    };

    return await manufacturerRepository.create(manufacturerData);
  }

  // @desc    Update manufacturer details
  async updateManufacturer(id, reqBody, reqFiles) {
    const manufacturer = await manufacturerRepository.findById(id);
    if (!manufacturer) {
      this.cleanupUploadedFiles(reqFiles);
      throw new ApiError(404, "Manufacturer not found.");
    }

    const updateData = { ...reqBody };

    // 1. Verify unique constraints if changing
    if (reqBody.email && reqBody.email.toLowerCase() !== manufacturer.email) {
      const emailExists = await manufacturerRepository.findByEmail(reqBody.email);
      if (emailExists) {
        this.cleanupUploadedFiles(reqFiles);
        throw new ApiError(400, `A manufacturer with email '${reqBody.email}' already exists.`);
      }
      updateData.email = reqBody.email.toLowerCase();
    }

    if (reqBody.gst && reqBody.gst.toUpperCase() !== manufacturer.gst) {
      const gstExists = await manufacturerRepository.findByGst(reqBody.gst);
      if (gstExists) {
        this.cleanupUploadedFiles(reqFiles);
        throw new ApiError(400, `A manufacturer with GST number '${reqBody.gst}' already exists.`);
      }
      updateData.gst = reqBody.gst.toUpperCase();
    }

    // 2. Generate slug if companyName changed
    if (reqBody.companyName && reqBody.companyName.trim() !== manufacturer.companyName) {
      const newName = reqBody.companyName.trim();
      const companyExists = await manufacturerRepository.count({ companyName: newName, _id: { $ne: id } });
      if (companyExists > 0) {
        this.cleanupUploadedFiles(reqFiles);
        throw new ApiError(400, "A manufacturer with this company name already exists.");
      }
      
      let slug = slugifyName(newName);
      const slugExists = await manufacturerRepository.findBySlug(slug);
      if (slugExists && slugExists._id.toString() !== id) {
        slug = `${slug}-${Date.now()}`;
      }
      updateData.slug = slug;
      updateData.companyName = newName;
    }

    // 3. Process new file uploads & replace previous files on disk
    if (reqFiles) {
      if (reqFiles.logo) {
        deleteLocalFile(manufacturer.logo);
        updateData.logo = `/uploads/${reqFiles.logo[0].filename}`;
      }
      if (reqFiles.banner) {
        deleteLocalFile(manufacturer.banner);
        updateData.banner = `/uploads/${reqFiles.banner[0].filename}`;
      }
      if (reqFiles.factoryImages) {
        manufacturer.factoryImages.forEach((img) => deleteLocalFile(img));
        updateData.factoryImages = reqFiles.factoryImages.map((file) => `/uploads/${file.filename}`);
      }
      if (reqFiles.companyBrochure) {
        deleteLocalFile(manufacturer.companyBrochure);
        updateData.companyBrochure = `/uploads/${reqFiles.companyBrochure[0].filename}`;
      }
      if (reqFiles.factoryVideo) {
        deleteLocalFile(manufacturer.factoryVideo);
        updateData.factoryVideo = `/uploads/${reqFiles.factoryVideo[0].filename}`;
      }
    }

    // 4. Handle removal of specific factory gallery images if instructed
    if (reqBody.removeFactoryImages) {
      const imagesToRemove = Array.isArray(reqBody.removeFactoryImages)
        ? reqBody.removeFactoryImages
        : reqBody.removeFactoryImages.split(",").map(i => i.trim());

      let currentGallery = updateData.factoryImages || manufacturer.factoryImages;

      imagesToRemove.forEach((img) => {
        deleteLocalFile(img);
        currentGallery = currentGallery.filter((item) => item !== img);
      });

      updateData.factoryImages = currentGallery;
    }

    // Parse array and boolean fields
    if (reqBody.otherCertifications) {
      updateData.otherCertifications = reqBody.otherCertifications.split(",").map(c => c.trim());
    }
    if (reqBody.keywords) {
      updateData.keywords = reqBody.keywords.split(",").map(k => k.trim());
    }
    if (reqBody.oemAvailable !== undefined) {
      updateData.oemAvailable = reqBody.oemAvailable === "true" || reqBody.oemAvailable === true;
    }
    if (reqBody.exportAvailable !== undefined) {
      updateData.exportAvailable = reqBody.exportAvailable === "true" || reqBody.exportAvailable === true;
    }
    if (reqBody.bulkSupply !== undefined) {
      updateData.bulkSupply = reqBody.bulkSupply === "true" || reqBody.bulkSupply === true;
    }
    if (reqBody.customManufacturing !== undefined) {
      updateData.customManufacturing = reqBody.customManufacturing === "true" || reqBody.customManufacturing === true;
    }
    if (reqBody.iso !== undefined) {
      updateData.iso = reqBody.iso === "true" || reqBody.iso === true;
    }
    if (reqBody.bis !== undefined) {
      updateData.bis = reqBody.bis === "true" || reqBody.bis === true;
    }
    if (reqBody.ce !== undefined) {
      updateData.ce = reqBody.ce === "true" || reqBody.ce === true;
    }

    return await manufacturerRepository.update(id, updateData);
  }

  // @desc    Delete manufacturer & clear files
  async deleteManufacturer(id) {
    const manufacturer = await manufacturerRepository.findById(id);
    if (!manufacturer) {
      throw new ApiError(404, "Manufacturer not found.");
    }

    // 1. Cascade protection checks
    const collectionsCount = await Collection.countDocuments({ manufacturer: id });
    if (collectionsCount > 0) {
      throw new ApiError(
        400,
        `Cannot delete manufacturer. Associated collections exist: ${collectionsCount}. Delete or relocate collections first.`
      );
    }

    const productsCount = await Product.countDocuments({ manufacturer: id });
    if (productsCount > 0) {
      throw new ApiError(
        400,
        `Cannot delete manufacturer. Associated products exist: ${productsCount}. Delete or relocate products first.`
      );
    }

    // 2. Delete all files from local disk
    deleteLocalFile(manufacturer.logo);
    deleteLocalFile(manufacturer.banner);
    manufacturer.factoryImages.forEach((img) => deleteLocalFile(img));
    deleteLocalFile(manufacturer.companyBrochure);
    deleteLocalFile(manufacturer.factoryVideo);

    // 3. Delete DB record
    await manufacturerRepository.delete(id);
    return null;
  }

  // @desc    Get manufacturer by slug
  async getManufacturerBySlug(slug) {
    const manufacturer = await manufacturerRepository.findBySlug(slug);
    if (!manufacturer) {
      throw new ApiError(404, "Manufacturer not found.");
    }
    return manufacturer;
  }

  // @desc    Get manufacturer by ID
  async getManufacturerById(id) {
    const manufacturer = await manufacturerRepository.findById(id);
    if (!manufacturer) {
      throw new ApiError(404, "Manufacturer not found.");
    }
    return manufacturer;
  }

  // @desc    List manufacturers
  async listManufacturers(queryParams) {
    const { search, status, verificationStatus, page = 1, limit = 10, sort } = queryParams;

    const filterQuery = {};

    if (status) filterQuery.status = status;
    if (verificationStatus) filterQuery.verificationStatus = verificationStatus;

    if (search) {
      filterQuery.$or = [
        { companyName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } }
      ];
    }

    let sortQuery = { createdAt: -1 }; // Default
    if (sort) {
      if (sort === "Newest") sortQuery = { createdAt: -1 };
      else if (sort === "Oldest") sortQuery = { createdAt: 1 };
      else if (sort === "A-Z") sortQuery = { companyName: 1 };
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const { manufacturers, total } = await manufacturerRepository.findAndCount(filterQuery, {
      sortQuery,
      skip,
      limit: limitNumber,
    });

    return {
      manufacturers,
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

module.exports = new ManufacturerService();
