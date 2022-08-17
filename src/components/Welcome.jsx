import { callOfficeEmployee } from 'modules/welcome/welcome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import 'styles/welcome.scss';
const Welcome = () => {

	const dispatch = useDispatch();	//디스패치 호출
	let navigate = useNavigate();	//라우팅을 위한 Navigate Hooks 호출(vue에서 this.$router와 동일)


	const onclickDelivery = (param) => {
		dispatch(callOfficeEmployee(param));
		navigate('/wait')
	}

	return (
		<div className='containered'>
			<div className="wrapper">
				<div className="titled">
					<img src={`${process.env.PUBLIC_URL}/images/interbrid_CI_coral 1.png`} alt="logo" />
					<h1>인터브리드 방문을 환영합니다 !</h1>
				</div>
				<div className="perpose">
					<span>방문하신 목적을 아래에서 선택해주세요.</span>
					<ul>
						<li onClick={() => onclickDelivery('SYS22302B006')}>우편/택배</li>
						<li onClick={() => onclickDelivery('SYS22302B005')}>음식 배달</li>
						<li onClick={() => onclickDelivery('SYS22302B004')}>안내 요청</li>
						<li onClick={() => navigate('/visit')}>담당자 호출</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Welcome;