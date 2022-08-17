import React, {useEffect} from 'react'
import 'styles/wait.scss';
import {useNavigate} from 'react-router-dom';
const Wait = () => {
    let navigate = useNavigate();
    useEffect(() => {
		setTimeout(() => {
			navigate('/', {replace : true});
		},5000)
	}, [])
  return (
    <div className='wait'>
        <div className='cover'>
        <img src={`${process.env.PUBLIC_URL}/images/interbrid_CI_coral 1.png`} alt="logo"/>
        <h2>담당자가 확인하였습니다.</h2>
        <h1>잠시만 기다려주세요!</h1>
        </div>
    </div>
  )
}

export default Wait