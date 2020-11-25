import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';
import { dasherize } from '@ember/string';

export default Model.extend({
  nombre: attr(),
  fotoUrl: attr(),
  partidopostulante: attr(),
  partidoactual: attr(),
  fotoUrlPartido: attr(),
  distrito: attr(),
  tamanoBloque: attr(),
  informaciongeneral: attr(),
  historialpolitico: attr(),
  sexo: attr(),
  reelecto: attr(),
  tw: attr(),
  fb: attr(),
  nacimiento: attr(),
  direccion: attr(),
  telefono: attr(),
  ext: attr(),
  email: attr(),
  JuntaDirectiva: attr(),
  jefeDeBloque: attr(),
  Comisión: attr(),
  iniciativa1: attr(),
  iniciativa2: attr(),
  iniciativa3: attr(),
  iniciativa4: attr(),
  iniciativa5: attr(),
  aFavor: attr(),
  encontra: attr(),
  ausente: attr(),
  licencia: attr(),
  total: attr(),
  count: attr(),

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

  selector: computed('iniciativa1', 'iniciativa2', 'iniciativa3', 'iniciativa4', 'iniciativa5', 'sexo', 'distrito', function() {
    let returnValue = '';

    returnValue += ' iniciativa1-' + dasherize(this.get('iniciativa1').toLowerCase());
    returnValue += ' iniciativa2-' + dasherize(this.get('iniciativa2').toLowerCase());
    returnValue += ' iniciativa3-' + dasherize(this.get('iniciativa3').toLowerCase());
    returnValue += ' iniciativa4-' + dasherize(this.get('iniciativa4').toLowerCase());
    returnValue += ' iniciativa5-' + dasherize(this.get('iniciativa5').toLowerCase());

    if (this.get('sexo') === 'Masculino') {
      returnValue += ' hombre';
    }

    if (this.get('sexo') === 'Femenino') {
      returnValue += ' mujer';
    }

    returnValue += ' ' + this.get('partidoactual');

    returnValue += ' ' + this.get('distrito').dasherize().normalize().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    returnValue += ' ' + this.get('distrito').dasherize();

    return returnValue;
  }),

  disqusIdentifier: computed('id', function() {
    return `perfil-${this.get('id')}`;
  })
});
