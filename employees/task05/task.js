//@@viewOff:const
//@@viewOff:const

//@@viewOn:helpers
function validate(dtoIn) {
    // if(dtoIn == undefined || null)
    // {
    //   throw 'Incorrect request format';
    // }


    //TODO: tady doplnit
    return true;
}
//@@viewOff:helpers

//@@viewOn:main
/**
 * @param {object} dtoIn input data
 * @return {object} output data
**/
function main(dtoIn=[]) {
    console.log('start');
    //validace vstupu
    if (!validate(dtoIn)) {
        console.log('validace neuspesna');
        return;
    }

    console.log('validace uspesna zacinam generovat seznam');

    let dtoOut = [];
    var currentDate = new Date();

    for (var i = 0; i < dtoIn.length; i++) {
        var birthdate = new Date(dtoIn[i].birthdate);
        if(birthdate.getMonth() == currentDate.getMonth())
        {
            dtoOut.push(dtoIn[i]);
        }
    }

    return dtoOut;
}
//@@viewOff:main