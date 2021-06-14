var notes = [];

// let previous = Number(arr_index) - 1;
// let checkIndex = 0;

// if (Number(arr_index) != 0) {
//     if (checkIndex === previous) {
//         let button = notes[previous].duration;
//         fillTheRest(button);
//     }
// }
// checkIndex = arr_index;

// console.log(arr_index);

function fillTheRest(button, version) {
    let note = notes[arr_index].duration;

    let noteVal = findValue(note);
    let buttonVal = findValue(button);
    let spaceVal = noteVal - (buttonVal * 2);

    let array = ['64', '32', '16', '8', 'q', 'h', 'w'];
    let i = array.indexOf(button) + 1;
    let u = Number(arr_index) + 2;
    let next = Number(arr_index) + 1;
    let rope = array.indexOf(button);
    let anchor = array.indexOf(note);
    let between = anchor - rope;

    if (rope > anchor || rope === anchor) {
        return;
    }

    //console.log(notes[Number(arr_index)]);

    if (notes[next] != null) {
        let lastElement = notes.length - 1;
        for (idx = lastElement; idx > Number(arr_index); idx--) {
            notes[idx + between] = notes[idx];
        }
    }

    if (version === 'b') {
        notes[arr_index] = get_new_note('b', 4, `${button}`);
    } else {
        notes[arr_index] = get_new_note('b', 4, `${button}r`);
    }

    notes[Number(arr_index) + 1] = get_new_note('b', 4, `${button}r`);



    while (spaceVal > 0) {
        let val = findValue(array[i]);
        notes[u] = get_new_note('b', 4, `${array[i]}r`);
        spaceVal = spaceVal - val;
        i++;
        u++;
    }



    redraw_notes();

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
        case '64': returnValue = 0.0625;
            break;
        default: console.log("Don't have this value");
    }
    return returnValue;

}