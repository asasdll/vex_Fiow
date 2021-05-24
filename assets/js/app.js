const isDragSymbol = Symbol('dragging');
const isOutSymbol = Symbol('isOut');
const windowListeners = Symbol('windowListeners');
const listeners = Symbol('listener');
/**
 * A class to enable touch & mouse interactions on SVGs. Translates browser coordinates to
 * SVG coordinates.
 *
 * Call SVGInteraction.makeInteractive(svg), then override this class's methods to use.
 */
class SVGInteraction {
  constructor(svg, svgPt) { 
    if (svgPt) this.svgPt = svgPt;
    this.svg = svg;
    this.makeInteractive();
  }

  addEventListener(type, callback) {
    this[listeners].push([type, callback]);
  }

  removeEventListener(type, callback) {
    const index = this[listeners].findIndex(([listenerType, listenerCallback]) => {
      return type === listenerType && callback === listenerCallback;
    });
    if (index !== -1) this[listeners].splice(index, 1);
    return index !== -1;
  }

  callListeners(type, e, coords) {
		console.log('calling listeners ' + type);
		this[listeners].forEach(([listenerType, callback]) => {
      console.log('checking listener ', listenerType);
      if (type === listenerType) {
        console.log('calling!');
        callback(e, coords);
      }
    });
  }

  /* eslint-disable no-unused-vars */
  // These are here as holders -- override whichever you need when you inherit this class.
  touchStart(e, coords) { this.callListeners('touchStart', e, coords); }
  touchEnd(e, coords) { this.callListeners('touchEnd', e, coords); }
  drag(e, coords) { this.callListeners('drag', e, coords); }
  hover(e, coords) { this.callListeners('hover', e, coords); }
  mouseOut(e, coords) { this.callListeners('mouseOut', e, coords); }
  /* eslint-enable no-unused-vars */

  makeInteractive(svg = this.svg) {
		console.log('making interactive');
    this[listeners] = [];
    // We will add listeners to the SVG bounding box itself:
    svg.style.pointerEvents = 'bounding-box';
    // An SVG point is used to translate div space to SVG space. See Alexander Jank's solution at:
    // https://stackoverflow.com/questions/29261304/how-to-get-the-click-coordinates-relative-to-svg-element-holding-the-onclick-lis
    this.svgPt = this.svgPt || svg.createSVGPoint();

    /** ==== Condition Testing & Setting Functions ====
     *
     * These functions are used to translate UI events from the browser into more helpful
     * events from a programatic perspective. They take care of tracking mousestate &
     * touchstate (down or up) to fire drag vs. hover. If a user drags outside of the SVG,
     * they continue to fire the drag event, so that (if desired) things like drag & drop
     * among elements can be implemented.
     *
     */

    // A  not-combinator
    const not = condition => () => !condition();
    // Get whether we're dragging
    const isDragging = () => this[isDragSymbol];
    // Set whether the mouse is down or up.
    const down = () => { this[isDragSymbol] = true; return true; };
    const up = () => { this[isDragSymbol] = false; return true; };

    // Get whether we're outside of the SVG bounds
    const isOutside = () => this[isOutSymbol];
    // Set whether we're in our out; if we move out while dragging we need window listeners briefly.
    const inside = () => {
      this[isOutSymbol] = false;
      this[windowListeners].forEach(([eventType, listener]) => {
        window.removeEventListener(eventType, listener, false);
      });
      return true;
    };
    const outside = () => {
      this[isOutSymbol] = true;
      this[windowListeners].forEach(([eventType, listener]) => {
        window.addEventListener(eventType, listener);
      });
      return true;
    };

    // We'll hold the window listeners here so we can add & remove them as needed.
    this[windowListeners] = [];

    // Utility function to check event conditions & fire class events if needed
    const addListener = ([eventType, callback, ifTrue, el]) => {
      el = el || svg;
      const listener = (evt) => {
        if (ifTrue()) {
          const coords = getCoords(evt, svg, this.svgPt, this);
          callback.call(this, evt, coords);
        }
      };

      if (el !== window) el.addEventListener(eventType, listener);
      else this[windowListeners].push([eventType, listener]);
    };

      // [ type, listener, testFunction (fire listener if true), EventTarget (default this.svg)]
    [
      /* events occuring within SVG */
      ['mousedown', this.touchStart, down], // Touch is started
      ['touchstart', this.touchStart, down], // Touch is started
      ['mouseup', this.touchEnd, up], // Touch ends or mouse up
      ['touchend', this.touchEnd, up], // Touch ends or mouse up
      ['touchmove', this.drag, isDragging], // Dragging
      ['mousemove', this.drag, isDragging], // Dragging
      ['mousemove', this.hover, not(isDragging)], // Hover
      ['mouseout', this.mouseOut, not(isDragging)], // Mouseout
      ['touchcancel', this.mouseOut, not(isDragging)], // Mouseout (touch interrupt)
      ['mouseout', () => {}, () => isDragging() && outside()], // goes out of bounds isDown & set
      ['touchcancel', () => {}, () => isDragging() && outside()], // goes out of bounds isDown & set
      ['touchmove', inside, isOutside], // comes back inside
      ['mousemove', inside, isOutside], // comes back inside
      ['mousedown', inside, isOutside], // comes back inside, this shouldn't happen, but just in case
      ['touchstart', inside, isOutside], // comes back inside, this shouldn't happen, but just in case
      /* out of bounds events */
      ['touchmove', this.drag, () => isOutside() && isDragging(), window], // if outside in window & dragging
      ['mousemove', this.drag, () => isOutside() && isDragging(), window], // if outside in window & dragging
      ['mouseup', this.touchEnd, () => isOutside() && isDragging() && up() && inside(), window], // if outside in window & dragging & released
      ['touchend', this.touchEnd, () => isOutside() && isDragging() && up() && inside(), window], // if outside in window & dragging & released
    ]
    .forEach(addListener);
  }
}

