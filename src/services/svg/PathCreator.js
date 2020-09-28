import { PathUtils } from '.';
import * as commands from './commands';
import { match, last, lastTwo } from '../../utils';

export class PathCreator {

  static tempRelativeString = 'd';
  static relativeString = 'relative';
  static absoluteString = 'absolute';
  /**
   * @type {(String | Number)[][]}
   */
  path = [];
  /**
   * @private
   */
  drelative = false;
  /**
   * @private
   */
  rel = false;

  /**
   * @param {((Number | String)[] | String)[]} [path]
   */
  constructor(path) {
    if (path) {
      path.forEach(nPath => {
        if (typeof nPath === 'string') {
          if (nPath === PathCreator.relativeString) {
            this.relative();
          } else if (nPath === PathCreator.absoluteString) {
            this.absolute();
          }
        } else {
          if (typeof nPath[0] === 'string') {
            if (nPath[0] === PathCreator.tempRelativeString) {
              nPath.pop();
              this.relative();
            }
          }

          this.curve(...nPath);
        }
      });
    }
  }

  /**
   * @returns {this}
   */
  get d() {
    this.drelative = true;
    return this;
  }

  /**
   * @param {Boolean} [relative=true]
   * @returns {this}
   */
  relative = (relative = true) => {
    this.rel = relative;
    return this;
  }

  /**
   * @param {Boolean} [absolute=true]
   * @returns {this}
   */
  absolute = (absolute = true) => {
    this.rel = !absolute;
    return this;
  }

  /**
   * @returns {Boolean}
   * @private
   */
  isRelative = () => {
    return this.drelative || this.rel;
  }

  /**
   * @param {[Function, Function?]} drawers
   * @param {Array} [args=[]]
   * @returns {this}
   * @private
   */
  drawer = (drawers, args = []) => {
    if (drawers[1] && this.isRelative()) {
      // recall this function with only one function which will make it go after the if to call the function
      return this.drawer([drawers[1]], args);
    }

    this.path.push(drawers[0](...args));
    return this;
  }

  /**
   * @param {Number} rx
   * @param {Number} ry
   * @param {Number} angle
   * @param {Boolean} largeArcFlag
   * @param {Boolean} sweepFlag
   * @param {Number} x
   * @param {Number} y
   * @returns {this}
   */
  arc = (rx, ry, angle, largeArcFlag, sweepFlag, x, y) => {
    return this.drawer(
      [commands.arc, commands.darc],
      [rx, ry, angle, largeArcFlag, sweepFlag, x, y],
    );
  }

  /**
   * @param {Number} rx
   * @param {Number} ry
   * @param {Number} angle
   * @param {Boolean} largeArcFlag
   * @param {Boolean} sweepFlag
   * @param {Number} dx
   * @param {Number} dy
   * @returns {this}
   */
  darc = (rx, ry, angle, largeArcFlag, sweepFlag, dx, dy) => {
    return this.drawer(
      [commands.darc],
      [rx, ry, angle, largeArcFlag, sweepFlag, dx, dy],
    );
  }

  /**
   * @returns {this}
   */
  close = () => {
    return this.drawer([commands.close, commands.dclose]);
  }

  /**
   * @returns {this}
   */
  dclose = () => {
    return this.drawer([commands.dclose]);
  }

  /**
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} x2
   * @param {Number} y2
   * @param {Number} x
   * @param {Number} y
   * @returns {this}
   */
  cubicBezier = (x1, y1, x2, y2, x, y) => {
    return this.drawer(
      [commands.cubicBezier, commands.dcubicBezier],
      [x1, y1, x2, y2, x, y],
    );
  }

  /**
   * @param {Number} dx1
   * @param {Number} dy1
   * @param {Number} dx2
   * @param {Number} dy2
   * @param {Number} dx
   * @param {Number} dy
   * @returns {this}
   */
  dcubicBezier = (dx1, dy1, dx2, dy2, dx, dy) => {
    return this.drawer(
      [commands.dcubicBezier],
      [dx1, dy1, dx2, dy2, dx, dy],
    );
  }

  /**
   * @param {Number} x2
   * @param {Number} y2
   * @param {Number} x
   * @param {Number} y
   * @returns {this}
   */
  smoothCubicBezier = (x2, y2, x, y) => {
    return this.drawer(
      [commands.smoothCubicBezier, commands.dsmoothCubicBezier],
      [x2, y2, x, y],
    );
  }

  /**
   * @param {Number} dx2
   * @param {Number} dy2
   * @param {Number} dx
   * @param {Number} dy
   * @returns {this}
   */
  dsmoothCubicBezier = (dx2, dy2, dx, dy) => {
    return this.drawer(
      [commands.dsmoothCubicBezier],
      [dx2, dy2, dx, dy],
    );
  }

