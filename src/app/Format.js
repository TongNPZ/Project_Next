import moment from 'moment';
import 'moment/locale/th';

export function DateFormat(dateTime) {
    return moment(dateTime).format('LLL');
}

export function FormatThaiNationalID(id) {
    
    if (typeof id === 'string' && id !== null && id !== undefined) {
        const cleanedID = id.replace(/\D/g, '');
        const formattedID = cleanedID.replace(/^(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})$/, '$1-$2-$3-$4-$5');

        return formattedID;
    } else {
        return 'Invalid ID';
    }
}