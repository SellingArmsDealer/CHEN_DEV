var http = require('http');
var queryString = require('querystring');

var postData = queryString.stringify({
    'content': '期待下一期更精彩',
    'mid': '8837'
});

var options = {
    hostname: 'www.imooc.com',
    port: 80,
    path: '/course/docomment',
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip,deflate,sdch',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Connection': 'keep-alive',
        'Content-Length':postData.length,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'imooc_uuid=ff7c5955-ea2f-482b-889b-ba28ddf1daf1; loginstate=1; apsid=QyZDQxMDIxZGNlNmVjMTlhOWJkMTg4YmVlM2E2Y2YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADM3MzA3MTc3NzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMTAwNDQ3OQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2MzIyNDQxNTRAcXEuY29tAAAAAAAAAAAAAAAAAAAAAGRmNzE4YTA5NjRiYjQwNTBkYmM2N2QxZDQ0MWVmMzVjjp9bVALQA1U%3DYm; PHPSESSID=lq5vitp5ajr5mjphmhhv4ai3a6; cvde=55b972ab93fc9-3; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1438137826,1438216906; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1438217081',
        'Host': 'www.imooc.com',
        'Origin': 'http://www.imooc.com',
        'Referer': 'http://www.imooc.com/video/8837',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    }
}

var req=http.request(options,function(res){
    console.log('status:'+res.statusCode);
    console.info('headers{'+queryString.unescape(queryString.stringify(res.headers,';',":"))+'}');

    res.on('data',function(chunk){
        console.log(Buffer.isBuffer(chunk));
        console.log(typeof chunk);
    });

    res.on('end',function(){
        console.log('评论完毕');
    });

    res.on('error', function (e) {
       console.log('Error:'+ e.message) ;
    });
});

req.write(postData);
req.end();