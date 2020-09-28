export class KeyHandler {

  /**
   * @type {String[]}
   */
  pressedKeys = [];
  /**
     * @type {{ keys: String[], whenCallback?: Function, orCallback?: Function, isActive?: Boolean }[]}
   */
  handlers = [];

  constructor() {
    this.init();
  }

  /**
   * @param {String[]} keys
   */
  when = keys => {
    return {
      /**
       * @param {Function} callback
       * @returns {this}
       */
      then: (callback) => {
        this.handlers.push({ keys, whenCallback: callback, orCallback: null });
        return this;
      },
    };
  }

  /**
   * @param {String[]} keys
   */
  whenOr = keys => {
    /**
     * @type {{ keys: String[], whenCallback?: Function, orCallback?: Function }}
     */
    const handler = {
      keys,
    };

    const returnObject = {
      /**
       * @param {Function} callback
       * @returns {returnObject}
       */
      then: (callback) => {
        handler.whenCallback = callback;

        if (handler.orCallback) {
          this.handlers.push(handler);
        }

        return returnObject;
      },

      /**
       * @param {Function} callback
       * @returns {returnObject}
       */
      or: (callback) => {
        handler.orCallback = callback;

        if (handler.whenCallback) {
          this.handlers.push(handler);
        }

        return returnObject;
      }
    };

    return returnObject;
  }

  /**
   * @param {String} key
   * @returns {Boolean}
   */
  isPressed = key => {
    return this.pressedKeys.includes(key);
  }

  /**
   * @param {String[]} keys
   * @returns {Boolean}
   */
  arePressed = keys => {
    return keys.every(this.isPressed);
  }

  /**
   * @param {KeyboardEvent} e
   * @private
   */
  onKeyDown = e => {
    this.pressedKeys.push(e.key);

    this.handlers = this.handlers.map(handler => {
      if (this.arePressed(handler.keys)) {
        handler.isActive = true;
        handler.whenCallback();
      }

      return handler;
    });
  }

  /**
   * @param {KeyboardEvent} e
   * @private
   */
  onKeyUp = e => {
    this.pressedKeys = this.pressedKeys.filter(k => k !== e.key);

    this.handlers = this.handlers.map(handler => {
      // if the handler was pressed (isActive) and no longer is
      if (handler.isActive && !this.arePressed(handler.keys)) {
        handler.isActive = false;
        handler.orCallback && handler.orCallback();
      }

      return handler;
    });
  }

  /**
   * @private
   */
  init = () => {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }
}
