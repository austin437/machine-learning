function reducer(state, action) {
    switch (action.type) {
        case "goToNext":
            console.log(action.payload);
            return state;
    }
}

export { reducer };
