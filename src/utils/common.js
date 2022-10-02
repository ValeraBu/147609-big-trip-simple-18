const isFutureDate = (date) => Date.parse(date) >= Date.now();

export {isFutureDate};
