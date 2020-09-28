import { splineThroughPath } from './splineThroughPath'
import { toArray, removeNullishValues, unflattenPath } from '../../utils';
import { PathCreator } from './PathCreator';

/**
 * @type {PathUtilsStatic}
 */
export class PathUtils {

  static commands = {
    ARC: 'A',
    DARC: 'a',
    CLOSE: 'Z',
    DCLOSE: 'z',
    CUBIC_BEZIER: 'C',
    DCUBIC_BEZIER: 'c',
    SMOOTH_CUBIC_BEZIER: 'S',
    DSMOOTH_CUBIC_BEZIER: 's',
    LINE: 'L',
    DLINE: 'l',
    VLINE: 'V',
    DVLINE: 'v',
    HLINE: 'H',
    DHLINE: 'h',
    MOVE: 'M',
    DMOVE: 'm',
    QUADRATIC_BEZIER: 'Q',
    DQUADRATIC_BEZIER: 'q',
    SMOOTH_QUADRATIC_BEZIER: 'T',
    DSMOOTH_QUADRATIC_BEZIER: 't',
  };

  static nonStrictCommands = {
    ARC: [PathUtils.commands.ARC, PathUtils.commands.DARC],
    CLOSE: [PathUtils.commands.CLOSE, PathUtils.commands.DCLOSE],
    CUBIC_BEZIER: [PathUtils.commands.CUBIC_BEZIER, PathUtils.commands.DCUBIC_BEZIER],
    SMOOTH_CUBIC_BEZIER: [PathUtils.commands.SMOOTH_CUBIC_BEZIER, PathUtils.commands.DSMOOTH_CUBIC_BEZIER],
    LINE: [PathUtils.commands.LINE, PathUtils.commands.DLINE],
    VLINE: [PathUtils.commands.VLINE, PathUtils.commands.DVLINE],
    HLINE: [PathUtils.commands.HLINE, PathUtils.commands.DHLINE],
    MOVE: [PathUtils.commands.MOVE, PathUtils.commands.DMOVE],
    QUADRATIC_BEZIER: [PathUtils.commands.QUADRATIC_BEZIER, PathUtils.commands.DQUADRATIC_BEZIER],
    SMOOTH_QUADRATIC_BEZIER: [PathUtils.commands.SMOOTH_QUADRATIC_BEZIER, PathUtils.commands.DSMOOTH_QUADRATIC_BEZIER],
  };

  //#region command testing
  /**
   * @param {String} command
   * @param {String | String[]} expectedCommand
   * @returns {Boolean}
   */
  static isCommand = (command, expectedCommand) => {
    return toArray(expectedCommand).includes(command);
  }

  /**
   * @param {*} command
   * @param {String} commandName
   * @param {Boolean} [strict=true]
   * @returns {Boolean}
   * @private
   */
  static baseIsCommand = (command, commandName, strict = true) => {
    return strict
      ? PathUtils.isCommand(command, PathUtils.commands[commandName])
      : PathUtils.isCommand(command, PathUtils.nonStrictCommands[commandName]);
  }

  //#region static command testing
  /**
   * @param {*} command
   * @param {Boolean} [strict=false]
   * @returns {Boolean}
   */
  static isArcCommand = (command, strict = false) => {
    return PathUtils.baseIsCommand(command, 'ARC', strict);
  }

  /**
   * @param {*} command
   * @returns {Boolean}
   */
  static isDarcCommand = (command) => {
    return PathUtils.baseIsCommand(command, 'DARC');
  }

  /**
   * @param {*} command
   * @param {Boolean} [strict=false]
   * @returns {Boolean}
   */
  static isCloseCommand = (command, strict = false) => {
    return PathUtils.baseIsCommand(command, 'CLOSE', strict);
  }

  /**
   * @param {*} command
   * @returns {Boolean}
   */
  static isDcloseCommand = (command) => {
    return PathUtils.baseIsCommand(command, 'DCLOSE');
  }

