import readline from 'readline';

const createReadline = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.isOpened = true;
  rl.on('close', () => {
    rl.isOpened = false;
  });
  return rl;
};

export default createReadline;
