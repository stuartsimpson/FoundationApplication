import stateStorage from 'Utils/stateStorage';
import treeUtil from 'Utils/treeUtil';

const defaultState = {
    edit: false,
    index:-1,
    resources:[],
    resourcePickerOpen:false,
    dirList:[{
        name:'server.routes',
        indexPath:'0',
        parentPath:'',
        hasChildren:true,
        children:[],
        isOpen:false}],
    form:{
        _id:'',
        name:'',
        file:'',
        url:'',
        static:false,
        public:false,
        protected: false
    }
};

var moduleReducer = (state = defaultState, action) => {
    var newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'MODULE_SET': {
            stateStorage.set('moduleState', state);
            break;
        }
        case 'FNDTN_RESOURCE_MANAGER_CLEAR_FORM':{
            newState.dirList=[{
                name:'server.routes',
                indexPath:'0',
                parentPath:'',
                hasChildren:true,
                children:[],
                isOpen:false}];
            newState.form._id='';
            newState.form.name='';
            newState.form.file='';
            newState.form.url='';
            newState.form.static=false;
            newState.form.public=false;
            newState.form.protected=false;
            newState.index = -1;
            break;
        }
        case 'FNDTN_RESOURCE_MANAGER_CLOSE_RESOURCE_PICKER':{
            newState.resourcePickerOpen = false;
            break;
        }
        case 'FNDTN_RESOURCE_MANAGER_OPEN_RESOURCE_PICKER':{
            newState.resourcePickerOpen = true;
            break;
        }
        case 'FNDTN_RESOURCE_MANAGER_SET_DIR_ROOT':{
            newState.dirList[0].name = action.payload.rootDir;
            newState.dirList[0].children = [];
            break;
        }
        case 'FNDTN_RESOURCE_MANAGER_OPEN_CLOSE_DIRECTORY':{
            newState.dirList = treeUtil.openCloseBranch(newState.dirList, action.payload.indexPath    );
            break;
        }
        case 'FNDTN_RESOURCE_MANAGER_LOAD_DIRECTORY_LIST':{
            newState.dirList = treeUtil.addBranch(
                newState.dirList,
                action.payload.directoryList,
                action.payload.indexPath);
            break;
        }
        case 'FNDTN_RESOURCE_MANAGER_SET_RESOURCES': {
            newState.resources = action.payload;
            break;
        }
        case 'FNDTN_RESOURCE_MANAGER_SET_FORM_VALUE':{
            newState.form[action.payload.field] = action.payload.value;
            break;
        }
        case 'FNDTN_RESOURCE_MANAGER_EDIT_RESOURCE':{
            newState.form = action.payload.resource;
            newState.index = action.payload.index;
            newState.edit = true;
            break;
        }
        case 'FNDTN_RESOURCE_MANAGER_CANCEL_EDIT':{
            newState.edit = false;
            break;
        }
        case 'FNDTN_RESOURCE_MANAGER_SAVE_RESOURCE':{
            if(action.payload.index >= 0){
                newState.resources[action.payload.index] = action.payload.resource;
            } else {
                newState.resources.push(action.payload.resource);
            }
            break;
        }
        case 'FNDTN_RESOURCE_MANAGER_DELETE_RESOURCE':{
            var resources = newState.resources.slice();
            resources.splice(action.payload.index, 1);
            newState.resources = resources;
            break;
        }
    }
    return(newState);
};

export default moduleReducer;
