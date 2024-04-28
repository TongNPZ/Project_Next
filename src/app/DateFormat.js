import moment from 'moment';
import 'moment/locale/th';

export default function DateFormat(dateTime) {
    return moment(dateTime).format('LLL');
}