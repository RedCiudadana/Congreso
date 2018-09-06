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
              backgroundColor: ["#F7464A","#00a6aa"],
              hoverBackgroundColor: ["#F7464A","#60d63c"]
            }
          ]
        };
}

export default helper(pieData);
