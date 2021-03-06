package com.active.wechart.sharedata;

import com.active.common.utils.EncryptUtils;
import com.active.wechart.vo.WeixinShareData;
import org.apache.commons.lang.StringUtils;

import java.net.URLDecoder;
import java.text.MessageFormat;
import java.util.Map;


public class OriginShare {
	

	public static WeixinShareData OriginShareMethod(String mobile, String url, String origin){
		WeixinShareData weixinShareData;
		Map<String,String> map = Constants.getParamsMap().get(origin);
        if(map!=null) {
			weixinShareData = new WeixinShareData();
			String img = map.get("img");
			String title = map.get("title");
			String content = map.get("content");
			String pyqcontent = map.get("pyqcontent");
			String shareUrl = map.get("url");
			String pyqShartImg = map.get("pyqimg");
			if (img != null) {
				weixinShareData.setShareImg(img);
				weixinShareData.setSharePyqImg(img);
			}
			if(pyqShartImg != null){
				weixinShareData.setSharePyqImg(pyqShartImg);
			}
			if (title != null) {
				weixinShareData.setShareTitle(title);
			}
			weixinShareData.setUrl(shareUrl);
			if (content != null) {
				weixinShareData.setShareWXContent(content);
				if (pyqcontent != null && !"".equals(pyqcontent)) {
					weixinShareData.setSharePYQContent(pyqcontent);
				} else {
					weixinShareData.setSharePYQContent(content);
				}
			}
		}else{
        	weixinShareData = new WeixinShareData();
        }
        return weixinShareData;
	}

}
