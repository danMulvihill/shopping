let an = "dog"
if (true){
    let an = "cat"
    if (true){
       
        let an = "bird";
        console.log(an);
    }
    console.log(an);
}
console.log(an);

let square = ((num) => num*num)(9);

console.log(square);

let convertFtoC = (f=100) => (f-32)*5/9;

console.log(`35 degrees F is ${convertFtoC(35).toFixed(1)} in C`);
console.log(`Default(100) degrees F is ${convertFtoC().toFixed(1)} in C`);

let x = 1;
let y;

console.log(x)
console.log(y)
//console.loig(z)