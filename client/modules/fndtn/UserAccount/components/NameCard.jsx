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

import {saveName} from '../actions/moduleActions';

class NameCard extends React.Component {
    cancel(){
        this.clearForm();
        this.toggleExpanded();
    }

    clearForm(){
        this.setState({form:{}});
    }

    constructor(){
        super();
        this.state = {
            expanded: false,
            form: {}
        };
    }

    edit(){
        var form = JSON.parse(JSON.stringify(this.props.record));
        this.setState({
            form: form
        });
        this.toggleExpanded();
    }

    save(){
        this.props.dispatch(saveName(this.state.form));
        this.toggleExpanded();
        this.clearForm();
    }

    setFieldValue(event){
        var newState = Object.assign(this.state.form);
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    toggleExpanded(){
        this.setState({expanded:!this.state.expanded});
    }

    render(){
        return (
                <Card>
                    <CardContent>
                                <Grid container>
                                    <Grid item xs={1}>
                                        <Icon className="material-icons">
                                            account_circle
                                        </Icon>
                                    </Grid>
                                    <Grid item xs={1}>
                                        Name
                                    </Grid>
                                    <Grid item xs={9}>
                                        {
                                            (this.props.record.first || '') + " " +
                                            (this.props.record.middle || '') + " " +
                                            (this.props.record.last || '') + " ( " +
                                            (this.props.record.prefered || this.props.record.first) + " )"
                                        }
                                    </Grid>
                                    <Grid item xs={1}>
                                        <IconButton
                                           onClick={this.state.expanded?this.cancel.bind(this):this.edit.bind(this)}
                                        >
                                           <Icon>{this.state.expanded?'close':'mode_edit'}</Icon>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                    </CardContent>
                    <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                    <CardContent>
                                <Grid container>
                                    <Grid item xs={1}/>
                                    <Grid item xs={10}>
                                        <Grid container>
                                        <Grid item xs={3}>
                                        <TextField
                                            id="first"
                                            name="first"
                                            value={this.state.form.first}
                                            label="First"
                                            fullWidth
                                            onChange={this.setFieldValue.bind(this)}
                                        />
                                        </Grid>
                                        <Grid item xs={3}>
                                        <TextField
                                            id="middle"
                                            name="middle"
                                            value={this.state.form.middle}
                                            label="Middle"
                                            fullWidth
                                            onChange={this.setFieldValue.bind(this)}
                                        />
                                        </Grid>
                                        <Grid item xs={3}>
                                        <TextField
                                            id="last"
                                            name="last"
                                            value={this.state.form.last}
                                            label="Last"
                                            fullWidth
                                            onChange={this.setFieldValue.bind(this)}
                                        />
                                        </Grid>
                                        <Grid item xs={3}>
                                        <TextField
                                            id="prefered"
                                            name="prefered"
                                            value={this.state.form.prefered}
                                            label="Prefered"
                                            fullWidth
                                            onChange={this.setFieldValue.bind(this)}
                                        />
                                        </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <IconButton
                                           onClick={this.save.bind(this)}
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

export default NameCard;
