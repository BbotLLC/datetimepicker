import React, {Fragment} from 'react';
import SimplePicker from 'simplepicker';
const styles = require('simplepicker/dist/simplepicker.css');
let picker;

export default function RNDateTimePicker({
  mode,
  value,
  display,
  onChange,
  is24Hour,
  minimumDate,
  maximumDate,
}){
  if(!document.getElementById('simplepickerstyle')) {
    let style = document.createElement("style");
    style.setAttribute('id', 'simplepickerstyle');
    style.textContent = styles;
    document.getElementsByTagName("head")[0].appendChild(style);
  }
  picker = new SimplePicker({
    selectedDate: value
  });

  switch(mode){
    case 'date':
      picker.disableTimeSection();
      break;
    default:
      picker.enableTimeSection();
  }

  picker._eventHandlers = {}; // hacky, but no 'off' function
  picker.on('submit', (date, readableDate) => {
    onChange({}, date);
    // for some reason, we need to close here:
    picker.close();
  });
  picker.on('close', () => {
    // null `event` object to mirror android/ios behaviour
    onChange({}, value)
    picker.$simplepickerWrapper.remove();
  });

  // only show if not already shown (prevents duplicate)
  if(!picker.$simplepickerWrapper.classList.contains('active')) {
    picker.open();
  }
  return <Fragment></Fragment>
}
