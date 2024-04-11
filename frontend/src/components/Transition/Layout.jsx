// Layout.jsx
import { useEffect, useRef } from 'react';
import Swup from 'swup';
import "../Transition/style.css"
import PropTypes from 'prop-types';


const Layout = ({ children }) => {
  const swup = useRef(null);

  useEffect(() => {
    swup.current = new Swup();
  }, []);

  return <div id="swup" dangerouslySetInnerHTML={{ __html: children }} />;
};

Layout.propTypes = {
    children: PropTypes.node.isRequired, 
};

export default Layout;
