const ReS = (res, status, message, data) => {
    const resData = {
        ...(message && { message }),
    };
    if (data) {
        resData.data = data;
    }
    return (message || data)
        ? res.status(status).json(resData)
        : res.status(status).end();
};

module.exports = {
    ReS
};