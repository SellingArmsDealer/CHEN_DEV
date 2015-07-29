var EventEmitter = require('events').EventEmitter;

var life = new EventEmitter();
life.setMaxListeners(20);//默认最大可添加为10个
//addEventListener

function water(who){
    console.log('给' + who + '倒水');
}
life.on('求安慰', water);
life.on('求安慰', function (who) {
    console.log('给' + who + '揉肩');
});
life.on('求安慰', function (who) {
    console.log('给' + who + '洗脚');
});
life.on('求安慰', function (who) {
    console.log('给' + who + '烧饭');
});
life.on('求安慰', function (who) {
    console.log('给' + who + '洗衣服');
});
life.on('求安慰', function (who) {
    console.log('给' + who + '。。。5');
});

life.on('求安慰', function (who) {
    console.log('给' + who + '。。。6');
});

life.on('求安慰', function (who) {
    console.log('给' + who + '。。。7');
});

life.on('求安慰', function (who) {
    console.log('给' + who + '。。。8');
});

life.on('求安慰', function (who) {
    console.log('给' + who + '。。。9');
});
life.on('求爱', function (who) {
    console.log('给' + who + '交工资');
});
life.on('求爱', function (who) {
    console.log('给' + who + '靠山');
});

life.removeListener('求安慰',water);


var x=life.emit('求安慰', '汉子');
var y=life.emit('求爱', '汉子');
var z=life.emit('ss', '汉子');

console.info(x);
console.info(y);
console.info(z);

