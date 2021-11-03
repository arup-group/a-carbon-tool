import * as THREE from "three";

class MaterialManager {
  constructor() {
    this.meshMaterialTable = [];
    this.lineMaterialTable = [];
    this.pointMaterialTable = [];
    this.meshVertexMat = null;
    this.lineVertexMat = null;
    this.pointVertexMat = null;
    this.meshGhostMat = null;
    this.lineGhostMat = null;
    this.pointGhostMat = null;
    this.meshHighlightMat = null;
    this.lineHighlightMat = null;
    this.pointHighlightMat = null;

    this.defaultMeshMat = new THREE.MeshPhongMaterial({
      color: new THREE.Color("#A9A9A9"),
      specular: new THREE.Color("#C8FFE7"),
      shininess: 30,
      side: THREE.DoubleSide,
      transparent: true,
      wireframe: false,
      opacity: 0.84,
    });

    this.defaultLineMat = {};
    this.defaultPointsMat = {};
  }

  // TODO: ghost materials
  getMeshGhostMat() {
    if (this.meshGhostMat) return this.meshGhostMat;
    this.meshGhostMat = new THREE.MeshPhongMaterial({
      color: new THREE.Color("#E6E6E6"),
      specular: new THREE.Color("#FFECB3"),
      shininess: 30,
      side: THREE.DoubleSide,
      transparent: true,
      wireframe: false,
      opacity: 0.1,
      vertexColors: THREE.VertexColors,
    });
    return this.meshGhostMat;
  }

  getLineGhostMat() {
    if (this.lineGhostMat) return this.lineGhostMat;
    return null; // TODO
  }

  getPointGhostMat() {
    if (this.pointGhostMat) return this.pointGhostMat;
    return null; // TODO
  }

  getMeshMaterial(color) {
    let c = colourNameToHex(color.hex);
    if (c !== false) color.hex = c;

    let myMat = this.defaultMeshMat.clone();
    myMat.color = new THREE.Color(color.hex);
    return myMat;
  }

  getLineMaterial(color) {
    let c = colourNameToHex(color.hex);
    if (c !== false) color.hex = c;
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(color.hex),
      linewidth: 1,
      opacity: color.a,
    });
  }

  getPointsMaterial(color) {
    let c = colourNameToHex(color.hex);
    if (c !== false) color.hex = c;
    return new THREE.PointsMaterial({
      color: new THREE.Color(color.hex),
      sizeAttenuation: false,
      transparent: true,
      size: 5,
      opacity: color.a,
    });
  }
}

