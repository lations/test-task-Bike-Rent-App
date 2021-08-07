let initialState = {
    available_bikes: [],
    rented_bikes: [],
    bike_types:[]
};

const bikesRentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BIKE_LIST':
            const avaliable =  action.payload.filter((bike => bike.status === 'available'));
            const rented = action.payload.filter((bike => bike.status === 'rented'))
            rented.forEach((bike) => {
                    let rentHours = (new Date().getTime() - bike.rentDate)/1000/60/60
                    if (rentHours > 20) {
                        bike.price = bike.price / 2
                    }
                }
            )
            return {
                ...state,
                available_bikes:avaliable,
                rented_bikes:rented,
                bike_types:state.bike_types
            };

         case 'GET_BIKE_TYPES':
            return {
                ...state,
                available_bikes:state.available_bikes,
                rented_bikes:state.rented_bikes,
                bike_types:action.payload
            };
        
        default:
            return state;
    }
}

export default bikesRentReducer;