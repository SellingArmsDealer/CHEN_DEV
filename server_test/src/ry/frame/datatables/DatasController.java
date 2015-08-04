package ry.frame.datatables;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * Created by CHEN_B on 2015-8-4.
 */
@Controller
@RequestMapping("datas")
public class DatasController {
    Logger logger=Logger.getLogger(this.getClass());
    @ResponseBody
    @RequestMapping("pageDatas")
    public Map<String, Object> pageDatas(HttpServletRequest request,Integer start,Integer length) {
        Map<String, Object> memory = new HashMap<>();
        Integer totla=100;
        memory.put("draw",request.getParameter("draw"));
        memory.put("recordsTotal",totla);
        memory.put("recordsFiltered",totla);
        List<Object> list=new ArrayList<Object>();
        for(int i=start+1;i<=start+length;i++){
            if(i>totla){
                break;
            }
            list.add(new String[]{
                    "a_"+i,"b_"+i,"c_"+i,"d_"+i,"e_"+i,"f_"+i
            });
        }
        memory.put("data",list);

        Enumeration<String> e=request.getParameterNames();
        while(e.hasMoreElements()){
            String headname=e.nextElement();
            logger.info("headname:"+headname+"--value:"+request.getParameter(headname));
        }
        return memory;
    }

}
