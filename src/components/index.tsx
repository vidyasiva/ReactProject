import * as React from "react";
import * as ReactDOM from "react-dom";

import {browserHistory, IndexRoute, Router, Route} from 'react-router';
import FacebookLogin from 'react-facebook-login';


//import FB_Profile from "../components/FB_Profile";
import Profile from "../components/Profile";
import Photos from "../components/Photos";


/*ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Car}/>
        <IndexRoute component={Home} />
        <Route path="/cars" component={Car}/>
        <Route path="/about" component={About}/>
    </Router>,
    document.getElementById('container')
);*/

ReactDOM.render(
<Router history={browserHistory}>
	<Route path="/" component={Profile}/>
	<IndexRoute component={Profile} />
	<Route path="/photos" component={Photos}/>
</Router>,
  document.getElementById('container')
);
