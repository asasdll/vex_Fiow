var width = 500;
var height = 100;
var height2 = 200;
var type_array = ["notesMeasure1001", "notes_2Measure1001"];
var bok_number = 1;
var note_num_k;
var index_array;
var type_v;
var type_g;
var arr_type = "";
var num_shift;
var note_duration;
var checkIndex;
var measureHead = [];


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

  renderer.resize(700, 700);

  context = renderer.getContext();

  context.setFont("Arial", 50, "").setBackgroundFillStyle("#eed");

  staveMeasure1001 = new VF.Stave(70, 0, 550);
  stave_2Measure1001 = new VF.Stave(70, 100, 550);
  staveMeasure1001.addClef("treble").addTimeSignature("4/4");
  stave_2Measure1001.addClef("bass").addTimeSignature("4/4");
  var brace = new Vex.Flow.StaveConnector(staveMeasure1001, stave_2Measure1001).setType(3);
  var lineLeft = new Vex.Flow.StaveConnector(staveMeasure1001, stave_2Measure1001).setType(1);
  var lineRight = new Vex.Flow.StaveConnector(staveMeasure1001, stave_2Measure1001).setType(0);

  voice = new VF.Voice({ num_beats: 4, beat_value: 4 });

  notesMeasure1001 = [
    get_new_note('b', 4, "wr", true),
    // get_new_note('b', 4, "q", false),
    // get_new_note('c', 4, "q", false),
    // get_new_note('d', 4, "q", false),



  ];

  notes_2Measure1001 = [
    get_new_note_down('b', 4, "wr", true),
  ];

  //voice.addTickables(notes);
  window.renderer = renderer;
  staveMeasure1001.setContext(context).draw();
  stave_2Measure1001.setContext(context).draw();
  brace.setContext(context).draw();
  lineLeft.setContext(context).draw();
  lineRight.setContext(context).draw();

  var voice = VF.Beam.generateBeams(notesMeasure1001);
  var voice_2 = VF.Beam.generateBeams(notes_2Measure1001); //note เส้นหาย
  Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure1001, notesMeasure1001);
  Vex.Flow.Formatter.FormatAndDraw(context, stave_2Measure1001, notes_2Measure1001); //note เส้นหาย
  voice.forEach(function (b) { b.setContext(context).draw() });
  voice_2.forEach(function (b) { b.setContext(context).draw() });
  //console.log(type_array);

  type_note();

}

function redraw_notes() {
  renderer.ctx.clear();

  let index = 1001 - (u - 1);

  for (i = index; i <= measure; i++) {

    if (this["staveMeasure" + i].x == 70) {
      this["staveMeasure" + i].addClef("treble").addTimeSignature("4/4");
      this["stave_2Measure" + i].addClef("bass").addTimeSignature("4/4");
    }

    Vex.Flow.Formatter.FormatAndDraw(context,
      this["staveMeasure" + i],
      this["notesMeasure" + i]);
    Vex.Flow.Formatter.FormatAndDraw(context,
      this["stave_2Measure" + i],
      this["notes_2Measure" + i]);
    this["staveMeasure" + i].setContext(context).draw();
    this["stave_2Measure" + i].setContext(context).draw();


    var lineRight = new Vex.Flow.StaveConnector(this["staveMeasure" + i], this["stave_2Measure" + i]).setType(0);
    lineRight.setContext(context).draw();

    var voice = VF.Beam.generateBeams(this["notesMeasure" + i]);
    var voice_2 = VF.Beam.generateBeams(this["notes_2Measure" + i]);

    voice.forEach(function (b) { b.setContext(context).draw() });
    voice_2.forEach(function (b) { b.setContext(context).draw() });

    if (this["staveMeasure" + i].x == 70) {
      var brace = new Vex.Flow.StaveConnector(this["staveMeasure" + i], this["stave_2Measure" + i]).setType(3);
      var lineLeft = new Vex.Flow.StaveConnector(this["staveMeasure" + i], this["stave_2Measure" + i]).setType(1);

      brace.setContext(context).draw();
      lineLeft.setContext(context).draw();
    }
  }
}

