/* Toggles display of Economy7/Single meter elements */
function meterToggle() {
  if ($('#meter-type').val() == 'e7') {
    $('.e7-field').show();
    $('.single-field').hide();
  } else if($('#meter-type').val() == 'single'){
    $('.e7-field').hide();
    $('.single-field').show();
  }
}

/* Splits a String DD/MM/YYYY date into a date object */
function parseDate(theDate) {
  var paramDate = theDate.split('/');
  if (paramDate.length < 3) {
    return false;
  } else {
    return new Date(paramDate[2],(parseInt(paramDate[1],10)-1),parseInt(paramDate[0],10));
  }
}

/* Translates a date object into DD/MM/YYYY */
function outputDate(theDate) {
  return theDate.getDate() + "/" + pad((theDate.getMonth()+1),2,0) + "/" + theDate.getFullYear();
}

/* Assumes date2 is ALWAYS greater, and both parameters are date objects */
function diffDates(date1,date2) {
  var date1Milliseconds = date1.getTime();
  var date2Milliseconds = date2.getTime();
  var diff = date2Milliseconds - date1Milliseconds;
  return Math.round(diff/86400000);
}