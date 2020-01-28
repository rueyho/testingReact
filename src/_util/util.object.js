export const ObjectUtil = {

	hasProperty : function ( obj = {}, key ) {
		return obj.hasOwnProperty( key ) ? obj[ key ] != null : false;
	}


	, keys : function ( obj ) {
		return obj ? Object.keys( obj ) : [];
	}

	, remove : function ( obj , key ) {
		delete obj[ key ];
		return obj;
	}

	, join : function ( obj1 , obj2 ) {
		return Object.assign( {} , obj1 , obj2 ) 
	}

	, toObject: function ( obj ) {
		return JSON.parse( obj );
	}
	, toString : function ( json ) {
		return JSON.stringify( json );
	}

	, isEmpty(obj) {
		for(var key in obj) {
			if(obj.hasOwnProperty(key))
				return false;
		}
		return true;
  }
  
  , clone( obj ) {
		return Object.assign( {} , obj );
	}

  /* use for axios's response data */
  , readBlobToJson(blob) {
    return new Promise((resolve, reject) => {
      // strict checking on blob because aspect it is blob
      if ((blob instanceof Blob) && blob.type === 'application/json') {
        let reader = new FileReader();
        reader.addEventListener('loadend', (e) => {
          try {
            let text = e.srcElement.result, jsonObj = JSON.parse(text)

            resolve({
              msg: jsonObj.msg || jsonObj.extMsg,
              errorCode: jsonObj.errorCode || jsonObj.code || jsonObj.error
            });
          } catch (e) {
            reject(e);
          }
        });

        // Start reading the blob as text.
        reader.readAsText(blob);
      } else {
        let msg = blob.msg || blob.extMsg,
          errorCode = blob.errorCode || blob.code || blob.error

        if (msg && errorCode) {
          resolve({ msg, errorCode })
        } else {
          console.error('ObjectUtil.readBlobToJson reject =>', blob);
          reject(blob);
        }
      }


    })
  }

  , replaceValue : function ( obj1 , obj2 ) {
      Object.keys(obj1).forEach(
        ( key1 ) => {

          Object.keys(obj2).forEach(
            ( key2 ) => {
                if ( key1 === key2 ) {
                  obj1[key1] = obj2[key2]
                }
            }
          )
        }
      )
		  return obj1;
	}

}
