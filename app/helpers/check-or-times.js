import { helper } from '@ember/component/helper';

export function checkOrTimes(value/*, hash*/) {

  if(String(value).toLowerCase() == "a favor") {
    return "fa fa-check"
  }

  if(String(value).toLowerCase() == "en contra") {
    return "fa fa-times"
  }

  return "fa fa-times";
}

export default helper(checkOrTimes);
