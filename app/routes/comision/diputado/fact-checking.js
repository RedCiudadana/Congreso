import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { hash } from 'rsvp';
import { isNone } from '@ember/utils';

export default Route.extend({
  // TODO: Ver cómo hacer funcionar esta onda otra vez
  breadCrumb: null,

  spreadsheets: service(),

  model() {
    const spreadsheet = this.get('spreadsheets');

    let postuladorConfigObject = this.modelFor('comision.diputado');

    return hash({
      postuladorConfigObject: postuladorConfigObject,
      factCheckingGroupedItemsList: spreadsheet.fetch('postulador-fact-checking-data')
        // Filtrar por postulador
        .then((factCheckingData) => {
          return A(factCheckingData).filter((data) => {
            return data.postulador === postuladorConfigObject.postulador.get('id');
          });
        })

        // Agrupar por sección
        .then((factCheckingData) => {
          let groupedData = {};

          A(factCheckingData).forEach((item, index) => {
            if (isNone(groupedData[item.section])) {
              groupedData[item.section] = {};
            }

            groupedData[item.section][index] = {
              title: item.title,
              quote: item.quote,
              quoteUrl: item.quoteUrl,
              fact: item.fact,
              source: item.source,
              sourceUrl: item.sourceUrl
            };
          });

          return groupedData;
        }),
    });
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set(
      'factCheckingFuncionalidad',
      A(model.postuladorFuncionalidades)
        .findBy('route', 'comision.diputado.fact-checking')
    );

    controller.set(
      'factCheckingGroupedItemsList',
      model.factCheckingGroupedItemsList
    );

    controller.set('postulador', model.postuladorConfigObject.postulador);
  },

  actions: {
  }
});
