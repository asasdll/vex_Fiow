function fillTheRest(note, button) {
    let noteVal = findValue(note);
    let buttonVal = findValue(button);
    let spaceVal = noteVal - buttonVal;

    spaceValDec = spaceVal % 1;
    spaceValOdd = (spaceVal - spaceValDec) % 2;
    spaceValEven = (spaceVal - spaceValOdd) - spaceValDec;


    console.log(`key, octave, ${button}`)



    determineSpace(spaceValDec);
    determineSpace(spaceValOdd);
    determineSpace(spaceValEven);
    // console.log(spaceValDec);
    // console.log(spaceValOdd);
    // console.log(spaceValEven)


}

function findValue(note) {
    let value = note;
    let returnValue;

    switch (value) {
        case 'w': returnValue = 4;
            break;
        case 'h': returnValue = 2;
            break;
        case 'q': returnValue = 1;
            break;
        case '8': returnValue = 0.5;
            break;
        case '16': returnValue = 0.25;
            break;
        case '32': returnValue = 0.125;
            break;
        case '64': returnValue = 0.025;
            break;
        default: console.log("Don't have this value");
    }
    return returnValue;

}

function determineSpace(space) {

    let values = space;

    while (values > 0) {
        if (values < 1 && values > 0.5 || values == 0.25) {
            console.log(`key, octave, 16`);
            values = values - 0.25;
        } else if (values == 0.5) {
            console.log(`key, octave, 8`);
            values = values - 0.5;
        } else if (values == 1) {
            console.log(`key, octave, q`);
            values = values - 1;
        } else if (values > 1) {
            console.log(`key, octave, h`);
            values = values - 2;
        } else {
            console.log('tada');
        }

    }

}

// (values < 1 && values > 0.75) {
//     console.log('key, octave, 32');
//     values = values - 0.125;




// function determineSpace

// q
// 50 50
// 25 25 25 25
// 12 12 12 12 / 12 12 12 12 

// 25 click 12 easy 12 12
// 50 click 12 = 12 12 25
// q  clink 12 = 12 12 25 50 



