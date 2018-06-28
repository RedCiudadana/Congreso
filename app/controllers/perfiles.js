import Controller from '@ember/controller';
import { computed } from '@ember/object';
import Ember from 'ember';

export default Controller.extend({
  esTodo: true,

  currentSelector: computed(
    'esMujer',
    'esHombre',
    'estaEnProceso',
    'estaDescalificado',
    'esTodo',
    function() {
      if (
        !this.get('esMujer')
            && !this.get('esHombre')
            && !this.get('estaEnProceso')
            && !this.get('estaDescalificado')
            && !this.get('esTodo')
      ) {
        return '.nothing';
      }

      let selectors = [];

      if (this.get('esTodo')) {
        return '*';
      }

      if (this.get('esMujer')) {
        selectors.push('.mujer');
      }

      if (this.get('esHombre')) {
        selectors.push('.hombre');
      }

      if (this.get('estaEnProceso')) {
        selectors.push('.enProceso');
      }

      if (this.get('estaDescalificado')) {
        selectors.push('.descalificado');
      }

      return selectors.join(', ');
    }
  ),

  actions: {
    applyFilter() {
      var $container = Ember.$('#portfolio');

      $container.isotope({transitionDuration: '0.65s'});

      $container.isotope({filter: this.get('currentSelector')});

      return false;
    }
  }
});
