/**
 * Created by CHEN_B on 2015-7-29.
 */
var c = 0;
function print(){
    console.log(c);
}
function plus(b){
    setTimeout(function () {
        c +=1;
        b();
    },1000);
}

plus(print);
print();
