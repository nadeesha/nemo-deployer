import invariant from 'invariant';
import Git from 'nodegit';
import uuid from 'uuid';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export default function (options) {
  return new Promise((resolve, reject) => {
    invariant(options.gitUrl, 'options.gitUrl is required');

    const deploymentId = uuid.v4();
    const deployedDir = `/tmp/${deploymentId}`;

    console.log('Deploying...', options.gitUrl);

    Git.Clone(options.gitUrl, deployedDir) // eslint-disable-line
      .then(() => {
        fs.readFile(path.join(deployedDir, 'package.json'), {
          encoding: 'utf8',
        }, (err, packageJson) => {
          if (err) {
            return reject(err);
          }

          return resolve(_.assign({
            dir: deployedDir,
          },
            _.pick(JSON.parse(packageJson),
              ['name',
                'description',
                'author',
                'license',
                'main'])));
        });
      })
      .catch(reject);
  });
}
