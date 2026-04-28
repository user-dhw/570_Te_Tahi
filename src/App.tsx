import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Story from './pages/Story';
import Themes from './pages/Themes';
import Activities from './pages/Activities';
import About from './pages/About';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}
