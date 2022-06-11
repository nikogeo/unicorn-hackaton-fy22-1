const tools = require("../tools/tools")
const path = require("path");

const dtoIn = [
  {
   "gender": "male",
   "name": "Zdeněk",
   "surname": "Beneš",
   "workload": 10,
   "birthdate": "1998-06-27T05:27:16.677Z"
  },
  {
   "gender": "female",
   "name": "Marie",
   "surname": "Lišková",
   "workload": 30,
   "birthdate": "2000-10-09T22:59:02.065Z"
  },
  {
   "gender": "male",
   "name": "Jiří",
   "surname": "Král",
   "workload": 20,
   "birthdate": "1995-11-20T22:06:19.465Z"
  },
  {
   "gender": "female",
   "name": "Lenka",
   "surname": "Černá",
   "workload": 40,
   "birthdate": "1978-06-04T21:16:04.696Z"
  },
  {
   "gender": "female",
   "name": "Zdeňka",
   "surname": "Dvořáková",
   "workload": 30,
   "birthdate": "1991-04-27T08:40:39.885Z"
  },
  {
   "gender": "female",
   "name": "Věra",
   "surname": "Benešová",
   "workload": 40,
   "birthdate": "1996-06-06T03:53:30.661Z"
  },
  {
   "gender": "female",
   "name": "Eva",
   "surname": "Svobodová",
   "workload": 10,
   "birthdate": "1990-10-31T07:58:06.078Z"
  },
  {
   "gender": "male",
   "name": "Martin",
   "surname": "Procházka",
   "workload": 40,
   "birthdate": "2004-03-14T15:56:02.459Z"
  },
  {
   "gender": "male",
   "name": "Jan",
   "surname": "Novák",
   "workload": 10,
   "birthdate": "1996-10-02T23:06:36.511Z"
  },
  {
   "gender": "female",
   "name": "Eva",
   "surname": "Nováková",
   "workload": 20,
   "birthdate": "1975-09-01T10:01:46.065Z"
  },
  {
   "gender": "male",
   "name": "Tomáš",
   "surname": "Liška",
   "workload": 20,
   "birthdate": "1971-10-26T03:00:12.675Z"
  },
  {
   "gender": "male",
   "name": "Václav",
   "surname": "Beneš",
   "workload": 40,
   "birthdate": "1968-03-03T21:40:24.372Z"
  },
  {
   "gender": "male",
   "name": "Zdeněk",
   "surname": "Svoboda",
   "workload": 20,
   "birthdate": "1986-11-25T14:55:37.428Z"
  },
  {
   "gender": "male",
   "name": "Jaroslav",
   "surname": "Nový",
   "workload": 20,
   "birthdate": "2001-03-14T19:15:22.557Z"
  },
  {
   "gender": "female",
   "name": "Lucie",
   "surname": "Mašková",
   "workload": 30,
   "birthdate": "2004-01-20T16:43:16.705Z"
  },
  {
   "gender": "female",
   "name": "Lenka",
   "surname": "Soukupová",
   "workload": 20,
   "birthdate": "1987-12-24T12:03:34.727Z"
  },
  {
   "gender": "male",
   "name": "František",
   "surname": "Nový",
   "workload": 10,
   "birthdate": "2003-02-23T23:22:58.884Z"
  },
  {
   "gender": "female",
   "name": "Marie",
   "surname": "Procházková",
   "workload": 10,
   "birthdate": "1970-01-03T02:54:59.138Z"
  },
  {
   "gender": "female",
   "name": "Alena",
   "surname": "Benešová",
   "workload": 30,
   "birthdate": "1996-05-26T11:19:42.657Z"
  },
  {
   "gender": "female",
   "name": "Lucie",
   "surname": "Nová",
   "workload": 20,
   "birthdate": "2002-08-13T12:33:20.953Z"
  },
  {
   "gender": "female",
   "name": "Kateřina",
   "surname": "Nováková",
   "workload": 20,
   "birthdate": "1981-06-16T16:31:35.269Z"
  },
  {
   "gender": "female",
   "name": "Lucie",
   "surname": "Fialová",
   "workload": 20,
   "birthdate": "1996-09-28T12:09:33.358Z"
  },
  {
   "gender": "male",
   "name": "Václav",
   "surname": "Svoboda",
   "workload": 40,
   "birthdate": "1969-02-17T03:41:16.249Z"
  },
  {
   "gender": "male",
   "name": "Pavel",
   "surname": "Liška",
   "workload": 30,
   "birthdate": "1968-06-28T09:52:31.257Z"
  },
  {
   "gender": "male",
   "name": "Miroslav",
   "surname": "Beneš",
   "workload": 10,
   "birthdate": "1994-02-27T22:23:44.851Z"
  },
  {
   "gender": "female",
   "name": "Jaroslava",
   "surname": "Dvořáková",
   "workload": 40,
   "birthdate": "1998-09-09T11:15:44.010Z"
  },
  {
   "gender": "male",
   "name": "Jaroslav",
   "surname": "Soukup",
   "workload": 10,
   "birthdate": "1986-09-05T04:27:18.491Z"
  },
  {
   "gender": "male",
   "name": "Miroslav",
   "surname": "Černý",
   "workload": 10,
   "birthdate": "1987-01-28T09:13:43.713Z"
  },
  {
   "gender": "female",
   "name": "Lenka",
   "surname": "Kučerová",
   "workload": 30,
   "birthdate": "2000-04-30T15:01:46.600Z"
  },
  {
   "gender": "female",
   "name": "Zdeňka",
   "surname": "Králová",
   "workload": 30,
   "birthdate": "1995-06-16T04:28:40.257Z"
  },
  {
   "gender": "female",
   "name": "Věra",
   "surname": "Procházková",
   "workload": 20,
   "birthdate": "1969-06-01T08:00:50.523Z"
  },
  {
   "gender": "male",
   "name": "Pavel",
   "surname": "Černý",
   "workload": 20,
   "birthdate": "1995-02-05T05:30:09.459Z"
  },
  {
   "gender": "female",
   "name": "Marie",
   "surname": "Benešová",
   "workload": 10,
   "birthdate": "1977-07-13T00:54:59.334Z"
  },
  {
   "gender": "female",
   "name": "Jana",
   "surname": "Fialová",
   "workload": 40,
   "birthdate": "1991-10-17T15:48:36.665Z"
  },
  {
   "gender": "female",
   "name": "Petra",
   "surname": "Dvořáková",
   "workload": 30,
   "birthdate": "1994-04-05T10:42:02.434Z"
  },
  {
   "gender": "male",
   "name": "Jiří",
   "surname": "Fiala",
   "workload": 10,
   "birthdate": "1991-04-01T13:33:23.576Z"
  },
  {
   "gender": "female",
   "name": "Jitka",
   "surname": "Králová",
   "workload": 30,
   "birthdate": "1994-09-04T15:12:19.071Z"
  },
  {
   "gender": "female",
   "name": "Anna",
   "surname": "Benešová",
   "workload": 20,
   "birthdate": "2000-09-15T11:53:06.144Z"
  },
  {
   "gender": "female",
   "name": "Zdeňka",
   "surname": "Procházková",
   "workload": 20,
   "birthdate": "1998-08-09T22:10:05.125Z"
  },
  {
   "gender": "male",
   "name": "Miroslav",
   "surname": "Kučera",
   "workload": 10,
   "birthdate": "1993-04-26T12:10:04.088Z"
  },
  {
   "gender": "female",
   "name": "Marie",
   "surname": "Nová",
   "workload": 10,
   "birthdate": "1973-06-10T05:49:38.254Z"
  },
  {
   "gender": "male",
   "name": "Karel",
   "surname": "Kučera",
   "workload": 10,
   "birthdate": "1999-09-09T08:55:20.261Z"
  },
  {
   "gender": "male",
   "name": "Petr",
   "surname": "Liška",
   "workload": 30,
   "birthdate": "1968-05-29T21:09:20.811Z"
  },
  {
   "gender": "female",
   "name": "Lenka",
   "surname": "Procházková",
   "workload": 30,
   "birthdate": "1980-03-05T02:17:57.746Z"
  },
  {
   "gender": "male",
   "name": "Zdeněk",
   "surname": "Nový",
   "workload": 10,
   "birthdate": "1978-06-29T12:25:20.482Z"
  },
  {
   "gender": "male",
   "name": "Karel",
   "surname": "Svoboda",
   "workload": 20,
   "birthdate": "1987-06-19T19:03:43.435Z"
  },
  {
   "gender": "female",
   "name": "Kateřina",
   "surname": "Kučerová",
   "workload": 40,
   "birthdate": "1980-12-20T01:40:34.114Z"
  },
  {
   "gender": "male",
   "name": "Václav",
   "surname": "Král",
   "workload": 30,
   "birthdate": "1986-07-14T04:02:05.304Z"
  },
  {
   "gender": "male",
   "name": "Jiří",
   "surname": "Mašek",
   "workload": 10,
   "birthdate": "1975-03-09T19:49:46.902Z"
  },
  {
   "gender": "male",
   "name": "Karel",
   "surname": "Liška",
   "workload": 30,
   "birthdate": "1999-10-27T23:23:16.431Z"
  }
 ];

async function runFile(file) {
  const dtoOut = await tools.runFile(path.resolve(__dirname, file), dtoIn);
  console.log(JSON.stringify(dtoOut, null, 1));
}

runFile("task.js");
