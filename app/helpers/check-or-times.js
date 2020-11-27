import { helper } from '@ember/component/helper';

export function checkOrTimes(value/*, hash*/) {

  if(String(value).toLowerCase() == "a favor") {
    return "fa fa-check";
  }

  if(String(value).toLowerCase() == "en contra") {
    return "fa fa-times";
  }

  if (String(value).toLowerCase() == "ausente") {
    return "fa fa-question-circle";
  }

  if (String(value).toLowerCase() == "licencia") {
    return "fa fa-book";
  }

  return "fa fa-times";
}

export default helper(checkOrTimes);
