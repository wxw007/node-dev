
// 时间戳转日期  2010-10-10 10:10:10
let formater = {};
formater.formatDate = function(ns) {
    var t, y, m, d, h, i, s;
    t = new Date(parseInt(ns));
    y = t.getFullYear();
    m = t.getMonth() + 1;
    d = t.getDate();
    h = t.getHours();
    i = t.getMinutes();
    s = t.getSeconds();
    var ft = "y-m-d h:i:s";
    var fa = ft.split(" ");
    var aa = fa[0] ? fa[0].split("-") : [];
    var bb = fa[1] ? fa[1].split(":") : [];
    var cc = aa.concat(bb);
    var ds = "";
    for (var e = 0; e < cc.length; e++) {
        switch (cc[e]) {
            case "y":
                ds += y;
                break;
            case "m":
                ds += "-" + (m < 10 ? "0" + m : m);
                break;
            case "d":
                ds += "-" + (d < 10 ? "0" + d : d);
                break;
            case "h":
                ds += " " + (h < 10 ? "0" + h : h);
                break;
            case "i":
                ds += ":" + (i < 10 ? "0" + i : i);
                break;
            case "s":
                ds += ":" + (s < 10 ? "0" + s : s);
                break;
            default:
                break;
        }
    }
    return ds;
};
export default formater