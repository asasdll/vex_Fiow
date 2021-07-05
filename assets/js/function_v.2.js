var width = 500;
var height = 100;
var height2 = 200;
var type_array = ["notesMeasure1001", "notesMeasure1001", "notesMeasure1001", "notes_2Measure1001"];
var numbet_clik = [];
var i_c;
var bok_number = 1;
var note_sea;
var note_num_k;
var index_array;
var type_v;
var type_g;




function get_new_note(key, octave, duration, position) {

    let obj = new VF.StaveNote({
        clef: "treble",
        keys: [key + "/" + octave],
        duration: duration,
        align_center: position,
        auto_stem: true,
        //clef: "treble"
    });
    //obj.setAttribute('id', 'test555');



    return obj;
}


function get_new_note_down(key, octave, duration, position) {

    let obj = new VF.StaveNote({
            clef: 'treble',
            keys: [key + "/" + octave],
            duration: duration,
            auto_stem: true,
            // clef: "treble",
            align_center: position

        })
        //obj.setAttribute('id', 'test555');



    return obj;
}


function draw_notes() {
    VF = Vex.Flow;
    var div = document.getElementById("page")
    renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    renderer.resize(500, 700);

    context = renderer.getContext();

    context.setFont("Arial", 50, "").setBackgroundFillStyle("#eed");

    staveMeasure1001 = new VF.Stave(30, 100, 150);
    stave_2Measure1001 = new VF.Stave(30, 200, 150);
    staveMeasure1001.addClef("treble").addTimeSignature("4/4");
    stave_2Measure1001.addClef("bass").addTimeSignature("4/4");
    var brace = new Vex.Flow.StaveConnector(staveMeasure1001, stave_2Measure1001).setType(3);
    var lineLeft = new Vex.Flow.StaveConnector(staveMeasure1001, stave_2Measure1001).setType(1);
    // var lineRight = new Vex.Flow.StaveConnector(stave, stave_2).setType(6);

    voice = new VF.Voice({ num_beats: 4, beat_value: 4 });

    notesMeasure1001 = [
        get_new_note('a', 4, "q", true),
        get_new_note('b', 6, "q", true),
        get_new_note('c', 6, "q", true),


    ];

    notes_2Measure1001 = [
        get_new_note_down('b', 4, "1r", true),
    ];

    //voice.addTickables(notes);
    window.renderer = renderer;
    staveMeasure1001.setContext(context).draw();
    stave_2Measure1001.setContext(context).draw();
    brace.setContext(context).draw();
    lineLeft.setContext(context).draw();

    var voice = VF.Beam.generateBeams(notesMeasure1001);
    var voice_2 = VF.Beam.generateBeams(notes_2Measure1001); //note เส้นหาย
    Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure1001, notesMeasure1001);
    Vex.Flow.Formatter.FormatAndDraw(context, stave_2Measure1001, notes_2Measure1001); //note เส้นหาย
    voice.forEach(function(b) { b.setContext(context).draw() });
    voice_2.forEach(function(b) { b.setContext(context).draw() });
    //console.log(type_array);

    type_note();


}

function redraw_notes() {
    renderer.ctx.clear();

    if (measure > 1001) {
        for (i = measure; i > 1001; i--) {
            this["staveMeasure" + i].setContext(context).draw();
            Vex.Flow.Formatter.FormatAndDraw(context,
                this["staveMeasure" + i],
                this["notesMeasure" + i]);
            this["stave_2Measure" + i].setContext(context).draw();
            Vex.Flow.Formatter.FormatAndDraw(context,
                this["stave_2Measure" + i],
                this["notes_2Measure" + i]);

            var voice = VF.Beam.generateBeams(this["notesMeasure" + i]);
            var voice_2 = VF.Beam.generateBeams(this["notes_2Measure" + i]);

            voice.forEach(function(b) { b.setContext(context).draw() });
            voice_2.forEach(function(b) { b.setContext(context).draw() });


        }

        /// type_note();
    }


    j = u;
    if (u >= 1) {
        for (i = 0; i < j; i++) {
            //console.log("staveMeasure" + (1 - i));
            this["staveMeasure" + (1001 - i)].setContext(context).draw();
            Vex.Flow.Formatter.FormatAndDraw(context,
                this["staveMeasure" + (1001 - i)],
                this["notesMeasure" + (1001 - i)]);

            this["stave_2Measure" + (1001 - i)].setContext(context).draw();
            Vex.Flow.Formatter.FormatAndDraw(context,
                this["stave_2Measure" + (1001 - i)],
                this["notes_2Measure" + (1001 - i)]);

            var voice = VF.Beam.generateBeams(this["notesMeasure" + (1001 - i)]);
            var voice_2 = VF.Beam.generateBeams(this["notes_2Measure" + (1001 - i)]);

            voice.forEach(function(b) { b.setContext(context).draw() });
            voice_2.forEach(function(b) { b.setContext(context).draw() });
        }


    }



}




