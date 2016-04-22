import express from 'express';
import bodyParser from 'body-parser';
import deployFromGit from './deployFromGit.js';
import deployToLambda from './deployToLambda.js';
import registerPlugin from './registerPlugin.js';
import fs from 'fs';

if (fs.existsSync('.env')) {
  require('dotenv').config();
}

const app = express();

app.use(bodyParser.json());

app.post('/deploy', (req, res) => {
  const { gitUrl } = req.body;
  let name;
  let description;

  deployFromGit({
    gitUrl,
  })
    .then(plugin => {
      name = plugin.name;
      description = plugin.description;

      return deployToLambda({
        dir: plugin.dir,
        pluginName: plugin.name,
        description: plugin.description,
      });
    })
    .then(() => registerPlugin({
      name,
      description,
    }))
    .then(() => res.status(204).end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.listen(process.env.PORT || 3002);

console.log('Running deployer...');
