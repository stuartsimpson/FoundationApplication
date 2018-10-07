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
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import Style from '../../../utils/FormStyle';
import {saveAddress, deleteAddress} from '../actions/moduleActions';

class AddressCard extends React.Component {
    constructor() {
        super();
        this.state = {
            expanded: false,
            form:{
                _id:-1,
                lable: '',
                line1: '',
                line2: '',
                city: '',
                state: '',
                county: '',
                country: '',
                zip: ''
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
                lable: '',
                line1: '',
                line2: '',
                city: '',
                state: '',
                county: '',
                country: '',
                zip: ''
            }
        });
    }

    addOrClose(){
        this.clearForm();
        this.toggleExpand();
    }

    delete(event){
        var id = parseInt(event.currentTarget.id);
        this.props.dispatch(deleteAddress(id));
    }

    edit(event){
        var id = parseInt(event.currentTarget.id);
        var newState = Object.assign({}, this.props.list[id]);
        newState._id = id;
        this.setState({form: newState});
        if(!this.state.expanded)this.toggleExpand();
    }

    setFieldValue(event){
        var newState = Object.assign({}, this.state.form);
        newState[event.target.name] = event.target.value;
        this.setState({form:newState});
    }

    save(){
        this.props.dispatch(saveAddress(this.state.form,this.state.form._id));
        this.toggleExpand();
        this.clearForm();
    }

    row(address, index){
        return(
            <Grid container key={'address'+index}>
                <Grid item xs={2}/>
                <Grid item xs={1}>
                    <strong>{address.label}: </strong>
                </Grid>
                <Grid item xs={8}>
                    {
                        address.line1 + ", " +
                        (address.line2? address.line2 + ", ":"") +
                        address.city + ", " +
                        address.state + " " +
                        address.zip
                    }
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
                                <Grid item xs={1}><Icon>place</Icon></Grid>
                                <Grid item xs={1}>Addresses</Grid>
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
                        {this.props.list.map((address, index) => this.row(address, index))}
                    </Grid>
                </CardContent>
                <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                <CardContent>
                    <Grid container>
                        <Grid item xs={2}/>
                        <Grid item xs={9}>
                        <Grid container>
                        <Grid item xs={4}>
                            <TextField
                                id="label"
                                name="label"
                                value={this.state.form.label}
                                label="Label"
                                fullWidth
                                onChange={this.setFieldValue.bind(this)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="line1"
                                name="line1"
                                value={this.state.form.line1}
                                label="Line 1"
                                fullWidth
                                onChange={this.setFieldValue.bind(this)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="line2"
                                name="line2"
                                value={this.state.form.line2}
                                label="Line 2"
                                fullWidth
                                onChange={this.setFieldValue.bind(this)}
                            />
                        </Grid>
                        </Grid>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton
                                onClick={this.save.bind(this)}
                                disabled={this.state.form.address === '' ||
                                          this.state.form.label === ''}
                            >
                               <Icon>done</Icon>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2}/>
                        <Grid item xs={9}>
                        <Grid container>
                        <Grid item xs={4}>
                            <TextField
                                id="city"
                                name="city"
                                value={this.state.form.city}
                                label="City"
                                fullWidth
                                onChange={this.setFieldValue.bind(this)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="state"
                                name="state"
                                value={this.state.form.state}
                                label="State"
                                fullWidth
                                onChange={this.setFieldValue.bind(this)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="zip"
                                name="zip"
                                value={this.state.form.zip}
                                label="Zip"
                                fullWidth
                                onChange={this.setFieldValue.bind(this)}
                            />
                        </Grid>
                        </Grid>
                        </Grid>
                        <Grid item xs={1}/>
                    </Grid>
                </CardContent>
                </Collapse>
            </Card>
        );
    }
}

export default AddressCard;
