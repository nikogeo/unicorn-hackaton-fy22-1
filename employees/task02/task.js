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
    for (var i = 0; i < dtoIn.length; i++) {
        if (dtoIn[i].gender != "male" && dtoIn[i].gender != "female") {
            throw 'Chybne zadane pohlavi.'
        } else if (dtoIn[i].workload == undefined || dtoIn[i].workload == null || typeof dtoIn[i].workload != "number" && workload != 10 && workload != 20 && workload != 30 && workload != 40  ) {
            throw "chybne definovany pozadavek: workload"
        } else if (dtoIn[i].name == undefined || dtoIn[i].name == null || typeof dtoIn[i].name != "string") {
            throw "chybne definovany pozadavek: name"
        } else if (dtoIn[i].surname == undefined || dtoIn[i].surname == null || typeof dtoIn[i].surname != "string") {
            throw "chybne definovany pozadavek: surname"
        }
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
        total: dtoIn.length, // celkov?? po??et zam??stanc??
        workload10: 0, // po??et zam??stanc?? s ??vazkem 10 h
        workload20: 0, // po??et zam??stanc?? s ??vazkem 20 h
        workload30: 0, // po??et zam??stanc?? s ??vazkem 30 h
        workload40: 0, // po??et zam??stanc?? s ??vazkem 40 h
        averageAge: 0, // pr??m??rn?? v??k
        minAge: 0, // v??k nejmlad????ho
        maxAge: 0, // v??k nejstar????ho
        medianAge: 0, // medi??n v??ku
        medianWorkload: 0, // medi??n v????e ??vazku
        averageWomenWorkload: 0, // pr??m??rn?? v????e pracovn??ho ??vazku ??en
        sortedByWorkload: [
            // seznam zam??stanc?? se??azen?? podle pracovn??ho ??vazku
            // {
            //     name: "...",      // jm??no
            //     surname: "...",   // p??ijmen??
            //     birthdate: "...", // datum narozen?? ve form??tu ISO Date-Time YYYY-MM-DDTHH:MM:SSZ (nap??. 1981-10-28T23:00:00.000Z)
            //     gender: "...",    // pohlav??, hodnota male | female
            //     workload: 0       // pracovn?? ??vazek - ????slo 10, 20, 30 nebo 40
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
