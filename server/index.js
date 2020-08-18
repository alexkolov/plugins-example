const express = require('express');
const model = require('./model');

const app = express();
const port = 3000;
app.use(express.json());

app.get('/api/routes', (req, res) => {
  res.json(
    model.loadRoutes()
  );
})

app.get('/api/plugins/:tab', (req, res) => {
  res.json(
    model.loadPlugins(req.params.tab, req.body)
  );
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});