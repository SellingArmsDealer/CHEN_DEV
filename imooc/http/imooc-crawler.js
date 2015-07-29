var http=require('http');
var url='http://www.imooc.com/learn/156';

http.get(url,function(res){
    var html='';
    res.on('data',function(data){
        html+=data;
    });
    res.on('end',function(){
        console.info(html);
    });

}).on('error',function(){
    console.info('获取课程数据出错');
});

