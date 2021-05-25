
var VF = null;
var context = null;
var stave = null;
var voice = null;
var notes = [];
var i = -1;

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
  //console.log("context :",renderer);


  context.setViewBox(0, 0, 500, 100);
  const svg = context.svg;
  svg.removeAttribute('width');
  svg.removeAttribute('height');



  context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

  stave = new VF.Stave(40, -10, 400);
  stave.addClef("treble").addTimeSignature("4/4");


  voice = new VF.Voice({ num_beats: 5, beat_value: 4 });
  notes = [
    get_new_note('a', 4, 'q'),
    get_new_note('b', 4, 'q'),
    get_new_note('c', 4, 'q'),
    get_new_note('d', 4, 'q'),
    get_new_note('d', 4, 'q')
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
  console.log(i);

}

function arrindex() {  // new arr-index and id

  var arr_in = $(".vf-stavenote").each(function (e) {
    $(this).attr("arr-index", e),
    $(this).attr("id", "syceColor" + e);
  });
  return arr_in;

}

function mouseDown() {
    
  $(".vf-stavenote").mousedown(function (e) {
    
    var arr_index = $(this).attr("arr-index");

    notes[arr_index].setStyle({ fillStyle: "OrangeRed", strokeStyle: "Black" });
    redraw_notes();
    
    $("div")
    .mouseup(function () {
      $(this).append(notes[arr_index].setStyle({ fillStyle: "Black", strokeStyle: "Black" }));

    });
   
 
  });
 
}

function i_number() {
  i++;
  var value = document.querySelector(".increment-btn");
}













window.addEventListener('load', draw_notes);
