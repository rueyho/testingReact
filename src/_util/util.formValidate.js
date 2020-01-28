import { ObjectUtil } from './util.object'
import { StringUtil } from './util.string'

class FormValidateUtil {
  validate(f, r) {
    return new Promise((resolve, reject) => {
      try {
        let stateKeys = ObjectUtil.keys(f)
        // let rulesKeys = ObjectUtil.keys( r );
        let result = {}

        for (let i = 0; i < stateKeys.length; i++) {
          let sKey = stateKeys[i]
          let rValue = r[sKey]

          if (rValue) {
            let tmpResult = null
            if (typeof f[sKey] === 'string') {
              tmpResult = this._validateString(f[sKey], rValue)
            } else if (typeof f[sKey] === 'number') {
            } else if (typeof f[sKey] === 'boolean') {
            }

            if (tmpResult != null) {
              result[sKey] = tmpResult
            }
          }
        }

        if (ObjectUtil.keys(result).length > 0) {
          reject(result)
        } else {
          resolve(true)
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  _validateString(value, rules) {
    if (ObjectUtil.hasProperty(rules, 'required')) {
      if (rules['required'] == true && StringUtil.isEmpty(value)) {
        if (rules['fieldName']) {
          return rules['fieldName'] + ' is required.'
        } else if (rules['customMsg']) {
          return rules['customMsg']
        } else {
          return 'Value is required.'
        }
      }
    }

    if (ObjectUtil.hasProperty(rules, 'minlength')) {
      if (value.length < rules['minlength']) {
        if (rules['fieldName']) {
          return rules['fieldName'] + ' min length is ' + rules['minlength']
        } else {
          return 'Value min length is ' + rules['minlength']
        }
      }
    }

    if (ObjectUtil.hasProperty(rules, 'maxlength')) {
      if (value.length > rules['maxlength']) {
        if (rules['fieldName']) {
          return rules['fieldName'] + ' max length is ' + rules['maxlength']
        } else {
          return 'Value max length is ' + rules['maxlength']
        }
      }
    }

    if (ObjectUtil.hasProperty(rules, 'confirm')) {
      if (value !== rules['confirm']) {
        if (rules['fieldName']) {
          return rules.confirmMsg || `${rules['fieldName']} does not match.`
        } else {
          return 'Value does not match.'
        }
      }
    }

    if (ObjectUtil.hasProperty(rules, 'exactlength')) {
      if (value.length !== rules['exactlength']) {
        if (rules['fieldName']) {
          return ' Invalid ' + rules['fieldName'] + ' length'
        } else {
          return 'Invalid value length'
        }
      }
    }

    if (ObjectUtil.hasProperty(rules, 'noSymbol')) {
      if (rules['noSymbol'] == true && /[^a-zA-Z0-9]/.test(value)) {
        if (rules['fieldName']) {
          return (
            rules['fieldName'] +
            ' must not contain special and space characters'
          )
        } else {
          return 'Value must not contain special and space characters'
        }
      }
    }

    if (ObjectUtil.hasProperty(rules, 'hasSymbol')) {
      if (rules['hasSymbol'] == true && !/[^a-zA-Z0-9\-\/]/.test(value)) {
        if (rules['fieldName']) {
          return rules['fieldName'] + ' must contain symbol'
        } else {
          return 'Value must contain symbol'
        }
      }
    }

    if (ObjectUtil.hasProperty(rules, 'tacValid')) {
      if (value !== rules['tacValid']) {
        return 'Wrong TAC, please request new TAC'
      }
    }

    if (ObjectUtil.hasProperty(rules, 'whiteSpace')) {
      if (rules['whiteSpace'] === true && /^\s+$/.test(value)) {
        if (rules['fieldName']) {
          return rules['fieldName'] + ' must not contain space characters'
        } else {
          return 'Value must not contain space characters'
        }
      }
    }

    if (ObjectUtil.hasProperty(rules, 'numeric')) {
      if (rules['numeric'] === true && /^[0-9]+$/i.test(value)) {
        if (rules['fieldName']) {
          return rules['fieldName'] + ' must contain letter'
        } else {
          return 'Value must contain letter'
        }
      }
    }

    if (ObjectUtil.hasProperty(rules, 'alphanumeric')) {
      if (rules['alphanumeric'] === true && !/^[a-z0-9]*$/i.test(value)) {
        if (rules['fieldName']) {
          return rules['fieldName'] + ' must contain alphanumeric only'
        } else {
          return 'Value must contain alphanumeric only'
        }
      }
    }

    if (ObjectUtil.hasProperty(rules, 'letter')) {
      if (rules['letter'] === true && /^[a-zA-Z]+$/i.test(value)) {
        if (rules['fieldName']) {
          return rules['fieldName'] + ' must contain numbers'
        } else {
          return 'Value must contain numbers'
        }
      }
    }

    if (ObjectUtil.hasProperty(rules, 'number')) {
      if (rules['number'] === true && !/^\d+$/.test(value)) {
        if (rules['fieldName']) {
          return rules['fieldName'] + ' must contain numbers only'
        } else {
          return 'Value must contain numbers only'
        }
      }
    }

    if (ObjectUtil.hasProperty(rules, 'validEmail')) {
      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      let validEmail = regex.test(String(value).toLowerCase())

      if (!validEmail) {
        if (rules['fieldName']) {
          return rules['fieldName'] + ' not a valid email'
        } else {
          return 'Value not a valid email'
        }
      }
    }

    if (ObjectUtil.hasProperty(rules, 'customMaxLength')) {
      if (value.length > rules['customMaxLength']) {
        if (rules['fieldName']) {
          return (
            rules['fieldName'] +
            ' must less than ' +
            rules['customMaxLength'] +
            ' characters.'
          )
        } else {
          return (
            'Value must less than ' + rules['customMaxLength'] + ' characters.'
          )
        }
      }
    }

    if (ObjectUtil.hasProperty(rules, 'max6length')) {
      if (value.length > rules['max6length']) {
        if (rules['fieldName']) {
          if (rules['customMsg']) {
            return rules['customMsg']
          } else{
            return (
              rules['fieldName'] +
              ' format must be from 6 to '+ rules['max6length'] +' characters with mix of case sensitive letters and numbers. Special characters are accepted'
            )
          }
        } else {
          return 'Value format must be from 8 to 16 characters with mix of case sensitive letters and numbers. Special characters are accepted'
        }
      }
    }

    //at lease one letter & one numberic
    if (ObjectUtil.hasProperty(rules, 'alpha1numeric')) {
      if (rules['alpha1numeric'] === true &&  !/(?=.*?[0-9])(?=.*?[A-Za-z]).+./.test(value)) {
        return rules['alpha1numericMsg'] 
      }
    }

    return null
  }
}

export default new FormValidateUtil()

// better
export const FormValidate = new FormValidateUtil()
