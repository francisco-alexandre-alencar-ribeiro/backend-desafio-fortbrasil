require('dotenv').config();

module.exports = application => {
    var controller = {};
    var jwt = application.get("jwt");

    controller.login = (req, res) => {

        if(req.body.user === 'alex' && req.body.pwd === 'andre') {
            console.log(process.env.SECRET)
            var token = jwt.sign({ id: 1 }, process.env.SECRET, { expiresIn: 1800 });
            return res.json({ auth: true, token });
        }
        
        res.status(500).json({message: 'Login inválido!'});
    };

    controller.logout = (req, res) => {
        res.json({ auth: false, token: null });
    };

    return controller;
};