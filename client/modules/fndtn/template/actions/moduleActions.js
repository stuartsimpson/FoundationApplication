import axios from 'axios';
import {setFooterMessage} from 'Core/actions/footerActions';

function getModuleName(){
    return({
        type:'GET_MODULE_NAME',
        payload:{}
    });
}
export{
    getModuleName
}