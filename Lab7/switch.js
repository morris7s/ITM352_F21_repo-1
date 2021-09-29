/* Create a switch statement that switches on the value of a variable called month.  The value of month will be a string containing the name of the month, e.g. “January”, “February”, etc.  Use the switch statement to set the value of the variable num_days, which should contain the correct number of days in the month.  Make sure that your switch contains a “default” branch, in case the value of month is not set correctly.  Output an error in the default branch and set the value of month to -1 (i.e., a value that indicates that an error has occurred). */

var month = "January"
var num_days = -1;

/*switch (month) {
    case "January":
        num_days = 31;
        break;
    case "February":
        num_days = 28;
        break;
    case "March":
        num_days = 31;
        break;
    case "April":
        num_days = 30;
        break;
    case "May":
        num_days = 31;
        break;
    case "June":
        num_days = 30;
        break;
    case "July":
        num_days = 31;
        break;
    case "August":
        num_days = 31;
        break;
    case "September":
        num_days = 30;
        break;
    case "October":
        num_days = 31;
        break;
    case "November":
        num_days = 30;
        break;
    case "December":
        num_days = 31;
        break;
    default:
        num_days = -1;
        break;
}*/



switch (month) {
    case "January":
    case "March":
    case "July":
    case "August":
    case "May":
    case "October":
    case "December":
        num_days = 31;
        break;
    case "June":
    case "April":
    case "September":
    case "November":
        num_days = 30;
        break;
    case "February":
        num_days = 28;
        break;
    default:
        num_days = -1;
        break;
}


if (num_days == -1) {
    console.log(month + " is not a month!");
} else {
    console.log(month + " has " + num_days + " days");
}