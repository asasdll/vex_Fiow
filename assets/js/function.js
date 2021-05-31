
var VF = null;
var context = null;
var stave = null;
var voice = null;
var notes = [];
var i = -1;
var arr_index = null;
var e_Click;
var note_te_k;
var note_num_k

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


  context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

  stave = new VF.Stave(40, 40, 400);
  stave.addClef("treble").addTimeSignature("4/4");


  voice = new VF.Voice({ num_beats: 28, beat_value: 4 });
  notes = [
    get_new_note('a', 0, 'q'),
    get_new_note('b', 0, 'q'),
    get_new_note('c', 1, 'q'),
    get_new_note('d', 1, 'q'),
    get_new_note('e', 1, 'q'),
    get_new_note('f', 1, 'q'),
    get_new_note('g', 1, 'q'),
    get_new_note('a', 1, 'q'),
    get_new_note('b', 1, 'q'),
    get_new_note('c', 2, 'q'),
    get_new_note('d', 2, 'q'),
    get_new_note('e', 2, 'q'),
    get_new_note('f', 2, 'q'),
    get_new_note('g', 2, 'q'),
    get_new_note('a', 2, 'q'),
    get_new_note('b', 2, 'q'),
    get_new_note('c', 3, 'q'),
    get_new_note('d', 3, 'q'),
    get_new_note('e', 3, 'q'),
    get_new_note('f', 3, 'q'),
    get_new_note('g', 3, 'q'),
    get_new_note('a', 2, 'q'),
    get_new_note('b', 2, 'q'),
    get_new_note('c', 3, 'q'),
    get_new_note('d', 3, 'q'),
    get_new_note('e', 3, 'q'),
    get_new_note('f', 3, 'q'),
    get_new_note('g', 3, 'q')
   

  ];

  voice.addTickables(notes);
  var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);
  window.renderer = renderer;
  stave.setContext(context).draw();
  voice.draw(context, stave);
  arrindex();

}



function redraw_notes() {
  voice = new VF.Voice({ num_beats: 49, beat_value: 4 });

  voice.addTickables(notes);
  var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

  renderer.ctx.clear();
  stave.setContext(context).draw();
  voice.draw(context, stave);
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
    //.on("click",function (e) {
    .mousedown(function (e) {
      arr_index = $(this).attr("arr-index");
      id_y = $(this).attr("id");
      $("#" + id_y).draggable({ axis: "y" });

      notes[arr_index].setStyle({ fillStyle: "OrangeRed", strokeStyle: "Black" });
      redraw_notes();
      e_Click = event.clientY;
      var note_key = notes[arr_index].keys;
      note_text = document.innerText = (note_key[0]);
      note_te_k = note_text.substr(0, 1);
      note_num_k = note_text.substr(-1);


      $(document).bind('mousemove', function (e) {
        var ev_move = event.clientY;
        var pixels = $("p").html(ev_move)
        sum_pixels = e_Click + 20;
        sum_pix = ev_move + 20;
        console.log("ev_move");
        if (e_Click <= ev_move) {

          notes_down();
         

        } else if(e_Click >= ev_move) {

          notes_up();

        }
      });

      //console.log(e_Click);

    })
    .mouseup(function (e) {
      mouseUp();
    });


}

function notes_up() {


  var idx = arr_index;
  var key = note_te_k;
  var octave = "5";
  var duration = "q";
  notes[idx] = get_new_note(key, octave, duration);
  redraw_notes();
  unBind();
  
  
}

function notes_down() {


  var idx = arr_index;
  var key = note_te_k;
  var octave = "3";
  var duration = "q";
  notes[idx] = get_new_note(key, octave, duration);
  redraw_notes();
  unBind();
}
  
  



function mouseUp() {  // setStyle Black
  notes[arr_index].setStyle({ fillStyle: "Black", strokeStyle: "Black" }); // setStyle Black
  unBind();   // unbind mousemove 
}

$('html') // unbind mousemove all html
  .mouseup(function (e) {
    mouseUp();
  });

function unBind() { // unbind mousemove
  $(document).unbind("mousemove");
}




function i_number() {
  i++;
  var value = document.querySelector(".increment-btn");
}

function name(params) {
  arr_notes = [

  ];
}

















window.addEventListener('load', draw_notes, redraw_notes);

