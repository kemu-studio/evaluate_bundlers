const { emitAnnConsoleLog, emitAnnConsoleLog2 } = require('./libAnn.js');
const { emitBobConsoleLog } = require('./libBob.js')
const { CesarClass } = require('./libCesar.js')

emitAnnConsoleLog();
emitAnnConsoleLog2();
emitBobConsoleLog();
const cesar = new CesarClass()
cesar.doAnnStuff()


/**
 * [topic id="Objects"]
 */

 const {requireNodeOrBrowser, window} = require('@kmu/require-node-or-browser')
 const K = requireNodeOrBrowser('@kmu/kcore', window.K)

 const GlobalObject = Object

 K.Object = class K_Object {
   static createPrototype(pattern) {
     return new K.Prototype(pattern)
   }

   static create(prototype, options) {
     return prototype.create(options)
   }

   /**
    * Merge two (key based) maps.
    *
    * [frameWarning]
    * This function modify target parameter. Use deepClone() or
    * shallowCopy() if you need to keep original map.
    * [/]
    *
    * [frameExampleUsage]
    * const targetObj = {color: 'red', value: 3.14}
    * const sourceObj = {color: 'green', price: 1000}
    * const resultObj = K.Object.merge(targetObj, sourceObj)
    *
    * // After this code:
    * // targetObj = {color: 'green', value: 3.14, price: 1000} (modified)
    * // sourceObj = {color: 'green', price: 1000} (unmodified)
    * // resultObj = reference to targetObj once again
    * [/]
    *
    * @param {object} targetObj Base map, where we apply merge (IN/OUT).
    * @param {object} sourceObj Source Source map, which we want to merge into targetObj (IN)
    * @return {object} Reference to [b]modified[/] targetObj.
    */

   static merge(targetObj, sourceObj) {
     for (let key in sourceObj) {
       targetObj[key] = sourceObj[key]
     }
     return targetObj
   }

   /**
    * Merge array of objects (number indexed) into map (key indexed).
    *
    * [frameWarning]
    * This function modify target map. Use deepClone() or
    * shallowCopy() if you need to keep original map.
    * [/]
    *
    * [frameExampleUsage]
    * const targetObj = {
    *   computer: {price: 1000, color: 'white'},
    *   ball:     {price: 10, color: 'yellow'}
    * };
    *
    * const sourceArray = [
    *   {id: 'car'  , color: 'red'  , price: 1000},
    *   {id: 'boat' , color: 'green', price: 5000}
    * ];
    *
    * const resultObj = K.Object.mergeArrayToMapByKey(targetObj, sourceObj, 'id');
    *
    * // After this code:
    * // targetObj = {
    * //   computer: {price: 1000, color: 'white'},               (original)
    * //   ball:     {price: 10  , color: 'yellow'},              (original)
    * //   car:      {id: 'car'  , color: 'red'   , price: 1000}, (merged)
    * //   boat:     {id: 'boat' , color: 'green' , price: 5000}  (merged)
    * // };
    * //
    * // sourceArray  = unmodified
    * // resultObject = reference to targetObj
    * [/]
    *
    * @param {object} targetObj Base map, where we apply merge (IN/OUT).
    * @param {object} sourceArray Source Source array of objects, which we want to merge into targetObj (IN)
    * @param {string} id Field used as key while merging object from array to map (IN)
    * @return {object} Reference to [b]modified[/] targetObj.
    */

   static mergeArrayToMapByKey(target, array, id) {
     for (let idx in array) {
       const item = array[idx]

       target[item[id]] = item
     }

     return target
   }

   /**
    * Perform shallow (non-recursive) copy of map (key based).
    *
    * [frameWarning]
    * This function does [b]NOT[/] clone bodies of complex fields
    * (objects). Only references are copied to target objects.
    * [/]
    *
    * [frameTip] Use deepClone() if you want to do [b]recursive[/] clone.[/]
    *
    * @param {object} sourceObj Map object, which we're going to clone (IN)
    * @return {object} New created object containg all fields cloned from sourceObj.
    */

   static shallowCopy(sourceObj) {
     const rv = {}
     K.Object.merge(rv, sourceObj)
     return rv
   }

   /**
    * [b]OBSOLETE[/], do [b]NOT[/] use in new code.
    * This method was badly named in the past. Do not use it !
    * Use shallowCopy() or deepClone() instead !
    *
    * @param {object} sourceObj Map object, which we're going to clone (IN)
    * @return {object} New created object containg all fields cloned from sourceObj.
    */

   static deepCopy(sourceObj) {
     return this.shallowCopy(sourceObj)
   }

   /**
    * Perform deep (recursive) copy of:
    * [ul][li]map (key based),
    *   [li]array (number indexed),
    *   [li]custom object implementing [i]clone()[/] method.[/ul]
    *
    * Bodies of cloned fields are copied recursively.
    *
    * @param {object} sourceObj Map, arary or object with [i]clone()[/] method, which
    *                 we're going to clone (IN)
    * @return {object} New created object containg all fields cloned from sourceObj.
    */

   static deepClone(sourceObj) {
     let rv = null

     if (!this.isObject(sourceObj)) {
       // Primitive value (string, number, boolean).
       rv = sourceObj
     } else if (K.Object.isNotNull(sourceObj.clone)) {
       // Complex object with custom clone() method. Use it.
       rv = sourceObj.clone()
     } else if (this.isArray(sourceObj)) {
       rv = sourceObj.slice(0)
     } else {
       // Complex object without custom clone() method.
       // Use default recursive algorithm.
       rv = {}

       for (let key in sourceObj) {
         const value = sourceObj[key]

         rv[key] = K.Object.deepClone(value)
       }
     }

     // Pass cloned object to caller.
     return rv
   }

   /**
    * Set object's property using string path such as 'a.b.c'.
    * [frameExampleUsage]
    *   let obj     = {};
    *   let success = K.Object.setByPath(obj, 'a.b.c', 1);
    *
    *   // After this code:
    *   // obj     = {a: {b: {c: 1}}} (modified)
    *   // success = true
    * [/]
    *
    * @param {object} obj Target object to modify (IN/OUT)
    *
    * @param {string} path String containing full, dot separated path of property
    *                 which, we're goint to set e.g. 'a.b.c' (IN)
    *
    * @param {}       value New property value, which we're goint to set (IN)
    *
    * @return {bool} True if success, false otherwise.
    */

   static setByPath(obj, path, value) {
     let rv = true

     // Check parameters.
     if (K.Object.isUndefinedOrNull(obj)) {
       rv = false
     } else if (K.Object.isUndefinedOrNull(path) || (path === '') || (path[path.length - 1] === '.')) {
       rv = false
     } else {
       // Split path into token keys.
       const explodedPath = path.split('.')
       let ptr            = obj
       const pathCnt      = explodedPath.length

       if (pathCnt > 0) {
         // Ensure property exists.
         for (let idx = 0, end = pathCnt - 1, asc = 0 <= end; asc ? idx < end : idx > end; asc ? idx++ : idx--) {
           const key = explodedPath[idx]

           if (key === '') {
             // Corrupted key, don't go on longer.
             rv = false

             break
           } else {
             // Key seems ok, go deeper inside object.
             K.Object.ensureObjectFieldExists(ptr, key)
             ptr = ptr[key]
           }
         }

         // Set value.
         if (rv === true) {
           const lastKey = explodedPath[pathCnt - 1]
           ptr[lastKey]  = value
         }
       }
     }

     return rv
   }

   /**
    * Check is argument pure JS Array (number indexed).
    *
    * @param {} value Value to test (IN)
    *
    * @return {bool} True if given parameter is pure JS array, false otherwise.
    */

   static isArray(arr) {
     return K.Object.isNotNull(arr) && (arr.constructor === Array)
   }

   /**
    * Check is argument pure JS Object.
    *
    * [frameNote] Please note, that Array is also properly Object in JS language.
    * So, for Array parameter both isObject() and isArray() will return true.[/]
    *
    * @param {} value Value to test (IN)
    *
    * @return {bool} True if given parameter is pure JS object, false otherwise.
    */

   static isObject(obj) {
     return K.Object.isNotNull(obj) && (typeof obj === 'object')
   }

   /**
    * Make sure, that array field exists within target object:
    * [ul][li]create new field if doesn't exist,
    *   [li]do nothing otherwise.[/ul]
    *
    * [frameNote] Please note, that the function guarantees that the field
    * will be created only once.[/]
    *
    * [frameSeeAlso]
    *   [ref id="K.Object.ensureObjectFieldExists"][/ref]
    *   [ref id="K.Object.ensureStringFieldExists"][/ref]
    *   [ref id="K.Object.createOnce"][/ref]
    * [/]
    *
    * [frameExampleUsage]
    *   const obj = {};
    *   K.Object.ensureArrayFieldExists(obj, 'cars')
    *
    *   // After this code:
    *   // obj = {cars: []}
    * [/]
    *
    * [frameExampleUsage]
    *   // Use default value
    *   const obj = {};
    *   K.Object.ensureArrayFieldExists(obj, 'numbers', [1, 2, 3])
    *
    *   // After this code:
    *   // obj = {numbers: [1, 2, 3]}
    * [/]
    *
    * @param {object} obj Target object to test and modify (IN/OUT)
    * @param {string} key Property name, which we want to be existent e.g. 'numbers' (IN)
    * @param {array} defaultValue Default property value if doesn't exist in call time.
    *                Defaulted to empty array [i][[][/] if not set (IN/OPTIONAL).
    */

   static ensureArrayFieldExists(obj, key, defaultValue) {
     if (K.Object.isUndefinedOrNull(defaultValue)) {
       defaultValue = []
     }

     if (!K.Object.isArray(obj[key])) {
       obj[key] = defaultValue
     }
   }

   /**
    * Make sure, that object (map) field exists within target object.
    * [ul][li]create new field if doesn't exist,
    *   [li]do nothing otherwise.[/ul]
    *
    * [frameNote] Please note, that the function guarantees that the field
    * will be created only once.[/]
    *
    * [frameTip]: See also ensureArrayFieldExists(), ensureStringFieldExists(),
    * createOnce().[/]
    *
    * [frameExampleUsage]
    *   const obj = {};
    *   K.Object.ensureObjectFieldExists(obj, 'cars')
    *
    *   // After this code:
    *   // obj = {cars: {}}
    * [/]
    *
    * [frameExampleUsage]
    *   // use default value
    *   const obj = {};
    *   K.Object.ensureObjectFieldExists(obj, 'salaries', {'john': 1000, 'jenny': 1500})
    *
    *   // After this code:
    *   // obj = {salaries: {'john': 1000, 'jenny': 1500}}
    * [/]
    *
    * @param {object} obj Target object to test and modify (IN/OUT)
    * @param {string} key Property name, which we want to be existent e.g. 'numbers' (IN)
    * @param {object} defaultValue Default property value if doesn't exist in call time.
    *                 Defaulted to empty map [i]{}[/] if not set (IN/OPTIONAL).
    */

   static ensureObjectFieldExists(obj, key, defaultValue) {
     if (K.Object.isUndefinedOrNull(defaultValue)) {
       defaultValue = {}
     }

     if (!K.Object.isObject(obj[key])) {
       obj[key] = defaultValue
     }
   }

   /**
    * Make sure, that string field exists within target object.
    * [ul][li]create new field if doesn't exist,
    *   [li]do nothing otherwise.[/ul]
    *
    * [frameNote] Please note, that the function guarantees that the field
    * will be created only once.[/]
    *
    * [frameTip]: See also ensureObjectFieldExists(), ensureArrayFieldExists(),
    * createOnce().[/]
    *
    * [frameExampleUsage]
    *   const obj = {};
    *   K.Object.ensureStringFieldExists(obj, 'name')
    *
    *   // After this code:
    *   // obj = {name: ''}
    * [/]
    *
    * [frameExampleUsage]
    *   // Use default value
    *   const obj = {};
    *   K.Object.ensureStringFieldExists(obj, 'name', 'Jenny')
    *
    *   // After this code:
    *   // obj = {name: 'Jenny'}
    * [/]
    *
    * @param {object} obj Target object to test and modify (IN/OUT)
    * @param {string} key Property name, which we want to be existent e.g. 'numbers' (IN)
    * @param {string} defaultValue Default property value if doesn't exist in call time.
    *                 Defaulted to empty string [i]''[/] if not set (IN/OPTIONAL).
    */

   static ensureStringFieldExists(obj, key, defaultValue) {
     if (K.Object.isUndefinedOrNull(defaultValue)) {
       defaultValue = ''
     }

     if (!K.Object.isString(obj[key])) {
       obj[key] = defaultValue
     }
   }

   /**
    * Make sure, that field with custom factory exists within target object.
    * [ul][li]create new field if doesn't exist (using delivered factory function),
    *   [li]do nothing otherwise.[/ul]
    *
    * [frameNote] Please note, that the function guarantees that the field
    * will be created only once.[/]
    *
    * [frameTip]: See also ensureArrayFieldExists(), ensureObjectFieldExists(),
    * ensureStringFieldExists().[/]
    *
    * @param {object} obj Target object to test and modify (IN/OUT)
    * @param {string} key Property name, which we want to be existent e.g. 'numbers' (IN)
    * @param {function} creatorFct Custom factory function called to create new value
    *                   if property not set in call time (IN)
    */

   static createOnce(obj, key, creatorFct) {
     if (!K.Object.isNotNull(obj[key])) {
       obj[key] = creatorFct(obj, key)
     }
   }

   /**
    * Get value of selected object's property or default if field doesn't exist.
    *
    * @param {object} obj Source object to read from (IN)
    * @param {string} key Property name, which we want to read 'name' (IN)
    * @param {}       defaultValue used if property doesn't exist (IN)
    *
    * @return {} [ul][li]Property value stored at selected key if field existent,
    *              [li]defaultValue otherwise.[/ul]
    */

   static getFieldOrDefault(obj, key, defaultValue) {
     if (K.Object.isUndefinedOrNull(obj) || K.Object.isUndefinedOrNull(obj[key])) {
       return defaultValue
     } else {
       return obj[key]
     }
   }

   /**
    * Perform deep (recursive) comparison of two objects (maps).
    *
    * @param {} obj1 First object to be compared (IN)
    * @param {} obj2 Second object to be compared (IN)
    *
    * @return {} [ul][li]True if objects have the same fields with the same values,
    *            [li]false otherwise.[/ul]
    */

   static areDeepEqual(obj1, obj2) {
     let rv = false

     if (typeof obj1 !== typeof obj2) {
       // Objects have different types - they can't be equal.
       rv = false
     } else if (K.Object.isObject(obj1) && K.Object.isObject(obj2)) {
       // Both objects are complex objects. Check keys first.
       rv = true

       const keys1 = GlobalObject.keys(obj1)
       const keys2 = GlobalObject.keys(obj2)

       if (keys1.length !== keys2.length) {
         // Different number of keys - they can't be equal.
         rv = false
       } else {
         // Number of keys match, compare values recursively.
         for (let key in obj1) {
           if (!K.Object.areDeepEqual(obj1[key], obj2[key])) {
             rv = false

             break
           }
         }
       }
     } else {
       // Primitive values. Use built-in comparison.
       rv = (obj1 === obj2)
     }

     return rv
   }

   /**
    * Check is given parameter a properly JS string (e.g. 'Jenny').
    *
    * @param {} obj Parameter to test (IN)
    *
    * @return {} [ul][li]True if given parameter stores properly JS string,
    *            [li]false otherwise.[/ul]
    */

   static isString(obj) {
     return (obj instanceof String) || (typeof obj === 'string')
   }

   /**
    * Check is given parameter existent.
    *
    * @param {} x Parameter to test (IN)
    *
    * @return {} [ul][li]True if parameter is defined,
    *            [li]false otherwise.[/ul]
    */

   static isExistent(x) {
     return (typeof x !== 'undefined')
   }

   /**
    * Check is given parameter existent and has any non-null value assigned.
    *
    * @param {} x Parameter to test (IN)
    *
    * @return {} [ul][li]True if given parameter is defined and has any non-null value,
    *            [li]false otherwise.[/ul]
    */

   static isNotNull(x) {
     return K.Object.isExistent(x) && (x !== null)
   }

   /**
    * Check is given parameter a properly [b]non-empty[/] JS string (e.g. 'Jenny').
    *
    * @param {} obj Parameter to test (IN)
    *
    * @return {} [ul][li]True if given parameter stores non-empty string,
    *            [li]false otherwise.[/ul]
    */

   static isNotEmptyString(x) {
     return K.Object.isString(x) && (x != '')
   }

   /**
    * Check is given parameter undefined.
    *
    * @param {} obj Parameter to test (IN)
    *
    * @return {} [ul][li]True if given parameter is undefined,
    *            [li]false otherwise.[/ul]
    */

   static isUndefined(x) {
     return (typeof x === 'undefined')
   }

   /**
    * Check is given parameter undefined or has null value assigned.
    *
    * @param {} obj Parameter to test (IN)
    *
    * @return {} [ul][li]True if given parameter is undefined or stores null,
    *            [li]false otherwise.[/ul]
    */

   static isUndefinedOrNull(x) {
     return K.Object.isUndefined(x) || (x == null)
   }
 }

 if (typeof exports !== 'undefined') {
   exports.KObject = K.Object
 }