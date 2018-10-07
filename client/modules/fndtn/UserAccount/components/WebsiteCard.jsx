/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {saveWebsite, deleteWebsite} from '../actions/moduleActions';

class WebsiteCard extends React.Component {
    constructor() {
        super();
        this.state = {
            expanded: false,
            form:{
                _id:-1,
                url:'',
                label:''
            }
        };
    }

    toggleExpand(){
        this.setState({expanded:!this.state.expanded});
    }

    clearForm(){
        this.setState({
            form:{
                _id:-1,
                url:'',
                label:''
            }
        });
    }

    addOrClose(){
        this.clearForm();
        this.toggleExpand();
    }

    delete(event){
        this.props.dispatch(deleteWebsite(parseInt(event.currentTarget.id)));
    }

    edit(event){
        var id = parseInt(event.currentTarget.id);
        var newState = {
            form:{
                _id:id,
                url: this.props.list[id].url,
                label: this.props.list[id].label
            }
        };
        this.setState(newState);
        if(!this.state.expanded)this.toggleExpand();
    }

    setFieldValue(event){
        var newState = Object.assign({}, this.state.form);
        newState[event.target.name] = event.target.value;
        this.setState({form:newState});
    }

    save(){
        this.props.dispatch(
            saveWebsite(this.state.form, parseInt(this.state.form._id))
        );
        this.toggleExpand();
        this.clearForm();
    }

    row(website, index){
        return(
            <Grid container key={'website'+index}>
                <Grid item xs={2}/>
                <Grid item xs={9}>
                    <a href={website.url} target="_blank">{website.label}</a>
                </Grid>
                <Grid item xs={1}>
                    <IconButton
                        id={index}
                        onClick={this.edit.bind(this)}
                    >
                       <Icon>mode_edit</Icon>
                    </IconButton>
                    <IconButton
                        id={index}
                        onClick={this.delete.bind(this)}
                    >
                       <Icon>delete</Icon>
                    </IconButton>
                </Grid>
            </Grid>
        );
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <Grid container>
                                <Grid item xs={1}>
                                    <Icon>web</Icon>
                                </Grid>
                                <Grid item xs={1}>
                                    Websites
                                </Grid>
                                <Grid item xs={9}/>
                                <Grid item xs={1}>
                                    <IconButton
                                        onClick={this.addOrClose.bind(this)}
                                    >
                                       <Icon>{this.state.expanded?'close':'add'}</Icon>
                                    </IconButton>
                                </Grid>
                    </Grid>
                     <Grid container>
                        {this.props.list.map((website, index) => this.row(website, index))}
                    </Grid>
                </CardContent>
                <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                <CardContent>
                    <Grid container>
                        <Grid item xs={2}/>
                        <Grid item xs={9}>
                        <Grid container>
                        <Grid item xs={6}>
                            <TextField
                                id="label"
                                name="label"
                                value={this.state.form.label}
                                label="Label"
                                fullWidth
                                onChange={this.setFieldValue.bind(this)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="url"
                                name="url"
                                value={this.state.form.url}
                                label="Website URL"
                                fullWidth
                                onChange={this.setFieldValue.bind(this)}
                            />
                        </Grid>
                        </Grid>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton
                                onClick={this.save.bind(this)}
                                disabled={this.state.form.url === '' ||
                                          this.state.form.label === ''}
                            >
                               <Icon>done</Icon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>
                </Collapse>
            </Card>
        );
    }

}

export default WebsiteCard;
