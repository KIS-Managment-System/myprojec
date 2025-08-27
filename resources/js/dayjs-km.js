// resources/js/dayjs-km.js
import dayjs from 'dayjs';
import 'dayjs/locale/km';

dayjs.locale({
  ...dayjs.Ls['km'], // copy locale khmer
  meridiem: (hour, minute, isLowercase) => {
    return hour < 12 ? 'ព្រឹក' : 'ល្ងាច';
    },
  
  


}, null, true);

export default dayjs;
