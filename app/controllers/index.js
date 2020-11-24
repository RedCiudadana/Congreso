import $ from 'jquery';
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

  currentSelector: computed(
    'iniciativa1',
    'iniciativa2',
    'iniciativa3',
    'iniciativa4',
    'iniciativa5',
    'esHombre',
    'esMujer',
    'TODOS',
    'INDP',
    'FCN',
    'BLR',
    'UNE',
    'PU',
    'BAC',
    'UCN',
    'CREO',
    'PAN',
    'VIVA',
    'EG',
    'URNG',
    'CONV',
    'WINAQ',
    'FUERZ',
    'listado-nacional',
    'guatemala',
    'central',
    'totonicapan',
    'quiche',
    'suchitepequez',
    'chimaltenango',
    'retalhuleu',
    'alta-verapaz',
    'izabal',
    'huehuetenango',
    'baja-verapaz',
    'san-marcos',
    'santa-rosa',
    'sacatepequez',
    'escuintla',
    'solola',
    'quetzaltenango',
    'jutiapa',
    'chiquimula',
    'el-progreso',
    'zacapa',
    'jalapa',
    'peten',
    'distrito-central',
    function() {
      if (
        !this.get('iniciativa1')
            && !this.get('iniciativa2')
            && !this.get('iniciativa3')
            && !this.get('iniciativa4')
            && !this.get('iniciativa5')
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

      let selectors = [];

      if (this.get('iniciativa1')) {
        selectors.push('.iniciativa1-a-favor');
      }

      if (this.get('iniciativa2')) {
        selectors.push('.iniciativa2-a-favor');
      }

      if (this.get('iniciativa3')) {
        selectors.push('.iniciativa3-a-favor');
      }

      if (this.get('iniciativa4')) {
        selectors.push('.iniciativa4-a-favor');
      }

      if (this.get('iniciativa5')) {
        selectors.push('.iniciativa5-a-favor');
      }

      if (this.get('esHombre')) {
        selectors.push('.hombre');
      }

      if (this.get('esMujer')) {
        selectors.push('.mujer');
      }

      if (this.get('TODOS')) {
        selectors.push('.TODOS');
      }

      if (this.get('INDP')) {
        selectors.push('.INDP');
      }

      if (this.get('FCN')) {
        selectors.push('.FCN');
      }

      if (this.get('BLR')) {
        selectors.push('.BLR');
      }

      if (this.get('UNE')) {
        selectors.push('.UNE');
      }

      if (this.get('PU')) {
        selectors.push('.PU');
      }

      if (this.get('BAC')) {
        selectors.push('.BAC');
      }

      if (this.get('UCN')) {
        selectors.push('.UCN');
      }

      if (this.get('CREO')) {
        selectors.push('.CREO');
      }

      if (this.get('PAN')) {
        selectors.push('.PAN');
      }

      if (this.get('VIVA')) {
        selectors.push('.VIVA');
      }

      if (this.get('EG')) {
        selectors.push('.EG');
      }

      if (this.get('URNG')) {
        selectors.push('.URNG');
      }

      if (this.get('CONV')) {
        selectors.push('.CONV');
      }

      if (this.get('WINAQ')) {
        selectors.push('.WINAQ');
      }

      if (this.get('FUERZ')) {
        selectors.push('.FUERZ');
      }

      if (this.get('listado-nacional')) {
        selectors.push('.listado-nacional');
      }

      if (this.get('guatemala')) {
        selectors.push('.guatemala');
      }

      if (this.get('central')) {
        selectors.push('.central');
      }

      if (this.get('totonicapan')) {
        selectors.push('.totonicapan');
      }

      if (this.get('quiche')) {
        selectors.push('.quiche');
      }

      if (this.get('suchitepequez')) {
        selectors.push('.suchitepequez');
      }

      if (this.get('chimaltenango')) {
        selectors.push('.chimaltenango');
      }

      if (this.get('retalhuleu')) {
        selectors.push('.retalhuleu');
      }

      if (this.get('alta-verapaz')) {
        selectors.push('.alta-verapaz');
      }

      if (this.get('izabal')) {
        selectors.push('.izabal');
      }

      if (this.get('huehuetenango')) {
        selectors.push('.huehuetenango');
      }

      if (this.get('baja-verapaz')) {
        selectors.push('.baja-verapaz');
      }

      if (this.get('san-marcos')) {
        selectors.push('.san-marcos');
      }

      if (this.get('santa-rosa')) {
        selectors.push('.santa-rosa');
      }

      if (this.get('sacatepequez')) {
        selectors.push('.sacatepequez');
      }

      if (this.get('escuintla')) {
        selectors.push('.escuintla');
      }

      if (this.get('solola')) {
        selectors.push('.solola');
      }

      if (this.get('quetzaltenango')) {
        selectors.push('.quetzaltenango');
      }

      if (this.get('jutiapa')) {
        selectors.push('.jutiapa');
      }

      if (this.get('chiquimula')) {
        selectors.push('.chiquimula');
      }

      if (this.get('el-progreso')) {
        selectors.push('.el-progreso');
      }

      if (this.get('zacapa')) {
        selectors.push('.zacapa');
      }

      if (this.get('jalapa')) {
        selectors.push('.jalapa');
      }

      if (this.get('peten')) {
        selectors.push('.peten');
      }

      if (this.get('distrito-central')) {
        selectors.push('.distrito-central');
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
      this.set('ley1', false);
      this.set('ley2', false);
      this.set('ley3', false);
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
    }

  }
});
