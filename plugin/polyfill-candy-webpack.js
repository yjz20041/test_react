const path = require('path');
const candyMap = require('./map');
const fs = require('fs');
const UglifyJS = require('uglify-js');

class PolyfillCandyWebpackPlugin {
    constructor(options = {}) {
        this.pluginName = 'PolyfillServiceWebpackPlugin';
        this.options = {
            // 当mode为all和usage的时候，插件会收集目前应用所使用到的es feature，并在运行时进行检测本地是否支持。
            // 如果运行时发现有feature缺失的情况，则执行all和usage对应的polyfill策略：
            // -all: 全量polyfll，从cdn上寻求全量polyfill包
            // -usage：从polyfill-service服务中按需获取缺失的polyfill
            // 当mode为ua时，插件会直接向polyfill-service发起根据ua获取polyfill包的请求
            // -user-agent: 从polyfill-service服务中获取对应user-agent的polyfill包
            mode: 'all',
            // 是否开启插件
            enabled: true,
            // polyfill-service的开发地址
            psDevPath: 'https://cms.igame.163.com/repo/polyfill.js',
            // polyfill-service的cdn地址
            psProdPath: 'https://music.163.com/repo/polyfill.js',
            // 是否为线上环境
            prod: false,
            // 全量polyfill地址
            allPolyfillPath: 'https://test',
            ...options
        };
        this.candyFeatureSet = new Set();
    }

    apply(compiler) {
        const {
            enabled
        } = this.options;
        if (!enabled) return;

        compiler.hooks.beforeCompile.tapAsync(`${this.pluginName}-clear`, (param, cb) => {
            // 清空candy
            this.candyFeatureSet.clear();
            cb();
        });
        
        // 原始的polyfill从定向到空文件里
        // corejs2和corejs3的feature地址有一点差异:
        // corejs2: es6-xxx es7-xxx
        // corejs3: es-xxx esnext-xxx
        const regPolyfill = /core-js\/modules\/es\d?\.([\w.\-]+)/;
        compiler.hooks.normalModuleFactory.tap(
            this.pluginName,
            (nmf) => {
                nmf.hooks.beforeResolve.tap(this.pluginName, (result) => {
                    if (!result) return;
                    const match = result.request.match(regPolyfill);
                    if (match) {
                        const feature = match[1];
                        const candyFeature = candyMap[feature];
                        if (candyFeature) {
                            this.candyFeatureSet.add(candyFeature);
                            // eslint-disable-next-line no-param-reassign
                            result.request = path.resolve(__dirname, './empty.js');
                        }
                    }
                    return result;
                });
            }
        );
        // 增加polyfill-service链接
        compiler.hooks.compilation.tap(this.pluginName,
            this.addPolyfillServcieBundle.bind(this));
    }

    addPolyfillServcieBundle(compilation) {
        compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(this.pluginName, (data, cb) => {
            const candyFeatureArray = Array.from(this.candyFeatureSet);
            const {
                prod,
                psDevPath,
                psProdPath,
                allPolyfillPath,
                mode
            } = this.options;
            const features = candyFeatureArray.join(',');
            let polyfillPath = '';
            let scriptText = '';
            // 只有usage和user-agent这两种模式才走polyfill-service
            if (mode === 'usage' || 'user-agent') {
                polyfillPath = prod ? psProdPath : psDevPath;
            } else {
                polyfillPath = allPolyfillPath;
            }
            // 组装script的内容
            let checkFeatureText = candyFeatureArray.map(item => `${item} === undefined`).join('||');
            if (mode === 'user-agent') {
                scriptText += `
                    function parse(uaStrin) {
                        var browser = 'others';
                        var version = '0.0.0';
                        var match = [];
                    
                        // 三星浏览器
                        var REG_SAMSUNG = /\\sSamsungBrowser\\/([\\d.]+)/;
                    
                        // chrome不区分桌面端、移动端、webview
                        var REG_CHROME = /^Mozilla.+\\sChrome\\/([\\d.]+)\\s.*(?:Mobile\\s)?Safari\\/[\\d.]+/;
                        // safari桌面端
                        var REG_SAFARI = /^Mozilla.+AppleWebKit\\/[\\d.]+\\s\\(KHTML,\\slike\\sGecko\\)\\sVersion\\/([\\d.]+)\\sSafari\\/[\\d.]+/;
                        // safari移动端/uiwebviwe/wkwebview
                        var REG_SAFARI_MOBILE = /^Mozilla.+(?:iPod|iPod touch|iPhone|iPad);.*\\sOS\\s(\\d+)_\\d+.*\\sMobile\\/\\w+/;
                    
                        if (match = REG_SAMSUNG.exec(uaString)) {
                        browser = 'samsung_mob';
                        version = match[1];
                        } else if (match = REG_CHROME.exec(uaString)) {
                        browser = 'chrome';
                        version = match[1];
                        } else if (match = REG_SAFARI_MOBILE.exec(uaString)) {
                        browser = 'ios_saf';
                        version = match[1];
                        } else if (match = REG_SAFARI.exec(uaString)) {
                        browser = 'safari';
                        version = match[1];
                        }
                    
                        var major = version.split('.')[0];
                        if (major <= 0) {
                        browser = 'others';
                        }
                        // 只取主版本
                        var ua = browser + '/' + major + '.0.0';
                        return ua;
                    };
                    var ua = parse(navigator.userAgent);
                    document.write('<script type="text/javascript" src="${polyfillPath}?ua=' + ua + '" ><\\/script>');
                `;
            } else {
                scriptText += `
                    if(${checkFeatureText}) {
                `;
                if (mode === 'usage') {
                    scriptText += `
                        document.write('<script type="text/javascript" src="${polyfillPath}?ua=${encodeURIComponent('other/0.0.0')}&features=${encodeURIComponent(features)}"><\\/script>');
                    `;
                } else if (mode === 'all') {
                    scriptText += `
                        document.write('<script type="text/javascript" src="${polyfillPath}" ><\\/script>');
                    `;
                }
                scriptText += '}';
            }
            if (prod) {
                const miniScript = UglifyJS.minify(scriptText, {});
                scriptText = miniScript.code;
            }
            // 插入js脚本
            const newBody = data.body;
            const psTag = {
                tagName: 'script',
                closeTag: true,
                attributes: {
                    type: 'text/javascript'
                },
                innerHTML: scriptText
            };
            newBody.unshift(psTag);
            // eslint-disable-next-line no-param-reassign
            data.body = newBody;
            cb(null, data);
        });
    }
}

module.exports = PolyfillCandyWebpackPlugin;
