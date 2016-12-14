/**
 *@author xyx   <kwin.xu@semioe.com>
 *        date: 2016.12.14
 *@description 
 */
/* jshint ignore: start */
'use strict';
/* jshint ignore: end   */


function PageUnit(currentPage, pageSize, total) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.total = total;

    this.pageCount = this.total / this.pageSize === 0 ? this.total / this.pageSize : this.total / this.pageSize + 1;
}

PageUnit.prototype.getSkip = () => {
    return (this.currentPage - 1) * this.pageSize;
}

PageUnit.prototype.getLimit = () => {
    return this.pageSize;
}

PageUnit.prototype.getPaginate = () => {
    return {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        total: this.total
    }
}

module.exports = PageUnit;