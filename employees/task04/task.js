//@@viewOff:const
//@@viewOff:const

//@@viewOn:helpers
function compare(a, b) {
    if (a.value > b.value) {
        return -1;
    }
    if (a.value < b.value) {
        return 1;
    }
    return 0;
}

function validate(dtoIn) {
    // if(dtoIn == undefined || null)
    // {
    //   throw 'Incorrect request format';
    // }


    //TODO: tady doplnit
    return true;
}

function sortAllChartData(dtoOut) {
    dtoOut.chartData.all = dtoOut.chartData.all.sort(compare);
    dtoOut.chartData.male = dtoOut.chartData.male.sort(compare);
    dtoOut.chartData.female = dtoOut.chartData.female.sort(compare);
    dtoOut.chartData.femalePartTime = dtoOut.chartData.femalePartTime.sort(compare);
    dtoOut.chartData.maleFullTime = dtoOut.chartData.maleFullTime.sort(compare);
}
//@@viewOff:helpers

//@@viewOn:main
/**
 * @param {object} dtoIn input data
 * @return {object} output data
**/
function main(dtoIn = []) {
    console.log('start');
    //validace vstupu
    if (!validate(dtoIn)) {
        console.log('validace neuspesna');
        return;
    }

    console.log('validace uspesna zacinam generovat seznam');

   
    let dtoOut = {
        names: {
            all: {},
            male: {},
            female: {},
            femalePartTime: {},
            maleFullTime: {}
        },
        chartData: { // data pro grafy
            all: [],
            male: [],
            female: [],
            femalePartTime: [],
            maleFullTime: []
        }
    };

    for (var i = 0; i < dtoIn.length; i++) {
        // jména a jejich četnost všech zaměstnanců  
        CountAllNames(dtoOut, dtoIn, i);

        // jména mužů a jejich četnost 
        CountMaleNames(dtoIn, i, dtoOut);

        // jména žen a jejich četnost
        CountFemaleNames(dtoIn, i, dtoOut);

        // jména žen se zkráceným úvazkem a jejich četnost 
        CountFemalePartTimeNames(dtoIn, i, dtoOut);

        // jména mužů s plným úvazkem a jejich četnost 
        CountMaleFullTimeNames(dtoIn, i, dtoOut);
    }

    //data preparation
    for (const property in dtoOut.names.all) {
        dtoOut.chartData.all.push({
            label: `${property}`,
            value: `${dtoOut.names.all[property]}`
        });
      }

      for (const property in dtoOut.names.male) {
        dtoOut.chartData.male.push({
            label: `${property}`,
            value: `${dtoOut.names.male[property]}`
        });
      }
      
      for (const property in dtoOut.names.female) {
        dtoOut.chartData.female.push({
            label: `${property}`,
            value: `${dtoOut.names.female[property]}`
        });
      }

      for (const property in dtoOut.names.femalePartTime) {
        dtoOut.chartData.femalePartTime.push({
            label: `${property}`,
            value: `${dtoOut.names.femalePartTime[property]}`
        });
      }

      for (const property in dtoOut.names.maleFullTime) {
        dtoOut.chartData.maleFullTime.push({
            label: `${property}`,
            value: `${dtoOut.names.maleFullTime[property]}`
        });
      }

      sortAllChartData(dtoOut);

    return dtoOut;
}

function CountMaleFullTimeNames(dtoIn, i, dtoOut) {
    if (dtoIn[i].gender == "male" && dtoIn[i].workload == 40) {
        if (dtoOut.names.maleFullTime.hasOwnProperty(dtoIn[i].name)) {
            dtoOut.names.maleFullTime[dtoIn[i].name]++;
        }
        else {
            dtoOut.names.maleFullTime[dtoIn[i].name] = 1;
        }
    }
}

function CountFemalePartTimeNames(dtoIn, i, dtoOut) {
    if (dtoIn[i].gender == "female" && dtoIn[i].workload < 40) {
        if (dtoOut.names.femalePartTime.hasOwnProperty(dtoIn[i].name)) {
            dtoOut.names.femalePartTime[dtoIn[i].name]++;
        }
        else {
            dtoOut.names.femalePartTime[dtoIn[i].name] = 1;
        }
    }
}

function CountFemaleNames(dtoIn, i, dtoOut) {
    if (dtoIn[i].gender == "female") {
        if (dtoOut.names.female.hasOwnProperty(dtoIn[i].name)) {
            dtoOut.names.female[dtoIn[i].name]++;
        }
        else {
            dtoOut.names.female[dtoIn[i].name] = 1;
        }
    }
}

function CountMaleNames(dtoIn, i, dtoOut) {
    if (dtoIn[i].gender == "male") {
        if (dtoOut.names.male.hasOwnProperty(dtoIn[i].name)) {
            dtoOut.names.male[dtoIn[i].name]++;
        }
        else {
            dtoOut.names.male[dtoIn[i].name] = 1;
        }
    }
}

function CountAllNames(dtoOut, dtoIn, i) {
    if (dtoOut.names.all.hasOwnProperty(dtoIn[i].name)) {
        dtoOut.names.all[dtoIn[i].name]++;
    }
    else {
        dtoOut.names.all[dtoIn[i].name] = 1;
    }
}
//@@viewOff:main