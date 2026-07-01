const User = require("../models/User");

class UserRepository {
  // Create a new user document
  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  // Find a user by ID
  async findById(id) {
    return await User.findById(id);
  }

  // Find a user by email
  async findByEmail(email) {
    return await User.findOne({ email: email.toLowerCase() });
  }

  // Find a user by phone
  async findByPhone(phone) {
    return await User.findOne({ phone: phone.trim() });
  }

  // Update a user by ID
  async update(id, updateData) {
    return await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
  }

  // Delete a user by ID
  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = new UserRepository();
