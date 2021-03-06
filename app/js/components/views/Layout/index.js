import React, { PropTypes } from 'react';

import TopBar from 'js/containers/TopBar';
import BottomBar from 'js/components/ui/BottomBar';

import styles from './style.scss';

const Layout = ({ children }) =>
  <div className={styles.layoutContainer}>
    <TopBar />
    <div className={styles.content}>
      {children}
    </div>
    <BottomBar />
  </div>;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
