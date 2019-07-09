package com.active.front.controller;import com.active.bean.VisitInfo;import com.active.common.utils.MapCache;import com.active.front.service.VisitService;import com.alibaba.fastjson.JSONObject;import org.apache.commons.lang3.StringUtils;import org.slf4j.Logger;import org.slf4j.LoggerFactory;import org.springframework.beans.factory.annotation.Autowired;import org.springframework.stereotype.Controller;import org.springframework.web.bind.annotation.RequestMapping;import org.springframework.web.bind.annotation.ResponseBody;import javax.servlet.http.HttpServletRequest;import java.util.List;/** * 参观报名controller * * @author ta * @date 2019/6/30 下午8:42 * @since 1.0 */@Controller@RequestMapping("/visit")public class VisitController {    private final static Logger logger = LoggerFactory.getLogger(VisitController.class);    @Autowired    private VisitService visitService;    @RequestMapping("newMember")    @ResponseBody    public String pullNewMember(VisitInfo visitInfo,HttpServletRequest request){        JSONObject res = new JSONObject();        res.put("status", 0);        res.put("msg", "success");        try {            String dategroup = request.getParameter("dategroup");            String business= request.getParameter("business");            String visitingtime= request.getParameter("visitingtime");            visitInfo.setVisitTime(visitingtime);            visitInfo.setProfession(business);            visitInfo.setAge(dategroup);            VisitInfo exit =visitService.getVisitInfo(visitInfo);            if(exit ==null){                //员工                String cdsid = request.getParameter("cdsid");                if(StringUtils.isNotBlank(cdsid)){                    visitInfo.setProfession(cdsid);                    String dateStr = visitInfo.getVisitTime().split("日")[0];                    if(!"20".equals(dateStr) && !"21".equals(dateStr)){                        dateStr = visitInfo.getVisitTime();                    }                    if(MapCache.instance(dateStr,2).incrementAndGet(dateStr)>MapCache.limitMap.get(dateStr)){                        //以达到上线                        res.put("status", 2);                        res.put("msg", "sorry,此时间点报名人数已满");                        return res.toJSONString();                    }else{                        try{                            visitService.insertEmployeeInfo(visitInfo);                        }catch (Exception e){                            logger.error("插入数据报错："+e.getMessage());                            res.put("status", -1);                            res.put("msg", "服务器繁忙");                            MapCache.instance(dateStr,2).decrementAndGet(dateStr);                        }                    }                }else{                    /*if(MapCache.instance(visitInfo.getVisitTime(),1).incrementAndGet(visitInfo.getVisitTime()) > 80){                        //以达到上线                        res.put("status", 2);                        res.put("msg", "sorry,此时间点报名人数已满");                        return res.toJSONString();                    }else{                        try{*/                            visitService.insertInfo(visitInfo);                       /* }catch (Exception e){                            logger.error("插入数据报错："+e.getMessage());                            res.put("status", -1);                            res.put("msg", "服务器繁忙");                            MapCache.instance(visitInfo.getVisitTime(),1).decrementAndGet(visitInfo.getVisitTime());                        }*/                    //}                }            }else{                //已经存在                res.put("status", 1);                res.put("msg", "您已经成功预约7月"+exit.getVisitTime()+"的活动，每个手机号仅可报名一次，感谢您的支持！");            }        }catch (Exception e){            logger.error("error："+e.getMessage());            res.put("status", -1);            res.put("msg", "服务器繁忙");        }        return res.toJSONString();    }    @RequestMapping("getList")    @ResponseBody    public String getList(VisitInfo visitInfo,HttpServletRequest request){        JSONObject res = new JSONObject();        res.put("code", 0);        res.put("msg", "success");        try {            visitInfo.setPageSize((visitInfo.getPage()-1)*visitInfo.getLimit());            List<VisitInfo> vis =visitService.getVisitInfos(visitInfo);            Integer count = visitService.getCount(visitInfo);            res.put("data",vis);            res.put("count",count);        }catch (Exception e){            logger.error("error："+e.getMessage());            res.put("code", -1);            res.put("msg", "error");        }        return res.toJSONString();    }    @RequestMapping("getEmployeeList")    @ResponseBody    public String getEmployeeList(VisitInfo visitInfo,HttpServletRequest request){        JSONObject res = new JSONObject();        res.put("code", 0);        res.put("msg", "success");        try {            visitInfo.setPageSize((visitInfo.getPage()-1)*visitInfo.getLimit());            List<VisitInfo> vis =visitService.getVisitEmployeeInfos(visitInfo);            Integer count = visitService.getEmployeeCount(visitInfo);            res.put("data",vis);            res.put("count",count);        }catch (Exception e){            logger.error("error："+e.getMessage());            res.put("code", -1);            res.put("msg", "error");        }        return res.toJSONString();    }}