  /**
   * @param {*} command
   * @param {Boolean} [strict=false]
   * @returns {Boolean}
   */
  static isCubicBezierCommand = (command, strict = false) => {
    return PathUtils.baseIsCommand(command, 'CUBIC_BEZIER', strict);
  }

  /**
   * @param {*} command
   * @returns {Boolean}
   */
  static isDcubicBezierCommand = (command) => {
    return PathUtils.baseIsCommand(command, 'DCUBIC_BEZIER');
  }

  /**
   * @param {*} command
   * @param {Boolean} [strict=false]
   * @returns {Boolean}
   */
  static isSmoothCubicBezierCommand = (command, strict = false) => {
    return PathUtils.baseIsCommand(command, 'SMOOTH_CUBIC_BEZIER', strict);
  }

  /**
   * @param {*} command
   * @returns {Boolean}
   */
  static isDsmoothCubicBezierCommand = (command) => {
    return PathUtils.baseIsCommand(command, 'DSMOOTH_CUBIC_BEZIER');
  }

  /**
   * @param {*} command
   * @param {Boolean} [strict=false]
   * @returns {Boolean}
   */
  static isLineCommand = (command, strict = false) => {
    return PathUtils.baseIsCommand(command, 'LINE', strict);
  }

  /**
   * @param {*} command
   * @returns {Boolean}
   */
  static isDlineCommand = (command) => {
    return PathUtils.baseIsCommand(command, 'DLINE');
  }

  /**
   * @param {*} command
   * @param {Boolean} [strict=false]
   * @returns {Boolean}
   */
  static isVlineCommand = (command, strict = false) => {
    return PathUtils.baseIsCommand(command, 'VLINE', strict);
  }

  /**
   * @param {*} command
   * @returns {Boolean}
   */
  static isDvlineCommand = (command) => {
    return PathUtils.baseIsCommand(command, 'DVLINE');
  }

  /**
   * @param {*} command
   * @param {Boolean} [strict=false]
   * @returns {Boolean}
   */
  static isHlineCommand = (command, strict = false) => {
    return PathUtils.baseIsCommand(command, 'HLINE', strict);
  }

  /**
   * @param {*} command
   * @returns {Boolean}
   */
  static isDhlineCommand = (command) => {
    return PathUtils.baseIsCommand(command, 'DHLINE');
  }

  /**
   * @param {*} command
   * @param {Boolean} [strict=false]
   * @returns {Boolean}
   */
  static isMoveCommand = (command, strict = false) => {
    return PathUtils.baseIsCommand(command, 'MOVE', strict);
  }

  /**
   * @param {*} command
   * @returns {Boolean}
   */
  static isDmoveCommand = (command) => {
    return PathUtils.baseIsCommand(command, 'DMOVE');
  }

  /**
   * @param {*} command
   * @param {Boolean} [strict=false]
   * @returns {Boolean}
   */
  static isQuadraticBezierCommand = (command, strict = false) => {
    return PathUtils.baseIsCommand(command, 'QUADRATIC_BEZIER', strict);
  }

  /**
   * @param {*} command
   * @returns {Boolean}
   */
  static isDquadraticBezierCommand = (command) => {
    return PathUtils.baseIsCommand(command, 'DQUADRATIC_BEZIER');
  }

  /**
   * @param {*} command
   * @param {Boolean} [strict=false]
   * @returns {Boolean}
   */
  static isSmoothQuadraticBezierCommand = (command, strict = false) => {
    return PathUtils.baseIsCommand(command, 'SMOOTH_QUADRATIC_BEZIER', strict);
  }

  /**
   * @param {*} command
   * @returns {Boolean}
   */
  static isDsmoothQuadraticBezierCommand = (command) => {
    return PathUtils.baseIsCommand(command, 'DSMOOTH_QUADRATIC_BEZIER');
  }
  //#endregion
  //#endregion

  //#region path-command testing
  /**
   * @param {Array} path
   * @param {String | String[]} expectedCommand
   * @returns {Boolean}
   */
  static isPathCommand = (path, expectedCommand) => {
    return PathUtils.isCommand(path[0], expectedCommand);
  }

