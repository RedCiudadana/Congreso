import $ from 'jquery';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { dasherize } from '@ember/string';

const distritos = ["Quetzaltenango", "Listado Nacional", "Central", "Totonicapán", "Sololá", "Guatemala", "Quiché", "Escuintla", "San Marcos", "Huehuetenango", "Chiquimula", "Suchitepequez", "Santa Rosa", "Jutiapa", "Petén", "Alta Verapaz", "Baja Verapaz", "Retalhuleu", "El Progreso", "Jalapa", "Chimaltenango", "Sacatepéquez", "Izabal", "Zacapa"];

export default Controller.extend({

  distritos: distritos,

  currentIniciativa: null,
  currentDistrito: null,

  init() {
    this._super(...arguments);
    this.iniciativaOptions = [
      {
        label: 'APROBACIÓN DE PRESUPUESTO 2021 - INICIATIVA DE LEY 5832 - 17/11/2020',
        value: 'iniciativa1'
      },
      {
        label: 'SOLICITUD DE DESTITUCIÓN DEL MINISTRO DE GOBERNACIÓN, GENDRI REYES - 25/11/2020',
        value: 'iniciativa2'
      },
      {
        label: 'PROPUESTA DIP. AREVALO, SEMILLA, ADELANTAR ELECCIÓN DE CORTES - 14/10/2020',
        value: 'iniciativa3'
      },
      {
        label: 'REGRESO A COMISIÓN DE COOPERATIVISMO INICIATIVA 5632 - 14/10/2020',
        value: 'iniciativa4'
      },
      {
        label: 'PROPUESTA DIP. ROMÁN CASTELLANOS, SEMILLA, ADELANTAR ELECCIÓN DE CORTES - 21/10/2020',
        value: 'iniciativa5'
      },
      {
        label: 'ELECCION DE JD. 2021-2022, PLANILLA UNICA - 21/10/2020',
        value: 'iniciativa6'
      },
      {
        label: 'ACUERDO LEGISLATIVO 15-2020, ELECCION DE JD 2021-2022 - 21/10/2020',
        value: 'iniciativa7'
      },
    ]
  },

  currentSelector: computed(
    'currentIniciativa',
    'currentDistrito',
    'currentPartido',
    'esHombre',
    'esMujer',
    function() {
      if (
        !this.get('currentIniciativa')
          && !this.get('currentDistrito')
          && !this.get('currentPartido')
          && !this.get('esHombre')
          && !this.get('esMujer')
          && !this.get('TODOS')
          && !this.get('INDP')
          && !this.get('FCN')
          && !this.get('BLR')
          && !this.get('UNE')
          && !this.get('PU')
          && !this.get('BAC')
          && !this.get('UCN')
          && !this.get('CREO')
          && !this.get('PAN')
          && !this.get('VIVA')
          && !this.get('EG')
          && !this.get('URNG')
          && !this.get('CONV')
          && !this.get('WINAQ')
          && !this.get('FUERZ')
          && !this.get('listado-nacional')
          && !this.get('guatemala')
          && !this.get('central')
          && !this.get('totonicapan')
          && !this.get('quiche')
          && !this.get('suchitepequez')
          && !this.get('chimaltenango')
          && !this.get('retalhuleu')
          && !this.get('alta-verapaz')
          && !this.get('izabal')
          && !this.get('huehuetenango')
          && !this.get('baja-verapaz')
          && !this.get('san-marcos')
          && !this.get('santa-rosa')
          && !this.get('sacatepequez')
          && !this.get('escuintla')
          && !this.get('solola')
          && !this.get('quetzaltenango')
          && !this.get('jutiapa')
          && !this.get('chiquimula')
          && !this.get('el-progreso')
          && !this.get('zacapa')
          && !this.get('jalapa')
          && !this.get('peten')
          && !this.get('distrito-central')
      ) {
        return '*';
      }

      console.log('update selector');

      let selectors = [];

      if (this.get('currentIniciativa')) {
        selectors.push(`.${this.get('currentIniciativa').value}-a-favor`);
      }

      if (this.get('currentDistrito')) {
        selectors.push(`.${dasherize(this.get('currentDistrito'))}`);
      }

      if (this.get('currentPartido')) {
        selectors.push(`.${this.get('currentPartido').replace('/','')}`);
      }

      if (this.get('esHombre')) {
        selectors.push('.hombre');
      }

      if (this.get('esMujer')) {
        selectors.push('.mujer');
      }

      return selectors.join(', ');
    }
  ),

  selectorBadges: '',

  _applyFilter() {

    var $container = $('#portfolio');

    $container.isotope({transitionDuration: '0.65s'});

    $container.isotope({filter: this.get('currentSelector')});

    if(this.get('currentSelector') == '*') {
      this.set('selectorBadges', '');
    } else {
      this.set('selectorBadges', this.get('currentSelector').replace(/\./g , '').split(', '));
    }

    return false;
  },

  actions: {
    applyFilter() {
      return this._applyFilter();
    },

    clearFilter() {
      this.set('currentDistrito', false);
      this.set('currentIniciativa', false);
      this.set('currentPartido', false);
      this.set('esHombre', false);
      this.set('esMujer', false);
      this.set('TODOS', false);
      this.set('INDP', false);
      this.set('FCN', false);
      this.set('BLR', false);
      this.set('UNE', false);
      this.set('PU', false);
      this.set('BAC', false);
      this.set('UCN', false);
      this.set('CREO', false);
      this.set('PAN', false);
      this.set('VIVA', false);
      this.set('EG', false);
      this.set('URNG', false);
      this.set('CONV', false);
      this.set('WINAQ', false);
      this.set('FUERZ', false);
      this.set('listado-nacional', false);
      this.set('guatemala', false);
      this.set('central', false);
      this.set('totonicapan', false);
      this.set('quiche', false);
      this.set('suchitepequez', false);
      this.set('chimaltenango', false);
      this.set('retalhuleu', false);
      this.set('alta-verapaz', false);
      this.set('izabal', false);
      this.set('huehuetenango', false);
      this.set('baja-verapaz', false);
      this.set('san-marcos', false);
      this.set('santa-rosa', false);
      this.set('sacatepequez', false);
      this.set('escuintla', false);
      this.set('solola', false);
      this.set('quetzaltenango', false);
      this.set('jutiapa', false);
      this.set('chiquimula', false);
      this.set('el-progreso', false);
      this.set('zacapa', false);
      this.set('jalapa', false);
      this.set('peten', false);
      this.set('distrito-central', false);
      return this._applyFilter();
    },

    selectIniciativa(e) {
      this.set('currentIniciativa', e);
    },

    selectDistrito(value) {
      this.set('currentDistrito', value);
    },

    selectPartido(value) {
      this.set('currentPartido', value);
    }
  }
});
