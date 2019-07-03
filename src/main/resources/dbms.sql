CREATE TABLE `t_visit` (  `id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT 'id',  `name` varchar(50) DEFAULT NULL COMMENT '名称',  `mobile` varchar(20) DEFAULT NULL COMMENT '手机号',  `age` varchar(10) DEFAULT NULL COMMENT '年领',  `visit_tIme` varchar(50) DEFAULT NULL COMMENT '参观时间',  `create_time` datetime DEFAULT NULL COMMENT '创建时间',  `update_time` datetime DEFAULT NULL COMMENT '修改时间',  `profession` varchar(50) DEFAULT NULL COMMENT '行业',  `state` tinyint(10) DEFAULT NULL,  PRIMARY KEY (`id`),  KEY `idx_mobile` (`mobile`)) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='参观报名表';CREATE TABLE `t_drive` (  `id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT 'id',  `name` varchar(50) DEFAULT NULL COMMENT '名称',  `mobile` varchar(20) DEFAULT NULL COMMENT '手机号',  `id_number` varchar(20) DEFAULT NULL COMMENT '身份证号',  `appointment` varchar(50) DEFAULT NULL COMMENT '预约时间',  `create_time` datetime DEFAULT NULL COMMENT '创建时间',  `update_time` datetime DEFAULT NULL COMMENT '修改时间',  `city_name` varchar(50) DEFAULT NULL COMMENT '城市名称',  `car_modal` varchar(50) DEFAULT NULL COMMENT '车型',  `dealer` varchar(50) DEFAULT NULL COMMENT '经销商',  `state` tinyint(10) DEFAULT NULL COMMENT '状态',  PRIMARY KEY (`id`),  KEY `idx_mobile` (`mobile`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='预约试驾表';