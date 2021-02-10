'use strict';

var manager=require('./locationmanager')

//TODO: Change the type of result variable if it's necessary
var resultRequest=[];

var resultRisk=0;




exports.insertData = function (json){

    if(resultRequest.length>0){
        for(let val of resultRequest) {
            if(val.idRequest==json.idRequest){
                val.content.push(json.body)
                break;
            }
        }
    }
}

exports.insertDataRisk = function (risk){
    resultRisk=risk
}

exports.getRisk = function (){
    return resultRisk;
}



exports.getResult = function(id,method,params){
    var res =  returnResults(id);

    if (res.length==0)
        return []

    else{
        if(method=="getHeatmaps"){

            //Calculate risk of contagion


            res=manager.convertLocationFrequency(res)
            res=manager.aggregateLocations(res)


        }
        

    }
        //Process the aggregated information


    deleteRequest(id)

    return res;

}

exports.createRequest = function(id){
    var schema={"idRequest":0,"content":[]}
    schema.idRequest=id
    resultRequest.push(schema)
}

function deleteRequest(id){
    resultRequest = resultRequest.filter(function(item){
        return item.idRequest !== id;
    });
}

function returnResults(idRequest){
    if(resultRequest.length>0){
        for(let val of resultRequest) {
            if(val.idRequest==idRequest){
                return val.content
            }
        }

        return []

    }else
        return []
}