package com.active.front.dao;import com.active.bean.*;import com.active.common.annotation.MyBatisRepository;import org.springframework.stereotype.Component;import java.util.List;/** * 这是一个类说明 * * @author ta * @date 2019/8/18 下午8:52 * @since 1.0 */@Component@MyBatisRepositorypublic interface RoadV2DriverDao {    List<ProvinceInfo> getProvinceInfos();    List<CityInfo> getCityInfos(ProvinceInfo provinceInfo);    List<DealerInfo> getDealerInfos(CityInfo cityInfo);    List<RoadDriverInfo> getList(RoadDriverInfo roadDriverInfo);    Integer getCount(RoadDriverInfo roadDriverInfo);    RoadDriverInfo getInfo(RoadDriverInfo roadDriverInfo);    void insertInfo(RoadDriverInfo roadDriverInfo);    void updateInfo(RoadDriverInfo roadDriverInfo);    void deleteInfo(Long id);    List<RoadExportDriverInfo> getExcelList(RoadDriverInfo roadDriverInfo);    List<RoadJdbbInfo> getJdList(RoadJdbbInfo roadJdbbInfo);    void insertJdInfo(RoadJdbbInfo roadJdbbInfo);    RoadJdbbInfo getJdInfo(RoadJdbbInfo roadJdbbInfo);    Integer getJdCount(RoadJdbbInfo roadJdbbInfo);    List<RoadExportJdInfo> getExcelJdList(RoadJdbbInfo roadJdbbInfo);}