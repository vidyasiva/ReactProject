import * as React from "react";
import "../css/style.css";

class FB_Profile extends React.Component<{data:string, name:string}> {
    render() {

        return (
        <div>
	        <div>
	        <img  className="profile_pic" src={this.props.data} />
	        </div>
	        <div>
	        	<span className="profile_text">{this.props.name}</span>
	        </div>
        </div>
        );
    }
}

export default FB_Profile;