package com.active.wechart.sharedata;

import java.util.HashMap;
import java.util.Map;


public class Constants {

    private static final String TIANGONGIMG="http://www.bjqtkj.com/images/tiangongv1/sharelogo.png";
	private static final String TIANGONGPYQIMG="http://www.bjqtkj.com/images/tiangongv1/sharelogo.png";
    private static final String TIANGONGCONTENT="天工开物 • 预见生活之美";
    private static final String TIANGONGTITLE="天工开物";
    private static final String TIANGONGPYQCONTENT="天工开物 • 预见生活之美";
    private static final String TIANGONGURL ="http://www.bjqtkj.com/html/tiangong.html";
    

    private static Map<String,Map<String,String>> paramsMap = new HashMap<String,Map<String,String>>();

    public static Map<String, Map<String, String>> getParamsMap() {
		return paramsMap;
	}

	static {
    	//修改了分享内容
    	Map<String,String> activityMap = new HashMap<String,String>();

    	activityMap.put("img", TIANGONGIMG);
    	activityMap.put("title", TIANGONGTITLE);
    	activityMap.put("content", TIANGONGCONTENT);
    	activityMap.put("pyqcontent", TIANGONGPYQCONTENT);
    	activityMap.put("pyqimg",TIANGONGPYQIMG);
		activityMap.put("url", TIANGONGURL);
    	paramsMap.put("tiangong", activityMap);
    }
}
