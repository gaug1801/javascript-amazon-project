import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
//15f - rest is in is-weekend.js - you goofball you had forgotten the .js extension in the import statement
import isWeekend from './is-weekend.js';

//15a
const today = dayjs();
console.log(today);

let fiveDays = today.add(5, 'days').format('MMMM D')
console.log(fiveDays);

//15b
let oneMonth = today.add(1, 'months').format('MMMM D');
console.log(oneMonth);

//15c
let oneMonthAgo = today.subtract(1, 'months').format('MMMM D');
console.log(oneMonthAgo)

//15d
console.log(today.format('dddd'));

//15e in seperate imported file.

console.log(isWeekend(today.add(4, 'days')));

//15f is the import statement above.

//15g - seperate file: 15g.js
