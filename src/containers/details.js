import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as _ from "underscore";

class Details extends Component {
    render () {
        const {car} = this.props;
        if (_.isEmpty(car)){
            return (<p className="container">Chose your car..</p>)
        }
        return (
            <div className="container">
                <h2>{car.name}</h2>
                <img alt="" style={{width: "300px", height: "180px"}} src={car.img} /><br />
                <p className="carsList">{car.desc}</p>
                <p className="carsList">Speed: {car.speed}</p>
                <p className="carsList">Weight: {car.weight}</p>
            </div>
        )
    }
}


function mapStateToProps (state) {
    return {
        car: state.cars.activeCar
    };
}

export default connect (mapStateToProps)(Details);