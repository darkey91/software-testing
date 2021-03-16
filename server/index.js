const app = require('./app').app;

const port = process.env.PORT || 8090;

app.listen(port, () => console.log(`Started on port ${port}`));
