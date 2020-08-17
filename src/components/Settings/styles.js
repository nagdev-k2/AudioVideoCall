import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.randomColor,
  },
  outerCircle: {
    padding: 10,
    opacity: 0.5,
  },
  userImg: {
    width: 150,
    height: 150,
  },
  imgIcon: {
    color: colors.primaryColor,
    fontSize: 25,
    borderColor: colors.primaryColor,
    borderWidth: 1,
    padding: 5,
    borderRadius: 50,
    width: 40,
    textAlign: 'center',
    alignSelf: 'flex-end',
    bottom: 20,
    backgroundColor: colors.white,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgrey,
    marginBottom: 10,
    width: '90%',
  },
  genderView: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
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
  btnText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
