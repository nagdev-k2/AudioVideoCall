import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    padding: 5,
  },
  listItemContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    height: 60,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    borderColor: 'lightgrey',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callBtn: {
    padding: 8,
  },
  outerCircle: {
    opacity: 0.5,
    padding: 8,
    borderRadius: 50,
    marginRight: 10,
  },
  innerCircle: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 50,
    borderWidth: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImg: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
});

export default styles;
