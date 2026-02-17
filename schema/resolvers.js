const User = require("../models/User");
const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {

    async login(_, { username, email, password }) {
      const user = await User.findOne({
        $or: [{ username }, { email }]
      });

      if (!user) throw new Error("User not found");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      return { token, user };
    },

    async getAllEmployees() {
      return await Employee.find();
    },

    async getEmployeeById(_, { id }) {
      return await Employee.findById(id);
    },

    async searchEmployee(_, { designation, department }) {
      return await Employee.find({
        $or: [{ designation }, { department }]
      });
    }
  },

  Mutation: {

    async signup(_, { username, email, password }) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        username,
        email,
        password: hashedPassword
      });

      return await user.save();
    },

    async addEmployee(_, args) {
      const employee = new Employee(args);
      return await employee.save();
    },

    async updateEmployee(_, { id, ...updates }) {
      return await Employee.findByIdAndUpdate(id, updates, { new: true });
    },

    async deleteEmployee(_, { id }) {
      await Employee.findByIdAndDelete(id);
      return "Employee deleted successfully";
    }
  }
};

module.exports = resolvers;
