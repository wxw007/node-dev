const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

const secret = 'abc';

// 生成token
const createToken = (userId, expires, strTimer="") => {
    let token = jwt.sign({
        userId,
        }, secret, {
        expiresIn: expires + " " + strTimer
    });
    return token;
}

// 验证token是否合法
const verifyToken = (_token) => {
    let verify = jwt.verify(_token, secret, (error, decoded) => {
        if(error) {
            return false;
        }
        return true;
    });
    return verify;
};

// 解析token
const parseToken = (token) => {
    return jwtDecode(token)
}

exports.createToken = createToken;
exports.verifyToken = verifyToken;
exports.parseToken = parseToken;


