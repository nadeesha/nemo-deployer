import NodeZip from 'node-zip';

export default function (options) {
  return new Promise((resolve, reject) => {
    const zipper = new NodeZip();
    zipper.file(options.dir, )
  });
}