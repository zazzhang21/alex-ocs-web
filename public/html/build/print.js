/**
 * Created by rqzheng on 2016/8/10.
 */
function previewInstall() {
    var reqUrl = "http://10.118.60.62:8080/order/savePrintOrderList"; //local
    // var reqUrl = "https://o2o.sit.sf-express.com:14443/api/order/savePrintOrderList"; //uat
    // var reqUrl = "https://o2o.sf-express.com:443/api/order/savePrintOrderList"; //production
    var data = sessionStorage.getItem('orderInfo');
    var orderNos = [];
    try {
        var LODOP = getLodop();
        if (!data) {
            alert("没有打印数据")
        } else {
            var orderJson = JSON.parse(data);
            if (LODOP.VERSION) {
                LODOP.PRINT_INITA("0cm", "0cm", "10cm", "15cm", "OCS打印");
                for (var i = 0; i < orderJson.length; i++) {
                    var orderValue = orderJson[i];
                    var allProductNum = 0;//商品总数
                    var orderDetailSpan = "";//商品详情
                    if (orderValue.orderProductDto.length > 0) {
                        for (var j = 0; j < orderValue.orderProductDto.length; j++) {
                            allProductNum += orderValue.orderProductDto[j].productNum;
                            orderDetailSpan += " " + orderValue.orderProductDto[j].productName + " x" + orderValue.orderProductDto[j].productNum;
                        }
                    }
                    var paidAccount = Number(0).toFixed(2);
                    if (orderValue.paymentStatus == "2") {
                        paidAccount = Number(orderValue.paidAccount).toFixed(2);
                    }
                    LODOP.NewPage();
                    LODOP.ADD_PRINT_RECT("1.5cm", "0.5cm", "9cm", "7.5cm", 0, 2);
                    LODOP.ADD_PRINT_TEXT("0.5cm", "3.175cm", "3.969cm", "1.27cm", "顺丰同城");
                    LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体");
                    LODOP.SET_PRINT_STYLEA(0, "FontSize", 23);
                    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
                    LODOP.ADD_PRINT_LINE("3.5cm", "0.5cm", "3.5cm", "9.5cm", 0, 1.5);
                    LODOP.ADD_PRINT_LINE("1.5cm", "6cm", "3.493cm", "6cm", 0, 1.5);
                    LODOP.ADD_PRINT_LINE("2.5cm", "6cm", "2.5cm", "9.5cm", 0, 1.5);
                    LODOP.ADD_PRINT_BARCODE("1.746cm", "1.2cm", "4.8cm", "1.6cm", "128Auto", orderValue.orderNo);
                    LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
                    LODOP.ADD_PRINT_TEXT("1.65cm", "6.747cm", "2.381cm", "0.953cm", orderValue.serviceType);
                    LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体");
                    LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
                    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
                    LODOP.ADD_PRINT_TEXT("2.6cm", "6.615cm", "2.646cm", "0.953cm", "代收货款：\n¥" + paidAccount);
                    LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
                    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
                    LODOP.ADD_PRINT_LINE("4.5cm", "0.5cm", "4.5cm", "9.5cm", 0, 1.5);
                    LODOP.ADD_PRINT_TEXT("3.678cm", "0.661cm", "1.191cm", "0.82cm", "分\n拣");
                    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
                    LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
                    LODOP.ADD_PRINT_TEXT("3.704cm", "2.805cm", "6.165cm", "0.873cm", orderValue.sortingCode);
                    LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体");
                    LODOP.SET_PRINT_STYLEA(0, "FontSize", 17);
                    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
                    LODOP.ADD_PRINT_LINE("6.165cm", "0.5cm", "6.165cm", "9.5cm", 0, 1.5);
                    LODOP.ADD_PRINT_TEXT("4.657cm", "0.661cm", "0.661cm", "1.349cm", "收\n件");
                    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
                    LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体");
                    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
                    LODOP.ADD_PRINT_LINE("4.5cm", "6cm", "6.1cm", "6cm", 0, 1.5);
                    // LODOP.ADD_PRINT_TEXT("4.657cm", "6.1cm", "0.661cm", "1.349cm", "寄\n件");
                    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
                    LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体");
                    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
                    LODOP.ADD_PRINT_TEXT("4.71cm", "1.455cm", "4.5cm", "1.376cm", "" + (orderValue.receiveAddress == null ? "空" : orderValue.receiveAddress) + "\n" + (orderValue.receiveLinkman == null ? "空" : orderValue.receiveLinkman) + "  " + (orderValue.receivePhone == null ? "空" : orderValue.receivePhone));
                    LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
                    LODOP.ADD_PRINT_TEXT("4.683cm", "6.165cm", "3.228cm", "1.482cm", "寄件\n" + (orderValue.shopAddress == null ? "空" : orderValue.shopAddress) + "\n" + (orderValue.pickLinkeman == null ? "空" : orderValue.pickLinkeman) + "  " + (orderValue.pickPhone == null ? "空" : orderValue.pickPhone));
                    LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
                    LODOP.ADD_PRINT_LINE("6.138cm", "6cm", "9cm", "6cm", 0, 1.5);
                    LODOP.ADD_PRINT_TEXT("6.297cm", "0.767cm", "5.265cm", "2.355cm", "商家订单信息:\n订单号：" + (orderValue.shopOrderno == null ? "空" : orderValue.shopOrderno) + "\n商品总数：" + allProductNum + " 重量：" + (orderValue.totalWeight == null ? "" : orderValue.totalWeight)
                        + "\n订单明细：" + orderDetailSpan + "\n订单备注：" + (orderValue.remark == null ? "" : orderValue.remark));
                    LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
                    // LODOP.ADD_PRINT_TEXT("7.641cm", "0.767cm", "5.265cm", "2.355cm", "重量：" + (orderValue.totalWeight == null ? "" : orderValue.totalWeight) + "\n订单备注：" + (orderValue.remark == null ? "" : orderValue.remark));
                    // LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);

                    LODOP.ADD_PRINT_LINE("7.461cm", "6cm", "7.461cm", "9.5cm", 0, 1.5);
                    LODOP.ADD_PRINT_TEXT("6.271cm", "6.2cm", "2cm", "0.7cm", "寄件日期：");
                    LODOP.ADD_PRINT_TEXT("6.271cm", "7.7cm", "1.3cm", "0.7cm", (orderValue.shopOrderDate == null ? "" : orderValue.shopOrderDate));
                    LODOP.SET_PRINT_STYLEA(0, "FontSize", 6);
                    LODOP.ADD_PRINT_TEXT("6.879cm", "6.2cm", "2.646cm", "0.7cm", "派件员：");
                    LODOP.ADD_PRINT_TEXT("7.541cm", "6.2cm", "2.646cm", "0.7cm", "收件人签名：");
                    LODOP.ADD_PRINT_TEXT("8.467cm", "6.2cm", "3.175cm", "0.7cm", "日期：  日  时  分");
                    LODOP.SET_PRINT_STYLEA(0, "Italic", 1);

                    orderNos.push(orderValue.orderNo);
                }
                LODOP.PREVIEW();
            }
        }
    } catch (err) {
    }
    if (orderNos.length > 0) {
        // 保存订单打印状态
        $.ajax({
            type: "POST",
            url: reqUrl,
            data: {orderNos: orderNos.toString()},
            dataType: "json",
            headers: {
                'ocs-client-id': 'O2O-Business-Web',
                'x-up-Authorization': 'B-Token ' + getCookie('E-token')
            },
            success: function (result) {
                if (result.success) {
                    //success
                } else {
                    alert(result.errorInfo);
                }
            },
            error: function (errorResult) {
                //error
            }
        });
    }

}

//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}