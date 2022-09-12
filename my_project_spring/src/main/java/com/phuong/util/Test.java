package com.phuong.util;

import java.text.DecimalFormat;

public class Test {
    public static void main(String[] args) {
        System.out.println(new DecimalFormat("###,###,###.##").format(1.49244E7));
    }
}
