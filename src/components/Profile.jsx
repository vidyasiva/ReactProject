import {Facebook} from '../components/FB.js';
import {Button} from 'react-bootstrap';
import * as React from "react";
import "../css/style.css";
import { browserHistory } from 'react-router';

var createReactClass = require('create-react-class');

const Profile = createReactClass({
    mixins: [Facebook],
    componentDidMount() {
        this.getPhotos = this.getPhotos.bind(this);
        this.checkStatus();
        
    },
    getInitialState() {
        return {
            status: 'unknown',
            loading: false,
            event: null,
            data: {}
        };
    },
    onClick: function(event){
    browserHistory.push('/photos');
    
   },
    render() {
        
        const message = this.state.status === 'connected'
            ? (<div>
                <div className="username">
                <div>Hi {this.state.data.first_name}, {this.state.data.last_name}!</div>
                <div><Button onClick={this.doLogout}>Logout</Button></div>
                </div>
                <div>
                <div className="album_title"> My Facebook Albums</div>
                    <div id="photos" onClick={this.onClick}>
                    </div>
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

export default Profile;