// the conversion logic; needs cleanup
export let Converter = {
  materialManager: new MaterialManager(),
  defaultColor: new THREE.Color("#FC02FF"),

  // https://stackoverflow.com/a/1568551/3446736
  getSignedVolumeOfTriangle(p1x, p1y, p1z, p2x, p2y, p2z, p3x, p3y, p3z) {
    let v321 = p3x * p2y * p1z;
    let v231 = p2x * p3y * p1z;
    let v312 = p3x * p1y * p2z;
    let v132 = p1x * p3y * p2z;
    let v213 = p2x * p1y * p3z;
    let v123 = p1x * p2y * p3z;
    return (1.0 / 6.0) * (-v321 + v231 + v312 - v132 - v213 + v123);
  },
  getMeshVolume(obj) {
    if (!(obj instanceof THREE.Mesh)) return 0;

    // TODO: Check for V+F-E = 2 (ie is closed mesh) https://gamedev.stackexchange.com/a/119368
    let buffGeom = obj.geometry;
    let volumes = [];
    for (let i = 0; i < buffGeom.index.count; i += 3) {
      let A = buffGeom.index.array[i],
        B = buffGeom.index.array[i + 1],
        C = buffGeom.index.array[i + 2];

      volumes.push(
        this.getSignedVolumeOfTriangle(
          buffGeom.attributes.position.array[A * 3 + 0],
          buffGeom.attributes.position.array[A * 3 + 1],
          buffGeom.attributes.position.array[A * 3 + 2],
          buffGeom.attributes.position.array[B * 3 + 0],
          buffGeom.attributes.position.array[B * 3 + 1],
          buffGeom.attributes.position.array[B * 3 + 2],
          buffGeom.attributes.position.array[C * 3 + 0],
          buffGeom.attributes.position.array[C * 3 + 1],
          buffGeom.attributes.position.array[C * 3 + 2],
        ),
      );
    }
    let sum = volumes.reduce((a, b) => a + b, 0);
    return sum > 0 ? sum : null;
  },

  Point(args, cb) {
    let geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(...args.obj.value));

    geometry.vertices.forEach((v, i) => {
      geometry.colors.push(this.defaultColor);
    });

    let point = new THREE.Points(
      geometry,
      this.materialManager.getPointsMaterial(args.obj.color),
    );
    cb(null, point);
  },

  Vector(args, cb) {
    let v = new THREE.Vector3(...args.obj.value);
    //if there's an origin in object.properties, render the vector as a line
    if (args.obj.properties) {
      if (args.obj.properties.origin) {
        // eslint-disable-next-line
        origin = new THREE.Vector3(...args.obj.origin);
        let geometry = new THREE.Geometry();
        geometry.vertices.push(v);
        geometry.vertices.push(origin);
        geometry.vertices.forEach((v, i) => {
          geometry.colors.push(this.defaultColor);
        });
        let line = new THREE.Line(
          geometry,
          this.materialManager.getLineMaterial(args.obj.color),
        );
        line.hash = args.obj.hash;
        cb(null, line);
      }
    }
    //otherwise warn the user
    console.warn("Can't render vectors without an origin point");
  },

  Plane(args, cb) {
    //make planeSize a setting in the viewer
    let planeSize = 20;
    let v1 = new THREE.Vector3(0, 0, 1);
    let v2 = new THREE.Vector3(...args.obj.Normal.value);
    let q = new THREE.Quaternion();
    q.setFromUnitVectors(v1, v2);
    let geometry = new THREE.PlaneGeometry(planeSize, planeSize);

    geometry.vertices.forEach((v, i) => {
      geometry.colors.push(this.defaultColor);
    });

    let plane = new THREE.Mesh(
      geometry,
      this.materialManager.getMeshMaterial(args.obj.color),
    );
    plane.geometry.applyMatrix(
      new THREE.Matrix4().makeRotationFromQuaternion(q),
    );
    plane.geometry.applyMatrix(
      new THREE.Matrix4().makeTranslation(...args.obj.Origin.value),
    );
    plane.hash = args.obj.hash;
    cb(null, plane);
  },

  Line(args, cb) {
    let geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3(
        args.obj.value[0],
        args.obj.value[1],
        args.obj.value[2],
      ),
    );
    geometry.vertices.push(
      new THREE.Vector3(
        args.obj.value[3],
        args.obj.value[4],
        args.obj.value[5],
      ),
    );

    // prepare for potential coloring!
    geometry.vertices.forEach((v, i) => {
      geometry.colors.push(this.defaultColor);
    });

    let line = new THREE.Line(
      geometry,
      this.materialManager.getLineMaterial(args.obj.color),
    );
    line.hash = args.obj.hash;
    cb(null, line);
  },

  Circle(args, cb) {
    let origin = args.obj.center.value;
    let radius = args.obj.radius;
    let v1 = new THREE.Vector3(0, 0, 1);
    let v2 = new THREE.Vector3(...args.obj.normal.value);
    let q = new THREE.Quaternion();
    q.setFromUnitVectors(v1, v2);
    let curve = new THREE.EllipseCurve(
      0,
      0,
      radius,
      radius,
      0,
      2 * Math.PI,
      false,
      0,
    );
    let points = curve.getPoints(50);
    let geometry = new THREE.Geometry().setFromPoints(points);

    // prepare for potential coloring!
    geometry.vertices.forEach((v, i) => {
      geometry.colors.push(this.defaultColor);
    });

    let circle = new THREE.Line(
      geometry,
      this.materialManager.getLineMaterial(args.obj.color),
    );
    circle.geometry.applyMatrix(
      new THREE.Matrix4().makeRotationFromQuaternion(q),
    );
    circle.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(...origin));
    circle.hash = args.obj.hash;
    cb(null, circle);
  },

  Arc(args, cb) {
    let radius = args.obj.radius;
    let startAngle = args.obj.startAngle;
    let endAngle = args.obj.endAngle;
    let v1 = new THREE.Vector3(0, 0, 1);
    let v2 = new THREE.Vector3(...args.obj.plane.normal.value);
    let q = new THREE.Quaternion();
    q.setFromUnitVectors(v1, v2);
    let curve = new THREE.EllipseCurve(
      0,
      0,
      radius,
      radius,
      startAngle,
      endAngle,
      false,
      0,
    );
    let points = curve.getPoints(50);
    let geometry = new THREE.Geometry().setFromPoints(points);

    // prepare for potential coloring!
    geometry.vertices.forEach((v, i) => {
      geometry.colors.push(this.defaultColor);
    });

    let arc = new THREE.Line(
      geometry,
      this.materialManager.getLineMaterial(args.obj.color),
    );
    arc.geometry.applyMatrix(new THREE.Matrix4().makeRotationFromQuaternion(q));
    arc.geometry.applyMatrix(
      new THREE.Matrix4().makeTranslation(...args.obj.plane.origin.value),
    );
    arc.hash = args.obj.hash;
    cb(null, arc);
  },

  Ellipse(args, cb) {
    let xRadius = args.obj.firstRadius;
    let yRadius = args.obj.secondRadius;
    let startAngle = args.obj.startAngle;
    let endAngle = args.obj.endAngle;
    let v1 = new THREE.Vector3(0, 0, 1);
    let v2 = new THREE.Vector3(...args.obj.plane.Normal.value);
    let q = new THREE.Quaternion();
    q.setFromUnitVectors(v1, v2);
    let curve = new THREE.EllipseCurve(
      0,
      0,
      xRadius,
      yRadius,
      startAngle,
      endAngle,
      false,
      0,
    );
    let points = curve.getPoints(50);
    let geometry = new THREE.Geometry().setFromPoints(points);

    // prepare for potential coloring!
    geometry.vertices.forEach((v, i) => {
      geometry.colors.push(this.defaultColor);
    });

    let arc = new THREE.Line(
      geometry,
      this.materialManager.getLineMaterial(args.obj.color),
    );
    arc.geometry.applyMatrix(new THREE.Matrix4().makeRotationFromQuaternion(q));
    arc.geometry.applyMatrix(
      new THREE.Matrix4().makeTranslation(...args.obj.plane.Origin.value),
    );
    arc.hash = args.obj.hash;
    cb(null, arc);
  },

  Extrusion(args, cb) {
    let m = new THREE.Matrix4();
    let mInverse = new THREE.Matrix4();
    let xform = Object.values(args.obj.profileTransformation);
    m.fromArray(xform.slice(0, 16));
    m.transpose();
    mInverse = m.clone();
    mInverse.getInverse(m);
    let type = args.obj.profile.type;
    let pts = [];

    args.obj.profile.color = args.obj.color;
    this[args.obj.profile.type](
      {
        obj: args.obj.profile,
        layer: args.layer,
      },
      (err, obj) => {
        obj.geometry.applyMatrix(mInverse);
        let values = obj.geometry.vertices;
        for (var i = 0, l = values.length; i < l; ++i) {
          pts.push(new THREE.Vector2(values[i].x, values[i].y));
        }
      },
    );

    let shape = new THREE.Shape(pts);
    for (var i = 1; i < args.obj.profiles.length; i++) {
      let holeProfile = null;
      let holePts = [];
      args.obj.profiles[i].color = args.obj.color;
      this[args.obj.profiles[i].type](
        {
          obj: args.obj.profiles[i],
          layer: args.layer,
        },
        (err, obj) => {
          holeProfile = obj;
        },
      );

      holeProfile.geometry.applyMatrix(mInverse);
      holeProfile.geometry.vertices.forEach(function(vertex) {
        holePts.push(new THREE.Vector2(vertex.x, vertex.y));
      });
      let holePath = new THREE.Path(holePts);
      shape.holes.push(holePath);
    }

    let path = new THREE.LineCurve(args.obj.pathStart, args.obj.pathEnd);
    let extrudePath = new THREE.CurvePath();
    extrudePath.add(path);
    let extrudeSettings = {
      depth: args.obj.length,
      bevelEnabled: false,
    };
    let geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);

    geometry.applyMatrix(m);
    let extrusion = new THREE.Mesh(
      geometry,
      this.materialManager.getMeshMaterial(args.obj.color),
    );
    extrusion.hash = args.obj.hash;

    cb(null, extrusion);
  },

  Box(args, cb) {
    let width = args.obj.xSize.end - args.obj.xSize.start;
    let height = args.obj.ySize.end - args.obj.ySize.start;
    let depth = args.obj.zSize.end - args.obj.zSize.start;
    let origin = args.obj.basePlane.origin.value;
    let v1 = new THREE.Vector3(0, 0, 1);
    let v2 = new THREE.Vector3(...args.obj.basePlane.normal.value);
    let q = new THREE.Quaternion();
    q.setFromUnitVectors(v1, v2);
    let geometry = new THREE.BoxBufferGeometry(width, height, depth);
    let box = new THREE.Mesh(
      geometry,
      this.materialManager.getMeshMaterial(args.obj.color),
    );
    box.geometry.applyMatrix(new THREE.Matrix4().makeRotationFromQuaternion(q));
    box.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(...origin));
    box.geometry.verticesNeedUpdate = true;

    box.hash = args.obj.hash;
    cb(null, box);
  },

  Polyline(args, cb) {
    let geometry = new THREE.Geometry();
    if (!args.obj.value) return console.warn("Strange polyline.");
    if (args.obj.closed == true) {
      args.obj.value.push.apply(args.obj.value, args.obj.value.slice(0, 3));
    }
    for (let i = 2; i < args.obj.value.length; i += 3)
      geometry.vertices.push(
        new THREE.Vector3(
          args.obj.value[i - 2],
          args.obj.value[i - 1],
          args.obj.value[i],
        ),
      );

    // prepare for potential coloring!
    geometry.vertices.forEach((v, i) => {
      geometry.colors.push(this.defaultColor);
    });

    let polyline = new THREE.Line(
      geometry,
      this.materialManager.getLineMaterial(args.obj.color),
    );
    polyline.hash = args.obj.hash;
    cb(null, polyline);
  },

  Polycurve(args, cb) {
    for (let i in args.obj.segments) {
      let segment = args.obj.segments[i];
      segment.color = args.obj.color;
      this[segment.type](
        {
          obj: segment,
          layer: args.layer,
        },
        (err, poly) => {
          if (err) return cb(err);
          return cb(null, poly);
        },
      );
    }
  },

  Annotation(args, cb) {
    console.warn("TODO", args.obj.type);
  },

  Curve(args, cb) {
    args.obj.displayValue.color = args.obj.color;
    this.Polyline(
      {
        obj: args.obj.displayValue,
        layer: args.layer,
      },
      (err, poly) => {
        if (err) return cb(err);
        return cb(null, poly);
      },
    );
  },

  Mesh(args, cb) {
    let obj = args.obj;
    let geometry = new THREE.BufferGeometry();

    let vertices = [];
    let indices = [];

    let k = 0;
    while (k < obj.faces.length) {
      // QUAD FACE
      if (obj.faces[k] === 1) {
        indices.push(obj.faces[k + 1], obj.faces[k + 2], obj.faces[k + 3]);
        indices.push(obj.faces[k + 1], obj.faces[k + 3], obj.faces[k + 4]);
        k += 5;
      }
      // TRIANGLE FACE
      if (obj.faces[k] === 0) {
        indices.push(obj.faces[k + 1], obj.faces[k + 2], obj.faces[k + 3]);
        k += 4;
      }
    }
    geometry.setIndex(indices);
    geometry.addAttribute(
      "position",
      new THREE.Float32BufferAttribute(obj.vertices, 3),
    );
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    let mesh = new THREE.Mesh(
      geometry,
      this.materialManager.getMeshMaterial(args.obj.color),
    );

    return cb(null, mesh);
  },

  Brep(args, cb) {
    args.obj.displayValue.color = args.obj.color;
    this.Mesh(
      {
        obj: args.obj.displayValue,
      },
      (err, obj) => {
        if (err) return cb(err, null);
        return cb(null, obj);
      },
    );
  },
};

// (c) https://stackoverflow.com/a/1573141/3446736
function colourNameToHex(colour) {
  let colours = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    "indianred ": "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgrey: "#d3d3d3",
    lightgreen: "#90ee90",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370d8",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#d87093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32",
  };
  if (typeof colours[colour.toLowerCase()] != "undefined")
    return colours[colour.toLowerCase()];
  return false;
}
