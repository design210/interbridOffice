import axios from 'axios'
const baseUrl = process.env.REACT_APP_API_URL;  //env파일에서 url 가져오기


const getEmployeeList = async() => {
    const {data} = await axios.get(`${baseUrl}/employee`);
    return data
}

const officeCall = async(callKind) => {
    const {data} = await axios.get(`${baseUrl}/welcome?callKind=${callKind}`);

    return data
}

const postCallData = async(datas) => {
    const {data} = await axios.post(`${baseUrl}/welcome`,datas);
    return data
}

const callVoice = async(flag, txt) => {
    //담당자 {이름} << 님을 호출하였습니다. 지금 확인해 주세요.
    let xmlData = ''
    if(flag === 'N'){
        xmlData = `<speak>${txt}</speak>`;
    } else {
        xmlData = `<speak>담당자 ${txt}님을 호출하였습니다. 지금 확인해 주세요</speak>`;
    }
     
    try{
        const { data } = await axios.post("https://kakaoi-newtone-openapi.kakao.com/v1/synthesize",xmlData,{
        headers: {
            'Content-Type': 'application/xml',
			Authorization: `KakaoAK ${process.env.REACT_APP_REST_KEY}`,
        },
        responseType: 'arraybuffer',
    });
 
    const context = new AudioContext();
    context.decodeAudioData(data, buffer => {
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(0);
    });
    } catch (e) {
        console.log(e.message)
    }
    

   
}
export {getEmployeeList, officeCall, postCallData,callVoice}