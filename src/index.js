'use-strict';
const database = require('./database.json');

class Quiz {
  constructor(options = {}){

    if (typeof options !== 'object'){
      throw new TypeError(`Quiz instance parameter expected object, received ${typeof options}.`)
    };

    this._db = [...getEntries(options)];
    this.questionNumber = null;
  };

  /**
  * Returns a quiz object from this instance
  * @param {options} option The option for this command
  * @param {options.difficulty} difficulty The quiz difficulty
  * @param {options.image} image Whether the result must contain an image or not
  * @returns {?Quiz} A quiz object or error object
  */
  getEntry(options = {}){
    if (typeof options !== 'object'){
      throw new TypeError(`getEntry() parameter expected object, received ${typeof options}.`)
    };

    const entries = this.getEntries(options);

    if (entries.error){
      return entries;
    };

    const entry = entries[Math.floor(Math.random() * entries.length)];
    const index = this._db.findIndex(x => x.id === entry?.id);

    this.questionNumber++;

    return this._db.splice(index, 1)?.[0] || { error: 'Exhausted entries.' };
  };

  /**
  * Returns an array of quiz object from this instance
  * @param {options} option The option for this command
  * @param {options.difficulty} difficulty The quiz difficulty
  * @param {options.image} image Whether the result must contain an image or not
  * @returns {?Quiz[]} An array of quiz objects or error object
  */
  getEntries(options = {}){
    if (typeof options !== 'object'){
      throw new TypeError(`getEntries() parameter expected object, received ${typeof options}`)
    };

    if (!('difficulty' in options) && !('image' in options)){
      return this._db;
    };

    if (options.difficulty?.match(/easy|medium|hard/i)){
      options.difficulty = options.difficulty.match(/easy|medium|hard/i)[0];
    } else {
      options.difficulty = 'all'
    };

    if (options.image === true){
      options.image === true;
    } else {
      options.image = false;
    };

    if (!this._db.length){
      return { error: 'Exhausted entries.' };
    };

    const data = this._db.filter((entry) => {
      const difficulty = entry.difficulty.toLowerCase();
      const image = !!entry.image;
      const conditions = [
        options.difficulty === 'all' ? true : options.difficulty === difficulty,
        options.image === undefined ? true : Boolean(image) === options.image
      ];

      return conditions[0] && conditions[1];
    });

    return data;
  };

  /**
  * Adds an array of quiz object from this instance
  * @param {entries[]} entries An array of quiz object
  * @returns {Quiz} This instance
  */
  addEntries(entries){

    if (!Array.isArray(entries)){
      throw new TypeError(`addEntries() parameter expected array, received ${typeof entries}.`);
    };

    for (const arr of entries){
      if (typeof arr !== 'object')
      throw new TypeError(`addEntries() array expected Quiz object, received ${typeof arr}.`);
    };

    entries.forEach(entry => entry.custom = true);

    this._db.push(...entries);

    return this;
  };

  reload(options = {}){
    if (typeof options !== 'object'){
      throw new TypeError(`Quiz instance parameter expected object, received ${typeof options}.`)
    };

    // Empty the database first
    this._db = [];

    this._db = [...getEntries(options)];

    return this;
  };

  /**
  * Returns the size of the current database in this instance
  * @private
  * @returns {Quiz} This instance
  */
  get size(){
    return this._db.length
  }
};


function getEntry(options = {}){

  if (typeof options !== 'object'){
    throw new TypeError(`getEntry() parameter expected object, received ${typeof options}.`)
  };

  const entries = getEntries(options);

  return entries[Math.floor(Math.random() * entries.length)];
};

function getEntries(options = {}){

  if (typeof options !== 'object'){
    throw new TypeError(`getEntries() parameter expected object, received ${typeof options}.`)
  };

  if (!('difficulty' in options) && !('image' in options)){
    return database;
  };

  if (options.difficulty?.match(/easy|medium|hard/i)){
    options.difficulty = options.difficulty.match(/easy|medium|hard/i)[0];
  } else {
    options.difficulty = 'all'
  };

  if (options.image === true){
    options.image === true;
  } else {
    options.image = false;
  };

  const data = database.filter((entry) => {
    const difficulty = entry.difficulty.toLowerCase();
    const image = !!entry.image;
    const conditions = [
      options.difficulty === 'all' ? true : options.difficulty === difficulty,
      options.image === undefined ? true : Boolean(image) === options.image
    ];

    return conditions[0] && conditions[1];
  });

  return data;
};

module.exports = { getEntry, Quiz };
