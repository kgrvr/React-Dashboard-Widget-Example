import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

import { Dashboard } from './dashboard/Dashboard';

const App = () => {
  return <Dashboard />;
};

render(<App />, document.getElementById('root'));
