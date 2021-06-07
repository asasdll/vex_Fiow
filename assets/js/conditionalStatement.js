function fillTheRest(button) {
    let note = notes[arr_index].duration;
    let noteVal = findValue(note);
    let buttonVal = findValue(button);
    let spaceVal = noteVal - buttonVal * 2;

    console.log(`key, octave, ${button}`);
    console.log(`key, octave, ${button}`);


    let array = ['64', '32', '16', '8', 'q', 'h', 'w'];
    let i = array.indexOf(button) + 1;

    while (spaceVal > 0) {
        let val = findValue(array[i]);
        console.log(`key, octave, ${array[i]}`)
        spaceVal = spaceVal - val;
        i++;
    }

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

