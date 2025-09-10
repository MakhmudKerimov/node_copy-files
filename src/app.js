/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function main() {
  const [, , source, destination] = process.argv;

  try {
    // проверяем, что аргументы переданы
    if (!source || !destination) {
      throw new Error('Usage: node app.js <source> <destination>');
    }

    const sourcePath = path.resolve(source);
    const destinationPath = path.resolve(destination);

    // если путь совпадает — ничего не делаем
    if (sourcePath === destinationPath) {
      return;
    }

    // проверяем, что исходный файл существует
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Source file does not exist: ${source}`);
    }

    // проверяем, что source — это файл
    const stat = fs.statSync(sourcePath);

    if (!stat.isFile()) {
      throw new Error(`Source is not a file: ${source}`);
    }

    // копируем файл
    fs.copyFileSync(sourcePath, destinationPath);
  } catch (err) {
    console.error(err.message);
  }
}

main();
