var student = require('./student');
var teacher = require('./teacher');

teacher.add('bingge');

function add(teatchName, students) {
    teacher.add(teatchName);
    students.forEach(function (item, index) {
        student.add(item);
    })
}

exports.add = add;