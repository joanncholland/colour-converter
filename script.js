// get values of user input for converting from and converting to
function getUserInput() {
    // get user convert from value
    let convertFromIndex = document.getElementById('convertFromSelect').selectedIndex
    let convertFromOptions = document.getElementById('convertFromSelect').options
    let userConvertFrom = convertFromOptions[convertFromIndex].text

    // get user convert to value
    let convertToIndex = document.getElementById('convertToSelect').selectedIndex
    let convertToOptions = document.getElementById('convertToSelect').options
    let userConvertTo = convertToOptions[convertToIndex].text

    // get user input value
    let userInputValue = document.getElementById('inputValue').value

    // if the user has entered a value
    if (userInputValue) {
        // return array of user inputs
        return [userConvertFrom, userInputValue, userConvertTo]
    } else {
        // otherwise, prompt them to enter a value
        alert('Please enter a value.')
    }


}

// convert the value using The Color API
let result;
function convert() {

    let userInputs = getUserInput()

    let requestURL = "http://thecolorapi.com/id?" + userInputs[0] + "=" + userInputs[1] + "&format=json"
    let xhr = new XMLHttpRequest()
    xhr.open('GET', requestURL, true)
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            let response = JSON.parse(xhr.responseText)
            if (userInputs[2] === "rgb") {
                result = response.rgb.value
            } else if (userInputs[2] === "hex") {
                result = response.hex.value
            } else if (userInputs[2] === "hsl") {
                result = response.hsl.value
            } else {
                result = response.cmyk.value
            }
            document.getElementById('valueConverted').innerHTML = result
        }
    }
    xhr.send()

    setInterval(() => {
        showSchemePrompt()
    }, 2000);
}

function showSchemePrompt() {
    console.log('show prompt')
    $('#schemePrompt').fadeIn(1000)

}

function removePrompt() {
    $('#schemePrompt').fadeOut(1000)
}

function showGenerator() {
    $('#colourSchemeGenerator').fadeIn(1000)
}

function getUserSchemeInput() {
    // get user theme
    let userThemeIndex = document.getElementById('themeSelect').selectedIndex
    let userThemeOptions = document.getElementById('themeSelect').options
    let userTheme = userThemeOptions[userThemeIndex].text

    // get user number of colours
    let numberColoursIndex = document.getElementById('numberSelect').selectedIndex
    let numberColoursOptions = document.getElementById('numberSelect').options
    let userNumberColours = numberColoursOptions[numberColoursIndex].text

    return [userTheme, userNumberColours]
}

function generateColourScheme() {
    let userInputs = getUserInput()
    console.log(userInputs)
    let userColourInputs = getUserSchemeInput()
    console.log(userColourInputs)
    console.log(result)

    // generate colour scheme
    let requestURL;
    if (userInputs[2]==="hex"){
        requestURL = "http://thecolorapi.com/scheme?" + userInputs[2] + "=" + result.slice(1, 7) + "&format=json&mode=" + userColourInputs[0] + "&count=" + userColourInputs[1]
    } else {
        requestURL = "http://thecolorapi.com/scheme?" + userInputs[2] + "=" + result + "&format=json&mode=" + userColourInputs[0] + "&count=" + userColourInputs[1]
    }
    console.log(requestURL)
    let xhr = new XMLHttpRequest()
    xhr.open('GET', requestURL, true)
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            let response = JSON.parse(xhr.responseText)
            console.log(response.colors)
            let colours = response.colors
            for (let i = 0; i < colours.length; i++) {
                let colour = colours[i].rgb.value
                console.log(colour)
                let colourString = 'colour' + (i + 1)
                document.getElementById(colourString).style.backgroundColor = colour
            }
        }
    }
    xhr.send()
}

// check of jQuery works
if (typeof jQuery === 'undefined') {
    // jQuery is NOT available
    console.log('no jquery')
} else {
    // jQuery is available
    console.log('jquery installed')

}