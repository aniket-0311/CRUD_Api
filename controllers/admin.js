const Admin = require('../models/admins');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

// SignUp Admin
module.exports.newAdmin = async(req,res,next) =>{
    const { name, email, phoneNumber, password, userType} = req.body;
    const hash = await bcrypt.hash(password, 12);
    const admin = new Admin({
        name,
        email,
        phoneNumber,
        password: hash,
        userType
    });
    await admin.save();
    console.log(admin)
    const token = jwt.sign({ email, userType },"Secret",
            {
                expiresIn: '1h'
            }
        )
        res.send({"token":token, "Message":"User Created"})
} 

// Login Admin
module.exports.loginAdmin = async(req, res) =>{
  
        const { email, password} = req.body;
        const admin = await Admin.findOne({ email });
        const validPassword = await bcrypt.compare(password, admin.password);
        if(validPassword){
            const token = jwt.sign({ email, },"Secret",
            {
                expiresIn: '1h'
            }
        )
            res.send({"token":token,"Message":"Welcome"})
        } else {
            res.send('Email or Password is incorrect')
        }
};

// UpdatePassword Admin
module.exports.updatePass = async(req,res) =>{
    const { id } = req.params;
    const { password } = req.body;
    const admin = await Admin.findById( id );
    const validPassword = await bcrypt.compare(password, admin.password);
    if(validPassword){
        const { newpass } = req.body;
        const hash = await bcrypt.hash(newpass, 12);
        const updatedpass = await Admin.findByIdAndUpdate(id,{password:hash})
        res.send('Password changed')
        console.log(updatedpass)
    } else{
        res.send('Try Again')
    }
}

// Delete Any User
module.exports.delete = async(req,res) =>{
    const{ id } = req.params;
    const user = await User.findByIdAndDelete(id);
    console.log(user)
    res.send("Deleted")
}