let measure = 1001;

function add_measure_after() {

  this["notesMeasure" + (measure + 1)] = [
    get_new_note('b', 4, "wr", true),
  ];

  this["notes_2Measure" + (measure + 1)] = [
    get_new_note('b', 4, "wr", true),

  ];

  measure++;
  array_type("notesMeasure" + measure, "notes_2Measure" + measure);
  computeStave();
  redraw_notes();

}

u = 1;

function add_measure_before() {
  renderer.ctx.clear();

  this["notesMeasure" + (1001 - u)] = [
    get_new_note('b', 4, "wr", true),

  ];
  this["notes_2Measure" + (1001 - u)] = [
    get_new_note('b', 4, "wr", true),

  ];

  bok_number = 1001 - u;
  u++;

  array_type_2("notesMeasure" + bok_number, "notes_2Measure" + bok_number);
  computeStave();
  redraw_notes();
}

function computeStave() {
  renderer.ctx.clear();
  console.log('in');
  j = 1001 - (u - 1);  // ตำแหน่งเริ่ม loop
  pointer2 = 1001 - (u - 1); // pointer ตัวที่สอง
  level = 0; // ความสูงเส้นแรก
  level2 = 100; // ความสูงเส้นสอง
  let vit = 480; // ความยาว
  let trackHead = 0;

  for (i = j; i <= measure; i++) { // ลูปจากห้องติดลบ ไปห้องสุดท้าย
    console.log(i);
    let high = this["notesMeasure" + i].length;
    let lower = this["notes_2Measure" + i].length;
    let lengthHL = high > lower ? high : lower; // เทียบความยาวบนล่าง
    let fillWidth;

    this["staveMeasure" + i] = new VF.Stave(70, 100, 550);
    this["stave_2Measure" + i] = new VF.Stave(70, 100, 550);

    // แทนค่าความยาว
    if (lengthHL > 0 && lengthHL <= 4) {
      fillWidth = 100;
    } else if (lengthHL > 4 && lengthHL <= 8) {
      fillWidth = 180;
    } else if (lengthHL > 8 && lengthHL <= 16) {
      fillWidth = 240;
    } else {
      fillWidth = 480;
    }

    let lastMeasure;
    let rest = 0; // เศษเหลือ
    let eater; // ตัวกินเส้น

    if (vit - fillWidth <= 0) { // พื้นที่เส้นเพียงพอ
      rest = vit / (i - pointer2);
      vit = 0;
      this["staveMeasure" + i].width = fillWidth;
      eater = fillWidth;

      if (i == measure) {
        lastMeasure = true;
      }

    } else if (vit - fillWidth > 0 && i != measure) { // พื้นที่เส้นไม่เพียงพอ ขึ้นบรรทัดใหม่
      vit = vit - fillWidth;
      this["staveMeasure" + i].width = fillWidth;
    } else if (vit - fillWidth > 0 && i == measure) { // พื้นที่เส้นไม่เพียงพอ ห้องสุดท้าย
      vit = vit - fillWidth;
      rest = vit / (i - (pointer2 - 1));
      this["staveMeasure" + i].width = fillWidth;
      vit = 0;
    }

    if (vit == 0) { // ให้ pointer วิ่งตาม
      let head = 1; // เช็คหัวแรกของ pointer
      let tracer = 0;

      if (i != measure) { // ถ้าไม่ใช่ห้องสุดท้าย
        while (pointer2 < i) {
          let pointerMeasure = this["staveMeasure" + pointer2];
          let pointerMeasure2 = this["stave_2Measure" + pointer2];
          let previousMeasure = this["staveMeasure" + (pointer2 - 1)];


          if (head == 1) { // เป็นหัวของ pointer หรือไม่
            xpos = 70;
            pointerMeasure.width += 70;
            trackHead++;
          } else {
            xpos = previousMeasure.x + previousMeasure.width;
          }

          pointerMeasure.width += rest;
          pointerMeasure.x = xpos;
          pointerMeasure.y = level;
          pointerMeasure2.width = pointerMeasure.width; // ลอก x และ width จากเส้นบน
          pointerMeasure2.x = pointerMeasure.x
          pointerMeasure2.y = level2; // y เท่ากับ level2

          head--;
          pointer2++;
        }

        head = 1;
        vit = 480 - eater;  // ลบด้วยตัวกินเส้น
        level += 200;
        level2 += 200;
      } else {
        while (pointer2 <= i) {
          let pointerMeasure = this["staveMeasure" + pointer2];
          let pointerMeasure2 = this["stave_2Measure" + pointer2];
          let previousMeasure = this["staveMeasure" + (pointer2 - 1)];

          if (head == 1) {
            xpos = 70;
            pointerMeasure.width += 70; // ชดเชยกุญแจและ time signature
          } else {
            xpos = previousMeasure.x + previousMeasure.width;
          }

          if (pointer2 == measure && lastMeasure == true) { // ห้องสุดท้าย
            xpos = 70;
            level += 200;
            level2 += 200;
            rest = 0;
            pointerMeasure.width = 550;
          }

          pointerMeasure.width += rest;
          pointerMeasure.x = xpos;
          pointerMeasure.y = level;
          pointerMeasure2.width = pointerMeasure.width;
          pointerMeasure2.x = pointerMeasure.x
          pointerMeasure2.y = level2;

          head--;
          pointer2++;
        }
      }
    }
  }
  console.log(measureHead);
}








