const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, Provider } = require("../models");

class AuthController {
  // SIGN UP

  static async signUp(req, res) {
    try {
      const {
        name,
        email,
        password,
        phone,
        role,
        city,
        address,
        date_of_birth,
        service_type_id,
        experience_years,
        gender,
      } = req.body;

      // Check existing user and provider

      let existingUser;

      if (role === "provider") {
        existingUser = await Provider.findOne({
          where: { email },
        });
      } else if (role === "customer") {
        existingUser = await User.findOne({
          where: { email },
        });
      }

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already registered",
        });
      }

      // Hash password

      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user

      let user;

      if (role === "customer") {
        user = await User.create({
          name,
          email,
          password: hashedPassword,
          phone,
          city,
          address,
          date_of_birth,
          gender,
        });
      } else if (role === "provider") {
        if (
          experience_years === undefined ||
          experience_years < 0 ||
          experience_years > 100
        ) {
          return res.status(400).json({
            success: false,
            message: "Experience years must be between 0 and 100.",
          });
        }
        user = await Provider.create({
          
          name,
          email,
          phone,
          role,
          city,
          address,
          password: hashedPassword,
          // date_of_birth,
          service_type_id,
          experience_years,
          // gender,
        });
      }

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // SIGN IN

  static async signIn(req, res) {
    try {
      const { email, password,role } = req.body;

      let user;

      if (role === "customer") {
        user = await User.findOne({
          where: { email },
        });
      } else if (role === "provider") {
        user = await Provider.findOne({
          where: { email },
        });
      } else {
        return res.status(400).json({
          message: "Invalid role",
        });
      }
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
    

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = AuthController;
