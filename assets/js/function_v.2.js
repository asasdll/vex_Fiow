var width = 500;
var height = 100;
var height2 = 200;
var note_num_k;
var index_array;
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

  return obj;
}


function draw_notes() {
  VF = Vex.Flow;
  var div = document.getElementById("page")
  renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

  renderer.resize(700, 700);

  context = renderer.getContext();

  context.setFont("Arial", 50, "").setBackgroundFillStyle("#eed");

  voice = new VF.Voice({ num_beats: 4, beat_value: 4 });

  notesMeasure1001 = [
    get_new_note('b', 4, "wr", true),
    // get_new_note('b', 4, "q", false),
    // get_new_note('c', 4, "q", false),
    // get_new_note('d', 4, "q", false),


  ];



  notes_2Measure1001 = [
    get_new_note('b', 4, "wr", true),

  ];


  computeStave();
  redraw_notes();
  click_time_Signature();



}

function redraw_notes() {
  renderer.ctx.clear();
  let marker = 1002 - u;

  for (i = measure; i >= marker; i--) {

    this["staveMeasure" + i].setContext(context).draw();
    this["stave_2Measure" + i].setContext(context).draw();


    this["group" + i] = context.openGroup(); // open
    this["group" + i].setAttribute("name", "group" + i);

    Vex.Flow.Formatter.FormatAndDraw(context,
      this["staveMeasure" + i],
      this["notesMeasure" + i]);
    var voice = VF.Beam.generateBeams(this["notesMeasure" + i]);
    voice.forEach(function (b) { b.setContext(context).draw() });


    context.closeGroup(); // close

    this["groupt" + i] = context.openGroup(); // open
    this["groupt" + i].setAttribute("name", "groupt" + i)

    Vex.Flow.Formatter.FormatAndDraw(context,
      this["stave_2Measure" + i],
      this["notes_2Measure" + i]);
    var voice_2 = VF.Beam.generateBeams(this["notes_2Measure" + i]);
    voice_2.forEach(function (b) { b.setContext(context).draw() });

    context.closeGroup(); // close

    if (this["staveMeasure" + i].x == 70) {
      var brace = new Vex.Flow.StaveConnector(this["staveMeasure" + i], this["stave_2Measure" + i]).setType(3);
      var lineLeft = new Vex.Flow.StaveConnector(this["staveMeasure" + i], this["stave_2Measure" + i]).setType(1);

      brace.setContext(context).draw();
      lineLeft.setContext(context).draw();
    }

    var lineRight = new Vex.Flow.StaveConnector(this["staveMeasure" + i], this["stave_2Measure" + i]).setType(0);
    lineRight.setContext(context).draw();

    if (i == measure) {
      var lineRight = new Vex.Flow.StaveConnector(this["staveMeasure" + i], this["stave_2Measure" + i]).setType(6);
      lineRight.setContext(context).draw();


    }
    addType(i);
  }
  click_time_Signature();
  // time_Signature();
}

function addType(array) {
  ele1 = document.getElementsByName("group" + array);
  ele2 = document.getElementsByName("groupt" + array);

  group1 = ele1[0].children;
  group2 = ele2[0].children;
  // console.log(group1);
  // console.log(group2);


  for (j = 0; j < group1.length; j++) {
    group1[j].setAttribute("arr", `notesMeasure${array}`);
    group1[j].setAttribute("measure", `${array}`);
    group1[j].setAttribute("level", `upper`);
  }

  for (j = 0; j < group2.length; j++) {
    group2[j].setAttribute("arr", `notes_2Measure${array}`);
    group2[j].setAttribute("measure", `${array}`);
    group2[j].setAttribute("level", `lower`);
  }
}

let measure = 1001;

function add_measure_after() {
  renderer.ctx.clear();

  this["notesMeasure" + (measure + 1)] = [
    get_new_note('b', 4, "wr", true),
  ];

  this["notes_2Measure" + (measure + 1)] = [
    get_new_note('b', 4, "wr", true),

  ];

  measure++;
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

  u++;

  computeStave();
  redraw_notes();


}

