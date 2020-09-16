const app = require('./config/express');
const port = app.get('port');

/* configura a porta de escuta */
app.listen(port, () => {
	console.log(`Servidor online: ${port}`);
});