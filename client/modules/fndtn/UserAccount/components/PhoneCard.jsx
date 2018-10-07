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

import {savePhone, deletePhone} from '../actions/moduleActions';

class PhoneCard extends React.Component {
    constructor() {
        super();
        this.state = {
            expanded: false,
            form:{
                _id:-1,
                phone:'',
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
                phone:'',
                label:''
            }
        });
    }

    addOrClose(){
        this.clearForm();
        this.toggleExpand();
    }

    delete(event){
        this.props.dispatch(deletePhone(parseInt(event.currentTarget.id)));
    }

    edit(event){
        var id = parseInt(event.currentTarget.id);
        var newState = {
            form:{
                _id:id,
                phone: this.props.list[id].phone,
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
            savePhone(this.state.form, parseInt(this.state.form._id))
        );
        this.toggleExpand();
        this.clearForm();
    }

    row(phone, index){
        return(
            <Grid container key={'phone'+index}>
                <Grid item xs={2}/>
                <Grid item xs={1}>
                    <strong>{phone.label}:</strong>
                </Grid>
                <Grid item xs={8}>
                    {phone.phone}
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
                            <Icon className="material-icons">
                                phone
                            </Icon>
                        </Grid>
                        <Grid item xs={1}>
                            Phones
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
                        {this.props.list.map((phone, index) => this.row(phone, index))}
                    </Grid>
                </CardContent>
                <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                <CardContent>
                    <Grid container>
                        <Grid item xs={1}/>
                        <Grid item xs={10}>
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
                                        id="phone"
                                        name="phone"
                                        value={this.state.form.phone}
                                        label="Phone Number"
                                        fullWidth
                                        onChange={this.setFieldValue.bind(this)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton
                                onClick={this.save.bind(this)}
                                disabled={this.state.form.phone === '' ||
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

export default PhoneCard;
