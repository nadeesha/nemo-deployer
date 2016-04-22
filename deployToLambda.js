import exec from 'exec';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';

const cmd = pluginName => `
  node-lambda setup\n 
  node-lambda deploy -a $AWS_ACCESS_KEY -s $AWS_SECRET_KEY -n ${pluginName} -m 128 -t 20 -u nodejs -o $DEPLOYER_ARN -e production
  `;

export default function (options) {
  return new Promise((resolve, reject) => {
    console.log('Deploying to lambda...', options);

    const deployScript = path.join(options.dir, 'deploy-to-nemo.sh');

    fs.writeFile(deployScript, cmd(options.pluginName), {
      mode: 0o777,
    }, (err) => {
      if (err) {
        return reject(err);
      }

      child_process.execFile(deployScript, {
        cwd: options.dir,
        env: process.env,
      }, (err, stdout, stderr) => {
        if (err) {
          return reject(err, stderr);
        }

        console.log('Successfully Deployed');
        console.log(stdout);

        return resolve(options);
      });
    });
  });
}