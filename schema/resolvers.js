const { GraphQLUpload } = require("graphql-upload");
const cloudinary = require("../config/cloudinary");
const User = require("../models/User");
const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const resolvers = {
  Upload: GraphQLUpload,

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

    // ✅ ADD EMPLOYEE WITH PHOTO
    async addEmployee(_, { employee_photo, ...rest }) {

      let imageUrl = "";

      if (employee_photo) {
        const { createReadStream } = await employee_photo;
        const stream = createReadStream();

        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "employees" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.pipe(uploadStream);
        });

        imageUrl = result.secure_url;
      }

      const employee = new Employee({
        ...rest,
        employee_photo: imageUrl
      });

      return await employee.save();
    },

    // ✅ UPDATE EMPLOYEE WITH OPTIONAL NEW PHOTO
    async updateEmployee(_, { id, employee_photo, ...updates }) {

      if (employee_photo) {
        const { createReadStream } = await employee_photo;
        const stream = createReadStream();

        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "employees" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.pipe(uploadStream);
        });

        updates.employee_photo = result.secure_url;
      }

      return await Employee.findByIdAndUpdate(id, updates, { new: true });
    },

    async deleteEmployee(_, { id }) {
      await Employee.findByIdAndDelete(id);
      return "Employee deleted successfully";
    }
  }
};

module.exports = resolvers;