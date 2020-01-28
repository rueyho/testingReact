export const StringUtil = {
  isEmpty: function(value) {
    return value == null || value === "" ? true : value === "";
  },

  parseString: function(value) {
    return String(value);
  },

  toLowerCase: function(value) {
    return value.toLowerCase();
  },

  contain: function(value, key) {
    return (
      StringUtil.toLowerCase(value).indexOf(StringUtil.toLowerCase(key)) !== -1
    );
  },

  containNumber: function(value, key) {
    let tmpList = StringUtil.toLowerCase(value).split(":");
    return tmpList.length - 1;
  },

  replace: function(value, key, val) {
    return value.replace(key, val);
  },

  split: function(value, symbol) {
    return value.split(symbol);
  },

  capitalizeEachWord(value) {
    var index, word, words, _i, _len;
    words = value.split(" ");
    for (index = _i = 0, _len = words.length; _i < _len; index = ++_i) {
      word = words[index].charAt(0).toUpperCase();
      words[index] = word + words[index].substr(1);
    }
    return words.join(" ");
  },

  toUpperCase: function(value) {
    return value.toUpperCase();
  }
};
