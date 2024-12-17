const { Schema, model } = require("mongoose");

const ordenSchema = new Schema(
  {
    mesa: String,
    numero: Number,
    plato: [{ type: Schema.Types.ObjectId, ref: "Plato" }],
    cantidad: [Number],
    estado: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Orden", ordenSchema);
