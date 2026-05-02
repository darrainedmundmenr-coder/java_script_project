// // function calculate(){
// //     var temperature = parseFloat($('#temperature').val())
// //     var conversionoption = $('#dropdown_id').val()


// //     if (conversionoption === 'FtoC'){
// //         var result = (temperature - 32)* 5/9
// //             $('#result').html(temperature + 'C = ' + result.toFixed(2) + 'Celsius')
    
// //     } else if (conversionoption === 'CtoK'){
// //         var result = (temperature + 273.15)
// //             $('#result').html(temperature + 'F = ' + result.toFixed(2) + 'Kelvin')
    
// //     } else if (conversionoption === 'KtoC'){
// //         var result = (temperature - 273.15)
// //             $('#result').html(temperature + 'K =' + result.toFixed(2) + 'Celsius')
    
// //     } else if (conversionoption === 'CtoF'){
// //        var result = (temperature * 9/5)+32
// //             $('#result').html(temperature + 'C = ' + result.toFixed(2) + 'Fahrenheit')
// //     }
        

    


// }

$('#changeBtn').click(function() {
  // 1. It finds #myMessage
  // 2. It "erases" the old text
  // 3. It writes the new text in its place
  $('#myMessage').text('This is the NEW message!');
});
