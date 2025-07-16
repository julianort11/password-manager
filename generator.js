const generator = require('generate-password');

function generarPassword(opciones = {}) {
  return generator.generate({
    length: opciones.length || 12,
    numbers: opciones.numbers ?? true,
    symbols: opciones.symbols ?? true,
    uppercase: opciones.uppercase ?? true,
    lowercase: true,
    strict: true
  });
}

module.exports = { generarPassword };