var notes = [];

function fillTheRest(button, version) {

    let note = obj_note[index_array].duration;
    let noteVal = findValue(note);
    let buttonVal = findValue(button);
    let index = index_array;

    if (note == '1') {
        breakR(button)
        return;
    }

    let spaceVal = noteVal - (buttonVal * 2); // ค่าที่เหลือหลังจากสองตัวแรก 
    let array = ['64', '32', '16', '8', 'q', 'h', 'w', '1'];
    let i = array.indexOf(button) + 1; //  loop ใน array หา duration
    let u = Number(index) + 2; // ถัดจากสองตัวแรก
    let next = Number(index) + 1; // ตัวถัดไป
    let rope = array.indexOf(button); // ใน array หาตำแหน่ง
    let anchor = array.indexOf(note); // ใน array หาตำแหน่ง
    let between = anchor - rope; // ช่องว่าง

    console.log(anchor, rope);
    if (rope > anchor || rope === anchor) {
        console.log('rope')
        return;
    }

    //console.log(notes[Number(arr_index)]);
    let lastElement;
    if (obj_note[next] != null) {
        lastElement = obj_note.length - 1;
        for (idx = lastElement; idx > index; idx--) {
            obj_note[idx + between] = obj_note[idx];
        }

    }

    if (version === 'b') {
        obj_note[index] = get_new_note('b', 4, `${button}`);
    } else {
        obj_note[index] = get_new_note('b', 4, `${button}r`);
    }

    obj_note[Number(index) + 1] = get_new_note('b', 4, `${button}r`); // ใส่ next




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
    console.log(note + 'n')
    let value = note;
    let returnValue;

    switch (value) {
        case '1':
            returnValue = cpTime;
            break;
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

function breakR(button) {

    let note = obj_note[index_array].duration;

    let noteVal = findValue(note);
    let buttonVal = findValue(button);

    if (buttonVal > noteVal) {
        return;
    }

    obj_note[index_array] = get_new_note('b', 4, `${button}r`);

    noteVal = noteVal - buttonVal; // ค่าที่เหลือ

    let array = ['w', 'h', 'q', '8', '16', '32', '64'];
    let next = Number(index_array) + 1;
    let i = 0;

    while (noteVal > 0) {
        let val = findValue(array[i]);

        if (val > noteVal) {
            i++;
        } else {
            obj_note[next] = get_new_note('b', 4, `${array[i]}r`);
            noteVal = noteVal - val;
            next++;
        }

    }
    // let btn = computeDuration(String(lowerTime)); // เอา lowerTime มาแทน ปุ่ม
    // buttonVal = findValue(btn); // หาค่าปุ่ม
}

function reverseFindValue(noteVal) {
    let value = noteVal;
    let returnValue;

    switch (value) {
        case '4':
            returnValue = 'w';
            break;
        case '2':
            returnValue = 'h';
            break;
        case '1':
            returnValue = 'q';
            break;
        case '0.5':
            returnValue = '8';
            break;
        case '0.25':
            returnValue = '16';
            break;
        case '0.125':
            returnValue = '32';
            break;
        default:
            console.log("Don't have this value");
    }
    return returnValue;

}