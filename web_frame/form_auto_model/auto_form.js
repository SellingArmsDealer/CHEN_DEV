var form = {};
form.root = $("#document");
//获取到分组信息

form.group = function () {
    this.id,
        this.apendToObj
}
form.groups = [];

form.input = function () {
    this.name,
        this.htmlObj,
        this.dataObj
}

form.inputs = [];
/**
 * 初始化分组信息
 * @param groups eg:{id:1,groupTitle:'通用'，canSlid：''}
 */
form.fun_appendGroupsByDatas = function (groupDatas) {
    var groups = [];
    //先有一个默认分组
    var def_panel, def_panel_header, def_panel_body;
    var def_panel = $("#def_panel").clone();
    $(def_panel).css({'display': 'block'});
    $(def_panel).attr({id: "group_" + 0});
    $(def_panel).find('.panel-heading').remove();
    def_panel_body = $(def_panel).find('.panel-body')[0];
    //先生成一个默认分组，所有没有分组信息的，就放入默认分组中
    groups.push({id: 0, apendToObj: def_panel_body});
    form.root.append(def_panel);
    //再有依次生成其他分组
    //return [{id:1,obj:new Object()}];
    if (groupDatas) {
        groupDatas.forEach(function (groupD) {
            def_panel = $("#def_panel").clone();
            $(def_panel).css({'display': 'block'});
            $(def_panel).attr({id: "group_" + groupD.id});
            def_panel_header = $(def_panel).find('.panel-heading');
            def_panel_body = $(def_panel).find('.panel-body')[0];
            $(def_panel_header).text(groupD.groupTitle);
            //匹配是否 canSlid 绑定下啦事件
            if (groupD.canSlid == true) {
                $(def_panel_header).css({'cursor': 'pointer'});
                var temp_panel = $(def_panel).find('.panel-body');
                $(def_panel_header).bind('click', function () {
                    temp_panel.slideToggle();
                });
            }
            //匹配 isHide
            if (groupD.isHide == true) {
                $(def_panel_body).css({'display': 'none'});
            }
            var group = new form.group();
            group.id = groupD.id;
            group.apendToObj = def_panel_body;
            groups.push(group);
            $("#document").append(def_panel);
        });
    }
    form.groups = groups;
}
/**
 * 加入input表单
 * @param tagObj 需要append 进入的 标签对象 htmlObj
 * @param groupId 加入的组ID
 * @param inputData 保存生成的 json数据
 */
form.fun_appendInput = function (tagObj, groupId, inputData) {
    if (form.groups.length == 0) {
        console.error('未初始化GROUPS：请初始化操作：form.fun_appendGroupsByDatas');
        return;
    }
    var hasOk = false;
    var inputTemp = new form.input();
    if (groupId) {
        form.groups.forEach(function (item) {
            if (item.id == groupId) {//如果匹配上就插入
                $(item.apendToObj).append(tagObj);
                hasOk = true;
                return;
            }
        });
    }
    //如果匹配不上，就添加到默认
    if (!hasOk) {
        $(form.groups[0].apendToObj).append(tagObj);
    }
    inputTemp.dataObj = inputData;
    inputTemp.name = inputData.name;
    inputTemp.htmlObj = tagObj;
    form.inputs.push(inputTemp);
}

form.fun_appendFormByDatas_Ajax = function (url, param,fun_success) {
    if (url) {
        $.get(url, function (data) {
            form.fun_appendGroupsByDatas(data.groups);
            form.fun_appendInputsByDatas(data.inputs);
            fun_success();
        });
    }
}

/**
 * 加载form表单 根据json数据
 * @param formJson
 */
form.fun_appendInputsByDatas = function (formJsons) {

    if (formJsons) {
        formJsons.forEach(function (item) {
            var itemStr = JSON.stringify(item);
            var inputType = item.inputType;
            var fun_str = "form." + inputType + ".append(" + itemStr + ")";
            eval(fun_str);
        });
        //美化表单中的所有checkbox 和 radio
        $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%'//optional
        });
    }
}

