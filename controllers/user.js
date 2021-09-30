const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// SignUp User
module.exports.newUser = async (req, res, next) => {
        const { name, email, phoneNumber, password, userType } = req.body;
        const hash = await bcrypt.hash(password, 12);
        const user = new User({
            name,
            email,
            phoneNumber,
            password: hash,
            userType
        });
        await user.save();
        console.log(user)
        const token = jwt.sign({ email, userType },"Secret",
            {
                expiresIn: '1h'
            }
        )
        res.send({"token":token, "Message":"User Created"})
          
}
  
// Login user
module.exports.loginUser = async (req, res, next) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
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

// ChangePassword user
module.exports.updatePass = async (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;
    const user = await User.findById(id);
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        const { newpass } = req.body;
        const hash = await bcrypt.hash(newpass, 12);
        const updatedpass = await User.findByIdAndUpdate(id, { password: hash })
        res.send('Password changed')
        console.log(updatedpass)
    } else {
        res.send('Try Again')
    }
};


// Delete User
module.exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    console.log(user)
    res.send("Deleted")
};