let measure = 1001;

function add_measure_after() {

    if (width > 250) {
        PreviousStave = this["staveMeasure" + measure];
        this["staveMeasure" + (measure + 1)] = new VF.Stave(PreviousStave.width + PreviousStave.x, height, 100);
        this["notesMeasure" + (measure + 1)] = [
            get_new_note('a', 4, "q", true),
            get_new_note('b', 6, "q", true),
            get_new_note('c', 6, "q", true),


        ];

        this["staveMeasure" + (measure + 1)].setContext(context).draw();
        Vex.Flow.Formatter.FormatAndDraw(context,
            this["staveMeasure" + (measure + 1)],
            this["notesMeasure" + (measure + 1)]);

        PreviousStave = this["stave_2Measure" + measure];
        this["stave_2Measure" + (measure + 1)] = new VF.Stave(PreviousStave.width + PreviousStave.x, height2, 100);
        this["notes_2Measure" + (measure + 1)] = [
            get_new_note('b', 4, "1r", true),



        ];
        this["stave_2Measure" + (measure + 1)].setContext(context).draw();
        Vex.Flow.Formatter.FormatAndDraw(context,
            this["stave_2Measure" + (measure + 1)],
            this["notes_2Measure" + (measure + 1)]);

        measure++;
        width -= 100;



    } else {

        this["staveMeasure" + (measure + 1)] = new VF.Stave(30, height + 200, 150);
        this["notesMeasure" + (measure + 1)] = [
            get_new_note('b', 4, "1r"),

        ];
        this["staveMeasure" + (measure + 1)].addClef("treble").addTimeSignature("4/4");
        this["staveMeasure" + (measure + 1)].setContext(context).draw();
        Vex.Flow.Formatter.FormatAndDraw(context,
            this["staveMeasure" + (measure + 1)],
            this["notesMeasure" + (measure + 1)]);

        this["stave_2Measure" + (measure + 1)] = new VF.Stave(30, height2 + 200, 150);
        this["notes_2Measure" + (measure + 1)] = [
            get_new_note('b', 4, "1r"),

        ];
        this["stave_2Measure" + (measure + 1)].addClef("bass").addTimeSignature("4/4");
        this["stave_2Measure" + (measure + 1)].setContext(context).draw();
        Vex.Flow.Formatter.FormatAndDraw(context,
            this["stave_2Measure" + (measure + 1)],
            this["notes_2Measure" + (measure + 1)]);

        var brace = new Vex.Flow.StaveConnector(this["staveMeasure" + (measure + 1)],
            this["stave_2Measure" + (measure + 1)]).setType(3);
        var lineLeft = new Vex.Flow.StaveConnector(this["staveMeasure" + (measure + 1)],
            this["stave_2Measure" + (measure + 1)]).setType(1);

        brace.setContext(context).draw();
        lineLeft.setContext(context).draw();

        height += 200;
        height2 += 200;
        width = 500;
        measure++;

    }

    array_type("notesMeasure" + measure, "notes_2Measure" + measure);
    redraw_notes();


}



u = 1;
k = 1;

