export default (arr) => {
    const myObj = {};
    arr.forEach((val) => {
        myObj[val.field] = val.message;
    });
    return myObj;
};
