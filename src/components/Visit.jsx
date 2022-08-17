import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import 'styles/visit.scss';
import useInput from 'hooks/useInput';
import { useQuery } from 'react-query';
import { getEmployeeList } from 'api/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postOfficeData } from 'modules/welcome/welcome';


const Visit = () => {
    const companyName = useInput('');
    const visitant = useInput('');
    const perpose = useInput('');
    const manager = useInput('');
    const style = {     //Select 스타일 지정
        width: '100%',
        height: '50px',
        fontSize:'18px'
    }
    const itemStyle ={
        fontSize:'19px',
        height: '50px',
    }

    const dispatch = useDispatch();
    let navigate = useNavigate();


    const query = useQuery('employeeData', getEmployeeList, {   //직원리스트 부르느 api 호출
        staleTime: 1000 * 60 * 60 * 24 * 7  //refresh 주기 일주일로 변경
    });

    const PostData = (e) => {
        e.preventDefault();
        dispatch(postOfficeData({
            callKind: 'SYS22302B003',
            officialCallDateTime: new Date(),
            officialCallCompanyName: companyName.value,
            officialCallName: visitant.value,
            officialCallPurpose: perpose.value,
            officialCallLiaison: manager.value
        }))
        navigate('/wait')
    }


    if (query.error) {
        return <span>에러가 발생했네요!</span>
    }

    return (
        <div className='visit'>
            <div className='cover'>
                <div className="titled">인터브리드 방문 등록</div>
                <form className="init" onSubmit={PostData}>
                    <div className="in">
                        <label >방문 회사명</label>
                        <input type="text" name="company" id="company" {...companyName} />
                    </div>
                    <div className="in">
                        <label >방문자 명</label>
                        <input type="text" name="visitor" id="visitor" {...visitant} />
                    </div>
                    <div className="in">
                        <label id="perpose">방문 목적</label>
                        <textarea name="perpose" id="perpose" cols="30" rows="10" {...perpose}></textarea>
                    </div>
                    <div className="in">
                        <label>담당자</label>
                        <Select sx={style} labelId='selectedName' {...manager}>
                            {query.data?.channeltuneApiResult?.interbridEmployee.map(item => {
                                return <MenuItem sx={itemStyle} value={item.interbridEmployeeKorName} key={item.interbridEmployeeSid}>{item.interbridEmployeeKorName}</MenuItem>
                            })}
                        </Select>
                    </div>
                </form>
                <div className="btn-group">
                    <button onClick={() => navigate('/')} className="btn-home">홈으로</button>
                    <button className="btn" onClick={PostData}>
                        담당자 호출
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Visit;