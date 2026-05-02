function calculate(){
    var temperature = parseFloat(document.getElementById('temperature').value)
    var conversionoption = document.getElementById('dropdown_id').value


    if (conversionoption === 'FtoC'){
        var result = (temperature - 32)* 5/9
            document.getElementById('result').innerHTML = 
            temperature + 'C = ' + result.toFixed(2) + 'Celsius'
    
    } else if (conversionoption === 'CtoK'){
        var result = (temperature + 273.15)
            document.getElementById('result').innerHTML = 
            temperature + 'F = ' + result.toFixed(2) + 'Kelvin'
    
    } else if (conversionoption === 'KtoC'){
        var result = (temperature - 273.15)
            document.getElementById('result').innerHTML = 
            temperature + 'K =' + result.toFixed(2) + 'Celsius'
    
    } else if (conversionoption === 'CtoF'){
       var result = (temperature * 9/5)+32
        document.getElementById('result').innerHTML = 
        temperature + 'C = ' + result.toFixed(2) + 'Fahrenheit'
    }
        

    


}