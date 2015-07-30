/**
 * Created by CHEN_B on 2015-7-29.
 */

//var pet={
//    words:'...',
//    speak:function(){
//        console.log(this.words);
//        console.log(this == pet);
//    }
//}
//
//pet.speak();

//var pet=function(words){
//    this.words=words;
//    console.log(this.words);
//    console.log(this == global);
//}
//
//pet('...');

function Pet(words){
    this.words=words;
    this.speak = function () {
        console.log(this.words);
        console.log(this);
    }
}

var cat=new Pet('Mimao');

cat.speak();

