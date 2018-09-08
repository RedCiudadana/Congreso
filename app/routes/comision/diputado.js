import Route from '@ember/routing/route';
import config from '../../config/environment';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { hash } from 'rsvp';
import { isNone } from '@ember/utils';

export default Route.extend({
  spreadsheets: service(),
  _routing: service('-routing'),

  model(params) {
    const spreadsheet = this.get('spreadsheets');
    const _routing = this.get('_routing');

    return hash({
      postulador: this.store.peekRecord('postulador-comision', params.id),
      postuladores: this.modelFor('comision').diputados,
      postuladorFuncionalidades: spreadsheet
        .fetch('postulador-funcionalidades', 'config')
        .then((links) => {
          return A(links)
            .filter((link) => {
              if (link.link) {
                return true;
              }

              if (!_routing.hasRoute(link.route)) {
                throw new Error(`Route not recognized: ${link.route}`);
              }

              return true;
            });
        }),
      resultadosEvaluaciones: spreadsheet
        .fetch('evaluaciones')
        .then((resultados) => {
          return A(resultados).filterBy('postuladorId', params.id)
        })
        .then((resultados) => {
          return resultados.map((resultado) => {
            return {
              perfil: this.store.peekRecord('perfil', resultado.perfilId),
              resultado: resultado.resultado
            }
          })
        })
    });
  },

  afterModel(model) {
    if (!isNone(model.postulador.get('nombre'))) {
      this.set('breadCrumb', {
        title: model.postulador.get('nombre')
      });
    }
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.setProperties(model);
    controller.setProperties({
      disqusShortname: config.disqus.shortname
    });
  }
});
