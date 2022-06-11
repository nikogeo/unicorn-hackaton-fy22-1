const tools = require("../tools/tools")
const path = require("path");

const dtoIn = [
  {
    gender: "male",
    birthdate: "2000-08-07T00:00:00.000Z",
    name: "Jan",
    surname: "Novák",
    workload: 40
  },
  {
    gender: "female",
    birthdate: "2000-01-03T00:00:00.000Z",
    name: "Jana",
    surname: "Nováková",
    workload: 20
  }
];

async function runFile(file) {
  const dtoOut = await tools.runFile(path.resolve(__dirname, file), dtoIn);
  console.log(JSON.stringify(dtoOut, null, 1));
}

runFile("task.js");
