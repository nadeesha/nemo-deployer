import superagent from 'superagent';

export default function (options) {
  return new Promise((resolve, reject) => {
    superagent
      .post(`${process.env.NEMO_URI}/plugins`)
      .send({
        name: options.name,
        active: false,
        description: options.description,
        frequency: options.frequency || 86400000,
      })
      .end(err => {
        if (err) {
          return reject(err);
        }

        return resolve();
      });
  });
}
