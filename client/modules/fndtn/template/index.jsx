/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import store from './store';

import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Layout from './components/Layout.jsx';

const theme = createMuiTheme();

class App extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
                <div>
                    <MuiThemeProvider theme={theme}>
                        <Provider store={store}>
                            <Layout/>
                        </Provider>
                    </MuiThemeProvider>
                </div>
                );
    }
}

render(<App/>, document.getElementById('App'));