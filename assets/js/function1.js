var width = 500;
var height = 100;
var height2 = 200;


function get_new_note(key, octave, duration) {

  let obj = new VF.StaveNote({
    clef: "treble",
    keys: [key + "/" + octave],
    duration: duration,
    align_center: true

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
    clef: "treble",
    align_center: true

  })
  //obj.setAttribute('id', 'test555');



  return obj;
}


function draw_notes() {
  VF = Vex.Flow;
  var div = document.getElementById("page")
  var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

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
    get_new_note('b', 4, "1r"),

  ];

  notes_2Measure1 = [
    get_new_note_down('b', 4, "1r"),

  ];


  console.log(notesMeasure1);
  //voice.addTickables(notes);


  staveMeasure1.setContext(context).draw();
  stave_2Measure1.setContext(context).draw();
  brace.setContext(context).draw();
  lineLeft.setContext(context).draw();
  // lineRight.setContext(context).draw();
  // var brace2 = new Vex.Flow.StaveConnector(staveMeasure5, stave2Measure5).setType(3);
  // var lineLeft2 = new Vex.Flow.StaveConnector(staveMeasure5, stave2Measure5).setType(1);
  // var lineRight2 = new Vex.Flow.StaveConnector(staveMeasure5, stave2Measure5).setType(1);
  // brace2.setContext(context).draw();
  // lineLeft2.setContext(context).draw();
  // lineRight2.setContext(context).draw();



  var voice = VF.Beam.generateBeams(notesMeasure1);
  var voice_2 = VF.Beam.generateBeams(notes_2Measure1); //note เส้นหาย
  Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);
  Vex.Flow.Formatter.FormatAndDraw(context, stave_2Measure1, notes_2Measure1);//note เส้นหาย
  voice.forEach(function (b) { b.setContext(context).draw() });
  voice_2.forEach(function (b) { b.setContext(context).draw() });

  arrindex();
  arrline();
  room_create();


}




let measure = 1;

function add_measure_after() {

  if (width > 250) {
    PreviousStave = this["staveMeasure" + measure];
    this["staveMeasure" + (measure + 1)] = new VF.Stave(PreviousStave.width + PreviousStave.x, height, 100);
    this["notesMeasure" + (measure + 1)] = [
      get_new_note('b', 4, "1r"),

    ];
    this["staveMeasure" + (measure + 1)].setContext(context).draw();
    Vex.Flow.Formatter.FormatAndDraw(context,
      this["staveMeasure" + (measure + 1)],
      this["notesMeasure" + (measure + 1)]);

    PreviousStave = this["stave_2Measure" + measure];
    this["stave_2Measure" + (measure + 1)] = new VF.Stave(PreviousStave.width + PreviousStave.x, height2, 100);
    this["notes_2Measure" + (measure + 1)] = [
      get_new_note('b', 4, "1r"),

    ];
    this["stave_2Measure" + (measure + 1)].setContext(context).draw();
    Vex.Flow.Formatter.FormatAndDraw(context,
      this["stave_2Measure" + (measure + 1)],
      this["notes_2Measure" + (measure + 1)]);

    measure++;
    width -= 100;
    console.log(width);
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
  }

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







window.addEventListener('load', draw_notes);