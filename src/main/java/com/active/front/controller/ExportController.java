package com.active.front.controller;import com.active.bean.*;import com.active.common.utils.ExportExcelUtil;import com.active.common.utils.ExportExcelWrapper;import com.active.front.service.RoadDriverService;import com.active.front.service.RoadV2DriverService;import com.active.front.service.VisitService;import org.apache.commons.lang3.StringUtils;import org.springframework.beans.factory.annotation.Autowired;import org.springframework.stereotype.Controller;import org.springframework.web.bind.annotation.RequestMapping;import javax.servlet.http.HttpServletRequest;import javax.servlet.http.HttpServletResponse;import java.util.List;/** * 这是一个类说明 * @author ta * @date 2019/7/9 下午7:26 * @since 1.0 */@Controller@RequestMapping("/export")public class ExportController {    @Autowired    private VisitService visitService;    @Autowired    private RoadDriverService roadDriverService;    @Autowired    private RoadV2DriverService roadV2DriverService;    @RequestMapping("/getExcel")    public void getExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {        String[] columnNames = { "ID", "姓名", "手机号","年龄段","CDSID或者邮箱","参观时间","报名时间"};        String fileName = "member";        List<VisitExportInfo> list = visitService.getVisitExportInfos();        ExportExcelWrapper<VisitExportInfo> util = new ExportExcelWrapper<VisitExportInfo>();        util.exportExcel(fileName, fileName, columnNames, list, response, ExportExcelUtil.EXCEl_FILE_2007);    }    @RequestMapping("/getExcelDz")    public void getExcelDz(HttpServletRequest request, HttpServletResponse response) throws Exception {        String[] columnNames = { "ID", "姓名", "手机号","年龄段","职业","参观时间","报名时间"};        String fileName = "member";        List<VisitExportInfo> list = visitService.getVisitExportDzInfos();        ExportExcelWrapper<VisitExportInfo> util = new ExportExcelWrapper<VisitExportInfo>();        util.exportExcel(fileName, fileName, columnNames, list, response, ExportExcelUtil.EXCEl_FILE_2007);    }    @RequestMapping("/getExcelRoad")    public void getExcelRoad(HttpServletRequest request, HttpServletResponse response) throws Exception {        String[] columnNames = { "姓名", "手机号","省","市","经销商地址","车型","预约时间","区号","经销商电话","创建时间"};        String fileName = "info";        RoadDriverInfo roadDriverInfo = new RoadDriverInfo();        String mobile =request.getParameter("mobile");        if(StringUtils.isNotBlank(mobile)){            roadDriverInfo.setMobile(mobile);        }        List<RoadExportDriverInfo> list = roadDriverService.getExcelList(roadDriverInfo);        ExportExcelWrapper<RoadExportDriverInfo> util = new ExportExcelWrapper<RoadExportDriverInfo>();        util.exportExcel(fileName, fileName, columnNames, list, response, ExportExcelUtil.EXCEl_FILE_2007);    }    @RequestMapping("/getExcelRoadv2")    public void getExcelRoadv2(HttpServletRequest request, HttpServletResponse response) throws Exception {        String fileName = "info";        String[] columnNames = { "姓名", "手机号","省","市","经销商地址","车型","预约时间","区号","经销商电话","创建时间"};        RoadDriverInfo roadDriverInfo = new RoadDriverInfo();        String mobile =request.getParameter("mobile");        if(StringUtils.isNotBlank(mobile)){            roadDriverInfo.setMobile(mobile);        }        List<RoadExportDriverInfo> list = roadV2DriverService.getExcelList(roadDriverInfo);        ExportExcelWrapper<RoadExportDriverInfo> util = new ExportExcelWrapper<RoadExportDriverInfo>();        util.exportExcel(fileName, fileName, columnNames, list, response, ExportExcelUtil.EXCEl_FILE_2007);    }    @RequestMapping("/getExcelRoadv2_1")    public void getExcelRoadv2_1(HttpServletRequest request, HttpServletResponse response) throws Exception {        String[] columnNames = { "姓名", "手机号","市","是否愿意参与活动当天的试乘试驾环节","喜欢揽胜家族的哪款车型","近期是否有购车意向","公司及职务信息","创建时间"};        String fileName = "info";        RoadJdbbInfo roadJdbbInfo = new RoadJdbbInfo();        String mobile =request.getParameter("mobile");        if(StringUtils.isNotBlank(mobile)){            roadJdbbInfo.setMobile(mobile);        }        List<RoadExportJdInfo> list = roadV2DriverService.getExcelJdList(roadJdbbInfo);        ExportExcelWrapper<RoadExportJdInfo> util = new ExportExcelWrapper<RoadExportJdInfo>();        util.exportExcel(fileName, fileName, columnNames, list, response, ExportExcelUtil.EXCEl_FILE_2007);    }}