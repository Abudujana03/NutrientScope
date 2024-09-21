// // import React from 'react';
// // import Home from './components/Home';

// // function App() {
// //   return (
// //     <>
// //       <div className="App">
// //         {/* <FilterSortBar /> */}
// //         <Home />
// //         {/* <ProductCard /> */}
// //       </div>
// //     </>
// //   );
// // }

// // export default App;




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
// import ProductDetail from './components/ProductDetail';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/product/:id" element={<ProductDetail />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default App;

