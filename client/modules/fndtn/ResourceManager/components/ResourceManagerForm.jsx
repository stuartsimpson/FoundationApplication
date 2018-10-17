import React from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import treeUtil from 'Utils/treeUtil.js';
import ResourcePicker from './ResourcePicker.jsx';

import {
    loadResources,
    setFormValue,
    editResource,
    saveResource,
    cancelEdit,
    closeResourcePicker,
    deleteResource,
    clearForm,
    loadDirecotryList,
    openCloseDirectory,
    openResourcePicker,
    setDirRoot,
    toggleFormStaticValue} from '../actions/moduleActions';

const styles = theme => ({root: {}});

class ResourceManagerForm extends React.Component {
    constructor() {
        super();
    }

    setFormValue(event){
        this.props.dispatch(setFormValue(event.currentTarget.id, event.currentTarget.value));
    }

    toggleFormValue(event){
        this.props.dispatch(setFormValue(event.currentTarget.id, !this.props.state.form[event.currentTarget.id]));
    }

    toggleStaticValue(event){
        toggleFormStaticValue(this.props.dispatch, this.props.state.form[event.currentTarget.id]);
    }

    edit(event){
        var id = parseInt(event.currentTarget.id);
        var resource = Object.assign({}, this.props.state.resources[id]);
        this.props.dispatch(editResource(resource, id));
    }

    delete(event){
        var index = event.currentTarget.id;
        deleteResource(this.props.dispatch, this.props.state.resources[index], index);
    }

    loadBranch(indexPath){
        var node = treeUtil.findBranch(this.props.state.form.dirList, indexPath);
        loadDirecotryList(this.props.dispatch, node.parentPath+"/"+node.name, indexPath);
    }

    openBranch(indexPath){
        this.props.dispatch(openCloseDirectory(indexPath));
    }

    selectedValue(value){
        this.props.dispatch(setFormValue( 'file', value.parentPath+'/'+value.name));
        if(this.props.state.form.static){
            this.props.dispatch(setFormValue( 'url', value.parentPath));
        } else {
            this.props.dispatch(setFormValue( 'url', value.parentPath+'/'+value.name.replace('.js','')));
        }
        this.props.dispatch(closeResourcePicker());
    }

    closeResourcePicker(){
        this.props.dispatch(closeResourcePicker());
    }

    find(event){

        var query={};
        if(this.props.state.form.file !== ''){
            query.file=this.props.state.form.file;
        }

        if(this.props.state.form.url !== ''){
            query.url=this.props.state.form.url;
        }

        loadResources(this.props.dispatch, query);
    }

    add(event){
        this.props.dispatch(clearForm());
        this.props.dispatch(editResource(this.props.state.form, -1));
        this.props.dispatch(openResourcePicker());
    }

    cancel(event){
        this.props.dispatch(clearForm());
        this.props.dispatch(cancelEdit());
        this.props.dispatch(setDirRoot());
        loadDirecotryList(this.props.dispatch, 'routes', '0');
    }

    save(){
        saveResource(this.props.dispatch, this.props.state.form, this.props.state.index);
    }

    row(resource, index){
        return(
            <TableRow hover key={"row"+resource._id} id={"row"+resource._id} color="accent">
                <TableCell padding="none">
                    <IconButton id={index} onClick={this.edit.bind(this)}>
                        <Icon>mode_edit</Icon>
                    </IconButton>
                    <IconButton id={index} onClick={this.delete.bind(this)}>
                        <Icon>delete</Icon>
                    </IconButton>
                </TableCell>
                <TableCell>{resource.name}</TableCell>
                <TableCell>{resource.file}</TableCell>
                <TableCell>{resource.url}</TableCell>
                <TableCell padding="none">
                    <Switch
                        id={""+index}
                        name="static"
                        checked={resource.static}
                    />
                </TableCell>
                <TableCell padding="none">
                    <Switch
                        id={""+index}
                        name="public"
                        checked={resource.public}
                    />
                </TableCell>
                <TableCell padding="none">
                    <Switch
                        id={""+index}
                        name="protected"
                        checked={resource.protected}
                    />
                </TableCell>
            </TableRow>
        );
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={1}/>
                <Grid item xs={10}>
                    <Paper>
                        <ResourcePicker
                            tree={this.props.state.form.dirList}
                            open={this.props.state.resourcePickerOpen}
                            close={this.closeResourcePicker.bind(this)}
                            loadBranch={this.loadBranch.bind(this)}
                            openBranch={this.openBranch.bind(this)}
                            selectedValue={this.selectedValue.bind(this)}
                        />
                        <Grid container justify="center">
                            <Grid item xl={12}>
                                <Typography variant="display2">Resource Manager</Typography>
                            </Grid>
                        </Grid>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="none"><Typography align="center">Action</Typography></TableCell>
                                    <TableCell><Typography align="center">Name</Typography></TableCell>
                                    <TableCell><Typography align="center">File/Directory</Typography></TableCell>
                                    <TableCell><Typography align="center">URL</Typography></TableCell>
                                    <TableCell padding="none"><Typography align="center">Static</Typography></TableCell>
                                    <TableCell padding="none"><Typography align="center">Public</Typography></TableCell>
                                    <TableCell padding="none"><Typography align="center">Protected</Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell padding="none">
                                        <IconButton
                                            id={"search"}
                                            onClick={this.props.state.edit? this.save.bind(this) : this.find.bind(this)}
                                        >
                                            <Icon>{this.props.state.edit ? "done" : "search"}</Icon>
                                        </IconButton>
                                        <IconButton
                                            id={"cancel"}
                                            onClick={this.props.state.edit ? this.cancel.bind(this) : this.add.bind(this)}
                                        >
                                           <Icon>{this.props.state.edit ? "close" : "add"}</Icon>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="name"
                                            name="name"
                                            value={this.props.state.form.name}
                                            onChange={this.setFormValue.bind(this)}
                                            label="Name"
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="file"
                                            name="file"
                                            value={this.props.state.form.file}
                                            onChange={this.setFormValue.bind(this)}
                                            label="Relative File"
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="url"
                                            name="url"
                                            value={this.props.state.form.url}
                                            onChange={this.setFormValue.bind(this)}
                                            label="Relative URL"
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell padding="none">
                                        <Switch
                                            id="static"
                                            name="static"
                                            checked={this.props.state.form.static}
                                            onClick={this.toggleStaticValue.bind(this)}
                                        />
                                    </TableCell>
                                    <TableCell padding="none">
                                        <Switch
                                            id="public"
                                            name="public"
                                            checked={this.props.state.form.public}
                                            onClick={this.toggleFormValue.bind(this)}
                                        />
                                    </TableCell>
                                    <TableCell padding="none">
                                        <Switch
                                            id="protected"
                                            name="protected"
                                            checked={this.props.state.form.protected}
                                            onClick={this.toggleFormValue.bind(this)}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.state.resources.slice().map((resource, index) => this.row(resource, index))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        );
    }
    componentDidMount() {
        loadResources(this.props.dispatch, {});
        var branch = treeUtil.findBranch(this.props.state.form.dirList, '0');
        loadDirecotryList(this.props.dispatch, branch.name, branch.indexPath);
    }
}

const mapStateToProps = (state) => ({
    state: state.moduleState
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceManagerForm));
