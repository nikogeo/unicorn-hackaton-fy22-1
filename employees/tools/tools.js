const fs = require("fs");
const path = require("path");

async function _copyFile(file) {
  let fileArray = file.split(".");
  fileArray.pop();
  const destinationFileName = `${fileArray.join(".")}-exec.js`
  fs.copyFileSync(file, destinationFileName);
  return destinationFileName;
}

async function _modifyFile(file) {
  let fileBody = fs.readFileSync(file, "utf8").toString();
  fileBody += "\n";
  fileBody += "\n";
  fileBody += "module.exports = { main };";
  fileBody += "\n";
  fs.writeFileSync(file, fileBody, "utf-8");
}

async function _deleteFile(file) {
  fs.unlinkSync(file);
}


async function runFile(file, dtoIn) {
  const tempFile = await _copyFile(file);
  await _modifyFile(tempFile);
  const task = require(path.resolve(__dirname, tempFile))
  const dtoOut = await task.main(dtoIn);
  _deleteFile(tempFile);
  return dtoOut;
}

module.exports = { runFile };