import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgrey,
    marginBottom: 10,
    width: '90%',
  },
  btn: {
    backgroundColor: colors.primaryColor,
    marginTop: 30,
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    width: '90%',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    padding: 20,
    fontWeight: 'bold',
  },
  headingText: {
    fontSize: 12,
    paddingBottom: 20,
    color: colors.grey,
  },
  btnText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  genderView: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 0,
  },
  radioBtn: {
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioBtnText: {
    color: colors.black,
    marginLeft: 5,
  },
  errMsg: {
    fontSize: 15,
    color: colors.red,
  },
});

export default styles;
