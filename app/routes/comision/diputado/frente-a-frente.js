import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default Route.extend({
  breadCrumb: null,

  model() {
    return this.modelFor('comision.diputado');
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('perfilUnoId', model.postulador.get('id'));

    controller.set(
      'frenteAFrenteFuncionalidad',
      A(model.postuladorFuncionalidades)
        .findBy('route', 'comision.diputado.frente-a-frente')
    );

    let frenteAFrenteFields = this.store
      .serializerFor('postulador-comision')
      .get('frenteAFrenteFields');

    controller.set('frenteAFrenteFields', frenteAFrenteFields);
  },

  actions: {
  }
});
