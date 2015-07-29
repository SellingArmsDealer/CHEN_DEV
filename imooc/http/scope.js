/**
 * Created by CHEN_B on 2015-7-29.
 */
var globalVariable = "this is global variable";

function globalFunction(){
    var localVariable = "this is local variable";

    console.log("Vist gloabl/local variable");
    console.log(globalVariable);
    console.log(localVariable);
    globalVariable="this is change variable";
    console.log(globalVariable);

    function localFunction(){
        var innerLocalvariable="this is inner local variable";
        console.info(globalVariable)
        console.info(localVariable)
        console.info(innerLocalvariable)
    }
}

globalFunction();
