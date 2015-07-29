/**
 * Created by CHEN_B on 2015-7-29.
 */
function learn(something){
    console.log(something);
}

function we(callback,something){
    something += ' is cool';
    callback(something);
}

we(learn,'Node.js');

we(function(something){
    console.info(something);
},'Jade');