function add_measure_before() {
    renderer.ctx.clear();

    // if (width > 250) {

    if (measure > 1001) {
        for (i = measure; i > 1001; i--) {

            CurrentStave = this["staveMeasure" + i];
            CurrentStave2 = this["stave_2Measure" + i];

            xM = CurrentStave.width + CurrentStave.x;
            yM = CurrentStave.y;
            yM2 = CurrentStave2.y;
            let widthM = 100;

            if (CurrentStave.x == 380) {
                xM = 30;
                widthM = 150;
                yM = CurrentStave.y += 200;
                yM2 = CurrentStave2.y += 200;

            }

            this["staveMeasure" + i] = new VF.Stave(xM, yM, widthM);
            this["stave_2Measure" + i] = new VF.Stave(xM, yM2, widthM);
            //console.log(xM, yM, widthM);
            // array_type("notesMeasure" + i_click, "notes_2Measure" + i_click);


        }
    }

    CurrentStave = this["staveMeasure" + 1001];
    CurrentStave2 = this["stave_2Measure" + 1001];
    let xS = CurrentStave.x;
    let yS = CurrentStave.y;
    let yS2 = CurrentStave2.y;
    let xN = CurrentStave.x + CurrentStave.width;
    let yN = CurrentStave.y;
    let yN2 = CurrentStave2.y;
    let widthN = 100;

    if (CurrentStave.x == 380) {
        xN = 30;
        widthN = 150;
        yN = CurrentStave.y += 200;
        yN2 = CurrentStave2.y += 200;
    }

    this["staveMeasure" + 1001] = new VF.Stave(xN, yN, widthN);
    this["stave_2Measure" + 1001] = new VF.Stave(xN, yN2, widthN);

    this["notesMeasure" + (1001 - u)] = [
        get_new_note('b', 4, "1r", true),

    ];
    this["notes_2Measure" + (1001 - u)] = [
        get_new_note('b', 4, "1r", true),

    ];

    console.log(this["notes_2Measure" + (1001 - u)])

    j = u;
    for (i = 1; i <= j; i++) {
        widthS = 0;

        if (i == j || i == j - 4 || i == j - 8) {
            widthS = 150;
        } else {
            widthS = 100;
        }

        bok_number = 1001 - i; // เลขห้องหข้างหน้า
        this["staveMeasure" + (1001 - i)] = new VF.Stave(xS, yS, widthS); /// ขึ้นบันทัดใหม่
        this["stave_2Measure" + (1001 - i)] = new VF.Stave(xS, yS2, widthS);

        if (i + 1 == j || i == j - 5 || i == j - 9) {
            xS -= 150;
        } else {
            xS -= 100;
        }

        if (i == j - 4 || i == j - 8) {
            xS = 380;
            yS -= 200;
            yS2 -= 200;
        }
    }
    width -= 100;
    u++;

    array_type_2("notesMeasure" + bok_number, "notes_2Measure" + bok_number);
    redraw_notes();
}



function mouseDown() {
    $(".vf-stavenote")
        .mousedown(function(e) {

            type_note();

            var arr_type = $(this).attr("type");
            id_ = $(this).attr("id");

            // console.log(notesMeasure1001);
            note_substr = arr_type.substr(0, 12); // ตัดตัวอักษร ว่าอยู่ บนหรือล่าง
            obj_note = eval(arr_type); // เปลี่ยน  String เป็น obj


            note_ = obj_note[0].keys;
            note_duration = obj_note[0].duration;
            //console.log(note_duration);
            nots_str = (note_).toString(); //เปลี่ยน  note เป็น String


            e_Click = event.clientY; //413
            group_notes(); // เรียกใช้งาน arr_notes 


            let note_id = [];
            for (let i = 0; i < obj_note.length; i++) {

                note_id.push(obj_note[i].attrs.id);

            }

            var id_res = id_.substr(3);
            index_array = note_id.indexOf(id_res); // id ของ เเต่ละ array
            var search_array = arr_notes.indexOf(nots_str); // หา index note 29
            click_style();




            $(document).bind('mousemove', function(e) {
                var ev_move = e.clientY; //434  เลื่อน เม้า

                sum_pixels = e_Click + 10; //443 เลื่อน เม้า
                del_pix = e_Click - 10; //  424  เลื่อน เม้า 
                var array_a = 1;
                if (ev_move >= sum_pixels) { //443 note_down
                    move_pixel = ev_move;
                    e_Click = sum_pixels; //433


                    if (ev_move == move_pixel) {

                        search_array = search_array - array_a;
                    }
                    substr_notes(search_array);
                    notes_down();

                } else if (ev_move <= del_pix) { //note_up

                    move_pixel = ev_move;
                    e_Click = del_pix; //433

                    if (ev_move == move_pixel) { //note_up
                        search_array = search_array + array_a;

                    }
                    substr_notes(search_array);
                    notes_up();

                }
            });


        });

}


