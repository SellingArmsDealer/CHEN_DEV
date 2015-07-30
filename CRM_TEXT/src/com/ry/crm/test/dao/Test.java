package com.ry.crm.test.dao;

import java.beans.Statement;
import java.sql.Connection;
import java.sql.DriverManager;

/**
 * Created by CHEN_B on 2015-7-30.
 */
public class Test {
    private static String driverName = "com.mysql.jdbc.Driver";
    private static String url = "jdbc\\:mysql\\://192.168.1.250\\:3306/ryoa?useUnicode\\=true&characterEncoding\\=utf-8";
    private static String username = "root";
    private static String pwd = "root";
    private Connection conn = null;

    public Test() {
        try {
            // 加载驱动程序
            Class.forName(driverName);
            // 连续数据库
            conn = DriverManager.getConnection(url, username, pwd);
        } catch (Exception e) {
            e.printStackTrace();
            ;
        }
    }

    public void test(){
    }

}