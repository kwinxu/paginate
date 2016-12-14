/**
 *@author xyx   <kwin.xu@semioe.com>
 *        date: 2016.12.14
 *@description 分页
 */
/* jshint ignore: start */
'use strict';
/* jshint ignore: end   */


const EventProxy = require('eventproxy');
const PageUnit = require('./page_unit');


module.exports = function (currentPage, pageSize, model, conditions, projection, options) {
    return new Promise((resolve) => {
        let pageUnit = null;
        let ep = new EventProxy();
        ep.on('_promise', () => {
            resolve({
                findSource: () => {
                    return model.find(conditions, projection, options).skip(pageUnit.getSkip()).limit(pageUnit.getLimit());
                },
                getPaginate: () => {
                    return pageUnit.getPaginate();
                }
            });
        });
        model.count(conditions).then((count) => {
            pageUnit = new PageUnit(currentPage, pageSize, count);
            ep.emit('_promise');
        }).catch(resolve);
    })
}