function notes_up() {

    var key = note_te_k;
    var octave = note_num_k;
    var duration = "q";
    console.log(key, octave);
    if (note_substr === "notesMeasure") {
        obj_note[index_array] = get_new_note(key, octave, duration);
        setStyle_OrangeRed()
        redraw_notes();
    } else {
        obj_note[index_array] = get_new_note_down(key, octave, duration);
        setStyle_OrangeRed()
        redraw_notes();
    }




}

function notes_down() {

    var key = note_te_k;
    var octave = note_num_k;
    var duration = "q";
    console.log(key, octave);
    if (note_substr == "notesMeasure") {
        obj_note[index_array] = get_new_note(key, octave, duration);
        setStyle_OrangeRed();
        redraw_notes();
    } else {
        obj_note[index_array] = get_new_note_down(key, octave, duration);
        setStyle_OrangeRed();
        redraw_notes();
    }


}

function substr_notes(value) {
    let i = 0;
    if (value < arr_notes.length && value >= 0) {

        note_sea = arr_notes[value];
        note_te_k = note_sea.substr(0, 1); // เเยก note  a-g
        note_num_k = note_sea.substr(-1); // เเยก ตัวเลข จาก note 0-8*/

    }





}


$('html') // unbind mousemove all html
    .mouseup(function() {
        unBind();
        setStyle_Black();
        mouseDown();
        index_array = null;

    });



function unBind() { // unbind mousemove
    $(document).unbind("mousemove");

}



function array_type(type_a, type_b) { // new arr-index and id
    const type_v = type_a;
    const type_g = type_b;
    type_array.unshift(type_v, type_g);
    type_note();




}

function array_type_2(type_a, type_b) {
    const type_v = type_a;
    const type_g = type_b;
    type_array.push(type_v, type_g);



}

function add_type_array(ids) { // add array
    console.log("A", type_array);
    const array = ["notesMeasure1002", "notesMeasure1002"];
    let c = ids; //   index 0 ที่ รับมา +1 หมายถึงเพิ่ม หลัง index
    let type_d = "";
    for (let index = 0; index < array.length; index++) {
        type_d = array[index];
        type_array.splice(c, 0, type_d);
    }

    console.log("B", type_array);


}


function type_note() {
    let i = 0;
    const type_a = type_array;

    $('.vf-stavenote').each(function() {

        $(this).attr("type", type_a[i]);
        id_ = $(this).attr("id");
        i++;


    });

}



function setStyle_OrangeRed() {

    obj_note[index_array].setStyle({ fillStyle: "OrangeRed", strokeStyle: "Black" });

}

function setStyle_Black() {
    if (index_array != undefined) {
        obj_note[index_array].setStyle({ fillStyle: "Black", strokeStyle: "Black" });
    }

}


function click_style() {
    setStyle_OrangeRed();
    redraw_notes();

};


function group_notes() {

    arr_notes = [
        "a/0", "b/0", "c/1", "d/1", "e/1", "f/1", "g/1",
        "a/1", "b/1", "c/2", "d/2", "e/2", "f/2", "g/2",
        "a/2", "b/2", "c/3", "d/3", "e/3", "f/3", "g/3",
        "a/3", "b/3", "c/4", "d/4", "e/4", "f/4", "g/4",
        "a/4", "b/4", "c/5", "d/5", "e/5", "f/5", "g/5",
        "a/5", "b/5", "c/6", "d/6", "e/6", "f/6", "g/6",
        "a/6", "b/6", "c/7", "d/7", "e/7", "f/7", "g/7",
        "a/7", "b/7", "c/8", "d/8", "e/8", "f/8", "g/8"
    ];

}

function sound() {

    $(".verticalLine")
        .mousedown(function(e) {
            $(this).attr("x", "900px");
        })
}


window.addEventListener('load', draw_notes);