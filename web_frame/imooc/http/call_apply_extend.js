function  Pet(words){
    this.words=words;
    this.speak=function(say){
        console.log(say+'   '+this.words);
    }
}

function Dog(words){
    //Pet.call(this,words);
    //Pet.apply(this,[words]);
}

var dog = new Dog('Wang');

dog.speak('hh');