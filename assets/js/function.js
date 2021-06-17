var VF = null;
var context = null;
var stave = null;
var voice = null;
var i = -1;
var arr_index = null;
var e_Click;
var note_te_k;
var note_num_k;
var arr_notes;
var move_pixel;
var array_a = 1;
var search_array;
var key;
var octave;
var note_text;
var duration_note = null;
var note_array;
var checkIndex;
var arr_type = [];
var arr_sum = [];
var arr_type_to = [];
var arr_to = [];
var index_of = [];

function get_new_note(key, octave, duration) {

  let obj = new VF.StaveNote({
    clef: "treble",
    keys: [key + "/" + octave],
    duration: duration,
    //auto_stem: true,
    //clef: "treble"
  })
  //obj.setAttribute('id', 'test555');



  return obj;
}


function get_new_note_down(key, octave, duration) {

  let obj = new VF.StaveNote({
    //clef: 'treble',
    keys: [key + "/" + octave],
    duration: duration,
    auto_stem: true,
    clef: "treble"
  })
  //obj.setAttribute('id', 'test555');



  return obj;
}


function draw_notes() {
  VF = Vex.Flow;
  var div = document.getElementById("page")
  var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

  renderer.resize(500, 500);

  context = renderer.getContext();


  context.setFont("Arial", 50, "").setBackgroundFillStyle("#eed");

  stave = new VF.Stave(40, 100, 400);
  stave_2 = new VF.Stave(40, 200, 400);


  stave.addClef("treble").addTimeSignature("4/4");
  stave_2.addClef("bass").addTimeSignature("4/4");


  var brace = new Vex.Flow.StaveConnector(stave, stave_2).setType(3);
  var lineLeft = new Vex.Flow.StaveConnector(stave, stave_2).setType(1);
  var lineRight = new Vex.Flow.StaveConnector(stave, stave_2).setType(6);

  voice = new VF.Voice({ num_beats: 4, beat_value: 4 });



  notes = [
    get_new_note('b', 4, "wr"),

  ];

  notes_2 = [
    get_new_note_down('b', 4, "wr"),

  ];

  sum_array();

  //console.log(arr_type);
  //voice.addTickables(notes);
  var children = notes.concat(notes_2);


  window.renderer = renderer;
  stave.setContext(context).draw();
  stave_2.setContext(context).draw();
  brace.setContext(context).draw();
  lineLeft.setContext(context).draw();
  lineRight.setContext(context).draw();
  var voice = VF.Beam.generateBeams(notes);
  var voice_2 = VF.Beam.generateBeams(notes_2); //note เส้นหาย
  Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);
  Vex.Flow.Formatter.FormatAndDraw(context, stave_2, notes_2);//note เส้นหาย
  voice.forEach(function (b) { b.setContext(context).draw() });
  voice_2.forEach(function (b) { b.setContext(context).draw() });
  arrindex();
  arrline();
  room_create();


}




function redraw_notes() {

  sum_array();

  renderer.ctx.clear();

  var brace = new Vex.Flow.StaveConnector(stave, stave_2).setType(3);
  var lineLeft = new Vex.Flow.StaveConnector(stave, stave_2).setType(1);
  var lineRight = new Vex.Flow.StaveConnector(stave, stave_2).setType(6);


  stave.setContext(context).draw();
  stave_2.setContext(context).draw();
  brace.setContext(context).draw();
  lineLeft.setContext(context).draw();
  lineRight.setContext(context).draw();
  voice = new VF.Voice({ num_beats: 4, beat_value: 4 });

  var voice = VF.Beam.generateBeams(notes);
  var voice_2 = VF.Beam.generateBeams(notes_2); //note เส้นหาย
  Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);
  Vex.Flow.Formatter.FormatAndDraw(context, stave_2, notes_2); //note เส้นหาย
  voice.forEach(function (b) { b.setContext(context).draw() });
  voice_2.forEach(function (b) { b.setContext(context).draw() });
  arrindex();
  arrline();
  room_create();
  index_array();



}





function arrindex() {  // new arr-index and id
  id_type();


  var i = 0;


  // console.log(text);
  $(".vf-stavenote").each(function () {


    $(this).attr("arr-index", arr_type[i]),
      $(this).attr("id", "syceColor" + arr_type[i]);
    i++;



  });



  //return arr_in;

}

function id_type() {

  arr_type_to = [];
  arr_type = [];
  var i;
  var y;
  for (i = 0; i < arr_sum.length; i++) {
    type = arr_sum[i].duration;
    // console.log(type,i);
    if (type != "b") {

      arr_type.push(i);

    }
  }

  for (y = 0; y < arr_sum.length; y++) {

    arr_type_to.push(y);


  }



}




function arrline() {  // new arr-index and id

  var arr_lin = $('rect').each(function (e) {
    //console.log(e);
    $(this).attr("arr-line", e)

  });

  var arr_path = $('path').each(function (e) {
    //console.log(e);
    $(this).attr("arr-path", e)

  });


  return arr_lin, arr_path;

}

