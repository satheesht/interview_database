/*
| IDGenerator
| Generates ID and makes sure it is unique
*/
app.service('IDGenerator',function(){
    this.generateInterviewID = function(){
        var id = "#"+Math.random().toString(12).slice(2).substr(0,13);
        if(!this.is_id_redundant(id)){
            return id;
        }else this.generateInterviewID(); // Recursive function call
    }
    /*
    | Returns false if the given ID doesn't exist in the local storage. Means it is not redundant
    */
    this.is_id_redundant = function(id){
        var items = JSON.parse(localStorage.getItem("ta_records"));
        if(items===null) return false;
        for(var i in items){
            if(items[i].val_interview_id===id) return true;
        }
        return false;
    }
}); 


/*
| "Storage"
| Handles storage related functions
*/
app.service('storage',function(){
    this.store_ta_record = function(records){
            if(records==null || records =="") return false;
            var items = JSON.parse(localStorage.getItem("ta_records"));
            var ta_records = (items===null)?[]:items;
            ta_records.push(records);
            localStorage.setItem("ta_records",JSON.stringify(ta_records));
            return true;
    }
    this.retrieve_ta_records = function(){
        return JSON.parse(localStorage.getItem("ta_records"));
    }
});

/*
| "ta_validate"
| All validation logics has put in here
*/
app.service('ta_validate',function(){

    this.checkRequired = function(values){
        for (var i in values) {
            if (values[i] == "") {
                return false;
                break;
            }
        }
        return true;
    }
    this.checkPhone = function(number){
        if(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(number)){  
            return true;  
        } 
        return false;    
    }
    this.checkEmail = function(email){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){  
            return true;  
        }
        return false;
    }
    this.checkInterviewID = function(id){
        if(/^([a-zA-Z0-9 _-]+)$/.test(id)){
            return true;
        }
        return false;
    }
});