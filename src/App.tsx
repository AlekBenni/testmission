import React, {useEffect} from 'react';
import Header from './components/Header';
import RouteComponent from './components/RouteComponent';
import {BrowserRouter, Route} from 'react-router-dom'
import Choose from './components/Choose';
import { getSmallDataTC } from './api/smallDataActions';
import {useDispatch} from 'react-redux'
import { getBigDataTC } from './api/bigDataActions';

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getBigDataTC())
    dispatch(getSmallDataTC())
  },[])

  return (
    <BrowserRouter>
      <div>
          <Header/>
          <div>
              <Route exact path="/" render = {() => <Choose />} />
              <RouteComponent/>
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
