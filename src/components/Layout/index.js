import React from 'react';
import {View} from 'react-native';

import styles from './styles';
import Header from './header';

const Layout = (props) => {
  const {navigation, isBack, children, title} = props;
  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={title} isBack={isBack} />
      {children}
    </View>
  );
};

export default Layout;
