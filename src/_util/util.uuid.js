
export const UuidUtil = {

	get : function ( ) {
		let tmpUuid = '';
    	for ( var i = 0; i < 8; i ++ ) {
        	tmpUuid += Math.floor( ( 1 + Math.random( ) ) * 0x10000 ).toString( 16 ).substring( 1 );
      	}
    	return tmpUuid;
	}


	, getShort : function() {
		let tmpUuid = '';
    	for ( var i = 0; i < 4; i ++ ) {
        	tmpUuid += Math.floor( ( 1 + Math.random( ) ) * 0x10000 ).toString( 16 ).substring( 1 );
      	}
    	return tmpUuid;
	}


}
