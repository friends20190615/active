package com.active.bean;/** * 这是一个类说明 * * @author * @date 2019/10/15 下午8:05 * @since 1.0 */public class RoadJdbbInfo {    private Long id;    private String name;    private String mobile;    private String cityName;    private String createTime;    private Integer page;    private Integer pageSize;    private Integer limit;    public Long getId() {        return id;    }    public void setId(Long id) {        this.id = id;    }    public String getName() {        return name;    }    public void setName(String name) {        this.name = name;    }    public String getMobile() {        return mobile;    }    public void setMobile(String mobile) {        this.mobile = mobile;    }    public String getCityName() {        return cityName;    }    public void setCityName(String cityName) {        this.cityName = cityName;    }    public Integer getPage() {        return page;    }    public void setPage(Integer page) {        this.page = page;    }    public Integer getPageSize() {        return pageSize;    }    public void setPageSize(Integer pageSize) {        this.pageSize = pageSize;    }    public Integer getLimit() {        return limit;    }    public void setLimit(Integer limit) {        this.limit = limit;    }    public String getCreateTime() {        return createTime;    }    public void setCreateTime(String createTime) {        this.createTime = createTime;    }}