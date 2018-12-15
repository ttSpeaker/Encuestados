/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    console.log(respuestas);
    this.modelo.agregarPregunta(pregunta, respuestas);
  }
};
