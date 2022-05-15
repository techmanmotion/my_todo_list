window.addEventListener('load',function(){
    let stored_data_str = localStorage.data;
    if(stored_data_str.length > 0 ){

        const stored_data_array = stored_data_str.split(",");
        for(let dt of stored_data_array){
            add_to_table(dt);
        }
    }
})

const storedData_arr = [];

const new_list_ip = document.querySelector('#new-list-input');
const new_list_btn = document.querySelector('#add-list-btn');


new_list_ip.addEventListener('keyup',function(e){
    if(this.value!=''){
        new_list_btn.removeAttribute('disabled');
    }else{
        new_list_btn.setAttribute('disabled',true);
    }
})

new_list_btn.addEventListener('click',function(){
event.preventDefault();
    let new_list_value =  new_list_ip.value;
    if(new_list_value!==''){
        // add_to_list(new_list_value); // for list
        add_to_table(new_list_value);   // for table

    }
})




function add_to_table(new_list_value){

    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.className = 'counter';
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    // let new_del_btn = document.createElement("button");
    let new_del_btn = document.createElement("i");

    new_del_btn.className = "delete-td-btn btn fa fa-trash"; 
    // new_del_btn.innerHTML = "Del";
    // new_del_btn.innerHTML = '<i class="fa fa-trash"></i>';
    let num_of_task = mybody.children.length +1 ;

    td1.textContent= num_of_task;
    td2.textContent = new_list_value;
    td3.innerHTML = '<input type="checkbox" task-done="0" class="form-check-input task-check">';
    td4.appendChild(new_del_btn);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    document.getElementById('mybody').appendChild(tr);

    new_list_ip.value="";
    
    // localStorage.setItem("data",new_list_value);

    storedData_arr.push(new_list_value);
    // putin_LocalStorage(new_list_value);  // earlier used this to store single data

    putin_LocalStorage(storedData_arr);  // now using this to store array

}



//   ADDING EVENT TO DELETE BUTTON AND CHECKBOX

mybody.addEventListener('click',function(event){
    let elem = event.target;
    console.log(elem);
    if(elem.classList.contains('task-check')){
        
        if(elem.checked){
            elem.setAttribute('task-done',1);
            elem.parentNode.parentNode.style.textDecoration='line-through'; 

            elem.parentNode.parentNode.style.color='green'; 
            
        }else{
            this.setAttribute('task-done',0); 
            elem.parentNode.parentNode.style.textDecoration='none'; 

            elem.parentNode.parentNode.style.color='black';
        }

    }
    // else if(elem.tagName === 'BUTTON'){
        else if(elem.classList.contains('delete-td-btn')){

       

       // DELETE THE TASK

        let actual_data = elem.parentNode.parentNode.childNodes[1].innerHTML;     // firstly get the task name for the deleteing row
        
        let data_index = storedData_arr.indexOf(actual_data);  // getting the index value of this task in the storage array
        storedData_arr.splice(data_index , 1 );  // finally removing that data from the array

        elem.parentNode.parentNode.remove();   // remove the complete row
        serial_manager();   // for managing auto numbering of data rows


        putin_LocalStorage(storedData_arr);  // now updating local storage
    }



})



// THIS FUNCTION IS TO MAINTAIN THE SERIAL NUMBER WHEN A TASK IS REMOVED RANDOMLY
function serial_manager(){
    // let num_of_task = mybody.children.length ;
    let counters = document.querySelectorAll('.counter');
    for(let i=0 ; i < counters.length ; i++){
        counters[i].innerHTML = i+1;
    }
}



//  FUNCTION TO STORE TASKS TO   =>  LOCAL-STORAGE 
function putin_LocalStorage(data_array){
    // let data = mybody.innerHTML;
    localStorage.removeItem("data");
    console.log(data_array);
    localStorage.setItem("data",data_array.toString());
}


