package ry.frame.datatables.common;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by CHEN_B on 2015-5-26.
 */
public class ControllerBase {
    public static final String RESULT="result";
    public static final String DATAS="datas";
    public static final String DATA="data";
    public static final String DATA_ID="dataId";
    public static final String SUCCESS="success";

    public static final String PAGE_ERROR="error/error";

    public static final String PAGE_DB_EXCEPTION="error/error_db_exception";


    /**
     * 默认所有的json传输，都需要带入 result 结果，以方便前端js解析 是否请求OK，或者，方便获取错误信息
     * @return
     */
    public Map<String,Object> getMemoryMap(){
        Map<String,Object> map=new HashMap<String, Object>();
        map.put(RESULT,SUCCESS);
        return map;
    }

}
