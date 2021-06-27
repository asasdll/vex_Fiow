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
    sum_array();
    let note = arr_sum[arr_index].duration;
console.log(note,arr_index,arr_);
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
    let equalizer = Number(arr_index) - (notes.length + 1);
    let equalizer_u = equalizer + 2;

    if (rope > anchor || rope === anchor) {
        return;
    }

    //console.log(notes[Number(arr_index)]);
    let lastElement;
    if (arr_sum[next] != null) {
        if (Number(arr_index) > notes.length - 1) {
            lastElement = notes_2.length - 1;
            for (idx = lastElement; idx > equalizer; idx--) {
                notes_2[idx + between] = notes_2[idx];
            }
        } else if (arr_sum[next] != null && Number(arr_index) < notes.length - 1) {
            lastElement = notes.length - 1
            for (idx = lastElement; idx > Number(arr_index); idx--) {
                notes[idx + between] = notes[idx];
            }
        }


    }

    if (version === 'b' && Number(arr_index) > notes.length - 1) {
        notes_2[equalizer] = get_new_note('b', 4, `${button}`);
    } else if (version === 'b' && Number(arr_index) <= notes.length - 1) {
        notes[arr_index] = get_new_note('b', 4, `${button}`);
    } else if (Number(arr_index) > notes.length - 1) {
        notes_2[equalizer] = get_new_note('b', 4, `${button}r`);
    } else {
        notes[arr_index] = get_new_note('b', 4, `${button}r`);
    }


    if (Number(arr_index) > notes.length - 1) {
        notes_2[equalizer + 1] = get_new_note('b', 4, `${button}r`);
        console.log('aha');
    } else {
        notes[Number(arr_index) + 1] = get_new_note('b', 4, `${button}r`);
    }



    while (spaceVal > 0) {
        let val = findValue(array[i]);
        if (Number(arr_index) < notes.length - 1) {
            notes[u] = get_new_note('b', 4, `${array[i]}r`);
            spaceVal = spaceVal - val;
            i++;
            u++;
        } else {
            notes_2[equalizer_u] = get_new_note('b', 4, `${array[i]}r`);
            spaceVal = spaceVal - val;
            i++;
            equalizer_u++;
        }
    }
    //console.log(arr_sum);

    arr_index = "";
    index_in = "";
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