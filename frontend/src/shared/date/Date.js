export const getLocalDate = (date) => {
    let returnDate;
    let offset;
    if (!date) {
        offset = new Date().getTimezoneOffset();
    } else {
        offset = new Date(date).getTimezoneOffset();
    }
    const positiveOffset = offset >= 0 ? true: false;

    if (typeof date === "string") {
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
        
    return returnDate;
};

export const formatDate = (date) => {
    return [
        date.getFullYear(),
        ('0' + (date.getMonth() + 1)).slice(-2),
        ('0' + date.getDate()).slice(-2)
    ].join('-');
};