let trackHead = 0;

function computeStave() {
  renderer.ctx.clear();
  // console.log('in');
  j = 1001 - (u - 1);  // ตำแหน่งเริ่ม loop
  pointer2 = 1001 - (u - 1); // pointer ตัวที่สอง
  level = 0; // ความสูงเส้นแรก
  level2 = 100; // ความสูงเส้นสอง
  let vit = 480; // ความยาว
  let trackHead = 0;

  for (i = j; i <= measure; i++) { // ลูปจากห้องติดลบ ไปห้องสุดท้าย
    // console.log(i);
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

    // console.log(measureHead);

    if (vit == 0) { // ให้ pointer วิ่งตาม
      let head = 1; // เช็คหัวแรกของ pointer

      if (i != measure) { // ถ้าไม่ใช่ห้องสุดท้าย
        while (pointer2 < i) {
          let pointerMeasure = this["staveMeasure" + pointer2];
          let pointerMeasure2 = this["stave_2Measure" + pointer2];
          let previousMeasure = this["staveMeasure" + (pointer2 - 1)];


          if (head == 1) { // เป็นหัวของ pointer หรือไม่
            xpos = 70;
            pointerMeasure.width += 70;
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
  modifyStave();
}

keySig = 'D';
timeSig = '4/4';
clef = 'french';
lowerClef = 'alto';


function modifyStave() {
  for (i = j; i <= measure; i++) {
    if (this["staveMeasure" + i].x == 70) {
      this["staveMeasure" + i].addClef(clef).addKeySignature(keySig).addTimeSignature(timeSig);
      this["stave_2Measure" + i].addClef(lowerClef).addKeySignature(keySig).addTimeSignature(timeSig);
    }
  }
}






function mouseDown() {
  // console.log("222");
  $(".vf-stavenote")
    .mousedown(function (e) {
      setStyle_Black_clear();

      arr_type = $(this).attr("arr");
      id_ = $(this).attr("id");
      mea_ = $(this).attr("measure");
      level_ = $(this).attr("level");
      console.log(level_);

      note_substr = arr_type.substr(0, 12); // ตัดตัวอักษร ว่าอยู่ บนหรือล่าง

      obj_note = eval(arr_type); // เปลี่ยน  String เป็น obj

      let note_id = [];
      for (let i = 0; i < obj_note.length; i++) {
        // console.log(obj_note[i].attrs.id);
        note_id.push(obj_note[i].attrs.id);

      }
      var id_res = id_.substr(3);
      index_array = note_id.indexOf(id_res); // id ของ เเต่ละ array

      note_ = obj_note[0].keys;
      //console.log(note_duration);
      nots_str = (note_).toString(); //เปลี่ยน  note เป็น String


      e_Click = event.clientY; //413
      group_notes(); // เรียกใช้งาน arr_notes 
      var search_array = arr_notes.indexOf(nots_str); // หา index note 29

      // console.log(obj_note[index_array].duration);
      note_duration = obj_note[index_array].duration;

      click_style();

      let previous = Number(index_array) - 1;
      if (Number(index_array) != 0) {
        if (checkIndex == previous) {
          let button = obj_note[previous].duration;
          fillTheRest(button, 'b');
        }
      }

      substr_notes(search_array);
      checkIndex = index_array;

      if (obj_note[index_array].customTypes == 'r') {
        notes_Click();
      }






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



  $("path")
    .mousedown(function (e) {
      let id = $(this).attr("id");

      if (id == "time_6" || id == "time_7") {
        $('#exampleModal').modal("toggle");
        time_Signature_Popup();
      }




    });


}


function notes_up() {

  var key = note_te_k;
  var octave = note_num_k;
  var duration = note_duration;

  obj_note[index_array] = get_new_note(key, octave, duration);
  setStyle_OrangeRed()
  redraw_measure();
  redraw_measure();
}

function notes_down() {

  var key = note_te_k;
  var octave = note_num_k;
  var duration = note_duration;
  // console.log(key, octave);
  obj_note[index_array] = get_new_note(key, octave, duration);
  setStyle_OrangeRed();
  redraw_measure();
  redraw_measure();
}

function redraw_measure() {

  let i = mea_

  if (level_ == "upper") {
    let gt = this['group' + i];
    context.svg.removeChild(gt);

    this["group" + i] = context.openGroup(); // open
    this["group" + i].setAttribute("name", "group" + i);

    Vex.Flow.Formatter.FormatAndDraw(context,
      this["staveMeasure" + i],
      this["notesMeasure" + i]);
    var voice = VF.Beam.generateBeams(this["notesMeasure" + i]);
    voice.forEach(function (b) { b.setContext(context).draw() });

    context.closeGroup(); // close 
  } else {
    let gt = this['groupt' + i];
    context.svg.removeChild(gt);

    this["groupt" + i] = context.openGroup(); // open
    this["groupt" + i].setAttribute("name", "groupt" + i);

    Vex.Flow.Formatter.FormatAndDraw(context,
      this["stave_2Measure" + i],
      this["notes_2Measure" + i]);
    var voice = VF.Beam.generateBeams(this["notes_2Measure" + i]);
    voice.forEach(function (b) { b.setContext(context).draw() });

    context.closeGroup(); // close
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

function notes_Click() {

  let key = note_te_k;
  let octave = note_num_k;
  let duration = note_duration;

  obj_note[index_array] = get_new_note(key, octave, duration, false);

  setStyle_Black()
  redraw_measure();
  redraw_measure();
  addType(mea_);

}

$('html') // unbind mousemove 
  .mouseup(function () {
    unBind();
  });

$('html')
  .click(function () {
    setStyle_Black();
    redraw_notes();
  });





function unBind() { // unbind mousemove
  $(document).unbind("mousemove");

}


function setStyle_OrangeRed() {

  obj_note[index_array].setStyle({ fillStyle: "OrangeRed", strokeStyle: "Black" });

}

function setStyle_Black() {
  if (index_array != undefined) {
    obj_note[index_array].setStyle({ fillStyle: "Black", strokeStyle: "Black" });
  }
}

function setStyle_Black_clear() {
  if (checkIndex != undefined) {
    obj_note[checkIndex].setStyle({ fillStyle: "Black", strokeStyle: "Black" });
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


}

function click_time_Signature() {

  let i = 0;

  $("path").each(function () {

    $(this).attr("id", "time_" + i);

    i++;

  });
}



let upperTime = 4;
let lowerTime = 4;

function time_Signature_Popup() {

  id_option = String(lowerTime);
  document.getElementById(id_option + 'o').selected = true;

  document.getElementById("time_cut_1").value = upperTime;
  document.getElementById("time_cut").innerHTML = upperTime + "<br>" + lowerTime;

}

function time_Signature() {

  firstElement = document.getElementById("time_cut_1").value;
  secondElement = document.getElementById("id_time_cut_2").value;

  document.getElementById("time_cut").innerHTML = firstElement + "<br>" + secondElement;
  document.getElementById("time_cut_1").value = firstElement;
}

function commit_time() {
  upperTime = firstElement;
  lowerTime = secondElement;
  console.log(upperTime + '/' + lowerTime);
  timeSig = (upperTime + '/' + lowerTime);
  computeStave();
  redraw_notes();
}


function key_Signature() {

  console.log("5555555");

}

function text_key_Signature(e) {
  console.log("log", e);

  let keySignature = ""
  if (e == 0) {
    keySignature = document.getElementById("keyModel").value;

  } else {
    keySignature = document.getElementById("keyModel").value;
  }



  let textTop_1 = ""; let textTop_2 = ""; let textTop_3 = ""; let textTop_4 = "";
  let textTop_5 = ""; let textTop_6 = ""; let textTop_7 = ""; let textTop_8 = "";

  let textEnd_1 = ""; let textEnd_2 = ""; let textEnd_3 = ""; let textEnd_4 = "";
  let textEnd_5 = ""; let textEnd_6 = ""; let textEnd_7 = "";

  if (keySignature == 'Major') {
    //Major
    //top : C G D A E B F# C#
    //end : -- F Bb Eb Ab Db Gb Cb

    textTop_1 = "C"; textTop_2 = "G"; textTop_3 = "D"; textTop_4 = "A";
    textTop_5 = "E"; textTop_6 = "B"; textTop_7 = "F#"; textTop_8 = "C#";

    textEnd_1 = "F"; textEnd_2 = "Bb"; textEnd_3 = "Eb"; textEnd_4 = "Ab";
    textEnd_5 = "Db"; textEnd_6 = "Gb"; textEnd_7 = "Cb";

  } else if (keySignature == 'Minor') {
    //Minor
    //top : A E B F# C# G# D# A#
    //end : -- D G C F Bb Eb Ab
    textTop_1 = "A"; textTop_2 = "E"; textTop_3 = "B"; textTop_4 = "F#";
    textTop_5 = "C#"; textTop_6 = "G#"; textTop_7 = "D#"; textTop_8 = "A#";

    textEnd_1 = "D"; textEnd_2 = "G"; textEnd_3 = "C"; textEnd_4 = "F";
    textEnd_5 = "Bb"; textEnd_6 = "Eb"; textEnd_7 = "Ab";

  } else if (keySignature == 'Ionian') {
    //Ionian
    //top :C G D A E B F# C#
    //end : -- F Bb Eb Ab Db Gb Cb
    textTop_1 = "C"; textTop_2 = "G"; textTop_3 = "D"; textTop_4 = "A";
    textTop_5 = "E"; textTop_6 = "B"; textTop_7 = "F#"; textTop_8 = "C#";

    textEnd_1 = "F"; textEnd_2 = "Bb"; textEnd_3 = "Eb"; textEnd_4 = "Ab";
    textEnd_5 = "Db"; textEnd_6 = "Gb"; textEnd_7 = "Cb";

  }
  else if (keySignature == 'Dorian') {
    //Dorian
    //top :D A E B F# C# G# D#
    //end : -- G C F Bb Eb Ab Db
    textTop_1 = "D"; textTop_2 = "A"; textTop_3 = "E"; textTop_4 = "B";
    textTop_5 = "F#"; textTop_6 = "C#"; textTop_7 = "G#"; textTop_8 = "D#";

    textEnd_1 = "G"; textEnd_2 = "C"; textEnd_3 = "F"; textEnd_4 = "Bb";
    textEnd_5 = "Eb"; textEnd_6 = "Ab"; textEnd_7 = "Db";
  }
  else if (keySignature == 'Phrygian') {
    //Phrygian
    //top :E B F# C# G# D# A# E#
    //end : -- A D G C F Bb Eb
    textTop_1 = "E"; textTop_2 = "B"; textTop_3 = "F#"; textTop_4 = "C#";
    textTop_5 = "G#"; textTop_6 = "D#"; textTop_7 = "A#"; textTop_8 = "E#";

    textEnd_1 = "A"; textEnd_2 = "D"; textEnd_3 = "G"; textEnd_4 = "C";
    textEnd_5 = "F"; textEnd_6 = "Bb"; textEnd_7 = "Eb";

  }
  else if (keySignature == 'Lydian') {
    //Lydian
    //top :F C G D A E B F#
    //end : -- Bb EB Ab Db Gb Cb Fb

    textTop_1 = "F"; textTop_2 = "C"; textTop_3 = "G"; textTop_4 = "D";
    textTop_5 = "A"; textTop_6 = "E"; textTop_7 = "B"; textTop_8 = "F#";

    textEnd_1 = "Bb"; textEnd_2 = "Eb"; textEnd_3 = "Ab"; textEnd_4 = "Db";
    textEnd_5 = "Gb"; textEnd_6 = "Cb"; textEnd_7 = "Fb";

  }
  else if (keySignature == 'Mixolydian') {
    //Mixolydian
    //top :G D A E B F# C# G#
    //end : -- C F Bb Eb Ab Db Gb
    textTop_1 = "G"; textTop_2 = "D"; textTop_3 = "A"; textTop_4 = "E";
    textTop_5 = "B"; textTop_6 = "F#"; textTop_7 = "C#"; textTop_8 = "G#";

    textEnd_1 = "C"; textEnd_2 = "F"; textEnd_3 = "Bb"; textEnd_4 = "Eb";
    textEnd_5 = "Ab"; textEnd_6 = "Db"; textEnd_7 = "Gb";

  } else if (keySignature == 'Aeolian') {
    //Aeolian
    //top :A E B F# C# G# D# A#
    //end : -- D G C F Bb Eb Ab
    textTop_1 = "A"; textTop_2 = "E"; textTop_3 = "B"; textTop_4 = "F#";
    textTop_5 = "C#"; textTop_6 = "G#"; textTop_7 = "D#"; textTop_8 = "A#";

    textEnd_1 = "D"; textEnd_2 = "G"; textEnd_3 = "C"; textEnd_4 = "F";
    textEnd_5 = "Bb"; textEnd_6 = "Eb"; textEnd_7 = "Ab";

  } else if (keySignature == 'Locrian') {
    //Locrian
    //top :B F# C# G# D# A# E# B#
    //end : -- E A D G C F Bb
    textTop_1 = "B"; textTop_2 = "F#"; textTop_3 = "C#"; textTop_4 = "G#";
    textTop_5 = "D#"; textTop_6 = "A#"; textTop_7 = "E#"; textTop_8 = "B#";

    textEnd_1 = "E"; textEnd_2 = "A"; textEnd_3 = "D"; textEnd_4 = "G";
    textEnd_5 = "C"; textEnd_6 = "F"; textEnd_7 = "Bb";

  } else {
    //Unknown
    //top : C G D A E B F# C#
    //end : -- F Bb Eb Ab Db Gb Cb

    textTop_1 = "C"; textTop_2 = "G"; textTop_3 = "D"; textTop_4 = "A";
    textTop_5 = "E"; textTop_6 = "B"; textTop_7 = "F#"; textTop_8 = "C#";

    textEnd_1 = "F"; textEnd_2 = "Bb"; textEnd_3 = "Eb"; textEnd_4 = "Ab";
    textEnd_5 = "Db"; textEnd_6 = "Gb"; textEnd_7 = "Cb";
  }


  document.getElementById("textTop_1").innerHTML = textTop_1;
  document.getElementById("textTop_2").innerHTML = textTop_2;
  document.getElementById("textTop_3").innerHTML = textTop_3;
  document.getElementById("textTop_4").innerHTML = textTop_4;
  document.getElementById("textTop_5").innerHTML = textTop_5;
  document.getElementById("textTop_6").innerHTML = textTop_6;
  document.getElementById("textTop_7").innerHTML = textTop_7;
  document.getElementById("textTop_8").innerHTML = textTop_8;

  document.getElementById("textEnd_1").innerHTML = textEnd_1;
  document.getElementById("textEnd_2").innerHTML = textEnd_2;
  document.getElementById("textEnd_3").innerHTML = textEnd_3;
  document.getElementById("textEnd_4").innerHTML = textEnd_4;
  document.getElementById("textEnd_5").innerHTML = textEnd_5;
  document.getElementById("textEnd_6").innerHTML = textEnd_6;
  document.getElementById("textEnd_7").innerHTML = textEnd_7;



}






window.addEventListener('load', draw_notes);