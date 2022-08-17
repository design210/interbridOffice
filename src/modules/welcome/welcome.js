//ducks patton

import { callVoice, officeCall, postCallData } from 'api/api'
//
//액션 타입
const CALL_OFFICE_EMPLOYEE = 'CALL_OFFICE_EMPLOYEE';
const CALL_OFFICE_OTHER_DATA = 'CALL_OFFICE_OTHER_DATA';


//액션 생성 함수
export const callOfficeEmployee = (kind) => async (dispatch) => {
    const res = await officeCall(kind);

    

    dispatch({
        type: CALL_OFFICE_EMPLOYEE,
        payload: res
    })

    if(res.channeltuneApiResult.errorCode === 200){
        return callVoice('N',res.channeltuneApiResult.interbridInfo.audioMessage)
    }
    

}

//액션 생성 함수
export const postOfficeData = (data) => async (dispatch) => {
    const res = await postCallData(data);

    console.log(res);
    dispatch({
        type: CALL_OFFICE_OTHER_DATA,
        payload: res
    })
    if(res.channeltuneApiResult.errorCode){
        return callVoice('Y',res.channeltuneApiResult.interbridInfo.officialCallLiaison);
    }

}

//초기값
const initialState = {
    callOfficeResult: {},   //직원 호출 api
    callOfficeRegister: {}, //방문등록
};


//리듀서
export default function welcome(state = initialState, action) {
    switch (action.type) {
        case CALL_OFFICE_EMPLOYEE:
            return {
                ...state,
                callOfficeResult: action.payload
            }
        case CALL_OFFICE_OTHER_DATA:
            return {
                ...state,
                callOfficeRegister: action.payload
            }
        default:
            return state
    }
}