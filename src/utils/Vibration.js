const vibrate = (...duration) => {
  window.navigator.vibrate([...duration]);
};

export default vibrate;