//对于inputText的 实现
form.inputText = {};
/**
 * 加载InputText
 * {
        name:
        textName:
        dataType:
        placeholder:
        inputType:
        defValue:
        required:
        groupId:字段所在分组
 * }
 */
form.inputText.append = function (formJson) {
    var name = formJson.name;
    var textName = formJson.textName;
    var defValue = formJson.defValue ? formJson.defValue : "";
    var placeholder = formJson.placeholder ? formJson.placeholder : "";

    var input_text = $("#input_text").clone();
    //获取到该元素输入框
    var input = $(input_text).find('.form-control')[0];
    $(input).attr({"name": name, "id": name + "_id", "placeholder": placeholder});//添加到输入框中对应的name和id
    $(input).val(defValue);
    //获取到该leable
    $(input_text).find('.control-label').html((formJson.required == true ? "<label style='color: red'>*</label>" : "") + textName);
    form.fun_appendInput(input_text, formJson.groupId, formJson);
}

form.inputSel = {};
form.inputSel.append = function (formJson) {
    var name = formJson.name;
    var textName = formJson.textName;
    var defValue = formJson.defValue ? formJson.defValue : "";
    var placeholder = formJson.placeholder ? formJson.placeholder : "";
    //克隆出对应的元素
    var input_sel = $("#input_sel").clone();
    //获取到该元素输入框
    var input = $(input_sel).find('.form-control')[0];
    $(input).attr({"name": name, "id": name + "_id", "placeholder": placeholder});//添加到输入框中对应的name和id
    //$(input).val(defValue);
    //获取到该leable
    $(input_sel).find('.control-label').html((formJson.required == true ? "<label style='color: red'>*</label>" : "" ) + textName);
    //获取到按钮
    var selBtn = $(input_sel).find('.input-group-addon')[0];
    var selDiv = $(input_sel).find('#_sel'); //获取到下拉框
    $(selDiv).attr({"id": name + '_sel'});
    //绑定事件
    $(selBtn).bind('click', function () {
        var self = this;
        $(selDiv).slideToggle(400, function () {
            var i = $(self).children('i').each(function (i, item) {
                var clas = $(item).attr('class');
                if (clas == 'icon-chevron-up') {
                    $(item).attr('class', 'icon-chevron-down');
                } else {
                    $(item).attr('class', 'icon-chevron-up');
                }
            });
        });
    })
    //获取到查询列表的div
    form.fun_appendInput(input_sel, 0, formJson);
}

form.inputSelect = {};
/**
 *
 * @param formJson
 * {
 *      ../同inputText，
 *      ~特殊 defValue
 * }
 */
form.inputSelect.append = function (formJson) {
    var name = formJson.name;
    var textName = formJson.textName;
    var defValue = formJson.defValue;
    var placeholder = formJson.placeholder ? formJson.placeholder : "";

    var input_select = $("#input_select").clone();
    //获取到该元素输入框
    var select = $(input_select).find('.form-control')[0];
    $(select).attr({"name": name, "id": name + "_id", "placeholder": placeholder});//添加到输入框中对应的name和id

    if (defValue) {
        var tempHtml = "";
        defValue.forEach(function (itemS) {
            tempHtml = tempHtml + "<option value='" + itemS.value + "'  " + (itemS.selected == true ? "selected" : "") + ">" + itemS.text + "</option>";
        });
        $(select).append(tempHtml);
    }

    //获取到该leable
    $(input_select).find('.control-label').html((formJson.required == true ? "<label style='color: red'>*</label>" : "") + textName);
    form.fun_appendInput(input_select, formJson.groupId, formJson);

}
form.inputSelect.val = function () {
    return
}

