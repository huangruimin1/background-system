/*
Navicat MySQL Data Transfer

Source Server         : background_db
Source Server Version : 50096
Source Host           : localhost:3306
Source Database       : background_system

Target Server Type    : MYSQL
Target Server Version : 50096
File Encoding         : 65001

Date: 2024-05-09 22:13:03
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL auto_increment COMMENT '用户唯一标识',
  `username` varchar(11) NOT NULL,
  `password` varchar(11) default NULL,
  `pone` varchar(11) default NULL,
  `addr` varchar(100) default NULL,
  `name` varchar(20) default NULL,
  `age` int(3) default NULL,
  `sex` int(1) default '0' COMMENT '0:未知，1：男，2：女',
  `avatar` varchar(100) character set utf8 collate utf8_bin default NULL COMMENT '用户头像',
  `usertype` int(1) unsigned zerofill default '1' COMMENT '用户类型 0：超管，1：普通，2：游客',
  `create_dt` timestamp NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin', '123456', '18276889453', '凹凸省旮旯市鲲鹏镇希腊村凤凰屯', '超级管理员', '0', '0', 'avataruploads/ac4bca615b5d4a489bb6208129b96812', '0', '2024-05-09 22:05:29');
