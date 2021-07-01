var width = 500;
var height = 100;
var height2 = 200;
var type_array = [];
var numbet_clik = [];
var i_c;
var bok_number = 1;
var note_sea;
var note_num_k;
var id_index;
var type_v;
var type_g;
var redraw = [1];  //   




function get_new_note(key, octave, duration, position) {

  let obj = new VF.StaveNote({
    clef: "treble",
    keys: [key + "/" + octave],
    duration: duration,
    align_center: position,
    auto_stem: true,
    //clef: "treble"
  })
  //obj.setAttribute('id', 'test555');



  return obj;
}


function get_new_note_down(key, octave, duration, position) {

  let obj = new VF.StaveNote({
    //clef: 'treble',
    keys: [key + "/" + octave],
    duration: duration,
    auto_stem: true,
    clef: "treble",
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

  staveMeasure1 = new VF.Stave(30, 100, 150);
  stave_2Measure1 = new VF.Stave(30, 200, 150);
  staveMeasure1.addClef("treble").addTimeSignature("4/4");
  stave_2Measure1.addClef("bass").addTimeSignature("4/4");
  var brace = new Vex.Flow.StaveConnector(staveMeasure1, stave_2Measure1).setType(3);
  var lineLeft = new Vex.Flow.StaveConnector(staveMeasure1, stave_2Measure1).setType(1);
  // var lineRight = new Vex.Flow.StaveConnector(stave, stave_2).setType(6);

  voice = new VF.Voice({ num_beats: 4, beat_value: 4 });

  notesMeasure1 = [
    get_new_note('b', 4, "q"),
    //get_new_note('b', 4, "q"),

  ];

  notes_2Measure1 = [
    get_new_note_down('b', 4, "w"),
  ];

  //voice.addTickables(notes);
  window.renderer = renderer;
  staveMeasure1.setContext(context).draw();
  stave_2Measure1.setContext(context).draw();
  brace.setContext(context).draw();
  lineLeft.setContext(context).draw();

  var voice = VF.Beam.generateBeams(notesMeasure1);
  var voice_2 = VF.Beam.generateBeams(notes_2Measure1); //note เส้นหาย
  Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);
  Vex.Flow.Formatter.FormatAndDraw(context, stave_2Measure1, notes_2Measure1);//note เส้นหาย
  voice.forEach(function (b) { b.setContext(context).draw() });
  voice_2.forEach(function (b) { b.setContext(context).draw() });

  //array_type("notesMeasure1", "notesMeasure1", "notes_2Measure1"); //test 2 array
  array_type("notesMeasure1", "notes_2Measure1");



}

function redraw_notes() {
  renderer.ctx.clear();

  if (measure > 1) {
    for (i = measure; i > 1; i--) {
      this["staveMeasure" + i].setContext(context).draw();
      Vex.Flow.Formatter.FormatAndDraw(context,
        this["staveMeasure" + i],
        this["notesMeasure" + i]);
      this["stave_2Measure" + i].setContext(context).draw();
      Vex.Flow.Formatter.FormatAndDraw(context,
        this["stave_2Measure" + i],
        this["notes_2Measure" + i]);
    }
  }


  j = u;
  if (u >= 1) {
    for (i = 0; i < j; i++) {
      console.log("staveMeasure" + (1 - i));
      this["staveMeasure" + (1 - i)].setContext(context).draw();
      Vex.Flow.Formatter.FormatAndDraw(context,
        this["staveMeasure" + (1 - i)],
        this["notesMeasure" + (1 - i)]);

      this["stave_2Measure" + (1 - i)].setContext(context).draw();
      Vex.Flow.Formatter.FormatAndDraw(context,
        this["stave_2Measure" + (1 - i)],
        this["notes_2Measure" + (1 - i)]);
    }


  }
}




let measure = 1;

function add_measure_after() {

  if (width > 250) {
    PreviousStave = this["staveMeasure" + measure];
    this["staveMeasure" + (measure + 1)] = new VF.Stave(PreviousStave.width + PreviousStave.x, height, 100);
    this["notesMeasure" + (measure + 1)] = [
      get_new_note('b', 4, "1r", true),


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

    //console.log("ox");


  }
  else {

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
    // console.log("pp");
  }

  redraw.push(measure);
  array_type("notesMeasure" + measure, "notes_2Measure" + measure);
}

u = 1;
k = 1;

function add_measure_before() {
  renderer.ctx.clear();

  // if (width > 250) {

  if (measure > 1) {
    for (i = measure; i > 1; i--) {

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
        //console.log('jaja');
      }

      this["staveMeasure" + i] = new VF.Stave(xM, yM, widthM);
      this["stave_2Measure" + i] = new VF.Stave(xM, yM2, widthM);
      //console.log(xM, yM, widthM);

      if (CurrentStave.x == 380) {
        this["staveMeasure" + i].addClef("treble").addTimeSignature("4/4");
        this["stave_2Measure" + i].addClef("bass").addTimeSignature("4/4");
      }

      if (CurrentStave.x == 380) {
        var brace = new Vex.Flow.StaveConnector(this["staveMeasure" + i],
          this["stave_2Measure" + i]).setType(3);
        var lineLeft = new Vex.Flow.StaveConnector(this["staveMeasure" + i],
          this["stave_2Measure" + i]).setType(1);
        brace.setContext(context).draw();
        lineLeft.setContext(context).draw()
      }

      // array_type("notesMeasure" + i_click, "notes_2Measure" + i_click);

    }
  }

  CurrentStave = this["staveMeasure" + 1];
  CurrentStave2 = this["stave_2Measure" + 1];
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

  this["staveMeasure" + 1] = new VF.Stave(xN, yN, widthN);
  this["stave_2Measure" + 1] = new VF.Stave(xN, yN2, widthN);

  if (CurrentStave.x == 380) {
    this["staveMeasure" + 1].addClef("treble").addTimeSignature("4/4");
    this["stave_2Measure" + 1].addClef("bass").addTimeSignature("4/4");
  }

  this["staveMeasure" + 1].setContext(context).draw();
  Vex.Flow.Formatter.FormatAndDraw(context,
    this["staveMeasure" + 1],
    this["notesMeasure" + 1]);
  this["stave_2Measure" + 1].setContext(context).draw();
  Vex.Flow.Formatter.FormatAndDraw(context,
    this["stave_2Measure" + 1],
    this["notes_2Measure" + 1]);

  if (CurrentStave.x == 380) {
    var brace = new Vex.Flow.StaveConnector(this["staveMeasure" + 1],
      this["stave_2Measure" + 1]).setType(3);
    var lineLeft = new Vex.Flow.StaveConnector(this["staveMeasure" + 1],
      this["stave_2Measure" + 1]).setType(1);
    brace.setContext(context).draw();
    lineLeft.setContext(context).draw()
  }

  j = u;
  for (i = 1; i <= j; i++) {
    widthS = 0;

    if (i == j || i == j - 4 || i == j - 8) {
      widthS = 150;
    } else {
      widthS = 100;
    }

    bok_number = 1 - i; // เลขห้องหข้างหน้า
    this["staveMeasure" + (1 - i)] = new VF.Stave(xS, yS, widthS); /// ขึ้นบันทัดใหม่
    this["notesMeasure" + (1 - i)] = [
      get_new_note('b', 4, "1r", true),

    ];


    this["stave_2Measure" + (1 - i)] = new VF.Stave(xS, yS2, widthS);
    this["notes_2Measure" + (1 - i)] = [
      get_new_note('b', 4, "1r", true),

    ];

    if (i == j || i == j - 4 || i == j - 8) {
      this["staveMeasure" + (1 - i)].addClef("treble").addTimeSignature("4/4");
      this["stave_2Measure" + (1 - i)].addClef("bass").addTimeSignature("4/4");

    }

    if (i == j || i == j - 4 || i == j - 8) {
      var brace = new Vex.Flow.StaveConnector(this["staveMeasure" + (1 - i)],
        this["stave_2Measure" + (1 - i)]).setType(3);
      var lineLeft = new Vex.Flow.StaveConnector(this["staveMeasure" + (1 - i)],
        this["stave_2Measure" + (1 - i)]).setType(1);
      brace.setContext(context).draw();
      lineLeft.setContext(context).draw()
    }
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

  redraw_notes();
  //console.log('เพิ่มข้างหน้า',bok_number);
  redraw.unshift(bok_number);
  array_type("notesMeasure" + bok_number, "notes_2Measure" + bok_number);




}






function mouseDown(e) {

  //console.log('in');
  $(".vf-stavenote")
    .mousedown(function (e) {
      //console.log('in');
      arr_type = $(this).attr("array-type");
      id_ = $(this).attr("id");
      //console.log(arr_type,id_);
      obj_note = eval(arr_type);  // เปลี่ยน  String เป็น obj
      //console.log(obj_note,arr_type); 
      note_ = obj_note[0].keys;
      nots_str = (note_).toString(); //เปลี่ยน  note เป็น String

      console.log('jaja');

      e_Click = event.clientY;//413
      group_notes();  // เรียกใช้งาน arr_notes 


      //redraw.sort();
      // console.log(redraw);

      let note_id = [];
      for (let i = 0; i < obj_note.length; i++) {

        note_id.push(obj_note[i].attrs.id);

      }

      var id_res = id_.substr(3);
      id_index = note_id.indexOf(id_res);// id
      var search_array = arr_notes.indexOf(nots_str); // หา index note 29
      click_style();

      $(document).bind('mousemove', function (e) {

        //$( this ).addClass('mousemove', function (e) {
        var ev_move = e.clientY;//434  เลื่อน เม้า
        var pixels = $("p").html(ev_move);
        sum_pixels = e_Click + 10;//443 เลื่อน เม้า
        del_pix = e_Click - 10;  //  424  เลื่อน เม้า 
        var array_a = 1;
        if (ev_move >= sum_pixels) {//443 note_down
          move_pixel = ev_move;
          e_Click = sum_pixels;//433


          if (ev_move == move_pixel) {

            search_array = search_array - array_a;
            // console.log(search_array);
          }
          //console.log("down",search_array);
          substr_notes(search_array);
          notes_down();



        } else if (ev_move <= del_pix) { //note_up

          move_pixel = ev_move;
          e_Click = del_pix;//433

          if (ev_move == move_pixel) {  //note_up
            search_array = search_array + array_a;
            //console.log(search_array);

          }

          //console.log("down",search_array);
          substr_notes(search_array);
          notes_up();





        }
      });


    });

}


function notes_up() {

  console.log('jaja1');
  var key = note_te_k;
  var octave = note_num_k;
  var duration = "q";
  console.log('jaja1');
  onsole.log(key,octave);
  obj_note[id_index] = get_new_note(key, octave, duration);
  //notesMeasure1[0] = get_new_note(key, octave, duration);
  setStyle();
  redraw_notes();



}

function notes_down() {


  var key = note_te_k;
  var octave = note_num_k;
  var duration = "q";
  console.log(key,octave);
  console.log('jaja2');
  obj_note[id_index] = get_new_note(key, octave, duration);
  //notesMeasure1[0] = get_new_note(key, octave, duration);
  setStyle();
  redraw_notes();





}

function substr_notes(value) {

  if (value <= arr_notes.length) {
    // console.log(value);
    note_sea = arr_notes[value];
    note_te_k = note_sea.substr(0, 1);  // เเยก note  a-g
    note_num_k = note_sea.substr(-1); // เเยก ตัวเลข จาก note 0-8*/

  }





}


$('html') // unbind mousemove all html
  .mouseup(function (e) {
   // unBind();



  });



function unBind() { // unbind mousemove
  $(document).unbind("mousemove");

}



function array_type(type_a, type_b) {  // new arr-index and id

  type_array.push(type_a, type_b);
  //console.log(type_a,type_b);
  type_v = type_a;
  type_g = type_b;
  let i = 0;
  $('.vf-stavenote').each(function (e) {
    $(this).attr("array-type", type_array[i])
    i++;
  });

}

function setStyle() {

  obj_note[id_index].setStyle({ fillStyle: "OrangeRed", strokeStyle: "Black" });

}


function click_style() {
  setStyle();
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








window.addEventListener('load', draw_notes);