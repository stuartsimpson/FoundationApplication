import React from 'react';
import reactDom from 'react-dom';
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

reactDom.render(<App/>, document.getElementById('App'));
