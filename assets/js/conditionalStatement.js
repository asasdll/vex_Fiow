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

    let note_id = [];
    for (let i = 0; i < obj_note.length; i++) {

        note_id.push(obj_note[i].attrs.id);

    }

    var id_res = id_.substr(3);
    index_array = note_id.indexOf(id_res);

    let note = note_duration; //obj_note[index_array].duration;
    let noteVal = findValue(note);
    let buttonVal = findValue(button);
    let spaceVal = noteVal - (buttonVal * 2);

    let array = ['64', '32', '16', '8', 'q', 'h', 'w'];
    let i = array.indexOf(button) + 1;
    let u = Number(index_array) + 2;
    let next = Number(index_array) + 1;
    let rope = array.indexOf(button);
    let anchor = array.indexOf(note);
    let between = anchor - rope;
    // let equalizer = Number(arr_index) - (notes.length + 1);
    // let equalizer_u = equalizer + 2;

    if (rope > anchor || rope === anchor) {
        return;
    }

    //console.log(notes[Number(arr_index)]);
    let lastElement;
    if (obj_note[next] != null) {
        lastElement = obj_note.length - 1;
        for (idx = lastElement; idx > index_array; idx--) {
            obj_note[idx + between] = obj_note[idx];
        }

        // } else if (arr_sum[next] != null && Number(arr_index) < notes.length - 1) {
        //     lastElement = notes.length - 1
        //     for (idx = lastElement; idx > Number(arr_index); idx--) {
        //         notes[idx + between] = notes[idx];
        //     }
        // }


    }

    if (version === 'b') {
        obj_note[index_array] = get_new_note('b', 4, `${button}`);
    } else {
        obj_note[index_array] = get_new_note('b', 4, `${button}r`);
    }

    obj_note[Number(index_array) + 1] = get_new_note('b', 4, `${button}r`);




    while (spaceVal > 0) {
        let val = findValue(array[i]);
        obj_note[u] = get_new_note('b', 4, `${array[i]}r`);
        spaceVal = spaceVal - val;
        i++;
        u++;
        // } else {
        //     notes_2[equalizer_u] = get_new_note('b', 4, `${array[i]}r`);
        //     spaceVal = spaceVal - val;
        //     i++;
        //     equalizer_u++;
        // }
    }
    //console.log(arr_sum);
    num_shift = between;
    arr_index = "";
    index_in = "";
    computeStave();
    redraw_notes();
    add_type_array();

}

function findValue(note) {
    let value = note;
    let returnValue;

    switch (value) {
        case 'w':
            returnValue = 4;
            break;
        case 'h':
            returnValue = 2;
            break;
        case 'q':
            returnValue = 1;
            break;
        case '8':
            returnValue = 0.5;
            break;
        case '16':
            returnValue = 0.25;
            break;
        case '32':
            returnValue = 0.125;
            break;
        case '64':
            returnValue = 0.0625;
            break;
        default:
            console.log("Don't have this value");
    }
    return returnValue;

}