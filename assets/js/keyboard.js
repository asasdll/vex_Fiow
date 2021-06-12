
VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "boo".
var div = document.getElementById("page")
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Size our SVG:
renderer.resize(500, 500);

// And get a drawing context:
var context = renderer.getContext();

// Create a stave at position 10, 40 of width 400 on the canvas.
var stave = new VF.Stave(10, 40, 400);



var staveMeasure1 = new Vex.Flow.Stave(10, 0, 300);
staveMeasure1.addClef("treble").setContext(context).draw();

var notesMeasure1 = [
  new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
  new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),
  new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" }),
  new Vex.Flow.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" }),
];

// Helper function to justify and draw a 4/4 voice
Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);

// measure 2 - juxtaposing second measure next to first measure
var staveMeasure2 = new Vex.Flow.Stave(
  staveMeasure1.width + staveMeasure1.x,
  0,
  400
);
staveMeasure2.setContext(context).draw();

var notesMeasure2_part1 = [
  new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "8" }),
  new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "8" }),
  new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "8" }),
  new Vex.Flow.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "8" }),
];

var notesMeasure2_part2 = [
  new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "8" }),
  new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "8" }),
  new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "8" }),
  new Vex.Flow.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "8" }),
];

// create the beams for 8th notes in 2nd measure
var beam1 = new Vex.Flow.Beam(notesMeasure2_part1);
var beam2 = new Vex.Flow.Beam(notesMeasure2_part2);

var notesMeasure2 = notesMeasure2_part1.concat(notesMeasure2_part2);

Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure2, notesMeasure2);

// Render beams
beam1.setContext(context).draw();
beam2.setContext(context).draw();