//@@viewOff:const
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
   * @return {bool} true, false
  **/
  function validate(dtoIn){

  }

  /**
   * vrati workload, hodnoty 10, 20, 30 nebo 40
   * 
   * @return {int} 10, 20, 30 nebo 40
  **/
   function getRandomWorkload(){
  
  }

   /**
   * vrati birthdate podle definovaneho veku
   * @param {number} ageMin min value
   * @param {number} ageMax max value
   * @return {text} datum ve formátu ISO Date-Time YYYY-MM-DDTHH:MM:SSZ (např. 1981-10-28T23:00:00.000Z)
  **/
  function getRandomBirthdate(ageMin, ageMax){

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
function main(dtoIn={}) {

  //validace vstupu
  if(!validate(dtoIn))
  {
    return;
  }

  

  //vytvoreni seznamu osob (iterace podle count)




  //zapsani seznamu osob



  //console.log('test');
}
//@@viewOff:main

class Person {
  constructor(ageMin, ageMax, gender, name, surname) {
    
    // pohlaví, hodnota "male" nebo "female"
    this.gender = gender;

    // jméno
    this.name = name;

    // příjmení
    this.surname = surname;

    // pracovní úvazek - číslo 10, 20, 30 nebo 40
    this.workload = getRandomWorkload();

    // datum narození ve formátu ISO Date-Time YYYY-MM-DDTHH:MM:SSZ (např. 1981-10-28T23:00:00.000Z)
    this.birthdate = getRandomBirthdate(ageMin, ageMax);
  }
}