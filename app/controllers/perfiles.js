import $ from 'jquery';
import Controller from '@ember/controller';
import { computed } from '@ember/object'

export default Controller.extend({

  currentSelector: computed(
    'ley1',
    'ley2',
    'ley3',
    function() {
      if (
        !this.get('ley1')
            && !this.get('ley2')
            && !this.get('ley3')
      ) {
        return '*';
      }

      let selectors = [];


      if (this.get('ley1')) {
        selectors.push('.ley1');
      }

      if (this.get('ley2')) {
        selectors.push('.ley2');
      }

      if (this.get('ley3')) {
        selectors.push('.ley3');
      }

      return selectors.join(', ');
    }
  ),

  _applyFilter() {
    var $container = $('#portfolio');

    $container.isotope({transitionDuration: '0.65s'});

    $container.isotope({filter: this.get('currentSelector')});

    return false;
  },

  actions: {
    applyFilter() {
      return this._applyFilter();
    }
  }
});
