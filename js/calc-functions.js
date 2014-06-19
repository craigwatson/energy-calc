function validateReadings(fieldPrefix,errorText) {
  var startReading = $('#' + fieldPrefix + '-start-reading').val();
  var endReading = $('#' + fieldPrefix + '-end-reading').val();
  var unitPrice = $('#' + fieldPrefix + '-unit-price').val();
  var unitsUsed = endReading - startReading;
  var totalCharge = ((unitsUsed*unitPrice)/100);

  if (!validateData(startReading,endReading,'#' + fieldPrefix + '-feedback',errorText,'#' + fieldPrefix + '-total')) {
    return false;
  }

  $('#' + fieldPrefix + '-units').val(unitsUsed);
  $('#' + fieldPrefix + '-total').val(totalCharge.toFixed(2));
  updateTotals();
}

/* Validates two data points, and updates feedback field and resets a field if not valid */
function validateData(startValue,endValue,feedbackField,errorText,errorResetField) {
  /*alert (startValue + ' ' + endValue);*/
  if ((startValue == 0) || (endValue == 0)) {
    $(feedbackField).hide();
    $(feedbackField).removeClass('green');
    $(feedbackField).removeClass('red');
    return false;
  } else if (startValue > endValue) {
    $(feedbackField).show();
    $(feedbackField).removeClass('green');
    $(feedbackField).addClass('red');
    $(feedbackField).html(errorText);
    $(errorResetField).val(0);
    return false;
  } else {
    $(feedbackField).hide();
    $(feedbackField).removeClass('green');
    $(feedbackField).removeClass('red');
    return true;
  }
}

/* Toggles display of Economy7/Single meter elements */
function meterToggle() {
  updateTotals();
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
  return (Math.round(diff/86400000))+1;
}

/* Returns a specified form field value as a Float */
function getValueAsFloat(field) {
  var fieldValue = $(field).val();
  var parsed = parseFloat(fieldValue);
  if (!parsed) {
    return parseFloat(0);
  } else {
    return parsed;
  }
}
