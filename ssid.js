/**
 * Surge & Loon 的运行模式，根据当前网络自动切换模式，此脚本思路来自于Quantumult X。
 * @author: Peng-YM
 * 更新地址: https://raw.githubusercontent.com/Peng-YM/QuanX/master/Tools/RunningMode/running-mode.js
 *
 *************** Surge配置 ***********************
 * 推荐使用模块：
 * https://raw.githubusercontent.com/Peng-YM/QuanX/master/Tools/RunningMode/running-mode.sgmodule
 * 手动配置：
 * [Script]
 * event network-changed script-path=https://raw.githubusercontent.com/Peng-YM/QuanX/master/Tools/RunningMode/running-mode.js
 *
 *************** Loon配置 ***********************
 * 推荐使用插件：
 * https://raw.githubusercontent.com/Peng-YM/QuanX/master/Tools/RunningMode/running-mode.plugin
 * 手动配置：
 * [Script]
 * network-changed script-path=https://raw.githubusercontent.com/Peng-YM/QuanX/master/Tools/RunningMode/running-mode.js
 *
 *************** 脚本配置 ***********************
 * 推荐使用BoxJS配置。
 * BoxJS订阅：https://raw.githubusercontent.com/Peng-YM/QuanX/master/Tasks/box.js.json
 * (不推荐！)手动配置项为config, 请看注释
 */

let config = {
  silence: true, // 是否静默运行，默认false
  cellular: "RULE", // 蜂窝数据下的模式，RULE代表规则模式，PROXY代表全局代理，DIRECT代表全局直连
  wifi: "RULE", // wifi下默认的模式
  all_direct: ["WRT32X", "WRT32X Extreme"], // 指定全局直连的wifi名字
  all_proxy: ["STU"], // 指定全局代理的wifi名字
};

// load user prefs from box
const boxConfig = $persistentStore.read("surge_running_mode");
if (boxConfig) {
  config = JSON.parse(boxConfig);
  config.silence = JSON.parse(config.silence);
  config.all_direct = JSON.parse(config.all_direct);
  config.all_proxy = JSON.parse(config.all_proxy);
}

const isLoon = typeof $loon !== "undefined";
const isSurge = typeof $httpClient !== "undefined" && !isLoon;
const MODE_NAMES = {
let config = {
    silence: true, // 是否禁止通知
    cellular: "RULE",
    wifi: "RULE",
    all_direct: [""], //Wi-Fi的ssid 用英文逗号分开
    all_proxy: [""]  //Wi-Fi的ssid 用英文逗号分开
};

// load user prefs from box
const boxConfig = $persistentStore.read("surge_running_mode");
if (boxConfig) {
    config = JSON.parse(boxConfig);
    config.silence = JSON.parse(config.silence);
    config.all_direct = JSON.parse(config.all_direct);
    config.all_proxy = JSON.parse(config.all_proxy);
}

manager();
$done();

function manager() {
    const v4_ip = $network.v4.primaryAddress;
    
    const ssid = $network.wifi.ssid;

    const mode = ssid ? lookupSSID(ssid) : config.cellular;

    $surge.setOutboundMode(lookupOutbound(mode)[0]);

    if (!config.silence)
        $notification.post(
            "Surge Outbound Mode",
            Network：${ssid ? ssid : "Cellular"},
            Mode changes to: ${lookupOutbound(mode)[1]}
        );
}

function lookupSSID(ssid) {
    const map = {};
    config.all_direct.map(id => map[id] = "DIRECT");
    config.all_proxy.map(id => map[id] = "PROXY");

    const matched = map[ssid];
    return matched ? matched : config.wifi;
}

function lookupOutbound(mode) {
    return {
        "RULE": ["rule", "🧾Rule-based Proxy"],
        "PROXY": ["global-proxy", "🚀Global Prpxy"],
        "DIRECT": ["direct", "🎯Direct Outbound"]
    }[mode];
}
