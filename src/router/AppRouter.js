import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from '../component/main/Main';
import Wrapper from '../component/wrapper/Wrapper'; 

const AppRouter = () => (
  <BrowserRouter>
    <Wrapper>
      <Switch>
        <Route path='/' component={Main} exact={true} />
      </Switch>
    </Wrapper>
  </BrowserRouter>
)

export default AppRouter;