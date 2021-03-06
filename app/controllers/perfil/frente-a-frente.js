import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';

export default Controller.extend({

  init() {
    this._super(...arguments);
    this.set('chartData', {
      labels: ['Ausencia', 'Asistencia'],
      datasets: [
        {
          data: [
            40,
            60
          ],
          backgroundColor: ["#00ac56", "#f6ab40"],
          hoverBackgroundColor: ["#00ac57", "#f6ab40"]
        }
      ]
    })
  },

  model: null,

  frenteAFrenteFields: null,

  frenteAFrenteFuncionalidad: null,

  /**
   * Hash
   */
  frenteAFrenteSectionGroupedFields: computed('frenteAFrenteFields', function() {
    let groupedFields = {};

    this.get('frenteAFrenteFields').forEach((item) => {
      if (isNone(groupedFields[item.section])) {
        groupedFields[item.section] = {};
      }

      groupedFields[item.section][item.field] = {
        field: item.field,
        label: item.label
      };
    });

    return groupedFields;
  }),

  perfilUnoId: null,

  perfilDosId: null,

  perfilUno: computed('perfilUnoId', function() {
    return this.get('model.perfiles').findBy('id', this.get('perfilUnoId'));
  }),

  perfilDos: computed('perfilDosId', function() {
    return this.get('model.perfiles').findBy('id', this.get('perfilDosId'));
  })
});
