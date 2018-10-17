/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import Style from 'Utils/FormStyle';
import {saveDate, deleteDate} from '../actions/moduleActions';

const DateTimeFormat = new Intl.DateTimeFormat('en-US', {day: "numeric", month: "long", year: "numeric"});

class DateCard extends React.Component {
    constructor() {
        super();
        this.state = {
            expanded: false,
            form:{
                _id:-1,
                eventDate: new Date(),
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
                eventDate: undefined,
                label:''
            }
        });
    }

    addOrClose(){
        this.clearForm();
        this.toggleExpand();
    }

    delete(event){
        var id = parseInt(event.currentTarget.id);
        this.props.dispatch(deleteDate(id));
    }

    edit(event){
        var id = parseInt(event.currentTarget.id);
        var newState = {
            form:{
                _id:id,
                eventDate: new Date(this.props.list[id].eventDate),
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

    setEventDate(event, eventDate){
        var newState = Object.assign({}, this.state.form);
        newState.eventDate = eventDate;
        this.setState({form:newState});
    }

    save(){
        this.props.dispatch(saveDate({
            label: this.state.form.label,
            eventDate: this.state.form.eventDate.toISOString()},
            this.state.form._id));
        this.toggleExpand();
        this.clearForm();
    }

    row(event, index){
        return(
            <Grid container key={'crap'+index}>
                <Grid item xs={2}/>
                <Grid item xs={1}>
                    <strong>{event.label}: </strong>
                </Grid>
                <Grid item xs={8}>
                    {DateTimeFormat.format(new Date(event.eventDate))}
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
                        <Grid item xs={1}><Icon>event</Icon></Grid>
                        <Grid item xs={1}>Life Events</Grid>
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
                        {this.props.list.map((event, index) => this.row(event, index))}
                    </Grid>
                </CardContent>
                <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                <CardContent>
                    <Grid container>
                        <Grid item xs={2}>
                        </Grid>
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
                                id="eventDate"
                                name="eventDate"
                                type="date"
                                fullWidth
                                onChange={this.setEventDate.bind(this)}
                                value={DateTimeFormat.format(this.state.form.eventDate)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton
                                onClick={this.save.bind(this)}
                                disabled={this.state.form.label === ''}
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

export default DateCard;
