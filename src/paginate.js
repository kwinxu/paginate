/**
 *@author xyx   <kwin.xu@semioe.com>
 *        date: 2016.12.14
 *@description 
 */
/* jshint ignore: start */
'use strict';
/* jshint ignore: end   */


const EventProxy = require('eventproxy');
const PageUnit = require('./page_unit');

module.exports = function (currentPage, pageSize, model, conditions, projection, options, callback) {
    if (typeof conditions === 'function') {
        callback = conditions;
        conditions = {};
        projection = null;
        options = null;
    } else if (typeof projection === 'function') {
        callback = projection;
        projection = null;
        options = null;
    } else if (typeof options === 'function') {
        callback = options;
        options = null;
    }

    return new Promise((resolve) => {
        this.pageUnit = null;
        let ep = new EventProxy();
        ep.on('queryPage', () => {
            resolve({
                source: model.find(conditions, projection, options, callback).skip(pageUnit.getSkip()).limit(pageUnit.getLimit()),
                paginate: pageUnit.getPaginate()
            });
        });
        model.count(conditions).then((count) => {
            pageUnit = new PageUnit(currentPage, pageSize, count);
            ep.emit('queryPage');
        }).catch(resolve);
    })
}