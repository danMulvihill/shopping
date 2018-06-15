const person = function(){
    return "hi";
}

const me = person();

const Person = function(){

}

const me2 = new Person();

console.log(me, me2);

const me3 = {
    year: 1937,
    get age(){
        return this._age
    },
    set age(val){
        this._age = val +35;
    },
    get name(){
        return `${this.fname} ${this.lname}`;
    },
    set name(val){
        let name = val.split(" ");
        this.fname = name[0];
        this.lname = name[name.length-1]
    }
}

me3.age = 43;
me3.name= "Sally Ann 'Moonbeam' Smith"

console.log(me3.name)