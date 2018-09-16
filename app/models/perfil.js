import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';

export default Model.extend({
  nombre: attr(),

  partidoactual: attr(),

  fotoUrl: attr(),

  fotoUrlPartido: attr(),

  cargoNombreCompleto: attr(),

  cargoNombreCorto: attr(),

  cargo: attr(),

  distrito: attr(),

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

  resultadosEvaluacionInt: computed('resultadosEvaluacion', function() {
    return parseInt(this.get('resultadosEvaluacion'));
  }),

  informacionGeneral: attr('informacion-general'),

  recuadros: attr('frente-a-frente'),

  frenteAFrente: attr('frente-a-frente'),

  fotoPerfil: computed('fotoUrl', function() {
    if (this.get('fotoUrl')) {
      return this.get('fotoUrl');
    }

    return 'images/Magistrado.jpg';
  }),

  isDescalificado: computed('estado', function() {
    return this.get('estado') === 'Descalificado';
  }),

  // selector: computed('sexo', 'estado', function() {
  //   let returnValue = '';

    // if (this.get('sexo') === 'Masculino') {
    //   returnValue += ' hombre';
    // }

    // if (this.get('sexo') === 'Femenino') {
    //   returnValue += ' mujer';
    // }

  //   if (this.get('estado') === 'Descalificado') {
  //     returnValue += ' descalificado';
  //   }

  //   if (this.get('estado') === 'En proceso') {
  //     returnValue += ' enProceso';
  //   }

  //   return returnValue;
  // }),

  selector: computed('ley1', 'ley2', 'ley3', 'sexo', 'distrito', function() {
    let returnValue = '';

    if (this.get('ley1') === 'favor') {
      returnValue += ' ley1';
    }

    if (this.get('ley2') === 'favor') {
      returnValue += ' ley2';
    }

    if (this.get('ley3') === 'favor') {
      returnValue += ' ley3';
    }

    if (this.get('sexo') === 'Masculino') {
      returnValue += ' hombre';
    }

    if (this.get('sexo') === 'Femenino') {
      returnValue += ' mujer';
    }

    returnValue += ' ' + this.get('partidoactual');

    returnValue += ' ' + this.get('distrito').dasherize().normalize().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    return returnValue;
  }),

  disqusIdentifier: computed('id', function() {
    return `perfil-${this.get('id')}`;
  })
});
