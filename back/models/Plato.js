const { Schema, model } = require("mongoose");

const platoSchema = new Schema(
  {
    nombre: String,
    ingredientes: String,
    precio: Number,
    categoria: { type: Schema.Types.ObjectId, ref: "Categoria" },
    imagen: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Plato", platoSchema);
