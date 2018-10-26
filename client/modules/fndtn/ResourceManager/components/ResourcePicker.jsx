/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import TreeList from './TreeList.jsx';

const styles = theme => ({treeListIdent: {margin:'0px 0px 0px 200px'}});

class ResourcePicker extends React.Component {
    constructor() {
        super();
    }

    close(){
        this.props.close();
    }

    loadBranch(indexPath){
        this.props.loadBranch(indexPath);
    }

    openBranch(indexPath){
        this.props.openBranch(indexPath);
    }

    handleChangeResourceDir(event){
        this.props.setResourceDir(event.currentTarget.options[event.currentTarget.selectedIndex].value);
    }

    selectedValue(value){
        this.props.selectedValue(value);
    }

    render() {
        return (
            <Dialog
                onClose={this.close.bind(this)}
                open={this.props.open}
            >
                <DialogTitle>Resource Picker</DialogTitle>
                <TextField
                    id="resourceType"
                    select
                    lable="Resource Type"
                    value={this.props.tree[0].name}
                    SelectProps={{
                      native: true
                    }}
                    onChange={this.handleChangeResourceDir.bind(this)}
                    helperText="Select Resource Type"
                    margin="normal"
                >
                    <option key="server.routes" value="server.routes">Service</option>
                    <option key="public.modules" value="public.modules">Modules</option>
                </TextField>
                <TreeList
                    tree={this.props.tree}
                    loadBranch={this.loadBranch.bind(this)}
                    openBranch={this.openBranch.bind(this)}
                    selectNode={this.selectedValue.bind(this)}
                />
            </Dialog>
        );
    }
}

export default withStyles(styles)(ResourcePicker);
