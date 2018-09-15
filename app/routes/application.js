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

     // METADATA
  headTags() {
    // here we are pulling meta data from the model for this route
    // let model = this.modelFor('application');

    let description = 'Un proyecto de Red Ciudadana para ver toda la información del congreso de Guatemala y los diputados.';
    return [
    // General
    {
      type: 'meta',
      tagId: 'meta-description-tag',
      attrs: {
        name: 'description',
        content: description
      }
    },
    // Google Engine - Search Engine
    {
      type: 'meta',
      tagId: 'Google / Search Engine Tags name',
      attrs: {
        itemprop: 'name',
        content: 'Monitor Legislativo'
      }
    },{
      type: 'meta',
      tagId: 'Google / Search Engine Tags description',
      attrs: {
        itemprop: 'description',
        content: description
      }
    },{
      type: 'meta',
      tagId: 'description-general',
      attrs: {
        itemprop: 'image',
        content: 'https://github.com/RedCiudadana/Congreso/blob/gh-pages/app/img/logo-red.png'
      }
    },
    // Facebook Meta Tags
    {
      type: 'meta',
      tagId: 'Facebook Meta Tags url',
      attrs: {
        property: 'og:url',
        content: 'https://congreso.redciudadana.org'
      }
    },{
      type: 'meta',
      tagId: 'Facebook Meta Tags type',
      attrs: {
        property: 'og:type',
        content: 'website'
      }
    },{
      type: 'meta',
      tagId: 'Facebook Meta Tags title',
      attrs: {
        property: 'og:title',
        content: 'Monitor Legislativo Guatemala Red Ciudadana'
      }
    },{
      type: 'meta',
      tagId: 'Facebook Meta Tags description',
      attrs: {
        property: 'og:description',
        content: description
      }
    },{
      type: 'meta',
      tagId: 'Facebook Meta Tags image',
      attrs: {
        property: 'og:image',
        content: 'https://github.com/RedCiudadana/Congreso/blob/gh-pages/app/img/logo-red.png'
      }
    },
    // Twitter Meta Tags
    {
      type: 'meta',
      tagId: 'Twitter Meta Tags image',
      attrs: {
        name: 'twitter:card',
        content: 'summary_large_image'
      }
    },{
      type: 'meta',
      tagId: 'Twitter Meta Tags title',
      attrs: {
        name: 'twitter:title',
        content: 'Monitor Legislativo Guatemala Red Ciudadana'
      }
    },{
      type: 'meta',
      tagId: 'Twitter Meta Tags description',
      attrs: {
        name: 'twitter:description',
        content: description
      }
    },{
      type: 'meta',
      tagId: 'Twitter Meta Tags url image',
      attrs: {
        name: 'twitter:image',
        content: 'https://github.com/RedCiudadana/Congreso/blob/gh-pages/app/img/logo-red.png'
      }
    }];
  },

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
         * Setear la información de recuadros del perfil mediante la parametrización
         * proveniente de la configuración
         */
        spreadsheetService
          .fetchConfig('perfil-recuadros-configuracion')
          .then((configuracionData) => {
            let perfilRecuadrosDataArray = A([]);

            A(configuracionData).forEach((item) => {
              perfilRecuadrosDataArray.pushObject({
                field: item.field,
                label: item.label
              });
            });

            let prefilSerializer = this.store.serializerFor('perfil');

            prefilSerializer.set('recuadrosFields', perfilRecuadrosDataArray);
          }),

        // Información general de diputado
        // TODO: Evaluar pertinencia, ya que es una funcionalidad específica de
        // Elección PDH
        // spreadsheetService
        //   .fetchConfig('diputado-informacion-general-configuracion')
        //   .then((configuracionData) => {
        //     let diputadoDataArray = A([]);

        //     A(configuracionData).forEach((item) => {
        //       diputadoDataArray.pushObject({
        //         field: item.field,
        //         label: item.label
        //       });
        //     });

        //     let serializer = this.store.serializerFor('postulador-comision');

        //     serializer.set('informacionGeneralFields', diputadoDataArray);
        //     // serializer.set('frenteAFrenteFields', A());
        //   }),

        // spreadsheetService
        //   .fetchConfig('diputado-frente-a-frente-configuracion')
        //   .then((configuracionData) => {
        //     let postuladorFrenteAFrenteDataArray = A([]);

        //     A(configuracionData).forEach((item) => {
        //       postuladorFrenteAFrenteDataArray.pushObject({
        //         field: item.field,
        //         label: item.label,
        //         section: item.section
        //       });
        //     });

        //     let serializer = this.store.serializerFor('postulador-comision');

        //     serializer.set('frenteAFrenteFields', postuladorFrenteAFrenteDataArray);
        //   }),

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
      perfiles: this.store.findAll('perfil'),
      // diputados: this.store.findAll('postulador-comision'),
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
      }),

      /**
       * Front page image links.
       *
       * If the row does not include a link property it gets dissmissed
       */
      mainPageLinks: spreadsheet.fetchConfig('main-page-links').then((links) => {
        return A(links).filter((link) => {
          if (link.link) {
            return true;
          }

          return _routing.hasRoute(link.route);
        });
      }),

      /**
       * Main page slider profiles list
       */
      mainPageSliderData: spreadsheet.fetchConfig('main-page-slider-data'),

      institucionData: spreadsheet
        .fetch('institucion-data')
        .then((institucionData) => {
          let institucionDataObject = EmberObject.create();

          A(institucionData).forEach((item) => {
            institucionDataObject.set(item.key, item.value);
          });

          return institucionDataObject;
        }),

      frontTableVisualizationConfig: spreadsheet.fetchConfig('front-table-visualization-config')
    });
  },

  setupController(controller, model) {
    this._super(controller, model);

    set(model.config, 'navbarLinks', model.navbarLinks);
    set(model.config, 'mainPageLinks', model.mainPageLinks);
    set(model.config, 'mainPageSliderData', model.mainPageSliderData);
  },

  actions: {
    selectPerfil(candidato) {
      this.transitionTo('perfil', candidato.get('id'));
    }
  }


});
