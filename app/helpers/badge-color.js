import { helper } from '@ember/component/helper';

export function badgeColor(value/*, hash*/) {

  if (String(value).toLowerCase() == "a favor") {
    return "bg-success";
  }

  if (String(value).toLowerCase() == "en contra") {
    return "bg-danger";
  }

  //   if (String(value).toLowerCase() == "ausente") {
  //     return "fa fa-question-circle";
  //   }

  //   if (String(value).toLowerCase() == "licencia") {
  //     return "fa fa-book";
  //   }

  return '';
}

export default helper(badgeColor);