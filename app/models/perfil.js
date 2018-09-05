import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  nombre: attr(),

  partidoactual: attr(),

  fotoUrl: attr(),

  fotoUrlPartido: attr(),

  cargoNombreCompleto: attr(),

  cargoNombreCorto: attr(),

  profesion: attr(),

  educacion: attr(),

  fechaNacimiento: attr(),

  lugarNacimiento: attr(),

  email: attr(),

  fb: attr(),

  tw: attr(),

  direccion: attr(),

  telefono: attr(),

  biografia: attr(),

  desempenio: attr(),

  historialPolitico: attr(),

  experienciaProfesional: attr(),

  experienciaAcademica: attr(),

  planTrabajo: attr(),

  sexo: attr(),

  estado: attr(),

  notaAreaEvaluada1: attr(),

  notaAreaEvaluada2: attr(),

  notaAreaEvaluada3: attr(),

  notaAreaEvaluada4: attr(),

  notaAreaEvaluada4Texto: attr(),

  resultadosEvaluacion: attr(),

  ley1: attr(),

  ley2: attr(),

  ley3: attr(),

  resultadosEvaluacionInt: Ember.computed('resultadosEvaluacion', function() {
    return parseInt(this.get('resultadosEvaluacion'));
  }),

  informacionGeneral: attr('informacion-general'),

  recuadros: attr('frente-a-frente'),

  frenteAFrente: attr('frente-a-frente'),

  fotoPerfil: Ember.computed('fotoUrl', function() {
    if (this.get('fotoUrl')) {
      return this.get('fotoUrl');
    }

    return 'images/Magistrado.jpg';
  }),

  isDescalificado: Ember.computed('estado', function() {
    return this.get('estado') === 'Descalificado';
  }),

  // selector: Ember.computed('sexo', 'estado', function() {
  //   let returnValue = '';

  //   if (this.get('sexo') === 'Masculino') {
  //     returnValue += ' hombre';
  //   }

  //   if (this.get('sexo') === 'Femenino') {
  //     returnValue += ' mujer';
  //   }

  //   if (this.get('estado') === 'Descalificado') {
  //     returnValue += ' descalificado';
  //   }

  //   if (this.get('estado') === 'En proceso') {
  //     returnValue += ' enProceso';
  //   }

  //   return returnValue;
  // }),

  selector: Ember.computed('ley1', 'ley2', 'ley3', function() {
    let returnValue = '';

    if (this.get('ley1') === 'Favor') {
      returnValue += ' ley1';
    }

    if (this.get('ley2') === 'Favor') {
      returnValue += ' ley2';
    }

    if (this.get('ley3') === 'Favor') {
      returnValue += ' ley3';
    }

    return returnValue;
  }),

  disqusIdentifier: Ember.computed('id', function() {
    return `perfil-${this.get('id')}`;
  })
});
