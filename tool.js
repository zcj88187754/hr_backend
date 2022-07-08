exports.filterParameter = function(obj, arr){
    var newArr = []
    for(var i = 0; i < arr.length; i++){
                if(!obj[arr[i]]){
                    newArr[i] = '%'
                }else{
                    newArr[i] = '%' + obj[arr[i]] + '%'
                }
    }
    return newArr
}

exports.filterLimit = function(obj){
    return [ (obj.pageNum - 1)*obj.pageSize, obj.pageNum*obj.pageSize]
}

