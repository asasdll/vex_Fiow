
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


  voice = new VF.Voice({ num_beats: 7, beat_value: 4 });
  notes = [
    get_new_note('a', 4, 'q'),
    get_new_note('b', 4, 'q'),
    get_new_note('c', 4, 'q'),
    get_new_note('d', 4, 'qr'),
    get_new_note('e', 4, 'qr'),
    get_new_note('f', 4, 'qr'),
    get_new_note('g', 4, 'qr')
  ];

  voice.addTickables(notes);
  var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);
  window.renderer = renderer;
  stave.setContext(context).draw();
  voice.draw(context, stave);


  arrindex();

}



function redraw_notes() {
  voice = new VF.Voice({ num_beats: 7, beat_value: 4 });

  voice.addTickables(notes);
  var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

  renderer.ctx.clear();
  stave.setContext(context).draw();
  voice.draw(context, stave);
  arrindex();

}


function add_note(key, octave, duration) {

  // var idx = "0";
  var key = key;
  var octave = octave;
  var duration = duration;
  notes[0] = get_new_note(key, octave, duration);
  redraw_notes();
  i_number();


}

function arrindex() {
  var arr_in = $(".vf-stavenote").each(function (e) {
    //console.log(e);
    $(this).attr("arr-index", e),
      $(this).attr("id", "syceColor" + e);
  });
  return arr_in;

}



function mouseDown() {
  $(".vf-stavenote").on("click", function (e) {
   
  
    arrindex();
    
    var arr_index = $(this).attr("arr-index");
    var id_y = $(this).attr("id");
    
    //notes[arr_index] = get_new_note('c', '4', 'q').setKeyStyle(2, {shadowColor: "yellow", shadowBlur: 3});
    notes[arr_index].setStyle({ fillStyle: "OrangeRed", strokeStyle: "Black" });
    
    redraw_notes();
    $( function() {
      $("#" + id_y).draggable({ axis: "y" });
    } );
    $("div")
      .mouseup(function () {
        $(this).append(notes[arr_index].setStyle({ fillStyle: "Black", strokeStyle: "Black" }));
      });
     

      
      var top_y = $(this).attr("style");
    //  console.log(id_y);
  


  })
  console.log(i);

}

function i_number() {
  i++;
  var value = document.querySelector(".increment-btn");
  
  console.log(i);
}













window.addEventListener('load', draw_notes);
