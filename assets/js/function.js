
var VF = null;
var context = null;
var stave = null;
var voice = null;
var notes = [];
var i = -1;
var arr_index = null;

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

  stave = new VF.Stave(40, 0, 400);
  stave.addClef("treble").addTimeSignature("4/4");


  voice = new VF.Voice({ num_beats: 5, beat_value: 4 });
  notes = [
    get_new_note('a', 4, 'q'),
    get_new_note('b', 4, 'q'),
    get_new_note('c', 4, 'q'),
    get_new_note('d', 4, 'q'),
    get_new_note('g#', 4, 'q')
  ];

  voice.addTickables(notes);
  var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);
  window.renderer = renderer;
  stave.setContext(context).draw();
  voice.draw(context, stave);
  arrindex();


}



function redraw_notes() {
  voice = new VF.Voice({ num_beats: 5, beat_value: 4 });

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
  //window.addEventListener('load', arrindex);
 
  $(".vf-stavenote")
    //.on("click",function (e) {
    .mousedown(function (e) {
       arr_index = $(this).attr("arr-index");
       id_y = $(this).attr("id");
       $("#" + id_y).draggable({ axis: "y"});
      // redraw_notes();
      notes[arr_index].setStyle({ fillStyle: "OrangeRed", strokeStyle: "Black" });
    
    $("#" + id_y).draggable();
    


    
      
   
    })
    .mouseup(function (e) {
        // notes[arr_index].setStyle({ fillStyle: "Black", strokeStyle: "Black" });
    });


}
function draggable_Y() {
    var  pix_y = $("#" + id_y).draggable();
  return pix_y;
}

function DragNote() {
  $("#draggable").draggable();
}

function i_number() {
  i++;
  var value = document.querySelector(".increment-btn");
}















window.addEventListener('load', draw_notes,redraw_notes);

