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

app.get('/api/plugins/:routeId', (req, res) => {
  res.json(
    model.loadPlugins(req.params.routeId)
  );
});

app.patch('/api/plugins/:routeId/:pluginId', (req, res) => {
  const { routeId, pluginId } = req.params;

  res.json(
    model.updatePlugin(routeId, pluginId, req.body)
  );
});

app.patch('/api/plugins', (req, res) => {
  res.json(
    model.updatePlugins(req.body)
  );
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});