  /**
   * @param {Array} path
   * @param {String} commandName
   * @param {Boolean} [strict=true]
   * @returns {Boolean}
   * @private
   */
  static baseIsPathCommand = (path, commandName, strict = true) => {
    return strict
      ? PathUtils.isPathCommand(path, PathUtils.commands[commandName])
      : PathUtils.isPathCommand(path, PathUtils.nonStrictCommands[commandName]);
  }

  //#region static path-command testing
  /**
   * @param {Array} path
   * @param {Boolean} [strict=false]
   * @returns {Boolean}
   */
  static isArcPath = (path, strict = false) => {
    return PathUtils.baseIsPathCommand(path, 'ARC', strict);
  }

  /**
   * @param {Array} path
   * @returns {Boolean}
   */
  static isDarcPath = (path) => {
    return PathUtils.baseIsPathCommand(path, 'DARC');
  }

  /**
   * @param {Array} path
   * @param {Boolean} [strict=false]
   * @returns {Boolean}
   */
  static isClosePath = (path, strict = false) => {
    return PathUtils.baseIsPathCommand(path, 'CLOSE', strict);
  }

  /**
   * @param {Array} path
   * @returns {Boolean}
   */
  static isDclosePath = (path) => {
    return PathUtils.baseIsPathCommand(path, 'DCLOSE');
  }

  /**
   * @param {Array} path
   * @param {Boolean} [strict=false]
   * @returns {Boolean}
   */
  static isCubicBezierPath = (path, strict = false) => {
    return PathUtils.baseIsPathCommand(path, 'CUBIC_BEZIER', strict);
  }

  /**
   * @param {Array} path
   * @returns {Boolean}
   */
  static isDcubicBezierPath = (path) => {
    return PathUtils.baseIsPathCommand(path, 'DCUBIC_BEZIER');
  }

  /**
   * @param {Array} path
   * @param {Boolean} [strict=false]
   * @returns {Boolean}
   */
  static isSmoothCubicBezierPath = (path, strict = false) => {
    return PathUtils.baseIsPathCommand(path, 'SMOOTH_CUBIC_BEZIER', strict);
  }

  /**
   * @param {Array} path
   * @returns {Boolean}
   */
  static isDsmoothCubicBezierPath = (path) => {
    return PathUtils.baseIsPathCommand(path, 'DSMOOTH_CUBIC_BEZIER');
  }

  /**
   * @param {Array} path
   * @param {Boolean} [strict=false]
   * @returns {Boolean}
   */
  static isLinePath = (path, strict = false) => {
    return PathUtils.baseIsPathCommand(path, 'LINE', strict);
  }

  /**
   * @param {Array} path
   * @returns {Boolean}
   */
  static isDlinePath = (path) => {
    return PathUtils.baseIsPathCommand(path, 'DLINE');
  }

  /**
   * @param {Array} path
   * @param {Boolean} [strict=false]
   * @returns {Boolean}
   */
  static isVlinePath = (path, strict = false) => {
    return PathUtils.baseIsPathCommand(path, 'VLINE', strict);
  }

  /**
   * @param {Array} path
   * @returns {Boolean}
   */
  static isDvlinePath = (path) => {
    return PathUtils.baseIsPathCommand(path, 'DVLINE');
  }

  /**
   * @param {Array} path
   * @param {Boolean} [strict=false]
   * @returns {Boolean}
   */
  static isHlinePath = (path, strict = false) => {
    return PathUtils.baseIsPathCommand(path, 'HLINE', strict);
  }

  /**
   * @param {Array} path
   * @returns {Boolean}
   */
  static isDhlinePath = (path) => {
    return PathUtils.baseIsPathCommand(path, 'DHLINE');
  }

  /**
   * @param {Array} path
   * @param {Boolean} [strict=false]
   * @returns {Boolean}
   */
  static isMovePath = (path, strict = false) => {
    return PathUtils.baseIsPathCommand(path, 'MOVE', strict);
  }

