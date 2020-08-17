import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../constants/colors';

let dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export default StyleSheet.create({
  max: {
    flex: 1,
  },
  callContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonHolder: {
    height: 100,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.primaryColor,
    borderRadius: 25,
  },
  endCallBtn: {
    alignSelf: 'center',
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 18,
    margin: 15,
  },
  buttonText: {
    color: colors.white,
  },
  fullView: {
    width: dimensions.width,
    height: dimensions.height - 100,
  },
  halfViewRow: {
    flex: 1 / 2,
    flexDirection: 'row',
  },
  full: {
    justifyContent: 'center',
    alignItems: 'center',
    height: dimensions.height,
    width: dimensions.width,
  },
  half: {
    flex: 1 / 2,
  },
  localVideoStyle: {
    width: 120,
    height: 150,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  nameBubble: {
    backgroundColor: colors.randomColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
  },
  innerBubble: {
    opacity: 0.8,
    backgroundColor: colors.randomColor,
    padding: 15,
    borderRadius: 50,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: colors.primaryColor,
  },
  callFooterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
    bottom: 50,
  },
  blurView: {
    opacity: 0.5,
    backgroundColor: colors.lightgrey,
    zIndex: 9,
  },
  ringing: {
    position: 'absolute',
    zIndex: 8,
    opacity: 0.8,
    backgroundColor: colors.lightgrey,
  },
  toggleCamera: {
    top: 20,
    left: 20,
    position: 'absolute',
    zIndex: 9,
  },
  bubbleText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 100,
  },

  callView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '20%',
    backgroundColor: colors.white,
  },
  callerText: {
    fontSize: 25,
    marginBottom: 50,
  },
  audioCallFullView: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImg: {
    marginBottom: 20,
    borderRadius: 20,
    width: 200,
    height: 200,
  },
});
