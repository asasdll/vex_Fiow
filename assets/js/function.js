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



function get_new_note(key, octave, duration) {

  let obj = new VF.StaveNote({
    clef: "treble",
    keys: [key + "/" + octave],
    duration: duration,
  });
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
  stave.addClef("treble").addTimeSignature("4/4");


  voice = new VF.Voice({ num_beats: 4, beat_value: 4 });


  notes = [
    get_new_note('b', 4, 'qr'),
    get_new_note('b', 4, 'qr'),
   
  ];






  voice.addTickables(notes);



  window.renderer = renderer;
  stave.setContext(context).draw();
  var voice = VF.Beam.generateBeams(notes);
  Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);
  voice.forEach(function (b) { b.setContext(context).draw() });
  arrindex();



}






function redraw_notes() {
  //notes;
  
  
  renderer.ctx.clear();
  voice = new VF.Voice({ num_beats: 4, beat_value: 4 });

  stave.setContext(context).draw();
  var voice = VF.Beam.generateBeams(notes);
  Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);
  voice.forEach(function (b) { b.setContext(context).draw() });
  arrindex();

}


function add_note(key, octave, duration) {
  i_number();
  //console.log(key, octave, duration);
  if (i < notes.length) {
    var idx = i;
    var key = key;
    var octave = octave;
    var duration = duration;
    notes[idx] = get_new_note(key, octave, duration);
    redraw_notes();

  }

}

function arrindex() {  // new arr-index and id

  var arr_in = $(".vf-stavenote").each(function (e) {
    $(this).attr("arr-index", e),
      $(this).attr("id", "syceColor" + e);
  });

  return arr_in;

}

function mouseDown(e) {


  $(".vf-stavenote")
    .mousedown(function (e) {

      arr_index = $(this).attr("arr-index");
      notes[arr_index] = get_new_note("b", 4, "q");
      notes[arr_index].setStyle({ fillStyle: "OrangeRed", strokeStyle: "Black" });
      redraw_notes();
      e_Click = event.clientY;//413

      var note_key = notes[arr_index].keys;
      note_text = document.innerText = (note_key[0]);

      group_notes();
      search_array = arr_notes.indexOf(note_text);



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

          substr_notes();
          notes_up();



        }
      });


    });


}

function notes_up() {
  // console.log(note_sea);
  var idx = arr_index;
  var key = note_te_k;
  var octave = note_num_k;
  var duration = "64";
  notes[idx] = get_new_note(key, octave, duration);
  notes[arr_index].setStyle({ fillStyle: "OrangeRed", strokeStyle: "Black" });
  redraw_notes();



  //unBind();


}

function notes_down() {


  var idx = arr_index;
  var key = note_te_k;
  var octave = note_num_k;
  var duration = "64";
  notes[idx] = get_new_note(key, octave, duration);
  notes[arr_index].setStyle({ fillStyle: "OrangeRed", strokeStyle: "Black" });
  redraw_notes();


}

$('html') // unbind mousemove all html
  .mouseup(function (e) {
    unBind();
    notes[arr_index].setStyle({ fillStyle: "Black", strokeStyle: "Black" });

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




function i_number() {
  i++;
  var value = document.querySelector(".increment-btn");
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


function note_w() { // note 16

  notes.push(
    get_new_note('b', 4, 'w'),
  );
  
  redraw_notes();

}


function note_h() { // note 16

  notes.push(
    get_new_note('b', 4, 'h'),
  );
  
  redraw_notes();

}

function note_q() { // note 16

  notes.push(
    get_new_note('b', 4, 'q'),
  );
  
  redraw_notes();

}


function note_8() { // note 16

  notes.push(
    get_new_note('b', 4, 'qr'),
  );
  
  redraw_notes();

}


function note_8() { // note 16

  notes.push(
    get_new_note('b', 4, '8r'),
  );
  
  redraw_notes();

}

function note_16() { // note 16

  notes.push(

    get_new_note('b', 4, '16r'),
    get_new_note('b', 4, '8r'),
  );
  
  redraw_notes();



}


function note_32() { // note 16

  notes.push(

    get_new_note('b', 4, '32r'),
    get_new_note('b', 4, '16r'),
    get_new_note('b', 4, '8r'),
  );
  
  redraw_notes();



}


function note_64() { // note 16

  notes.push(
    get_new_note('b', 4, '64r'),
    get_new_note('b', 4, '32r'),
    get_new_note('b', 4, '16r'),
    get_new_note('b', 4, '8r'),
  );
  
  redraw_notes();



}








window.addEventListener('load', draw_notes, redraw_notes);