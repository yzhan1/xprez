import app from './application';

// add your own logic to start the server here (using cluster mode etc.)
app.listen(app.config.port);

export default app;