package com.active.wechart.service;


import com.active.wechart.vo.WeixinJSConfigVO;

/**
 * Created with IntelliJ IDEA.
 * User: GrayF(jy.feng@zuche.com))
 * Date: 2015/4/14
 * Time: 11:08
 */
public interface IWeixinJSConfigService {


    WeixinJSConfigVO getWeixinJSConfig(String url);
}
