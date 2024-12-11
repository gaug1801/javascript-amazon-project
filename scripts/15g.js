import { isWeekend as isSatSun } from './is-weekend.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const today = dayjs();

console.log(isSatSun(today));