/**
 * add a new case to match
 * @callback Case
 * @param {*} testVal value to match
 * @param {Function} then function to execute if `testVal` matches
 * @returns {MatchReturn}
 */


/**
 * add a default case and execute the match, returning the value returned by the matching case
 * @callback Default
 * @param {Function} then function to execute if no case matched
 * @returns {*}
 */

/**
 * execute the match and return the value returned by the matching case
 * @callback Exec
 * @returns {*}
 */

/**
 * @typedef {Object} MatchReturn
 * @property {Case} case
 * @property {Default} default
 * @property {Exec} exec
 */

/**
 * @param {*} value
 * @returns {MatchReturn}
 */
export const match = value => {
  /**
   * @type {{ testVal: *, then: Function }[]}
   */
  const cases = [];
  let defaultCase;

  const retObj = {
    case: (testVal, then) => {
      cases.push({ testVal, then });
      return retObj;
    },
    default: then => {
      defaultCase = then;
      return retObj.exec();
    },
    exec: () => {
      const matchedCase = cases.find(c => c.testVal === value)

      return matchedCase
        ? matchedCase.then()
        : defaultCase
          ? defaultCase()
          : undefined;
    },
  };

  return retObj;
}
