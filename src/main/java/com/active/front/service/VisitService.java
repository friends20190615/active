package com.active.front.service;import com.active.bean.VisitInfo;import com.active.front.dao.VisitDao;import org.springframework.beans.factory.annotation.Autowired;import org.springframework.stereotype.Service;/** * 这是一个类说明 * * @author ta * @date 2019/6/30 下午11:44 * @since 1.0 */@Servicepublic class VisitService {    @Autowired    private VisitDao visitDao;    public void insertInfo(VisitInfo visitInfo) {        visitDao.insertInfo(visitInfo);    }    public VisitInfo getVisitInfo(VisitInfo visitInfo) {        return visitDao.getVisitInfo(visitInfo);    }    public void updateVisitInfo(VisitInfo visitInfo) {        visitDao.updateVisitInfo(visitInfo);    }    public Void deleteVisitInfo(VisitInfo visitInfo) {        return visitDao.deleteVisitInfo(visitInfo);    }}