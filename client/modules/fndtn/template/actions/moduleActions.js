import axios from 'axios';
import {setFooterMessage} from '../../../core/actions/footerActions';

function getModuleName(){
    return({
        type:'GET_MODULE_NAME',
        payload:{}
    });
}
export{
    getModuleName
}