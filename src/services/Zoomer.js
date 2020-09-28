import _ from 'lodash';
import * as d3 from 'd3';

import { KeyHandler } from './KeyHandler';

export class Zoomer {

  /**
   * @type {HTMLCanvasElement | SVGElement}
   */
  drawingElement;
  /**
   * @type {d3.Selection}
   */
  selection;
  /**
   * @type {Function}
   */
  handleZoom;
  /**
   * @type {Boolean}
   */
  initialized = false;
  /**
   * @type {[Number, Number]}
   */
  scaleExtent = [0.1, 500000];
  /**
   * @type {KeyHandler}
   */
  keyHandler;
  /**
   * @type {Number}
   */
  oldK = 1;
  /**
   * @type {Number}
   */
  oldX = 1;
  /**
   * @type {Number}
   */
  oldY = 1;
  /**
   * @type {Number}
   */
  zoomFactor = 1;
  /**
   * @type {Number}
   */
  initialZoomFactor = 1;
  /**
   * @type {Number}
   */
  increasedZoomFactor = 2;
  /**
   * @type {Number}
   */
  superZoomFactor = 4;
  offsetX = 0;
  offsetY = 0;
  offsetK = 0;

  /**
   * @param {HTMLCanvasElement | SVGElement} drawingElement
   */
  constructor(drawingElement) {
    this.drawingElement = drawingElement;
    this.selection = d3.select(drawingElement);
    this.keyHandler = new KeyHandler()
  }

  /**
   * @param {Function} handleZoom
   * @returns {this}
   */
  onZoom = (handleZoom) => {
    this.handleZoom = handleZoom;
    return this;
  }

  /**
   * @param {Number} [min]
   * @param {Number} [max]
   * @returns {this}
   */
  setScaleExtent = (min, max) => {
    this.scaleExtent = [min, max];
    return this;
  }

  /**
   * @param {Object} [transform]
   * @param {Number} [transform.x=1]
   * @param {Number} [transform.y=0]
   * @param {Number} [transform.k=0]
   */
  transform = ({ k = 1, x = 0, y = 0 } = {}) => {
    this.oldK = k;
    this.oldX = x;
    this.oldY = y;

    const transform = d3
      .zoomTransform(this.drawingElement)
      .scale(k)
      .translate(x, y);

    d3.zoom().transform(this.selection, transform);
  }

  /**
   * @param {Number} currentValue
   * @param {Number} previousValue
   * @returns {Number}
   * @private
   */
  scaleUpZooming = (currentValue, previousValue, offset) => {
    //currentValue += offset;
    //previousValue += offset;
    const delta = currentValue - previousValue;
    const k = previousValue + this.zoomFactor * delta;
    return +k.toFixed(2);
    //return +currentValue.toFixed(2)
  }

  /**
   * @param {Object} e
   * @param {Object} e.transform
   */
  smoothFixer = e => {
    const event = {
      ...e,
      transform: {
        ...e.transform,
        x: e.transform.x + 0.01,
      }
    }
    this.handleZoom(event);
  }

  /**
   * @param {Object} [defaultTransform]
   * @param {Number} [defaultTransform.x]
   * @param {Number} [defaultTransform.y]
   * @param {Number} [defaultTransform.k]
   * @returns {this}
   */
  init = (defaultTransform) => {
    if (defaultTransform) {
      const scale = defaultTransform.k || 1;
      const x = defaultTransform.x || 0;
      const y = defaultTransform.y || 0;

      this.transform({
        k: scale,
        x: x / scale,
        y: y / scale,
      });
    }

    // init event listeners
    this.initClearTransform();
    this.initIncreaseZoomFactor();
    this.initClearTranslate();
    this.initSuperZoomFactor();

    const throttler = _.debounce(this.smoothFixer, 500);

    this.selection.call(d3.zoom()
      .scaleExtent(this.scaleExtent)
      .on('zoom', (event) => {
        if (event.sourceEvent) {
          // increase scaling and re-calculate the translate accordingly
          /*const prevK = event.transform.k = event.transform.k || 1;
          const prevX = event.transform.x = event.transform.x || 0;
          const prevY = event.transform.y = event.transform.y || 0;*/
          const { k, x, y } = event.transform;
          event.transform.k = this.scaleUpZooming(k, this.oldK, this.offsetK);
          event.transform.x = this.scaleUpZooming(x, this.oldX, this.offsetX);
          event.transform.y = this.scaleUpZooming(y, this.oldY, this.offsetY);

          /*console.log('k', {
            k,
            //prevK,
            //oldK: this.oldK,
            offsetK: this.offsetK,
          })
          console.log('x', {
            x,
            //prevX,
            //oldX: this.oldX,
            offsetX: this.offsetX,
          })
          console.log('y', {
            y,
            //prevY,
            //oldY: this.oldY,
            offsetY: this.offsetY,
          })*/

          this.handleZoom(event);

          this.oldK = event.transform.k;
          this.oldX = event.transform.x;
          this.oldY = event.transform.y;

          //this.offsetK = this.offsetX = this.offsetY = 0;
          throttler(event);
        }
      })
    );

    return this;
  }

  /**
   * @param {Object} [defaultTransform]
   * @param {Number} [defaultTransform.x]
   * @param {Number} [defaultTransform.y]
   * @param {Number} [defaultTransform.k]
   * @returns {this}
   */
  initOnce = (defaultTransform) => {
    if (!this.initialized) {
      this.init(defaultTransform);
      this.initialized = true;
    }
    return this;
  }

  /**
   * @param {Object} transform
   * @param {Number} transform.k
   * @param {Number} transform.x
   * @param {Number} transform.y
   * @private
   */
  updateTransform = transform => {
    this.transform(transform);
    this.handleZoom({ transform });
    // find a fix to avoid relaoding the window
    // bug: when doing a manual update, the transform is set correctly but gets back to its previous
    // state when a move or zoom event is triggered by the user
    //window.location.reload();
  }

  /**
   * @private
   */
  initClearTransform = () => {
    this.keyHandler
      .when(['Control', 'Shift', 'Z'])
      .then(() => {
        /*this.offsetX = this.oldX * -1;
        this.offsetY = this.oldY * -1;
        this.offsetK = this.oldK * -1;
        console.log(this.offsetX)
        console.log(this.offsetY)
        console.log(this.offsetK)*/
        //this.oldK *= -1;
        //this.oldX *= -1;
        //this.oldY *= -1;
        this.updateTransform({ k: 1, x: 0, y: 0 })
      })
  }

  /**
   * @private
   */
  initIncreaseZoomFactor = () => {
    this.keyHandler
      .whenOr(['Shift'])
      .then(() => this.zoomFactor = this.increasedZoomFactor)
      .or(() => this.zoomFactor = this.initialZoomFactor);
  }

  /**
   * @private
   */
  initSuperZoomFactor = () => {
    this.keyHandler
      .whenOr(['Shift', 'Alt'])
      .then(() => this.zoomFactor = this.superZoomFactor)
      .or(() => this.zoomFactor = this.initialZoomFactor);
  }

  /**
   * @private
   */
  initClearTranslate = () => {
    this.keyHandler
      .when(['Control', ' '])
      .then(() => {
        const halfX = window.innerWidth / 2;
        const halfY = window.innerHeight / 2;
        this.updateTransform({ k: this.oldK, x: halfX, y: halfY })
      });
  }
}