  /**
   * @param {Array} path
   * @returns {Boolean}
   */
  static isDmovePath = (path) => {
    return PathUtils.baseIsPathCommand(path, 'DMOVE');
  }

  /**
   * @param {Array} path
   * @param {Boolean} [strict=false]
   * @returns {Boolean}
   */
  static isQuadraticBezierPath = (path, strict = false) => {
    return PathUtils.baseIsPathCommand(path, 'QUADRATIC_BEZIER', strict);
  }

  /**
   * @param {Array} path
   * @returns {Boolean}
   */
  static isDquadraticBezierPath = (path) => {
    return PathUtils.baseIsPathCommand(path, 'DQUADRATIC_BEZIER');
  }

  /**
   * @param {Array} path
   * @param {Boolean} [strict=false]
   * @returns {Boolean}
   */
  static isSmoothQuadraticBezierPath = (path, strict = false) => {
    return PathUtils.baseIsPathCommand(path, 'SMOOTH_QUADRATIC_BEZIER', strict);
  }

  /**
   * @param {Array} path
   * @returns {Boolean}
   */
  static isDsmoothQuadraticBezierPath = (path) => {
    return PathUtils.baseIsPathCommand(path, 'DSMOOTH_QUADRATIC_BEZIER');
  }
  //#endregion
  //#endregion

  /**
   * @param {Array[]} path
   * @returns {Array[]}
   */
  static removeUselessMoves = path => {
    const cleanPath = path.map((p, i) => {
      if (!PathUtils.isMovePath(p)) {
        return p;
      }

      let prevX = Infinity
      let prevY = Infinity

      if (i > 0) {
        const prevPath = path[i - 1];
        prevX = prevPath[prevPath.length - 2];
        prevY = prevPath[prevPath.length - 1];
      }

      if (p[1] !== prevX || p[2] !== prevY) {
        return p;
      }
    });

    return removeNullishValues(cleanPath);
  }

  /**
   * @param {...Number} path
   * @returns {(String | Number)[][]}
   */
  static splineThrough = (...path) => {
    const points = unflattenPath(path);
    return splineThroughPath(points, () => new PathCreator());
  }

  /**
   * @param {...Number} path
   * @returns {(String | Number)[][]}
   */
  static dsplineThrough = (...path) => {
    const points = unflattenPath(path);
    return splineThroughPath(points, () => new PathCreator().relative());
  }
}

/**
 * @typedef {Object} Commands
 * @property {String} ARC
 * @property {String} DARC
 * @property {String} CLOSE
 * @property {String} DCLOSE
 * @property {String} CUBIC_BEZIER
 * @property {String} DCUBIC_BEZIER
 * @property {String} SMOOTH_CUBIC_BEZIER
 * @property {String} DSMOOTH_CUBIC_BEZIER
 * @property {String} LINE
 * @property {String} DLINE
 * @property {String} VLINE
 * @property {String} DVLINE
 * @property {String} HLINE
 * @property {String} DHLINE
 * @property {String} MOVE
 * @property {String} DMOVE
 * @property {String} QUADRATIC_BEZIER
 * @property {String} DQUADRATIC_BEZIER
 * @property {String} SMOOTH_QUADRATIC_BEZIER
 * @property {String} DSMOOTH_QUADRATIC_BEZIER
 */

/**
 * @typedef {Object} NonStrictCommands
 * @property {String[]} ARC
 * @property {String[]} CLOSE
 * @property {String[]} CUBIC_BEZIER
 * @property {String[]} SMOOTH_CUBIC_BEZIER
 * @property {String[]} LINE
 * @property {String[]} VLINE
 * @property {String[]} HLINE
 * @property {String[]} MOVE
 * @property {String[]} QUADRATIC_BEZIER
 * @property {String[]} SMOOTH_QUADRATIC_BEZIER
 */

/**
 * @typedef {Object} PathUtilsStatic
 * @property {Commands} commands
 * @property {NonStrictCommands} nonStrictCommands
 */
