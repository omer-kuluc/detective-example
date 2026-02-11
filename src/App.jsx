import { useLayoutEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'; // Route buraya eklendi
import './App.css'
import Password from './components/Password'
import Header from './components/Header';
import Home from './components/Home'
import Cases from './components/Cases';
import About from './components/About';
import Objects from './components/Objects';


function App() {
  const PageWrapper = ({ children }) => {
    const location = useLocation();

    useLayoutEffect(() => {
      window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
      <div className="page-transition-wrapper">
        {children}
      </div>
    );
  };




  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
      {!isUnlocked ? (
        <Password onUnlock={() => setIsUnlocked(true)} />
      ) : (
        <>
          <Header />
          <PageWrapper>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cases' element={<Cases />} />
              <Route path='/about' element={<About />} />
              <Route path='/objects' element={<Objects />} />
            </Routes>

          </PageWrapper>
        </>
      )}
    </div>
  )
}

export default App