import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default Route.extend({
    model(params) {
        const partido = this.modelFor('partidos').findBy('siglas', params.siglas);
        let perfiles = this.modelFor('application').perfiles.filterBy('partidoactual', partido.siglas)
        return {
            partido: partido,
            miembros: perfiles
        }
    }
});
