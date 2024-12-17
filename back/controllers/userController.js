/*const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/global");*/

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Mesero from "../models/Mesero.js";
import config from "../config/global.js";

export const crearUsuario = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({
      username,
      email,
      password,
    });

    user.password = await user.encryptPassword(password);
    await user.save();

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 60 * 60 * 24,
    });

    res.json({ auth: true, token: token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Hubo un error inesperado");
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("El usuario no existe");
    }
    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
      return res.status(401).json({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 60 * 60 * 24,
    });
    res.json({ auth: true, token: token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Hubo un error inesperado");
  }
};

export const obtenerMesero = async (req, res) => {
  try {
    const { usuario, constrasena } = req.body;
    const mesero = await Mesero.findOne({ usuario: usuario });
    if (!mesero) {
      return res.status(404).send("El usuario no existe");
    }
    const validPassword = await mesero.validatePassword(contrasena);
    if (!validPassword) {
      return res.status(401).json({ auth: false, token: null });
    }

    const token = jwt.sign({ id: mesero._id }, config.secret, {
      expiresIn: 60 * 60 * 24,
    });
    res.json({ auth: true, token: token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Hubo un error inesperado");
  }
};
