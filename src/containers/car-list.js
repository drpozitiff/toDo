import React, {Component} from 'react';
import {connect} from 'react-redux';
import {select} from '../actions/index'

class CarsList extends Component {
    showList () {
        const {cars, select} = this.props;
        return cars.map((car)=> {
            return (
            <div className="carsList container">

                <li className="carsItem" onClick={()=> select(car.id)}
                    key={car.id}>
                    {car.name}</li>
            </div>
            )
        });
    }
    render (){
        return (
            <ol>
                {this.showList()}
            </ol>
        );
    }
}

function mapStateToProps (state) {
    return {
        cars: state.cars.cars
    };
}

function matchDispatchToProps (dispatch) {
    return {
        select: (car) => dispatch(select(car))
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(CarsList);