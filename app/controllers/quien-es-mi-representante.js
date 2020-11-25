import Controller from '@ember/controller';
import $ from 'jquery';
import { computed } from '@ember/object';
import { dasherize } from '@ember/string';

const distritos = ["Quetzaltenango", "Listado Nacional", "Central", "Totonicapán", "Sololá", "Guatemala", "Quiché", "Escuintla", "San Marcos", "Huehuetenango", "Chiquimula", "Suchitepequez", "Santa Rosa", "Jutiapa", "Petén", "Alta Verapaz", "Baja Verapaz", "Retalhuleu", "El Progreso", "Jalapa", "Chimaltenango", "Sacatepéquez", "Izabal", "Zacapa"];

export default Controller.extend({
  distritos: distritos,

  currentDistrito: null,

  currentSelector: computed(
    'currentDistrito',
    function () {
      if (
        !this.get('currentDistrito')
      ) {
        return '*';
      }

      let selectors = [];


      if (this.get('currentDistrito')) {
        selectors.push(`.${dasherize(this.get('currentDistrito'))}`);
      }

      return selectors.join(', ');
    }
  ),

  _applyFilter() {
    var $container = $('#portfolio');

    $container.isotope({ transitionDuration: '0.65s' });

    $container.isotope({ filter: this.get('currentSelector') });

    return false;
  },

  actions: {
    applyFilter() {
      return this._applyFilter();
    },

    selectDistrito(value) {
      this.set('currentDistrito', value);
    }
  }
});
