const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");
const ApiError = require("../utils/ApiError");

class AuthService {
  // Helper: generates JWT access and refresh tokens
  generateTokens(userId) {
    const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }

  // @desc    Register a new user
  async registerUser(reqBody) {
    const { name, email, phone, company, gst, password, city, state, country } = reqBody;

    // 1. Verify unique constraints
    const emailExists = await userRepository.findByEmail(email);
    if (emailExists) {
      throw new ApiError(400, "A business account with this email address already exists.");
    }

    const phoneExists = await userRepository.findByPhone(phone);
    if (phoneExists) {
      throw new ApiError(400, "A business account with this phone number already exists.");
    }

    // 2. Create User account (triggers pre-save bcrypt encrypt hook on the model)
    const user = await userRepository.create({
      name,
      email,
      phone,
      company,
      gst: gst || "",
      password,
      city,
      state,
      country: country || "India",
    });

    // 3. Generate tokens
    const tokens = this.generateTokens(user._id);

    return {
      user: this.sanitizeUser(user),
      tokens,
    };
  }

  // @desc    Authenticate user credentials
  async loginUser(email, password) {
    // 1. Fetch user by email
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new ApiError(401, "Invalid email or password credentials.");
    }

    // 2. Match password hash
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password credentials.");
    }

    // 3. Generate tokens
    const tokens = this.generateTokens(user._id);

    return {
      user: this.sanitizeUser(user),
      tokens,
    };
  }

  // @desc    Refresh session token using refresh token
  async refreshAccessToken(token) {
    if (!token) {
      throw new ApiError(401, "Session expired. Refresh token missing.");
    }

    try {
      // Verify refresh token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user profile
      const user = await userRepository.findById(decoded.id);
      if (!user) {
        throw new ApiError(404, "Invalid session details. User not found.");
      }

      // Generate new tokens
      const tokens = this.generateTokens(user._id);

      return tokens;
    } catch (error) {
      throw new ApiError(401, "Invalid or expired session. Please sign in again.");
    }
  }

  // @desc    Generate password reset token
  async forgotPassword(email) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      // Prevent email enumerations, return null (controller will respond with generic success)
      return null;
    }

    // Create a recovery token using signed short-expiry JWT (15 mins)
    const resetToken = jwt.sign(
      { id: user._id, type: "password-reset" },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return resetToken;
  }

  // @desc    Reset password using recovery token
  async resetPassword(token, newPassword) {
    try {
      // 1. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.type !== "password-reset") {
        throw new ApiError(400, "Invalid recovery token signature.");
      }

      // 2. Fetch user
      const user = await userRepository.findById(decoded.id);
      if (!user) {
        throw new ApiError(404, "User profile not found.");
      }

      // 3. Update password (will trigger pre-save bcrypt hook on User.js model)
      user.password = newPassword;
      await user.save();

      return true;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(400, "Expired or invalid password reset token.");
    }
  }

  // Helper utility: sanitizes sensitive user details from JSON outputs
  sanitizeUser(user) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      company: user.company,
      phone: user.phone,
      gst: user.gst,
      city: user.city,
      state: user.state,
      country: user.country,
      role: user.role,
    };
  }
}

module.exports = new AuthService();