//对于inputText的 实现
form.inputCheckbox = {};
form.inputCheckbox.append = function (formJson) {
    var name = formJson.name;
    var textName = formJson.textName;
    var defValue = formJson.defValue ? formJson.defValue : "";
    var placeholder = formJson.placeholder ? formJson.placeholder : "";
    var defValue = formJson.defValue;

    var input_checkbox = $("#input_checkbox").clone();
    var input_append = $(input_checkbox).find(".col-sm-8")[0];
    //获取到该元素输入框
    var temp_checkbox = $(input_checkbox).find('#temp_checkbox');
    var temp_checkbox_lable = $(input_checkbox).find('#temp_checkbox_lable');

    if (defValue) {
        for (var i = 0; i < defValue.length; i++) {
            var checkbox = temp_checkbox.clone();
            var checkbox_lable = temp_checkbox_lable.clone();
            var value = defValue[i].value;
            var text = defValue[i].text;
            var checked = defValue[i].checked;

            //添加到输入框中对应的name和id
            var check_id = name + "_id[" + i + "]";
            var checklable_id = name + "_lableid[" + i + "]";
            $(checkbox).attr({"name": name, "id": check_id,"value":value});
            if(checked){
                $(checkbox).attr({"checked":true});
            }
            $(checkbox_lable).text(text);
            $(checkbox_lable).attr({"for":check_id,"id":checklable_id});
            $(input_append).append(checkbox);
            $(input_append).append("&nbsp;");
            $(input_append).append(checkbox_lable);
            $(input_append).append("&nbsp;&nbsp;&nbsp;");
        }
    }
    temp_checkbox.remove();
    temp_checkbox_lable.remove();

    //获取到该leable
    $(input_checkbox).find('.control-label').html((formJson.required == true ? "<label style='color: red'>*</label>" : "") + textName);
    form.fun_appendInput(input_checkbox, formJson.groupId, formJson);
}

//对于inputText的 实现
form.inputRadio = {};
form.inputRadio.append = function (formJson) {
    var name = formJson.name;
    var textName = formJson.textName;
    var defValue = formJson.defValue ? formJson.defValue : "";
    var placeholder = formJson.placeholder ? formJson.placeholder : "";
    var defValue = formJson.defValue;

    var input_radio = $("#input_radio").clone();
    var input_append = $(input_radio).find(".col-sm-8")[0];
    //获取到该元素输入框
    var temp_radio = $(input_radio).find('#temp_radio');
    var temp_radio_lable = $(input_radio).find('#temp_radio_lable');

    if (defValue) {
        for (var i = 0; i < defValue.length; i++) {
            var radio = temp_radio.clone();
            var radio_lable = temp_radio_lable.clone();
            var value = defValue[i].value;
            var text = defValue[i].text;
            var checked = defValue[i].checked;

            //添加到输入框中对应的name和id
            var check_id = name + "_id[" + i + "]";
            var checklable_id = name + "_lableid[" + i + "]";
            $(radio).attr({"name": name, "id": check_id,"value":value});
            if(checked){
                $(radio).attr({"checked":true});
            }
            $(radio_lable).text(text);
            $(radio_lable).attr({"for":check_id,"id":checklable_id});
            $(input_append).append(radio);
            $(input_append).append("&nbsp;");
            $(input_append).append(radio_lable);
            $(input_append).append("&nbsp;&nbsp;&nbsp;");
        }
    }
    temp_radio.remove();
    temp_radio_lable.remove();
    //外部美化控件，加载美化

    //获取到该leable
    $(input_radio).find('.control-label').html((formJson.required == true ? "<label style='color: red'>*</label>" : "") + textName);
    form.fun_appendInput(input_radio, formJson.groupId, formJson);
}



document.body.onload = function () {
    //初始化输入框中的所有checkbox，和radio，样式功能
    var url = 'datas/json/test.json';
    form.fun_appendFormByDatas_Ajax(url,null,function(){

    });

}

