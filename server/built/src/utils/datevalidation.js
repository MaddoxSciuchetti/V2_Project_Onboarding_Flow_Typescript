export const datevalidation = (date) => {
    const [day, month, year] = date.split(".");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toISOString();
};
