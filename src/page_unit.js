/**
 * @author xyx   <kwin.xu@163.com>
 *        date: 2016.12.14
 * @description 分页相关记录类
 */
/* jshint ignore: start */
'use strict';
/* jshint ignore: end   */


/**
 * @description 分页相关记录类
 * @param {Number} currentPage 当前页
 * @param {Number} pageSize 每页大小
 * @param {Number} total 总记录数
 */
function PageUnit(currentPage, pageSize, total) {
    this.currentPage = currentPage < 1 ? 1 : currentPage;
    this.pageSize = pageSize < 1 ? 1 : pageSize;
    this.total = total;

    this.pageCount = this.total % this.pageSize === 0 ? this.total / this.pageSize : parseInt(this.total / this.pageSize) + 1;
}

/**
 * @description 获取分页开始
 * @returns {Number} 分页开始
 */
PageUnit.prototype.getSkip = function () {
    return (this.currentPage - 1) * this.pageSize;
}

/**
 * @description 从当前页开始到需要查询数
 * @returns {Number} 需要查询数
 */
PageUnit.prototype.getLimit = function () {
    return this.pageSize;
}

/**
 * @description 分页记录
 * @returns {object} 当前页、每页大小、总记录数、总页数
 */
PageUnit.prototype.getPaginate = function () {
    return {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        total: this.total,
        pageCount: this.pageCount
    }
}

module.exports = PageUnit;
