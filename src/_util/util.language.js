import { ObjectUtil } from "./util.object";

const properties = {
  file: null,
  language: ""
};

class LanguageUtil {
  _initial() {
    if (properties.file == null || properties.language !== this._getLocale()) {
      switch (this._getLocale()) {
        // case 'en':
        // 	properties.language = 'en';
        // 	properties.file = require( '../_asset/language/en.language.json' );
        // 	break;

        // case 'ch':
        // 	properties.language = 'en';
        // 	properties.file = require( '../_asset/language/ch.language.json' );
        // 	break;

        default:
          break;
      }
    }
  }

  _getLocale() {
    return "en";
  }

  label(key) {
    this._initial();
    return ObjectUtil.hasProperty(properties.file, key)
      ? properties.file[key]
      : key;
  }
}

export default new LanguageUtil();
