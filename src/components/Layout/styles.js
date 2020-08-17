import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.primaryColor,
    height: 60,
    top: 0,
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    elevation: 6.0,
    borderBottomColor: colors.lightgrey,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  outerCircle: {
    padding: 7,
    borderRadius: 50,
    backgroundColor: colors.lightgrey,
  },
  innerCircle: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 50,
    borderWidth: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.yellow,
  },
  rightView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bubbleText: {
    fontSize: 18,
    color: colors.white,
  },
  userImg: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  settingBtn: {
    marginRight: 30,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 50,
  },
  backBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default styles;
