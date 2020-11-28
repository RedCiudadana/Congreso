import config from '../config/environment';
import EmberObject from '@ember/object';
import injectScript from 'ember-inject-script';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';
import { Promise } from 'rsvp';
import { set } from '@ember/object';


export default Route.extend({

  spreadsheets: service(),

  _routing: service('-routing'),

  ajax: service(),

  // Scrolls to top
  resetScroll: undefined,

  breadCrumb: {
    title: 'application breadcrumb'
  },

  queryParams: {
    fooYo: {}
  },

  /**
   * Setear la URL de datos y de configuración en el servicio spreadhseet.
   * 
   * Además procesar los campos de información general del perfil.
   *
   * TODO: Hacer esto en un lugar más decente, por amor al Señor
   */

  beforeModel(transition) {
    const spreadsheetService = this.get('spreadsheets');

    // TODO: Agregar validación: si config.APP.dataSpreadsheetSourceUrl no esta definida,
    // lanzar error

    // Si en los query parameters viene definido el valor para 'loadDataFromSpreadsheet',
    // hacer override a la configuración para forzar la carga de data de los spreadsheets
    if (transition.queryParams.hasOwnProperty('loadDataFromSpreadsheet')) {
      config.APP.staticFilesUrl = null;
    }

    return this.get('ajax')

      .request(config.APP.dataSpreadsheetSourceUrl, { dataType: 'text' })

      .then((response) => {
        spreadsheetService.set('dataSpreadsheetUrl', response);
        spreadsheetService.set('configSpreadsheetUrl', response);

        // Si config.APP.configSpreadsheetSourceUrl está definida, entonces obtener
        // también ese valor y setearlo en el spreadsheet service
        if (!isBlank(config.APP.configSpreadsheetSourceUrl)) {
          return this.get('ajax')
            .request(config.APP.configSpreadsheetSourceUrl, { dataType: 'text' })
            .then((response) => spreadsheetService.set('configSpreadsheetUrl', response));
        }

        return Promise.resolve(this);
      })

      .then(() => RSVP.all([
        /**
         * Setear la información general del perfil mediante la parametrización
         * proveniente de la configuración
         */
        spreadsheetService
          .fetchConfig('perfil-informacion-general-configuracion')
          .then((configuracionData) => {
            let perfilDataArray = A([]);

            A(configuracionData).forEach((item) => {
              perfilDataArray.pushObject({
                field: item.field,
                label: item.label
              });
            });

            let prefilSerializer = this.store.serializerFor('perfil');

            prefilSerializer.set('informacionGeneralFields', perfilDataArray);
          }),

        /**
         * Setear los campos a utilizar en la funcionalidad de frente-a-frente
         */
        spreadsheetService
          .fetchConfig('perfil-frente-a-frente-configuracion')
          .then((configuracionData) => {
            let perfilFrenteAFrenteDataArray = A([]);

            A(configuracionData).forEach((item) => {
              perfilFrenteAFrenteDataArray.pushObject({
                field: item.field,
                label: item.label,
                section: item.section
              });
            });

            let serializer = this.store.serializerFor('perfil');

            serializer.set('frenteAFrenteFields', perfilFrenteAFrenteDataArray);
          })
      ]));
  },

  model() {
    const spreadsheet = this.get('spreadsheets');
    const _routing = this.get('_routing');

    return RSVP.hash({
      partidos: this.store.findAll('partido'),
      perfiles: this.store.findAll('perfil'),
      config: spreadsheet.fetchConfig('configuracion')
        .then((configuracion) => {
          let configObject = EmberObject.create();

          A(configuracion).forEach((item) => {
            configObject.set(item.key, item.value);
          });

          /**
           * Inject HelloBar if defined
           */
          if (!isBlank(configObject.helloBarUrl)) {
            injectScript(configObject.helloBarUrl);
          }

          return configObject;
        }),

      /**
       * Header links, top right
       */
      navbarLinks: spreadsheet.fetchConfig('navbar-links').then((links) => {
        return A(links).filter((link) => {
          return _routing.hasRoute(link.route);
        });
      })
    });
  },

  setupController(controller, model) {
    this._super(controller, model);

    set(model.config, 'navbarLinks', model.navbarLinks);
    set(model.config, 'mainPageLinks', model.mainPageLinks);
    set(model.config, 'mainPageSliderData', model.mainPageSliderData);
    set(model, 'nombrePartidos', model.perfiles.uniqBy('partidoactual').mapBy('partidoactual'));
    set(model, 'nombreDistritos', model.perfiles.uniqBy('distrito').mapBy('distrito'));
  },

  actions: {
    selectPerfil(candidato) {
      this.transitionTo('perfil', candidato.get('id'));
    }
  }


});
