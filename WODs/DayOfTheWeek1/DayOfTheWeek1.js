// Implement the above algorithm in JS to determine the day of the week for ANY date. Start by defining variables day for the day a number from 1-31, month for the month (a String) “January”, “February”, etc., year a number 1900-2099 for the year

let day = 11;
let month = "November";
let year =  2001;

// Steps:
let step1 = (month == "January" || month == "February") ? year - 1 : year;

let step2 = step1 + Math.floor(step1 / 4);

let step3 = step2 - Math.floor(step1 / 100);

let step4 = step3 + Math.floor(step1 / 400);

let step5 = step4 + day;

let monthKey = {
    January: 0,
    February: 3,
    March: 2,
    April: 5,
    May: 0,
    June: 3,
    July: 5,
    August: 1,
    September: 4,
    October: 6,
    November: 2,
    December: 4
};
let step6 = step5 + monthKey[month];
let step7 = step6 % 7;

let DOW = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

console.log(month + " " + day + ", " + year + " was on a " + DOW[step7]);

