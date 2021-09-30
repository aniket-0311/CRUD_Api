const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try{
        // const token = req.body.authorization.split('')[1];
        const decoded = jwt.verify(req.body.token, "Secret")
        req.userdata = decoded;
        next()
    } catch(e){
        return res.status(401).send({message:'Auth failed'});
    }
};