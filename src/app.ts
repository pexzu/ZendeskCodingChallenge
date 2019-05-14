const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('testing', (name: any) => {
  console.log(`Hi ${name}!`);
  readline.close();
});
