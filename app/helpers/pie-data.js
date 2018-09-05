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
              backgroundColor: ["#F7464A","#f7941eff"],
              hoverBackgroundColor: ["#FF5A5E","#ffc80e"]
            }
          ]
        };
}

export default helper(pieData);
