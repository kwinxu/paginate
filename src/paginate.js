/**
 *@author xyx   <kwin.xu@163.com>
 *        date: 2016.12.14
 *@description mongoose 分页插件
 */
/* jshint ignore: start */
'use strict';
/* jshint ignore: end   */


const EventProxy = require('eventproxy');
const PageUnit = require('./page_unit');


/**
 * @description 分页插件
 * @param {Number} currentPage 当前页
 * @param {Number} pageSize 每页大小
 * @param {mongoose.model} model mongoose Model
 * @param {object} conditions 查询条件
 * @param {string} projection 查询字段
 * @param {object} options 查询选项
 * @returns
 */
module.exports = function (currentPage, pageSize, model, conditions, projection, options) {
    return new Promise((resolve) => {
        let pageUnit = null;
        let ep = new EventProxy();
        ep.on('_promise', () => {
            resolve({
                /**
                 * @description 进行分页查询，可以继续populate级联查询对象
                 * @returns {Promise}
                 */
                findSource: () => {
                    return model.find(conditions, projection, options).skip(pageUnit.getSkip()).limit(pageUnit.getLimit());
                },
                /**
                 * @description 获取本次查询分页相关内容
                 * @returns {object} 记录分页数据
                 */
                getPaginate: () => {
                    return pageUnit.getPaginate();
                }
            });
        });
        model.count(conditions).then((count) => {
            //初始化分页类
            pageUnit = new PageUnit(currentPage, pageSize, count);
            ep.emit('_promise');
        }).catch(resolve);
    })
}