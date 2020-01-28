export const NumberUtil = {
  currencyFormat: function(value, c, d, t) {
    var n = value,
      c = isNaN((c = Math.abs(c))) ? 2 : c,
      d = d === undefined ? "." : d,
      t = t === undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
      j = (j = i.length) > 3 ? j % 3 : 0;
    return (
      s +
      (j ? i.substr(0, j) + t : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
      (c
        ? d +
          Math.abs(n - i)
            .toFixed(c)
            .slice(2)
        : "")
    );
  },

  parseInteger: function(value) {
    return parseInt(value);
  },

  random: function(start, end) {
    return Math.floor(Math.random() * end + start);
  },

  maskNumber: function(value) {
    let r = value.replace(/\D/g, "");
    if (r.toString().length === 11) {
      r = r.replace(/^(\d{2})(\d{2})(\d{3})(\d{1})(\d{3}).*/, "$1-$2-xxxx$5");
      // 60-13-4340924
      // 60-13-xxxx924
    } else {
      r = r.replace(/^(\d{2})(\d{2})(\d{3})(\d{3}).*/, "$1-$2-xxx$4");
      // 01 34 340 924
      // 01-34-xxx924
    }

    return r;
  }
};
