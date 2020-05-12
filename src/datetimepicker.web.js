import React, {Fragment} from 'react';
import SimplePicker from 'simplepicker';
const styles = require('simplepicker/dist/simplepicker.css');

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
  const picker = new SimplePicker();

  switch(mode){
    case 'date':
      picker.disableTimeSection();
      break;
    default:
      picker.enableTimeSection();
  }
  picker.on('submit', (date, readableDate) => onChange({}, date));
  picker.on('close', () => onChange({}));
  picker.open();
  return <Fragment></Fragment>
}
