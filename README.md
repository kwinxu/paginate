# 分页插件

### 用于mongoose查询数据分页

#### 示例
```
const Paginate = require('paginate').Paginate;

Paginate(1,1,models.Student).then((_paginate) => {
    _paginate.getPaginate();    //{ currentPage: 1, pageSize: 1, total: 3, pageCount: 3 }
                                //    当前页         每页大小      总记录数   总页数
    /**
     * 获取学生列表及其班级
     */
    _paginate.findSource().[populate('clazz').]then((studentList) => {
        
    })
})
```