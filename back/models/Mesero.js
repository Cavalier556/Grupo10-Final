const { Schema, model } = require("mongoose");

const meseroSchema = new Schema(
  {
    nombre: String,
    apellido: String,
    usuario: String,
    contrasena: String,
    dni: String,
  },
  {
    timestamps: true,
  }
);

meseroSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

meseroSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = model("Mesero", meseroSchema);
