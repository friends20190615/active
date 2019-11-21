package com.active.wechart.controller;

import com.alibaba.fastjson.JSON;
import com.active.common.utils.SysUtil;
import com.active.wechart.vo.JSONResult;
import com.active.wechart.vo.WeixinJSConfigVO;
import com.active.wechart.vo.WeixinShareData;
import com.active.wechart.service.IWeixinJSConfigService;
import com.active.wechart.sharedata.OriginShare;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/weixinShare")
public class WeixinShare {

    @Autowired
    private IWeixinJSConfigService weixinJSConfigService;
    
	@RequestMapping("/getShareData")
    @ResponseBody
    public String getShareData(String mobile, String url, String origin){
		String env = SysUtil.getResourceValue("env");
        JSONResult<Object> result = JSONResult.getCommonResult(null);
        WeixinShareData weixinShareData;
        weixinShareData = OriginShare.OriginShareMethod(mobile, url, origin);
        WeixinJSConfigVO weixinJSConfigVO =  weixinJSConfigService.getWeixinJSConfig(url);;
        weixinShareData.setWeixinJSConfigVO(weixinJSConfigVO);
        result.setResult(weixinShareData);
        result.setStatus(JSONResult.SUCCUESS_CODE);
        return JSON.toJSONString(result);
    }
}
