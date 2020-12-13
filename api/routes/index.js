module.exports = application => {
    var {index} = application.api.controllers;
    
	application.post('/api/login', index.login);
    application.delete('/api/logout', index.logout);
};