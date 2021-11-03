/**
 * @author HypnosNova / https://www.threejs.org.cn/gallery
 * This is a class to check whether objects are in a selection area in 3D space
 * Note: modified for speckle use
 */

function SelectionHelper(
  selectionBox,
  renderer,
  cssClassName,
  controls,
  mouse,
) {
  this.element = document.createElement("div");
  this.element.classList.add(cssClassName);
  this.element.style.pointerEvents = "none";

  this.renderer = renderer;

  this.startPoint = {
    x: 0,
    y: 0,
  };
  this.pointTopLeft = {
    x: 0,
    y: 0,
  };
  this.pointBottomRight = {
    x: 0,
    y: 0,
  };

  this.isDown = false;
  this.controls = controls;
  this.mouse = mouse;

  this.renderer.domElement.addEventListener(
    "mousedown",
    function(event) {
      if (this.controls.enabled) return;
      this.isDown = true;
      this.onSelectStart(event);
    }.bind(this),
    false,
  );

  this.renderer.domElement.addEventListener(
    "mousemove",
    function(event) {
      if (this.isDown) {
        this.onSelectMove(event);
      }
    }.bind(this),
    false,
  );

  this.renderer.domElement.addEventListener(
    "mouseup",
    function(event) {
      this.isDown = false;
      this.onSelectOver(event);
    }.bind(this),
    false,
  );
}

SelectionHelper.prototype.onSelectStart = function(event) {
  this.renderer.domElement.parentElement.appendChild(this.element);

  let rect = this.renderer.domElement.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  this.element.style.left = x + "px";
  this.element.style.top = y + "px";
  this.element.style.width = "0px";
  this.element.style.height = "0px";

  this.element.style.border = "1px solid #55aaff";
  this.element.style.backgroundColor = "rgba(255,255,255,0.1)";
  this.element.style.position = "fixed";
  this.element.style.pointerEvents = "none";

  this.startPoint.x = x;
  this.startPoint.y = y;
};

SelectionHelper.prototype.onSelectMove = function(event) {
  if (this.controls.enabled) return;
  let rect = this.renderer.domElement.getBoundingClientRect();

  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  this.pointBottomRight.x = Math.max(this.startPoint.x, x);
  this.pointBottomRight.y = Math.max(this.startPoint.y, y);
  this.pointTopLeft.x = Math.min(this.startPoint.x, x);
  this.pointTopLeft.y = Math.min(this.startPoint.y, y);

  this.element.style.left = this.pointTopLeft.x + "px";
  this.element.style.top = this.pointTopLeft.y + "px";
  this.element.style.width =
    this.pointBottomRight.x - this.pointTopLeft.x + "px";
  this.element.style.height =
    this.pointBottomRight.y - this.pointTopLeft.y + "px";
};

SelectionHelper.prototype.onSelectOver = function(event) {
  try {
    this.element.parentElement.removeChild(this.element);
  } catch (e) {
    // do nothing
  }
};

export default SelectionHelper;
