import { helper } from '@ember/component/helper';

export function checkOrTimes(value/*, hash*/) {

  if(String(value).toLowerCase() == "favor") {
    return "fa fa-check"
  }

  if(String(value).toLowerCase() == "ausente") {
    return "fa fa-question"
  }

  return "fa fa-times";
}

export default helper(checkOrTimes);
