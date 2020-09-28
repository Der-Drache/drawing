import React from 'react'
import PropTypes from 'prop-types';
import { SVG, G } from '@svgdotjs/svg.js';

import './Svg.css';

import { getTransformQuery, setTransformQuery } from '../../../utils';
import { Zoomer } from '../../../services';

const defaultSvgBgColor = '#ced3d4';

/**
 * @typedef {import('@svgdotjs/svg.js').Svg} SVG
 */

class Svg extends React.Component {

  /**
   * @type {SVG}
   */
  svg;
  /**
   * @type {G}
   */
  svgContainer;
  /**
   * @type {Zoomer}
   */
  zoomer;

  componentDidMount() {
    const { bgColor } = this.props;
    const transform = getTransformQuery();

    this.svg = /** @type {SVG} */ (this.props.svg)
      .addTo('#svg-container')
      .size('100%', '100%')
      .css('background-color', bgColor);

    this.zoomer = new Zoomer(document.getElementsByTagName('svg')[0])
      .onZoom(this.handleZoom)
      .initOnce(transform);

    process.nextTick(() => this.handleZoom({ transform }))
  }

  /**
   * @param {Object} e
   * @param {Object} e.transform
   * @param {Number} e.transform.x
   * @param {Number} e.transform.y
   * @param {Number} e.transform.k
   */
  handleZoom = e => {
    this.transformSvgRoot(e);
    setTransformQuery(e.transform);
  }

  /**
   * @param {Object} e
   * @param {Object} e.transform
   * @param {Number} e.transform.x
   * @param {Number} e.transform.y
   * @param {Number} e.transform.k
   */
  transformSvgRoot = e => {
    const { x, y, k } = e.transform;

    const rootSvg = document.getElementById('svg-root');
    rootSvg.setAttribute('transform', `translate(${x} ${y}) scale(${k})`);
  }

  render() {
    return (
      <div id="svg-container">

      </div>
    );
  }
}

Svg.propTypes = {
  svg: PropTypes.object.isRequired,
  bgColor: PropTypes.string,
}

Svg.defaultProps = {
  bgColor: defaultSvgBgColor,
}

export default Svg;
