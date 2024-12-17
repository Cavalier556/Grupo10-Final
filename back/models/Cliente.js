const { Schema, model } = require("mongoose");

const clienteSchema = new Schema(
  {
    nombre: String,
    email: String,
    telefono: String,
    dni: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Cliente", clienteSchema);
