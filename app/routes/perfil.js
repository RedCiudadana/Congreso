import Route from '@ember/routing/route';
import config from '../config/environment';
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
    const perfil = this.store.peekRecord('perfil', params.id);
    const institucion = perfil.get('institucion');
    const partidoActual = perfil.get('partidoActual');

    return hash({
      options: { responsive: true, maintainAspectRatio: true },
      config: {},
      perfil: perfil,
      institucion: institucion,
      partidoActual: partidoActual,
      perfilInformacionGeneralConfiguracion: spreadsheet
        .fetch('perfil-informacion-general-configuracion', 'config'),
      perfiles: this.modelFor('application').perfiles,
      perfilFuncionalidades: spreadsheet
        .fetch('perfil-funcionalidades', 'config')
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
      votaciones: spreadsheet
        .fetch('votaciones')
        .then((registros) => {
          return A(registros)
            .filterBy('perfilId', perfil.get('id'));
        }),
      asistencia: spreadsheet
        .fetch('asistencia')
        .then((registros) => {
          return A(registros)
            .findBy('perfilId', perfil.get('id'));
        })
    });
  },

  afterModel(model) {
    if (!isNone(model.perfil.get('nombre'))) {
      this.set('breadCrumb', {
        title: model.perfil.get('nombre')
      });
    }
  },

  setupController(controller, model) {
    this._super(controller, model);

    model.config.perfilFuncionalidades = model.perfilFuncionalidades;

    controller.setProperties({
      disqusShortname: config.disqus.shortname,
      applicationConfig: this.modelFor('application').config
    });
  },

  actions: {
    didTransition() {
      window.scrollTo(0, 0);
    }
  }
});
