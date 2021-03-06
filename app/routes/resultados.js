import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';
import { hash } from 'rsvp';

export default Route.extend({

  spreadsheets: service(),

  model() {
    const spreadsheet = this.get('spreadsheets');

    let perfiles = this.modelFor('application').perfiles;

    return hash({
      registrosTablaGradacion: spreadsheet
        .fetch('tabla-gradacion')
        .then((registros) => {

          let registrosTablaGradacion = {};

          let count = 1;
          registros.forEach((element) => {
            if (isNone(registrosTablaGradacion[element.perfil])) {

              if (isNone(perfiles.findBy('id', element.perfil))) {
                throw new Error(`Perfil con id '${element.perfil}' no encontrado`);
              }

              registrosTablaGradacion[element.perfil] = {
                id: element.perfil,
                numero: count,
                nombre: perfiles.findBy('id', element.perfil).get('nombre')
              };

              count += 1;
            }

            let registro = registrosTablaGradacion[element.perfil];

            if (element.aspecto === 'Aspectos Profesionales') {
              registro.aspectosProfesionales = parseInt(element.puntaje);
            }

            if (element.aspecto === 'Aspectos Académicos') {
              registro.aspectosAcademicos = parseInt(element.puntaje);
            }

            if (element.aspecto === 'Cualidades Éticas y de Probidad') {
              registro.cualidadesEticas = parseInt(element.puntaje);
            }

            if (element.aspecto === 'Proyección Humana E Idoneidad') {
              registro.proyeccionHumana = parseInt(element.puntaje);
            }

            if (element.aspecto === 'Total') {
              registro.total = parseInt(element.puntaje);
            }
          });

          return registrosTablaGradacion;

          // return A(registros)
          //   .filterBy('perfil', perfil.get('id'))
          //   .filter((e) => e.aspecto !== 'Total');
        })
    });
  }
});
