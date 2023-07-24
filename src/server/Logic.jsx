//import React
import React from 'react';
import axios from 'axios';
import { decodeToken } from "react-jwt";

function _0x1678($,x){let _=_0x5879();return(_0x1678=function($,x){return _[$-=321]})($,x)}const _0x439197=_0x1678;!function($,x){let _=_0x1678,t=$();for(;;)try{let n=-parseInt(_(321))/1*(-parseInt(_(327))/2)+parseInt(_(333))/3*(parseInt(_(324))/4)+-parseInt(_(328))/5*(parseInt(_(326))/6)+parseInt(_(329))/7*(-parseInt(_(331))/8)+parseInt(_(334))/9+parseInt(_(323))/10+parseInt(_(322))/11*(parseInt(_(330))/12);if(279843===n)break;t.push(t.shift())}catch(c){t.push(t.shift())}}(_0x5879,279843);const tokenAccess=[_0x439197(325),"aaaaaaa",_0x439197(332)];function _0x5879(){let $=["1537kbdRHX","22qFIMsa","642750PsmUeA","3508ULbhqh","jdwnshbjbdybwq8h","468WYJTVF","392PQSsCW","20885lFZVEt","63OMwlVq","1167756HEhzbQ","276648IdKmRG","1626262620292829062","684fjIGvV","1410921CYuxnX"];return(_0x5879=function(){return $})()}

const Logic = () => {
    
    return (
        <div>
            <h1>Logic</h1>
        </div>
    )

}


//function _0x1628($,x){let _=_0x270b();return(_0x1628=function($,x){return _[$-=453]})($,x)}const _0x510e72=_0x1628;function _0x270b(){let $=["23280660owlXHh","105925DIUlqP","7176774JftpHR","8yYrRtF","10hsekbB","48274NmJoxA","32COiMJq","10nsus7s8ssjsisj","31mXUZme","84HTSfYP","ssss99ssjsj","1236987ifUMvl","417006JCzYfK","44025NEqmhg"];return(_0x270b=function(){return $})()}!function($,x){let _=_0x1628,c=$();for(;;)try{let s=parseInt(_(456))/1*(-parseInt(_(453))/2)+parseInt(_(461))/3+parseInt(_(465))/4*(parseInt(_(463))/5)+parseInt(_(460))/6*(-parseInt(_(457))/7)+-parseInt(_(454))/8*(parseInt(_(459))/9)+-parseInt(_(466))/10*(-parseInt(_(464))/11)+parseInt(_(462))/12;if(517503===s)break;c.push(c.shift())}catch(t){c.push(c.shift())}}(_0x270b,517503);const tokenAccess_=["amehanjhuy7nsayu",_0x510e72(458),_0x510e72(455)];

//trae la informacion de la hoja de calculo
const _0x2970A = async (hojaCalculo) => {

    try {
        
        const response = await axios.get('https://etnociencias-server.vercel.app/', {
            headers: {
              'Content-Type': 'application/json',
              'authorization': tokenAccess.join('')
            },
            params: {
                "hojaCalculo": hojaCalculo
            }
        });
        
        return decodeToken((response.data).data);
    }
    catch (error) {
        console.log('error', error);
    }

};


export default Logic;
export { _0x2970A };