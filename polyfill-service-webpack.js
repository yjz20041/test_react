class PolyfillServiceWebpackPlugin {
    constructor(htmlWebpackPlugin) {
        this.pluginName = 'PolyfillServiceWebpackPlugin';
        this.removedBundleName = 'polyfillServiceBundler';
        this.htmlWebpackPlugin = htmlWebpackPlugin;
    }

    apply(compiler) {
        // compiler.hooks.normalModuleFactory.tap('IgnorePlugin', (nmf) => {
        //     nmf.hooks.afterResolve.tap('IgnorePlugin', this.checkIgnore);
        // });
        compiler.hooks.compilation.tap(this.pluginName,
            this.addPolyfillServcieBundle.bind(this));
    }

    // eslint-disable-next-line class-methods-use-this
    checkIgnore(result) {
        if (!result) return result;
        if (/core-js\/modules|regenerator-runtime\/runtime/.test(result.rawRequest)) {
            console.log(result)
            return null;
        }
        return result;
    }

    // 修改options,将所有相关polyfill的包都提取到一个文件里
    // buildOriginalPolyfillBundle(compiler) {
    //     const {
    //         options
    //     } = compiler;
    //     options.optimization.splitChunks.cacheGroups[`${this.removedBundleName}-build`] = {
    //         test: /\/node_modules\/(core-js|regenerator-runtime)\//,
    //         enforce: true
    //     };
    // }

    addPolyfillServcieBundle(compilation) {
        compilation.hooks.succeedModule.tap(this.pluginName, (module) => {
            if (/core-js\/modules|regenerator-runtime\/runtime/.test(module.rawRequest)) {
                console.log(module._source._value)
                module._source._value = '';
                return null;
            }
        })
        // compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(this.pluginName, (data, cb) => {
        //     // const newBody = data.body.filter(tag => tag.attributes
        //     //     .src.indexOf(this.removedBundleName) < 0);
        //     const newBody = data.body;
        //     const psTag = {
        //         tagName: 'script',
        //         closeTag: true,
        //         attributes: {
        //             type: 'text/javascript',
        //             src: 'https://cms.igame.163.com/repo/polyfill.js'
        //         }
        //     };
        //     newBody.unshift(psTag);
        //     // eslint-disable-next-line no-param-reassign
        //     data.body = newBody;
        //     cb(null, data);
        // });
    }
}

module.exports = PolyfillServiceWebpackPlugin;