function mouseDown() {
  $(".vf-stavenote")
    .mousedown(function (e) {

      type_note();

      arr_type = $(this).attr("type");
      id_ = $(this).attr("id");
      // console.log(notesMeasure1001);
      note_substr = arr_type.substr(0, 12); // ตัดตัวอักษร ว่าอยู่ บนหรือล่าง
      obj_note = eval(arr_type); // เปลี่ยน  String เป็น obj
      console.log(arr_type);

      note_ = obj_note[0].keys;
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

      console.log(obj_note[index_array].duration);
      note_duration = obj_note[index_array].duration;

      click_style();
      // add_type_array();

      let previous = Number(index_array) - 1;
      console.log(previous);
      console.log(checkIndex);
      if (Number(index_array) != 0) {
        if (checkIndex == previous) {
          let button = obj_note[previous].duration;
          fillTheRest(button, 'b');
        }
      }


      checkIndex = index_array;
      $(document).bind('mousemove', function (e) {
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
  var duration = note_duration;
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
  var duration = note_duration;
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

    let note_sea = arr_notes[value];
    note_te_k = note_sea.substr(0, 1); // เเยก note  a-g
    note_num_k = note_sea.substr(-1); // เเยก ตัวเลข จาก note 0-8*/

  }





}


$('html') // unbind mousemove all html
  .mouseup(function () {
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
  // add_type_array();
  type_note();




}

function array_type_2(type_a, type_b) {
  const type_v = type_a;
  const type_g = type_b;
  type_array.push(type_v, type_g);



}

function add_type_array() { // add array
  //console.log("A", type_array);

  let arr_num = num_shift; // จำนวน array ที่จะใส่
  let array = arr_type;

  // console.log(array);
  let A = type_array.indexOf(array);
  let c = A; //   index 0 ที่ รับมา +1 หมายถึงเพิ่ม หลัง index

  for (let index = 0; index < arr_num; index++) {
    type_d = array;
    //console.log("B", type_d);
    type_array.splice(c, 0, type_d);
  }

  //console.log("B");
  console.log(type_array);


}


function type_note() {
  let i = 0;
  const type_a = type_array;

  $('.vf-stavenote').each(function () {

    $(this).attr("type", type_a[i]);
    id_ = $(this).attr("id");
    i++;


  });
  //console.log(type_array);

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

  type_note();
  console.log(type_array);
}


window.addEventListener('load', draw_notes);