function mouseDown(_e) {


  $(".vf-stavenote")
    .mousedown(function (_e) {
      arr_index = $(this).attr("arr-index");
      index_of = arr_index;
     
      e_Click = event.clientY;//413
      index_array();

      // console.log("888",note_sea);
      redraw_notes();
      group_notes();

      search_array = arr_notes.indexOf(note_sea);

      //console.log(search_array);

      //   console.log(search_array,note_key);
      let previous = Number(arr_index) - 1;

      if (Number(arr_index) != 0) {
        if (checkIndex == previous) {
          let button = notes[previous].duration;
          fillTheRest(button, 'b');
        }
      }

      $(document).bind('mousemove', function (e) {

        //$( this ).addClass('mousemove', function (e) {
        var ev_move = e.clientY;//434
        var pixels = $("p").html(ev_move);
        sum_pixels = e_Click + 10;//443
        del_pix = e_Click - 10;



        if (ev_move >= sum_pixels) {//443 note_down
          move_pixel = ev_move;
          e_Click = sum_pixels;//433

          if (ev_move == move_pixel) {

            search_array = search_array - array_a;

          }
          //console.log(search_array);
          substr_notes();
          notes_down();


        } else if (ev_move <= del_pix) { //note_up

          move_pixel = ev_move;
          e_Click = del_pix;//433

          if (ev_move == move_pixel) {  //note_up
            search_array = search_array + array_a;


          }
          //console.log(search_array);
          substr_notes();

          notes_up();



        }
      });


    });

  checkIndex = arr_index;
}
function setStyle() {
  notes[arr_index].setStyle({ fillStyle: "OrangeRed", strokeStyle: "Black" });
}

function setStyle_to() {

  notes_2[arr_index].setStyle({ fillStyle: "OrangeRed", strokeStyle: "Black" });
}



function notes_up() {

  var idx = arr_index;
  var key = note_te_k;
  var octave = note_num_k;
  var duration = duration_note;
  //console.log(key,octave,duration);
  notes[idx] = get_new_note(key, octave, duration);
  setStyle();
  redraw_notes();


}

function notes_down() {

  var idx = arr_index;
  var key = note_te_k;
  var octave = note_num_k;
  var duration = duration_note;
  //console.log(key,octave,duration);
  notes[idx] = get_new_note(key, octave, duration);
  setStyle();
  redraw_notes();


}

$('html') // unbind mousemove all html
  .mouseup(function (e) {
    unBind();
    notes[arr_index].setStyle({ fillStyle: "Black", strokeStyle: "Black" });
    notes_2[arr_index].setStyle({ fillStyle: "Black", strokeStyle: "Black" });
    mouseDown(e); //function mouseDown(e) ใหม่

  });

function unBind() { // unbind mousemove
  $(document).unbind("mousemove");

}


function substr_notes() {


  if (search_array <= arr_notes.length) {
    note_sea = arr_notes[search_array];
    note_te_k = note_sea.substr(0, 1);
    note_num_k = note_sea.substr(-1);

  }


}

function room_create() {

  $('path')
    .mousedown(function (_e) {

    });
}

function add_measure_after() {
  let shift = notes.length + 1;
  let shift1 = notes_2.length + 1;
  notes[shift - 1] = new VF.BarNote();
  notes[shift] = get_new_note('b', 4, "wr");
  notes_2[shift1 - 1] = new VF.BarNote();
  notes_2[shift1] = get_new_note('b', 4, "wr");
  redraw_notes();
}

function add_measure_before() {
  let end = notes.length + 1;
  let end1 = notes_2.length + 1;

  for (i = end; i > 1; i--) {
    notes[i] = notes[i - 2];
  }
  notes[0] = get_new_note('b', 4, "wr");
  notes[1] = new VF.BarNote();

  for (u = end1; u > 1; u--) {
    notes_2[u] = notes_2[u - 2];
  }
  notes_2[0] = get_new_note('b', 4, "wr");
  notes_2[1] = new VF.BarNote();

  redraw_notes();
}



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

function sum_array() {

  arr_sum = notes.concat(new VF.BarNote(), notes_2);
  // console.log(children);
  /// new VF.BarNote();

}

function index_array() {
  var in_array = notes.length;
  var arr_to = [];
  in_to = in_array + 1;

  for (i = in_to; i < arr_type_to.length; i++) {
    arr_to.push(arr_type_to[i]);
    //console.log(arr_to);
  }

  note_idx = parseInt(arr_index);
   console.log(arr_index);
  //notes[arr_index] = get_new_note(key, octave, "wr");

  index_in = arr_to.indexOf(note_idx);

  //console.log(index_in);
  if (index_of <= in_array) {
console.log("555",arr_index);
    var note_key = notes[arr_index].keys;
    var duration = notes[arr_index].duration;
    duration_note = duration;
    note_sea = document.innerText = (note_key[0]);
    key = note_sea.substr(0, 1);
    octave = note_sea.substr(-1);


    if (duration == "w") {


      notes[arr_index] = get_new_note(key, octave, "wr");

      setStyle();
    } else {
      notes[arr_index] = get_new_note(key, octave, duration);

      setStyle();
    }


  } else {
    //console.log(arr_type);

    arr_index = index_in;
    var note_key = notes_2[arr_index].keys;
    var duration = notes_2[arr_index].duration;
    duration_note = duration;
    note_sea = document.innerText = (note_key[0]);
    key = note_sea.substr(0, 1);
    octave = note_sea.substr(-1);


    if (duration == "w") {

      notes_2[arr_index] = get_new_note(key, octave, "wr");
      setStyle_to();
    } else {
      notes_2[arr_index] = get_new_note(key, octave, duration);
      setStyle_to();
    }



  }





}






window.addEventListener('load', draw_notes, redraw_notes);