/**
 * Created by CHEN_B on 2015-7-29.
 */
var pet={
    words:'...',
    speak:function(say){
        console.log(say+'   '+this.words);
    }
}

pet.speak('Speak');

var dog={
    words:'Wang'
}

pet.speak.call(dog,'Speak');