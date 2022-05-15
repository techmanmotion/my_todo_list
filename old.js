const new_list_ip = document.querySelector('#new-list-input');
const new_list_btn = document.querySelector('#add-list-btn');
const list_container = document.querySelector('.list-container');


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
        add_to_list(new_list_value); // for list

    }
})


function add_to_list(new_list_value){

    
    let li = document.createElement("li");
    li.innerHTML = new_list_value+" ";

    let task_complete_btn = document.createElement("button");
    task_complete_btn.className = "complete-list-btn"; 
    task_complete_btn.innerHTML = "Completed";

    let task_delete_btn = document.createElement("button");
    task_delete_btn.className = "delete-list-btn"; 
    task_delete_btn.innerHTML = "Delete";

    li.appendChild(task_complete_btn);
    li.appendChild(task_delete_btn);
    list_container.appendChild(li);

    new_list_ip.value="";
    

}



list_container.addEventListener('click',function(event){
    const el = event.target;
    if(el.tagName === 'BUTTON'){
        // console.log(targetel);
        if(el.classList.contains('delete-list-btn') ){
            // console.log('delete btn clicked');
            el.parentNode.remove();
        }else{
            // console.log('complete btn clicked');
            el.parentNode.style.color ='green';
            el.parentNode.style.textDecoration = 'Line-through';
        }
    }

})



