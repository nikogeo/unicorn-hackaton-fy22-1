//@@viewOff:const
const FEMALE_NAMES = [
  "Marie",
  "Jana",
  "Anna",
  "Eva",
  "Jaroslava",
  "Alena",
  "Věra",
  "Lucie",
  "Lenka",
  "Kateřina",
  "Petra",
  "Zdeňka",
  "Jitka",
];
const FEMALE_SURNAMES = [
  "Černá",
  "Nováková",
  "Svobodová",
  "Nová",
  "Benešová",
  "Soukupová",
  "Králová",
  "Fialová",
  "Kučerová",
  "Mašková",
  "Dvořáková",
  "Procházková",
  "Lišková",
];
const MALE_NAMES = [
  "Jan",
  "Václav",
  "Jiří",
  "Josef",
  "Petr",
  "Pavel",
  "Jaroslav",
  "Martin",
  "Tomáš",
  "Miroslav",
  "Karel",
  "František",
  "Zdeněk",
];
const MALE_SURNAMES = [
  "Černý",
  "Novák",
  "Svoboda",
  "Nový",
  "Beneš",
  "Soukup",
  "Mašek",
  "Král",
  "Fiala",
  "Kučera",
  "Dvořák",
  "Procházka",
  "Liška",
];
const LIST_LENGTH = 12;
//@@viewOff:const

//@@viewOn:helpers
/**
 * Returns random number in range <min,max>
 *
 * @param {number} min min value
 * @param {number} max max value
 * @return {number} random number
 **/
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
   * slouzi na overeni vstupu, jestli ma definovane datove typy, vlastnosti a definovane rozsahy
   * 
   * @param {dtoIn} vstupni hodnoty k validaci
   * {
    "count": vetsi nez nula, mensi nez 10000,
    "age": {
      "min": nejmene 18,
      "max": nejvic 70
    }
  }
   * @return {bool} true, false
  **/
function validate(dtoIn) {
  if (dtoIn == undefined || dtoIn == null) {
    throw "chybne definovany pozadavek";
  } else if (
    dtoIn.count == undefined ||
    dtoIn.count == null ||
    typeof dtoIn.count != "number"
  ) {
    throw "count není číslo";
  } else if (dtoIn["count"] <= 0 && dtoIn["count"] > 1000) {
    throw "count není v platném rozmezí (1-1000)";
  } else if (
    dtoIn[("age", "min")] == undefined ||
    dtoIn[("age", "min")] == null ||
    typeof dtoIn[("age", "min")] != "number"
  ) {
    throw "Minimální věk není číslo";
  } else if (dtoIn[(age, min)] < 18) {
    throw "Minimální věk není platný (menší než 18)";
  } else if (
    dtoIn[(age, max)] == undefined ||
    dtoIn[(age, max)] == null ||
    typeof dtoIn[(age, max)] != "number"
  ) {
    throw "Maximální věk není číslo";
  } else if (dtoIn[(age, max)] > 70) {
    throw "Maximální věk není platný (více než 70let)";
  }
}

/**
 * vrati workload, hodnoty 10, 20, 30 nebo 40
 *
 * @return {int} 10, 20, 30 nebo 40
 **/
function getRandomWorkload() {
  const workloads = [10, 20, 30, 40];

  const random = Math.floor(Math.random() * workloads.length);
  console.log(random, workloads[random]);
  return workloads[random];
}

/**
 * slouzi k vytvoreni zakladu osoby
 *
 * @return {Person}
 **/
function getRandomPerson() {
  let randomPerson;
  if (identifyMaleFemale()) {
    return new Person("male", getRandomName(true), getRandomSurname(true));
  } else {
    return new Person("female", getRandomName(false), getRandomSurname(false));
  }
}

function getRandomName(isMale) {
  let randomNumber = getRandom(0, LIST_LENGTH);
  if (isMale) {
    return MALE_NAMES[randomNumber];
  } else {
    return FEMALE_NAMES[randomNumber];
  }
}

function getRandomSurname(isMale) {
  let randomNumber = getRandom(0, LIST_LENGTH);
  if (isMale) {
    return MALE_SURNAMES[randomNumber];
  } else {
    return FEMALE_SURNAMES[randomNumber];
  }
}

function identifyMaleFemale() {
  return Math.random() < 0.5;
}

/**
 * vrati birthdate podle definovaneho veku
 * @param {number} ageMin min value
 * @param {number} ageMax max value
 * @return {text} datum ve formátu ISO Date-Time YYYY-MM-DDTHH:MM:SSZ (např. 1981-10-28T23:00:00.000Z)
 **/
function getRandomBirthdate(ageMin, ageMax) {
  var endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() - ageMin);

  var startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - ageMax);

  var selectedDate = getRandomDate(startDate, endDate);
  //var selectedDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - endDate.getTime()));
  return selectedDate.toISOString();
}

function getRandomDate(from, to) {
  from = from.getTime();
  to = to.getTime();
  return new Date(from + Math.random() * (to - from));
}

//@@viewOff:helpers

//@@viewOn:main
/**
 * @param {object} dtoIn input data
 * {
    "count": 50,
    "age": {
      "min": 19,
      "max": 35
    }
  }
 * @return {array} output data
**/
function main(dtoIn = {}) {
  console.log("start");
  //validace vstupu
  if (!validate(dtoIn)) {
    console.log("validace neuspesna");
    return;
  }

  console.log("validace uspesna zacinam generovat seznam");

  var dtoOut = [];
  //vytvoreni seznamu osob (iterace podle count)
  for (var i = 0; i < dtoIn.count; i++) {
    let person = getRandomPerson();
    person.generateDetails(dtoIn.age.min, dtoIn.age.max);
    dtoOut.push(person);
    console.log(i);
  }

  console.log("seznam vytvoren, hotovo");
  //zapsani seznamu osob
  return dtoOut;
}
//@@viewOff:main

class Person {
  generateDetails(ageMin, ageMax) {
    // pracovní úvazek - číslo 10, 20, 30 nebo 40
    this.workload = getRandomWorkload();

    // datum narození ve formátu ISO Date-Time YYYY-MM-DDTHH:MM:SSZ (např. 1981-10-28T23:00:00.000Z)
    this.birthdate = getRandomBirthdate(ageMin, ageMax);
  }

  constructor(gender, name, surname) {
    // pohlaví, hodnota "male" nebo "female"
    this.gender = gender;

    // jméno
    this.name = name;

    // příjmení
    this.surname = surname;
  }
}

main();
