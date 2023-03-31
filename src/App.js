import React from 'react';
import Todo from './Todo';

const App = () => {
  return (
    <div className="w-screen h-screen pt-10 box-border font-spectral overflow-auto text-[#fff] bg-slate-800">
      <Todo />
    </div>
  );
}

export default App;