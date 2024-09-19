export default class Vehicle{

    constructor(
        readonly id : number | undefined = undefined, 
        readonly placa : string, 
        readonly chassi : string,
        readonly renavam : string, 
        readonly modelo : string,
        readonly marca : string,
        readonly ano : number,
    ){}
}