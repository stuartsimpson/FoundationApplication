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
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
    }
});

import {saveJob} from '../actions/moduleActions';

const setIcon = (name) => (<Icon className="material-icons">{name}</Icon>);

class JobCard extends React.Component {
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
        this.props.dispatch(saveJob(this.state.form));
        this.toggleExpanded();
        this.clearForm();
    }

    setFieldValue(event){
        var newState = Object.assign({}, this.state.form);
        newState[event.target.name] = event.target.value;
        this.setState({form: newState});
    }

    toggleExpanded(){
        this.setState({expanded:!this.state.expanded});
    }

    render() {
        return (
                    <Card>
                        <CardContent>
                                <Grid container>
                                    <Grid item xs={1}>
                                        <Icon className="material-icons">
                                            business
                                        </Icon>
                                    </Grid>
                                    <Grid item xs={1}>
                                        Job
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <strong>Company: </strong>{(this.props.record.company || '')}
                                            </Grid>
                                            <Grid item xs={6}>
                                                <strong> Title: </strong>{(this.props.record.title || '')}
                                            </Grid>
                                        </Grid>
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
                                        <Grid item xs={6}>
                                            <TextField
                                                id="company"
                                                name="company"
                                                value={this.state.form.company}
                                                label="Company"
                                                fullWidth
                                                onChange={this.setFieldValue.bind(this)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="title"
                                                name="title"
                                                value={this.state.form.title}
                                                label="Title"
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
    };
};

export default withStyles(styles)(JobCard);
