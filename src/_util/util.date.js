import moment from "moment";

export const DateConstant = {
  FORMAT_DAY: "DD",

  FORMAT_MONTH: "MMMM",
  FORMAT_MONTH_SHORT: "MM",

  FORMAT_YEAR: "YYYY",

  FORMAT_HOUR: "HH",

  FORMAT_MINUTE: "mm",

  FORMAT_SECOND: "ss",

  FORMAT_MILLI_SECOND: "SSS"
};

export const DateKeyContant = {
  SECOND: "seconds",
  MINUTE: "months",
  HOUR: "hours",
  DAY: "days",
  WEEK: "weeks",
  MONTH: "months",
  YEAR: "years"
};

export const DateUtil = {
  currentDate() {
    return moment();
  },

  increase(dateObj, key, value) {
    return moment(dateObj).add(value, key);
  },
  decrease(dateObj, key, value) {
    return moment(dateObj).subtract(value, key);
  },

  isJsDate(dateObj) {
    return moment.isDate(dateObj);
  },
  isSame(dateObj1, dateObj2) {
    return moment(dateObj1).isSame(moment(dateObj2), "days");
  },
  isRangeWithinOneYear(endDateObj, startDateObj) {
    return moment(endDateObj).diff(moment(startDateObj), "years", true) <= 1;
  },
  isAfter(startDateObj, endDateObj) {
    return moment(startDateObj).isAfter(moment(endDateObj), "days");
  },
  isToday(dateObj) {
    return DateUtil.isSame(DateUtil.currentDate(), dateObj);
  },
  isRangeWithinOneMonth(endDateObj, startDateObj) {
    return moment(endDateObj).diff(moment(startDateObj), "month", true) <= 1;
  },
  isRangeWithin180Days(endDateObj, startDateObj) {
    return moment(endDateObj).diff(moment(startDateObj), "days") <= 180;
  },

  differentMinute(dateObj1, dateObj2) {
    return moment(dateObj2).diff(moment(dateObj1), "minutes");
  },
  differentSecond(dateObj1, dateObj2) {
    return moment(dateObj2).diff(moment(dateObj1), "seconds");
  },

  format(dateObj, formatPattern) {
    return moment(dateObj).format(formatPattern);
  },

  formatDate(dateObj) {
    return moment(dateObj).format(
      DateConstant.FORMAT_DAY +
        " " +
        DateConstant.FORMAT_MONTH +
        " " +
        DateConstant.FORMAT_YEAR
    );
    // return DateUtil.newformatDateTime(dateObj)
  },

  formatTime(dateObj) {
    return moment(dateObj).format(
      DateConstant.FORMAT_HOUR +
        ":" +
        DateConstant.FORMAT_MINUTE +
        ":" +
        DateConstant.FORMAT_SECOND
    );
    // return DateUtil.newformatDateTime(dateObj)
  },

  formatMonthShortDate(dateObj) {
    return moment(dateObj).format(
      DateConstant.FORMAT_DAY +
        "-" +
        DateConstant.FORMAT_MONTH_SHORT +
        "-" +
        DateConstant.FORMAT_YEAR
    );
    // return DateUtil.newformatDateTime(dateObj)
  },

  formatDateTime(dateObj) {
    return moment(dateObj).format(
      DateConstant.FORMAT_DAY +
        " " +
        DateConstant.FORMAT_MONTH +
        " " +
        DateConstant.FORMAT_YEAR +
        " " +
        DateConstant.FORMAT_HOUR +
        ":" +
        DateConstant.FORMAT_MINUTE +
        ":" +
        DateConstant.FORMAT_SECOND
    );
    // return DateUtil.newformatDateTime(dateObj)
  },
  newformatDateTime(dateObj) {
    return moment(dateObj).format(
      DateConstant.FORMAT_YEAR +
        "/" +
        DateConstant.FORMAT_MONTH_SHORT +
        "/" +
        DateConstant.FORMAT_DAY +
        " " +
        DateConstant.FORMAT_HOUR +
        ":" +
        DateConstant.FORMAT_MINUTE +
        ":" +
        DateConstant.FORMAT_SECOND
    );
  },

  newformatDateTime_DD_MM_YY(dateObj) {
    return moment(dateObj).format(
      DateConstant.FORMAT_DAY +
        "/" +
        DateConstant.FORMAT_MONTH_SHORT +
        "/" +
        DateConstant.FORMAT_YEAR +
        " " +
        DateConstant.FORMAT_HOUR +
        ":" +
        DateConstant.FORMAT_MINUTE +
        ":" +
        DateConstant.FORMAT_SECOND
    );
  },
  newformat_DD_MM_YY(dateObj) {
    return moment(dateObj).format(
      DateConstant.FORMAT_DAY +
        "/" +
        DateConstant.FORMAT_MONTH_SHORT +
        "/" +
        DateConstant.FORMAT_YEAR
    );
  },

  formatDateTimeStick(dateObj) {
    return moment(dateObj).format(
      DateConstant.FORMAT_YEAR +
        DateConstant.FORMAT_MONTH_SHORT +
        DateConstant.FORMAT_DAY +
        DateConstant.FORMAT_HOUR +
        DateConstant.FORMAT_MINUTE +
        DateConstant.FORMAT_SECOND +
        DateConstant.FORMAT_MILLI_SECOND
    );
  },

  formatDateSlash(dateObj) {
    return moment(dateObj).format(
      DateConstant.FORMAT_DAY +
        "/" +
        DateConstant.FORMAT_MONTH_SHORT +
        "/" +
        DateConstant.FORMAT_YEAR
    );
  },

  formatISODateTimeStick(dateObj, timeObj) {
    if (dateObj && !timeObj) {
      return moment(dateObj).format(
        DateConstant.FORMAT_YEAR +
          "-" +
          DateConstant.FORMAT_MONTH_SHORT +
          "-" +
          DateConstant.FORMAT_DAY +
          "T" +
          DateConstant.FORMAT_HOUR +
          ":" +
          DateConstant.FORMAT_MINUTE +
          ":" +
          DateConstant.FORMAT_SECOND +
          "Z"
      );
    }

    let dateTime = moment(dateObj).format(
      DateConstant.FORMAT_YEAR +
        "-" +
        DateConstant.FORMAT_MONTH_SHORT +
        "-" +
        DateConstant.FORMAT_DAY
    );
    dateTime += "T";
    dateTime += moment(timeObj).format(
      DateConstant.FORMAT_HOUR +
        ":" +
        DateConstant.FORMAT_MINUTE +
        ":" +
        DateConstant.FORMAT_SECOND +
        "Z"
    );

    return dateTime;
  },

  dateToObject(dateObj) {
    return dateObj.toDate();
  },
  objectToDate(date) {
    return moment(date);
  },

  stringToDate(dateString) {
    return moment(
      dateString,
      DateConstant.FORMAT_YEAR +
        DateConstant.FORMAT_MONTH_SHORT +
        DateConstant.FORMAT_DAY +
        DateConstant.FORMAT_HOUR +
        DateConstant.FORMAT_MINUTE +
        DateConstant.FORMAT_SECOND +
        DateConstant.FORMAT_MILLI_SECOND
    ).toDate();
  },
  stringToDateFormat(dateString, formatPattern) {
    return moment(dateString, formatPattern).toDate();
  },

  subtractDate(dateObj, value, key) {
    if (dateObj) {
      let date = moment(dateObj);
      return moment(date).subtract(value, key);
    } else {
      return moment().subtract(value, key);
    }
  },
  lastMonth(dateObj, value, key) {
    if (dateObj) {
      let date = moment(dateObj);
      return moment(date)
        .subtract(value, key)
        .date(1);
    } else {
      return moment()
        .subtract(value, key)
        .date(1);
    }
  },
  setStartOf(dateObj, key) {
    return moment(dateObj).startOf(key);
  },
  setEndOf(dateObj, key) {
    return moment(dateObj).endOf(key);
  }
};
