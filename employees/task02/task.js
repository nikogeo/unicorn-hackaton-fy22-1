//@@viewOff:const
//@@viewOff:const

//@@viewOn:helpers

function compare(a, b) {
  if (a.workload < b.workload) {
    return -1;
  }
  if (a.workload > b.workload) {
    return 1;
  }
  return 0;
}

/**
 * slouzi na overeni vstupu, jestli ma definovane datove typy, vlastnosti a definovane rozsahy
 * @param {dtoIn} vstupni hodnoty k validaci
 * @return {bool} true, false
 **/
function validate(dtoIn) {
  if (dtoIn.gender != "male" || dtoIn.gender != "female"){
    throw 'Chybne zadane pohlavi.'
  } else if (dtoIn.workload == undefined || dtoIn.workload == null || typeof dtoIn.workload != "number") {
    throw "chybne definovany pozadavek: workload"
  } else if (dtoIn.name == undefined || dtoIn.name == null || typeof dtoIn.name != "string"){
    throw "chybne definovany pozadavek: name"
  } else if (dtoIn.surname == undefined || dtoIn.surname == null || typeof dtoIn.surname != "string"){
    throw "chybne definovany pozadavek: surname"
  }
 return true;
}

function generateWorkloadDetails(dtoIn, i, dtoOut) {
  switch (dtoIn[i].workload) {
    case 10:
      dtoOut.workload10++;
      break;
    case 20:
      dtoOut.workload20++;
      break;
    case 30:
      dtoOut.workload30++;
      break;
    case 40:
      dtoOut.workload40++;
      break;
  }
}

function median(values) {
  values.sort(function (a, b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
}

//@@viewOff:helpers

//@@viewOn:main
/**
 * @param {object} dtoIn input data
 * @return {object} output data
 **/
function main(dtoIn = []) {
  console.log("start");
  //validace vstupu
  if (!validate(dtoIn)) {
    console.log("validace neuspesna");
    return;
  }

  console.log("validace uspesna zacinam generovat seznam");

  let minBirthDate = new Date();
  let maxBirthDate = new Date(-8640000000000000);
  let totalAge = 0;
  let medianAge = [];
  let medianWorkload = [];
  let totalWorkloadWomen = 0;
  let numberOfWomen = 0;

  let dtoOut = {
    total: dtoIn.length, // celkový počet zaměstanců
    workload10: 0, // počet zaměstanců s úvazkem 10 h
    workload20: 0, // počet zaměstanců s úvazkem 20 h
    workload30: 0, // počet zaměstanců s úvazkem 30 h
    workload40: 0, // počet zaměstanců s úvazkem 40 h
    averageAge: 0, // průměrný věk
    minAge: 0, // věk nejmladšího
    maxAge: 0, // věk nejstaršího
    medianAge: 0, // medián věku
    medianWorkload: 0, // medián výše úvazku
    averageWomenWorkload: 0, // průměrná výše pracovního úvazku žen
    sortedByWorkload: [
      // seznam zaměstanců seřazený podle pracovního úvazku
      // {
      //     name: "...",      // jméno
      //     surname: "...",   // přijmení
      //     birthdate: "...", // datum narození ve formátu ISO Date-Time YYYY-MM-DDTHH:MM:SSZ (např. 1981-10-28T23:00:00.000Z)
      //     gender: "...",    // pohlaví, hodnota male | female
      //     workload: 0       // pracovní úvazek - číslo 10, 20, 30 nebo 40
      // }
    ],
  };

  for (var i = 0; i < dtoIn.length; i++) {
    //vypocet workloadu
    generateWorkloadDetails(dtoIn, i, dtoOut);

    //vypocet min age
    var age = new Date(dtoIn[i].birthdate);
    if (age < minBirthDate) {
      minBirthDate = age;
      dtoOut.maxAge = new Date().getFullYear() - age.getFullYear();
    }

    if (age > maxBirthDate) {
      maxBirthDate = age;
      dtoOut.minAge = new Date().getFullYear() - age.getFullYear();
    }

    //vypocet total age
    var currentAge = new Date().getFullYear() - age.getFullYear();
    totalAge += currentAge;

    //vypocet median age
    medianAge.push(currentAge);

    //vypocet median workload
    medianWorkload.push(dtoIn[i].workload);

    //vypocet prumerny workload zen
    if ((dtoIn[i].gender = "female")) {
      totalWorkloadWomen += dtoIn[i].workload;
      numberOfWomen++;
    }

    //serazeni podle workloadu
  }

  //median age
  dtoOut.medianAge = median(medianAge);

  //median workload
  dtoOut.medianWorkload = median(medianWorkload);

  //avg age
  dtoOut.averageAge = totalAge / dtoIn.length;

  //avr workload zen
  dtoOut.averageWomenWorkload = totalWorkloadWomen / numberOfWomen;

  //serazeni
  dtoOut.sortedByWorkload = dtoIn.sort(compare);

  return dtoOut;
}
//@@viewOff:main

main();
