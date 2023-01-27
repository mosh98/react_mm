import {Component} from "react";
import {createHeaders} from "../Profile";
const apiURL = process.env.REACT_APP_API_URL
const apiKey = process.env.REACT_APP_API_KEY
class Showcase extends Component {

    constructor(props) {


        super(props);


    }


    render() {
        return (
            <div className="card  bg-transparent " style={{margin: "2em", border: "2px solid grey"}}>
                <div className="card-body">
                    {this.props.string.replaceAll(' ', '').toLowerCase().split('').map((char, i) => (
                        <img key={i} src={'/individial_signs/' + char.trim() + '.png'} alt="example" width="50"
                             height="50"/>
                    ))}
                </div>
            </div>

        );
    }

}

export default Showcase;
