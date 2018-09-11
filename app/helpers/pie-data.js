import { helper } from '@ember/component/helper';

export function pieData(value/*, hash*/) {
  value = parseInt(value);
  return {
          labels: ['Ausencia', 'Asistencia'],
          datasets: [
            {
              data: [
                (100 - value),
                value
              ],
              backgroundColor: ["#00ac56","#f6ab40"],
              hoverBackgroundColor: ["#00ac57","#f6ab40"]
            }
          ]
        };
}

export default helper(pieData);
