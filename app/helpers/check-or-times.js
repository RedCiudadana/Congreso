import { helper } from '@ember/component/helper';

export function checkOrTimes(value/*, hash*/) {

  if(value == "favor") {
    return "fa fa-check"
  }

  return "fa fa-times";
}

export default helper(checkOrTimes);
