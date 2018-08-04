export const getLocalDate = (date) => {
    let returnDate;
    const offset = new Date().getTimezoneOffset();
    // let isString = false;
    const positiveOffset = offset >= 0 ? true: false;

    if (typeof date === "string") {
        // isString = true;
        returnDate = new Date(date);
    } else if (date === null) {
        returnDate = new Date();
    } else if (typeof date === "number") {
        returnDate = new Date(date);
    } else {
        returnDate = new Date(date);
    }

    positiveOffset ?
        returnDate.setTime(returnDate.getTime() + offset*60*1000):
        returnDate.setTime(returnDate.getTime() - offset*60*1000);
        
    // isString ?
    //     returnDate.setTime(returnDate.getTime() + offset*60*1000):
    //     returnDate.setTime(returnDate.getTime() - offset*60*1000);

    return returnDate;
};