  /**
   * @param {Number} x
   * @param {Number} y
   * @returns {this}
   */
  line = (x, y) => {
    return this.drawer([commands.line, commands.dline], [x, y]);
  }

  /**
   * @param {Number} dx
   * @param {Number} dy
   * @returns {this}
   */
  dline = (dx, dy) => {
    return this.drawer([commands.dline], [dx, dy]);
  }

  /**
   * @param {Number} y
   * @returns {this}
   */
  vline = (y) => {
    return this.drawer([commands.vline, commands.dvline], [y]);
  }

  /**
   * @param {Number} dy
   * @returns {this}
   */
  dvline = (dy) => {
    return this.drawer([commands.dvline], [dy]);
  }

  /**
   * @param {Number} x
   * @returns {this}
   */
  hline = (x) => {
    return this.drawer([commands.hline, commands.dhline], [x]);
  }

  /**
   * @param {Number} dx
   * @returns {this}
   */
  dhline = (dx) => {
    return this.drawer([commands.dhline], [dx]);
  }

  /**
   * @param {Number} x
   * @param {Number} y
   * @returns {this}
   */
  move = (x, y) => {
    return this.drawer([commands.move, commands.dmove], [x, y]);
  }

  /**
   * @param {Number} dx
   * @param {Number} dy
   * @returns {this}
   */
  dmove = (dx, dy) => {
    return this.drawer([commands.dmove], [dx, dy]);
  }

  /**
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} x
   * @param {Number} y
   * @returns {this}
   */
  quadraticBezier = (x1, y1, x, y) => {
    return this.drawer(
      [commands.quadraticBezier, commands.dquadraticBezier],
      [x1, y1, x, y],
    );
  }

  /**
   * @param {Number} dx1
   * @param {Number} dy1
   * @param {Number} dx
   * @param {Number} dy
   * @returns {this}
   */
  dquadraticBezier = (dx1, dy1, dx, dy) => {
    return this.drawer(
      [commands.dquadraticBezier],
      [dx1, dy1, dx, dy],
    );
  }

  /**
   * @param {Number} x
   * @param {Number} y
   * @returns {this}
   */
  smoothQuadraticBezier = (x, y) => {
    return this.drawer(
      [commands.smoothQuadraticBezier, commands.dsmoothQuadraticBezier],
      [x, y],
    );
  }

  /**
   * @param {Number} dx
   * @param {Number} dy
   * @returns {this}
   */
  dsmoothQuadraticBezier = (dx, dy) => {
    return this.drawer([commands.dsmoothQuadraticBezier], [dx, dy]);
  }

  /**
   * @param {[Function, Function?]} drawers
   * @param {Number[]} [points=[]]
   * @returns {this}
   * @private
   */
  baseSplineThrough = (drawers, points = []) => {
    if (this.path.length) {
      points.unshift(...lastTwo(last(this.path)))
    }

    if (drawers[1] && this.isRelative()) {
      // recall this function with only one function which will make it go after the if to call the function
      return this.drawer([drawers[1]], points);
    }

    this.path.push(...drawers[0](...points));
    // since the spline through functions
    return this;
  }

  /**
   * @param {...Number} points
   * @returns {this}
   */
  splineThrough = (...points) => {
    return this.baseSplineThrough(
      [PathUtils.splineThrough, PathUtils.dsplineThrough],
      points,
    );
  }

  /**
   * @param {...Number} points
   * @returns {this}
   */
  dsplineThrough = (...points) => {
    return this.baseSplineThrough([PathUtils.dsplineThrough], points);
  }

  /**
   * @param  {...*} args
   * @returns {this}
   */
  curve = (...args) => {
    let drawer;

    if (typeof args[args.length - 1] === 'string') {
      drawer = this.staticMatcher(args.pop());
    }

    if (!drawer) {
      drawer = match(args.length)
        .case(0, () => () => { })
        .case(2, () => match(args[0])
          .case('x', () => this.hline)
          .case('y', () => this.vline)
          .default(() => this.line)
        )
        .case(4, () => this.quadraticBezier)
        .case(6, () => this.cubicBezier)
        .case(7, () => this.arc)
        .default(() => {
          throw new Error(`Invalid curve arguments. ${args}`);
        });
    }

    drawer(...args);
    return this;
  }

  /**
   * @param  {...*} args
   * @returns {this}
   */
  dcurve = (...args) => {
    try {
      this.d.curve(...args);
    } catch (error) {
      if (error.message.indexOf('Invalid curve arguments') !== -1) {
        throw new Error(`Invalid dcurve arguments. ${args}`);
      }

      throw error;
    }

    return this;
  }

