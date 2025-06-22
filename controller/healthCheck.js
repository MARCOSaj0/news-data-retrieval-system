const httpConst = require('../config/httpConst');
const { commonErrMsg } = require('../config/commonConst');
const { ReS } = require('../service/util');

const healthCheck = (req, res) => {
    try {
        return ReS(res, httpConst.Ok, "Health check successful.", req.body);
    } catch (err) {
        console.error("Error at health check", err);
        return ReS(res, httpConst.InternalServerError, commonErrMsg);
    }
};

module.exports = {
    healthCheck
};