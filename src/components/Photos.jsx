import {Facebook} from '../components/FB.js';
import {Button} from 'react-bootstrap';
import * as React from "react";
import "../css/style.css";

var createReactClass = require('create-react-class');

const Photos = createReactClass({
    mixins: [Facebook],
    componentDidMount() {
        this.checkStatusPhotos(event);
    },
    getInitialState() {
        return {
            status: 'unknown',
            loading: false,
            data: {}
        };
    },
    render() {
        
        const message = this.state.status === 'connected'
            ? (<div>
                <div className="username">
                <div>Hi {this.state.data.first_name}, {this.state.data.last_name}!</div>
                <div><Button onClick={this.doLogout}>Logout</Button></div>
                </div>
                <div>
                    <div className="album_title"> My Facebook Photos from Album</div>
                    <div id="album_photos"> </div>
                </div>
              </div>)
            : (<Button onClick={this.doLogin}>Login</Button>);
        return (
            <div>
                {message}
            </div>
        );
    }
});

export default Photos;