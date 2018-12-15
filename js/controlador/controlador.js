/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    this.modelo.agregarPregunta(pregunta, respuestas);
  },
  removerPregunta: function(id) {
    this.modelo.removerPregunta(id);
  },
  editarPregunta: function(id, textoEditado) {
    if (typeof id == "number" && typeof textoEditado == "string") {
      this.modelo.editarPregunta(id, textoEditado);
    }
  },
  removerTodas: function() {
    this.modelo.removerTodas();
  },
  agregarVoto: function(id, respuestaSeleccionada) {
    //if (typeof id == "number" && typeof respuestaSeleccionada == "string") {
      modelo.sumarVoto(id,respuestaSeleccionada);
  }
};
