 //15e - peep that the format function sends the day through with a capital at the start
export function isWeekend(date) {
  if (date.format('dddd') === 'Sunday') {
    return "Sunday";
  } else if (date.format('dddd') === 'Saturday') {
    return "Saturday";
  } else {
    return "Not the weekend.";
  }
}

export default isWeekend ;