// DEFINITIONS
// definitions to be superceded elsewhere once we hook up speckle
interface SpeckleObject {
    id : string;
    volume : number;
    transport: string;
    material: string; // blank by default - to be assigned as part of process
    // carbon values to default to 0 once initiated
    a1a3Carbon : number;
    a4Carbon: number;
    a5Carbon: number;
}

// as shown in materials.json
interface Material {
    density: number;
    wastage: number;
    a1a3Carbon: number; //kgCO2e/kg
    source: string;
}

const transportType = {
    // values taken from RICS guidance
    local: {
        road: 50, // km
        sea: 0, //km
    },
    regional: {
        road: 300, // km
        sea: 0, // km
    },
    global: {
        road: 200, // km
        sea: 10000, // km
    }
}

const transportFactors = {
    // values taken from RICS guidance
    road: 0.1136, // gCO2/kg/km
    sea: 0.016143, // gCO2/kg/km
}

// CALCULATIONS
// calculate the a1a3 carbon for any speckle object against a specified material
function a1a3Carbon(obj: SpeckleObject, mat: Material) {
    // calculate mass of object
    var mass = obj.volume * mat.density
    // calculate a1a3 carbon of object
    var a1a3 = mass * mat.a1a3Carbon
    return a1a3
}

// calculate the carbon associated with transport
function a4Carbon(obj: SpeckleObject, mat: Material) {
    
    const mode = transportType
    const factors = transportFactors

    var trans = { road: 0, sea: 0 }
    // set transport distance based on object definition
    if (obj.transport == 'regional') {
        trans = mode.regional
    }
    else if (obj.transport == 'global') {
        trans = mode.global
    }
    else {
        trans = mode.local
    }

    var transCarb = mat.density * obj.volume * ((trans.road * factors.road) + (trans.sea * factors.sea)/1000)
    return transCarb
}

// calculate the carbon associated with site activities
function a5CarbonSite(sysCost: number) {
    var a5Site = sysCost * 1400 / 100000
    return a5Site
}

// calculate the carbon associated with material wastage
function a5CarbonWaste(obj: SpeckleObject, mat: Material) {
    var wasteVolume = obj.volume * ((1/(1-mat.wastage))-1)

    // create new object with waste volume
    var wasteObj = obj
    wasteObj.volume = wasteVolume

    // compute a1-a4 for waste materials
    var a1a3 = a1a3Carbon(wasteObj, mat)
    var a4 = a4Carbon(wasteObj,mat)

    var a5waste = a1a3 + a4

    return a5waste
}

function a5Carbon(sysCost: number, obj: SpeckleObject, mat: Material) {
    var a5 = a5CarbonSite(sysCost) + a5CarbonWaste(obj, mat)

    return a5
}