import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { VaelohsSexWithZougui2020 } from './components/Drawings';

const App = () => (
  <BrowserRouter>
    <Route exact path="/vaelohs/zougui/nsfw" component={VaelohsSexWithZougui2020} />
  </BrowserRouter>
);

export default App;
