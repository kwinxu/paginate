/**
 *@author xyx   <kwin.xu@semioe.com>
 *        date: 2016.12.14
 *@description 
 */
/* jshint ignore: start */
'use strict';
/* jshint ignore: end   */


function PageUnit(currentPage, pageSize, total) {
    this.currentPage = currentPage < 1 ? 1 : currentPage;
    this.pageSize = pageSize < 1 ? 1 : pageSize;
    this.total = total;

    this.pageCount = this.total % this.pageSize === 0 ? this.total / this.pageSize : parseInt(this.total / this.pageSize) + 1;
}


PageUnit.prototype.getSkip = function () {
    return (this.currentPage - 1) * this.pageSize;
}

PageUnit.prototype.getLimit = function () {
    return this.pageSize;
}

PageUnit.prototype.getPaginate = function () {
    return {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        total: this.total,
        pageCount: this.pageCount
    }
}

module.exports = PageUnit;