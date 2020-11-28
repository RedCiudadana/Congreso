import { helper } from '@ember/component/helper';

export function pieData(array,/*, hash*/) {
  let perfil = array[0];
  console.log(perfil);
  return {
    labels: ['Asistencia', 'No asistencia'],
    datasets: [
      {
        data: [
          Math.round((perfil.asistencia / 665) * 100),
          Math.round((perfil.noAsistencia / 665) * 100),
        ],
        backgroundColor: ["#00ac56", "#f6ab40"],
        hoverBackgroundColor: ["#00ac57", "#f6ab40"]
      }
    ]
  };
}

export default helper(pieData);