/**
 * Returns coordinates for an event
 * @param {Event} e touch or mouse event
 * @param {SVGPoint} svgPt an SVG point
 * @param {SVGElement} svg the SVG's client bounding rectangle
 *
 * @returns {Object} { x, y, [touches] }
 */
function getCoords(e, svg, svgPt) {
  if ('changedTouches' in e) {
    const length = e.changedTouches.length;
    const touches = [];
    for (let i = 0; i < length; i++) {
      touches.push(getCoords(e.changedTouches.item(i), svg, svgPt));
    }
    return { x: touches[0].x, y: touches[0].y, touches };
  }

  svgPt.x = e.clientX;
  svgPt.y = e.clientY;
  const svgCoords = svgPt.matrixTransform(svg.getScreenCTM().inverse());
  return { x: svgCoords.x, y: svgCoords.y };
}

function drawMusic() {
  // Basic setup boilerplate for using VexFlow with the SVG rendering context:
  VF = Vex.Flow;

  // Create an SVG renderer and attach it to the DIV element named "boo".
  var div = document.getElementById("boo")
  var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

  // Configure the rendering context.
  renderer.resize(500, 500);
  var context = renderer.getContext();

  var notes = [
    // A quarter-note C.
    new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "q" }),

    // A quarter-note D.
    new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),

    // A quarter-note rest. Note that the key (b/4) specifies the vertical
    // position of the rest.
    new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),

    // A C-Major chord.
    new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" })
  ];

  // Create a voice in 4/4 and add above notes
  var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
  voice.addTickables(notes);

  // Format and justify the notes to 400 pixels.
  var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

  // Create a stave of width 400 at position 10, 40 on the canvas.
  var stave = new VF.Stave(10, 40, 400);

  // Add a clef and time signature.
  stave.addClef("treble").addTimeSignature("4/4");

  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();

  // Render voice
  voice.draw(context, stave);

  return { notes, context }
}

const { notes, context } = drawMusic();
context.resize(500, 200);
context.setViewBox(0, 0, 500, 200);

const svg = context.svg;
svg.removeAttribute('width');
svg.removeAttribute('height');

svg.style.border = "black solid 1px";
const interaction = new SVGInteraction(svg);
const eventsDiv = document.getElementById('eventsDiv');
const noteEventsDiv = document.getElementById('noteEventsDiv');
const events = [ 'touchStart', 'touchEnd', 'drag', 'hover', 'mouseOut' ];
events.forEach((type) => {
  interaction.addEventListener(type, (e, coords) => {
    update(type, coords);
  })
})
notes.forEach( (note, index) => {
  const noteInteraction = new SVGInteraction(note.attrs.el, interaction.svgPt);
  events.forEach((type) =>
    noteInteraction.addEventListener(type, (e, coords) => { updateNote(`Note ${index}: ${type}`, e, coords); })
  );
})

const eventsBuffer = [];
function update(type, { x, y }) {
  x = Math.floor(x);
  y = Math.floor(y);
  eventsBuffer.unshift(`${type}: (${x}, ${y})`);
  eventsDiv.innerHTML = eventsBuffer.join('<br />');
}

const noteEventsBuffer = [];
function updateNote(type, { x, y }) {
  x = Math.floor(x);
  y = Math.floor(y);
  noteEventsBuffer.unshift(`${type}: (${x}, ${y})`);
  noteEventsDiv.innerHTML = noteEventsBuffer.join('<br />');
}