  /**
   * @param {String} methodName
   * @returns {Function | undefined}
   * @private
   */
  staticMatcher = methodName => {
    return match(methodName)
      .case(PathUtils.commands.ARC, () => this.arc)
      .case(PathUtils.commands.DARC, () => this.darc)
      .case(PathUtils.commands.CLOSE, () => this.close)
      .case(PathUtils.commands.DCLOSE, () => this.dclose)
      .case(PathUtils.commands.CUBIC_BEZIER, () => this.cubicBezier)
      .case(PathUtils.commands.DCUBIC_BEZIER, () => this.dcubicBezier)
      .case(PathUtils.commands.SMOOTH_CUBIC_BEZIER, () => this.smoothCubicBezier)
      .case(PathUtils.commands.DSMOOTH_CUBIC_BEZIER, () => this.dsmoothCubicBezier)
      .case(PathUtils.commands.LINE, () => this.line)
      .case(PathUtils.commands.DLINE, () => this.dline)
      .case(PathUtils.commands.VLINE, () => this.vline)
      .case(PathUtils.commands.DVLINE, () => this.dvline)
      .case(PathUtils.commands.HLINE, () => this.hline)
      .case(PathUtils.commands.DHLINE, () => this.dhline)
      .case(PathUtils.commands.MOVE, () => this.move)
      .case(PathUtils.commands.DMOVE, () => this.dmove)
      .case(PathUtils.commands.QUADRATIC_BEZIER, () => this.quadraticBezier)
      .case(PathUtils.commands.DQUADRATIC_BEZIER, () => this.dquadraticBezier)
      .case(PathUtils.commands.SMOOTH_QUADRATIC_BEZIER, () => this.smoothQuadraticBezier)
      .case(PathUtils.commands.DSMOOTH_QUADRATIC_BEZIER, () => this.dsmoothQuadraticBezier)
      .exec();
  }

  /**
   * @returns {this}
   */
  removeUselessMoves = () => {
    this.path = PathUtils.removeUselessMoves(this.path);
    return this;
  }
}

/**
 * @callback Arc
 * @param {Number} rx
 * @param {Number} ry
 * @param {Number} angle
 * @param {Boolean} largeArcFlag
 * @param {Boolean} sweepFlag
 * @param {Number} x
 * @param {Number} y
 * @returns {PathCreatorType}
 */
/**
 * @callback CubicBezier
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @param {Number} x
 * @param {Number} y
 * @returns {PathCreatorType}
 */

/**
 * @typedef {Object} PathCreatorType
 * @property {(String | Number)[][]} path
 * @property {PathCreatorType} d
 * @property {(relative?: Boolean) => PathCreatorType} relative
 * @property {(absolute?: Boolean) => PathCreatorType} absolute
 * @property {Arc} arc
 * @property {Arc} darc
 * @property {() => PathCreatorType} close
 * @property {() => PathCreatorType} dclose
 * @property {CubicBezier} cubicBezier
 * @property {CubicBezier} dcubicBezier
 * @property {(x2: Number, y2: Number, x: Number, y: Number) => PathCreatorType} smoothCubicBezier
 * @property {(x2: Number, y2: Number, x: Number, y: Number) => PathCreatorType} dsmoothCubicBezier
 * @property {(x: Number, y: Number) => PathCreatorType} line
 * @property {(x: Number, y: Number) => PathCreatorType} dline
 * @property {(y: Number) => PathCreatorType} vline
 * @property {(y: Number) => PathCreatorType} dvline
 * @property {(x: Number) => PathCreatorType} hline
 * @property {(x: Number) => PathCreatorType} dhline
 * @property {(x: Number, y: Number) => PathCreatorType} move
 * @property {(x: Number, y: Number) => PathCreatorType} dmove
 * @property {(x1: Number, y1: Number, x: Number, y: Number) => PathCreatorType} quadraticBezier
 * @property {(x1: Number, y1: Number, x: Number, y: Number) => PathCreatorType} dquadraticBezier
 * @property {(x: Number, y: Number) => PathCreatorType} smoothQuadraticBezier
 * @property {(x: Number, y: Number) => PathCreatorType} dsmoothQuadraticBezier
 * @property {(...points: Number[]) => PathCreatorType} splineThrough
 * @property {(...points: Number[]) => PathCreatorType} dsplineThrough
 * @property {(...args: Array) => PathCreatorType} curve
 * @property {(...args: Array) => PathCreatorType} dcurve
 * @property {() => PathCreatorType} removeUselessMoves
 */

/**
 * @param {((Number | String)[] | String)[]} [path]
 * @return {PathCreatorType}
 */
// @ts-ignore
export const pathCreator = (path) => new PathCreator(path);
