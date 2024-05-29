import moment from 'moment';
import 'moment/locale/th';

export function DateInputFormat(date) {
    const DateTimeFormat = new Date(date);
    const year = DateTimeFormat.getFullYear();
    const month = String(DateTimeFormat.getMonth() + 1).padStart(2, '0');
    const day = String(DateTimeFormat.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

export function DateFormat(date) {
    return moment(date).add(543, 'years').format('ll');
}

export function DateFormatNum(date) {
    return moment(date).add(543, 'years').format('l');
}

export function DateTimeFormat(dateTime) {
    return moment(dateTime).add(543, 'years').format('lll');
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

export function PriceWithCommas(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

export const handleChangeNumber = (setter) => (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, '');
    setter(numericValue);
};

export const handleChangeText = (setter) => (e) => {
    const value = e.target.value;
    const textValue = value.replace(/[^a-zA-Zก-๏\s]/g, '');
    setter(textValue);
};

export const handleChangeNumberAndSlash = (setter) => (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9/]/g, '');
    setter(filteredValue);
};