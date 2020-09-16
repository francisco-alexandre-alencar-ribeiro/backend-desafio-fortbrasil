module.exports = application => {
	var {establishment} = application.api.controllers;
	var verifyJWT = application.get("verifyJWT");
	
	application.get('/api/establishments', verifyJWT, establishment.getAll);
	application.get('/api/establishments/:id', verifyJWT, establishment.get);
	application.post('/api/establishments', verifyJWT, establishment.save);
	application.put('/api/establishments', verifyJWT, establishment.save);
	application.delete('/api/establishments/:id', verifyJWT, establishment.delete);
};