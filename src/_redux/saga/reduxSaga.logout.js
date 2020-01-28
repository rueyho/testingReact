
import {
    call , put
}                               				        from 'redux-saga/effects';


import ReduxActionLogout                                from '../action/reduxAction.logout';


import ServiceLogout                                    from '../../_service/service/service.logout';

export default new (

    class ReduxSagaLogout {

        * logout( action ) {

            try {

                console.log( ' - ReduxSagaLogout : logout : [action] : *** ', action );
                let result =  yield call(
                    ServiceLogout.logout
                    , action.head
                    , action.param
                );

                console.log( ' - ReduxSagaLogout : logout : [DONE] ' , result );
                yield put( ReduxActionLogout.rLogoutDone( result ) );

            } catch ( e ) {
                console.log( ' - ReduxSagaLogout : logout : [EXCEPTION] , ' , e );
                yield put( ReduxActionLogout.rError( e ) );

            } finally {
                console.log( ' - ReduxSagaLogout : logout : [END] : *** ' );
            }

        }

    }

)();
