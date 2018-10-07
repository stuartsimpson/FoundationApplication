/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Collapse from '@material-ui/core/Collapse';
import {withStyles} from '@material-ui/core/styles';

import treeUtil from '../../../utils/treeUtil';

const styles = theme => ({treeListIdent: {marginLeft:'40px'}});

class TreeList extends React.Component {
    constructor() {
        super();
    }

    openBranch(indexPath){
        var branch = treeUtil.findBranch(this.props.tree, indexPath);
        if(branch.children.length > 0){
            this.props.openBranch(indexPath);
        } else {
            this.props.loadBranch(indexPath);
        }
    }

    selectNode(indexPath){
        var node = treeUtil.findBranch(this.props.tree, indexPath);
        if(this.props.selectNode){
            this.props.selectNode(node);
        }
    }

    leaf(leaf, index){
        return(
            <div key={leaf.indexPath}>
                <ListItem button id={leaf.indexPath} onClick={()=>{this.selectNode(leaf.indexPath);}}>
                    <ListItemIcon><Icon>description</Icon></ListItemIcon>
                    <ListItemText primary={leaf.name}/>
                    <ListItemIcon><Icon>add</Icon></ListItemIcon>
                </ListItem>
            </div>
        );
    }

    branch(branch, index){
        return(
            <div key={branch.indexPath}>
                <ListItem button id={branch.indexPath} onClick={() => {this.openBranch(branch.indexPath);}}>
                    <ListItemIcon><Icon>folder</Icon></ListItemIcon>
                    <ListItemText primary={branch.name}/>
                    <ListItemIcon><Icon>{branch.isOpen? 'keyboard_arrow_down': 'keyboard_arrow_right'}</Icon></ListItemIcon>
                </ListItem>
                <Collapse in={branch.isOpen}>
                    <List style={{marginLeft:'40px'}}>
                        {branch.children.map((node, index) => node.hasChildren? this.branch(node, index) : this.leaf(node, index))}
                    </List>
                </Collapse>
            </div>
        );
    }

    render() {
        return (
            <List>
                {this.props.tree.map((node, index) => node.hasChildren? this.branch(node, index) : this.leaf(node, index))}
            </List>
        );
    }
}


export default withStyles(styles)(TreeList);
