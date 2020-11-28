import Route from '@ember/routing/route';

export default Route.extend({
    model(params) {
        console.log('model');
        const partido = this.modelFor('partidos').findBy('siglas', params.siglas);
        let perfiles = this.modelFor('application').perfiles.filterBy('partidoactual', partido.siglas)
        return {
            partido: partido,
            miembros: perfiles
        }
    }
});
