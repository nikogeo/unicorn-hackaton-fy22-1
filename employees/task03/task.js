//@@viewOff:const
//@@viewOff:const

//@@viewOn:helpers
function compare( a, b ) {
    if ( a.label < b.label ){
      return -1;
    }
    if ( a.label > b.label ){
      return 1;
    }
    return 0;
  }  

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

function pieChartDataGeneration(dtoIn, i, workload10, workload20, workload30, workload40) {
    switch (dtoIn[i].workload) {
        case 10:
            workload10++;
            break;
        case 20:
            workload20++;
            break;
        case 30:
            workload30++;
            break;
        case 40:
            workload40++;
            break;
    }
    return { workload10, workload20, workload30, workload40 };
}

function pieChartDataInsert(dtoOut, workload10, workload20, workload30, workload40) {
    dtoOut.pieChart.push({
        label: "10",
        value: workload10
    });

    dtoOut.pieChart.push({
        label: "20",
        value: workload20
    });

    dtoOut.pieChart.push({
        label: "30",
        value: workload30
    });

    dtoOut.pieChart.push({
        label: "40",
        value: workload40
    });
}

function stackedBarChartDataInsert(dtoOut, stackedWorkloadMale10, stackedWorkloadFemale10, stackedWorkloadMale20, stackedWorkloadFemale30, stackedWorkloadMale30, stackedWorkloadMale40, stackedWorkloadFemale40) {
    dtoOut.stackedBarChart.push({
        label: "10",
        valueMale: stackedWorkloadMale10,
        valueFemale: stackedWorkloadFemale10
    });

    dtoOut.stackedBarChart.push({
        label: "20",
        valueMale: stackedWorkloadMale20,
        valueFemale: stackedWorkloadFemale30
    });

    dtoOut.stackedBarChart.push({
        label: "30",
        valueMale: stackedWorkloadMale30,
        valueFemale: stackedWorkloadFemale30
    });

    dtoOut.stackedBarChart.push({
        label: "40",
        valueMale: stackedWorkloadMale40,
        valueFemale: stackedWorkloadFemale40
    });
}

function stackedBarChartDataPreparation(dtoIn, i, stackedWorkloadMale10, stackedWorkloadFemale10, stackedWorkloadMale20, stackedWorkloadFemale20, stackedWorkloadMale30, stackedWorkloadFemale30, stackedWorkloadMale40, stackedWorkloadFemale40) {
    switch (dtoIn[i].workload) {
        case 10:
            if (dtoIn[i].gender == 'male')
                stackedWorkloadMale10++;
            else if (dtoIn[i].gender == 'female')
                stackedWorkloadFemale10++;
            break;
        case 20:
            if (dtoIn[i].gender == 'male')
                stackedWorkloadMale20++;
            else if (dtoIn[i].gender == 'female')
                stackedWorkloadFemale20++;
            break;
        case 30:
            if (dtoIn[i].gender == 'male')
                stackedWorkloadMale30++;
            else if (dtoIn[i].gender == 'female')
                stackedWorkloadFemale30++;
            break;
        case 40:
            if (dtoIn[i].gender == 'male')
                stackedWorkloadMale40++;
            else if (dtoIn[i].gender == 'female')
                stackedWorkloadFemale40++;
            break;
    }
    return { stackedWorkloadMale10, stackedWorkloadFemale10, stackedWorkloadMale20, stackedWorkloadFemale20, stackedWorkloadMale30, stackedWorkloadFemale30, stackedWorkloadMale40, stackedWorkloadFemale40 };
}

function barChartDataPreparation(dtoIn, i, dtoOut) {
    if (dtoIn[i].gender == "male") {
        var age = new Date(dtoIn[i].birthdate);
        var currentAge = new Date().getFullYear() - age.getFullYear();

        var result = dtoOut.barChart.filter(obj => {
            return obj.label === currentAge.toString();
        });
        if (result == undefined || result == null || result.length == 0) {
            dtoOut.barChart.push({
                label: currentAge.toString(),
                value: 1
            });
        }

        else {
            result[0].value++;
        }
    }
}

function sortAllChartData(dtoOut) {
    dtoOut.barChart = dtoOut.barChart.sort(compare);
    dtoOut.stackedBarChart = dtoOut.stackedBarChart.sort(compare);
    dtoOut.pieChart = dtoOut.pieChart.sort(compare);
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
        pieChart: [],
        barChart: [],
        stackedBarChart: []
    };

    let workload10 = 0,           // počet zaměstanců s úvazkem 10 h
        workload20 = 0,                 // počet zaměstanců s úvazkem 20 h
        workload30 = 0,                // počet zaměstanců s úvazkem 30 h
        workload40 = 0;                // počet zaměstanců s úvazkem 40 h

    let stackedWorkloadMale10 = 0,
    stackedWorkloadMale20 = 0,
    stackedWorkloadMale30 = 0,
    stackedWorkloadMale40 = 0,
    stackedWorkloadFemale10 = 0,
    stackedWorkloadFemale20 = 0,
    stackedWorkloadFemale30 = 0,
    stackedWorkloadFemale40 = 0;

    for (var i = 0; i < dtoIn.length; i++) {
        //vlozeni detailu workloadu pro prvni graf
        ({ workload10, workload20, workload30, workload40 } = pieChartDataGeneration(dtoIn, i, workload10, workload20, workload30, workload40));

        //vlozeni detailu pro cetnost veku muzu
        barChartDataPreparation(dtoIn, i, dtoOut);
        

        //vlozeni pracovniho uvazku muzu a zen
        ({ stackedWorkloadMale10, stackedWorkloadFemale10, stackedWorkloadMale20, stackedWorkloadFemale20, stackedWorkloadMale30, stackedWorkloadFemale30, stackedWorkloadMale40, stackedWorkloadFemale40 } = 
            stackedBarChartDataPreparation(dtoIn, i, stackedWorkloadMale10, stackedWorkloadFemale10, stackedWorkloadMale20, stackedWorkloadFemale20, stackedWorkloadMale30, stackedWorkloadFemale30, stackedWorkloadMale40, stackedWorkloadFemale40));
    }

    //vlozeni dat kolacoveho grafu
    pieChartDataInsert(dtoOut, workload10, workload20, workload30, workload40);

    //vlozeni dat stacked bar chart
    stackedBarChartDataInsert(dtoOut, stackedWorkloadMale10, stackedWorkloadFemale10, stackedWorkloadMale20, stackedWorkloadFemale30, stackedWorkloadMale30, stackedWorkloadMale40, stackedWorkloadFemale40);

    sortAllChartData(dtoOut);

    return dtoOut;
}
//@@viewOff:main