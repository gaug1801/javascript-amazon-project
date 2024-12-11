export function isWeekend(date) {
  if (date.format('dddd') === 'Sunday') {
    return true;
  } else if (date.format('dddd') === 'Saturday') {
    return true;
  } else {
    return false;
  }
}

export default isWeekend;