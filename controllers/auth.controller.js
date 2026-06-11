const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

class AuthController {

  // SIGN UP

  static async signUp(req, res) {
    try {

      const {
        name,
        email,
        password,
        phone,
        role
      } = req.body;

      // Check existing user

      const existingUser = await User.findOne({
        where: { email }
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered'
        });
      }

      // Hash password

      const hashedPassword = await bcrypt.hash(
        password,
        10
      );

      // Create user

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        role
      });

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        }
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }
  }

  // SIGN IN

  static async signIn(req, res) {
    try {

      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email }
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const isPasswordValid =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d'
        }
      );

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }
  }

}

module.exports = AuthController;