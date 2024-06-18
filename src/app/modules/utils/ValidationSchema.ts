import * as Yup from "yup";
import { DATE } from "./Constant";

export const maxDate = (date: string | Date, errorMessage: string) => {
    return Yup.date().test('max-date', errorMessage, function (value: any) {
        const newDate = new Date(value);
        const maxDate = new Date(date);
        return newDate <= maxDate;
    });
}

export const minDate = (date: string | Date, errorMessage: string) => {
    return Yup.date().test('min-date', errorMessage, function (value: any) {
        const newDate = new Date(value);
        const minDate = new Date(date);
        return newDate >= minDate;
    });
}

export const checkInvalidDate = (intl: any) => {
    return Yup.date().test('invalid-date', intl.formatMessage({ id: "VALIDATION.INVALID_FORMAT" }), function (value: any) {
        const newDate = new Date(value);
        const minDate = DATE.MIN_DATE;
        const maxDate = DATE.MAX_DATE;
        return value ? newDate <= maxDate && newDate >= minDate : true;
    });
}

export const isValidDate = (value: any) => {
  if (value) {
    return true;
  }

  const selectedDate = new Date(value);

  if (isNaN(selectedDate.getTime())) {
    return false;
  }

  const selectedDay = selectedDate.getDate();
  const selectedMonth = selectedDate.getMonth() + 1;
  const selectedYear = selectedDate.getFullYear();

  if (
    (selectedMonth === 2 &&
      selectedDay > 28 &&
      !(
        selectedYear % 4 === 0 &&
        (selectedYear % 100 !== 0 || selectedYear % 400 === 0)
      )) ||
    (selectedMonth === 2 &&
      selectedDay > 29 &&
      selectedYear % 4 === 0 &&
      (selectedYear % 100 !== 0 || selectedYear % 400 === 0)) ||
    ((selectedMonth === 4 ||
      selectedMonth === 6 ||
      selectedMonth === 9 ||
      selectedMonth === 11) &&
      selectedDay > 30) ||
    ((selectedMonth === 1 ||
      selectedMonth === 3 ||
      selectedMonth === 5 ||
      selectedMonth === 7 ||
      selectedMonth === 8 ||
      selectedMonth === 10 ||
      selectedMonth === 12) &&
      selectedDay > 31)
  ) {
    return false;
  }

  return true;
};