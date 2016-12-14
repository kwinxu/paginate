/**
 *@author xyx   <kwin.xu@semioe.com>
 *        date: 2016.12.14
 *@description 
 */
/* jshint ignore: start */
'use strict';
/* jshint ignore: end   */


const q = require('q');
const PageUnit = require('./page_unit');

module.exports = (currentPage, pageSize, model, conditions, projection, options, callback) => {
    let pageUnit = null;
    if (currentPage < 1) {
        currentPage = 1;
    }
    if (pageSize < 1) {
        pageSize = 1;
    }
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
        q.on('queryPage', () => {
            resolve({
                source: model.find(conditions, projection, options, callback).skip(pageUnit.getSkip()).limit(pageUnit.getLimit()),
                paginate: pageUnit.getPaginate()
            });
        });
        model.count(conditions).then((count) => {
            pageUnit = new PageUnit(currentPage, pageSize, count);
        }).catch(resolve);
    })
}