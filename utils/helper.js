"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newAgent = void 0;
exports.delay = delay;
exports.saveToFile = saveToFile;
exports.readFile = readFile;
const https_proxy_agent_1 = require("https-proxy-agent");
const socks_proxy_agent_1 = require("socks-proxy-agent");
const promises_1 = __importDefault(require("fs/promises"));
const logger_1 = __importDefault(require("./logger"));
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms * 1000));
}
// 保存数据到文件
async function saveToFile(filename, data) {
    try {
        await promises_1.default.appendFile(filename, `${data}\n`, 'utf-8');
        logger_1.default.info(`数据已保存到 ${filename}`);
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.default.error(`保存数据到 ${filename} 失败: ${error.message}`);
        }
        else {
            logger_1.default.error(`保存数据到 ${filename} 失败: ${String(error)}`);
        }
    }
}
// 读取文件
async function readFile(pathFile) {
    try {
        const datas = await promises_1.default.readFile(pathFile, 'utf8');
        return datas.split('\n')
            .map(data => data.trim())
            .filter(data => data.length > 0);
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.default.error(`读取文件错误: ${error.message}`);
        }
        else {
            logger_1.default.error(`读取文件错误: ${String(error)}`);
        }
        return [];
    }
}
// 创建代理代理
const newAgent = (proxy = null) => {
    if (proxy) {
        if (proxy.startsWith('http://')) {
            return new https_proxy_agent_1.HttpsProxyAgent(proxy);
        }
        else if (proxy.startsWith('socks4://') || proxy.startsWith('socks5://')) {
            return new socks_proxy_agent_1.SocksProxyAgent(proxy);
        }
        else {
            logger_1.default.warn(`不支持的代理类型: ${proxy}`);
            return null;
        }
    }
    return null;
};
exports.newAgent = newAgent;
//# sourceMappingURL=helper.js.map