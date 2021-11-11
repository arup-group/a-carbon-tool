// definitions to be superceded elsewhere once we hook up speckle
interface speckleObject {
    id : string;
    volume : number;
}

// as shown in materials.json
interface material {
    density: number;
    wastage: number;
    a1a3Carbon: number; //kgCO2e/kg
    source: string;
}

// calculate the a1a3 carbon for any speckle object against a specified material
function a1a3Carbon(obj: speckleObject, mat: material) {
    // calculate mass of object
    var mass = obj.volume * mat.density
    // calculate a1a3 carbon of object
    var a1a3 = mass * mat.a1a3Carbon
    return { a1a3 }
}

// calculate the carbon associated with transport
function a4Carbon() {
    
}

// calculate the carbon associated with material wastage
function a5CarbonWaste() {

}

// calculate the carbon associated with site activities
function a5CarbonSite() {

}