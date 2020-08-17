import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 60,
  },
  innerCircle: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: colors.randomColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    padding: 10,
    opacity: 0.5,
    borderRadius: 50,
    backgroundColor: colors.randomColor,
  },
  userImg: {
    width: 150,
    height: 150,
    borderRadius: 20,
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
