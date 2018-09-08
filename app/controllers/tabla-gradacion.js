import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  sortingDefinition: ['resultadosEvaluacionInt:desc'],

  sortedPerfiles: computed.sort('model.perfiles', 'sortingDefinition')
});
