var notes = [];

function fillTheRest(button, version) {

    let note = obj_note[index_array].duration;
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

    }

    if (version === 'b') {
        obj_note[index_array] = get_new_note('b', 4, `${button}`);
        setStyle_OrangeRed();
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

    }
    //console.log(arr_sum);
    arr_index = "";
    index_in = "";

    computeStave();
    redraw_notes(); // เเก้หาง
    redraw_notes();

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