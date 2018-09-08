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

  favor: computed(
    'ley1',
    'ley2',
    'ley3',
    function() {
      let perfiles = this.get('model').perfiles;
      let ley1 = this.get('ley1');
      let ley2 = this.get('ley2');
      let ley3 = this.get('ley3');
      return perfiles
        .filter((element) => {
          if(ley1 && element.get('ley1') == 'favor') {
            return true
          }

          if(ley2 && element.get('ley2') == 'favor') {
            return true
          }

          if(ley3 && element.get('ley3') == 'favor') {
            return true
          }

        }).length;
    }
  ),

  contra: computed(
    'ley1',
    'ley2',
    'ley3',
    function() {
      let perfiles = this.get('model').perfiles;
      let ley1 = this.get('ley1');
      let ley2 = this.get('ley2');
      let ley3 = this.get('ley3');
      return perfiles
        .filter((element) => {
          if(ley1 && element.get('ley1') == 'contra') {
            return true
          }

          if(ley2 && element.get('ley2') == 'contra') {
            return true
          }

          if(ley3 && element.get('ley3') == 'contra') {
            return true
          }

        }).length;
    }
  ),

  ausente: computed(
    'ley1',
    'ley2',
    'ley3',
    function() {
      let perfiles = this.get('model').perfiles;
      let ley1 = this.get('ley1');
      let ley2 = this.get('ley2');
      let ley3 = this.get('ley3');
      return perfiles
        .filter((element) => {
          if(ley1 && element.get('ley1') == 'ausente') {
            return true
          }

          if(ley2 && element.get('ley2') == 'ausente') {
            return true
          }

          if(ley3 && element.get('ley3') == 'ausente') {
            return true
          }

        }).length;
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
