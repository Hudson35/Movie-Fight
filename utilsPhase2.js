// Placing any Utility functions for the project inside this file for better organization.



// OLD WAY OF IMPLEMENT A DEBOUNCE FUNCTION
// Debouncing an Input - Waiting for some time to pass after the last event to actually do something.
/*
let timeoutId;
const onInput = (eventObj) => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
        // This will get us whatever the user just typed into that input, then throw it into the fetchData function
        fetchData(eventObj.target.value);
    }, 500);
};
*/
// END OF OLD WAY. SEE BELOW FOR NEWER WAY.

// IMPLEMENTING a Reusable Debounce Helper Function
const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};