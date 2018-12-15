/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaRemovida = new Evento(this);
  this.votoSumado = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.preguntasRemovidas = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    if (this.preguntas.length > 0) {
      for (var i = 0; i < this.preguntas.length; i++) {
        if (this.ultimoId < this.preguntas[i].id) {
          this.ultimoId = this.preguntas[i].id;
        }
      }
    }
    return this.ultimoId;
  },
  obtenerPreguntas: function() {
    if (localStorage.getItem("preguntas") != null) {
      return JSON.parse(localStorage.getItem("preguntas"));
    } else {
      return [];
    }
  },
  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {
      textoPregunta: nombre,
      id: id,
      cantidadPorRespuesta: respuestas
    };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },
  removerPregunta: function(id) {
    var indiceRemover;
    this.preguntas.forEach(function(pregunta, index) {
      if (pregunta.id == id) {
        indiceRemover = index;
      }
    });
    this.preguntas.splice(indiceRemover, 1);
    this.guardar();
    this.preguntaRemovida.notificar();
  },
  sumarVoto: function(id, respuesta) {
    var indiceSumar;
    this.preguntas.forEach(function(pregunta, index) {
      if (pregunta.id == id) {
        indiceSumar = index;
      }
    });
    this.preguntas[indiceSumar].cantidadPorRespuesta.map(function(opciones) {
      if (opciones.textoRespuesta == respuesta) {
        opciones.cantidadPorRespuesta++;
      }
    });
    this.guardar();
    this.votoSumado.notificar();
  },
  editarPregunta: function(id, contenidoEditado) {
    var indiceEditar;
    this.preguntas.forEach(function(pregunta, index) {
      if (pregunta.id == id) {
        indiceEditar = index;
      }
    });
    this.preguntas[indiceEditar].textoPregunta = contenidoEditado;
    this.guardar();
    this.preguntaEditada.notificar();
  },
  removerTodas: function() {
    this.preguntas = [];
    this.guardar();
    this.preguntasRemovidas.notificar();
  },
  //se guardan las preguntas
  guardar: function() {
    localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
  }
};
