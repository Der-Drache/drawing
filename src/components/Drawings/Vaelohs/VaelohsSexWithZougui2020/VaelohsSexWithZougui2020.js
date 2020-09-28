import React from 'react';
import { SVG } from '@svgdotjs/svg.js';

import { vaelohs } from './vaelohs';
import { zougui } from './zougui';
import { Svg } from '../../../common';
import { createSvgRoot, orderPaths } from '../../../../services';
import { PathCreator } from './../../../../services/svg/PathCreator';

export const VaelohsSexWithZougui2020 = () => {

  const svg = SVG();
  const svgRoot = createSvgRoot(svg);

  vaelohs(svgRoot);
  zougui(svgRoot);

  orderPaths(svgRoot);

  return <Svg svg={svg} />;
}
