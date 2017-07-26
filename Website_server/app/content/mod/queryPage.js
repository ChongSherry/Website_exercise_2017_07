const db = require("mongoose");

const queryPage = (pageNum, pageSize, model, $where, order, callback) => {
    let result = {pageNum,pageSize};
    model.count($where,(error,count)=>{
        if(!error){
            result.count=count;
            model.find($where).sort(order).skip(Number((pageNum-1)*pageSize)).limit(Number(pageSize)).exec((err,list)=>{
                if(!err){
                    result.list=list;                    
                    callback(err, result);
                }else{
                   callback(err);
                }
            });
        }else{
            callback(error);
        }
    });    
}

module.exports = queryPage;