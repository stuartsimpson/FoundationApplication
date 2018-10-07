/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

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
