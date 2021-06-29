const defaultState = {
    cars : [
        {
            id: 1,
            name: "Volvo C40",
            speed: '220.2',
            weight: '1.2 kg',
            desc: "Новий електрокар Volvo C40 Recharge",
            img: "https://assets.volvocars.com/uk-ua/~/media/row/ukraine/images/news-2021/new-volvo-c40-recharge-electric-car/14-volvo_c40recharge_three_quarter_front_ms.jpg?h=511&la=uk-UA&mw=950&w=950",
        },
        {
            id: 2,
            name: "Volvo V40",
            speed: '200.3',
            weight: '1.4 kg',
            desc: "Пятидверный хэтчбек Volvo V40",
            img: "https://wroom.ru/i/cars2/volvo_v40_2.jpg",
        },
        {
            id: 3,
            name: "Volvo XC60",
            speed: '260.2',
            weight: '1.6 kg',
            desc: "Volvo XC60 — новое поколение легендарного кроссовера родом из Швеции",
            img: "https://mobile-review.com/articles/2020/image/volvo-xc60/off/1.jpg",
        },
        {
            id: 4,
            name: "Volvo FH16",
            speed: '240.2',
            weight: '1.101 kg',
            desc: "NEW 2021 Volvo FH16 750 Tractor Truck",
            img: "https://i.ytimg.com/vi/NJmUocEY4Jg/maxresdefault.jpg",
        }
    ],
    activeCar: {}
};

 const cars = (state=defaultState, action) =>  {
    switch (action.type) {
        case "CAR_SELECTED":
            const newState = JSON.parse(JSON.stringify(state));
            const activeCar = newState.cars.filter((element) => {
                return element.id === action.id;
            });
            newState.activeCar = activeCar[0];
            return newState;
        default:
            return state;
    }
};

export default cars;