let tasks=JSON.parse(localStorage.getItem("tasks")) || [];
let filteredTasks='all';
let sorttype='';

function savetasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function addtask(){
    let title=document.getElementById("taskInput").value.trim();
    const priority=document.getElementById("prioritySelect").value;
    const deadline=document.getElementById("deadlineInput").value;
    if(!title){
        return alert("Task title cannot be empty!");
    }
    tasks.push({id:Date.now(),title,priority,deadline,completed:false});
    savetasks();
    document.getElementById("taskInput").value = "";
    document.getElementById("deadlineInput").value = "";
    rendertasks();
}

function deletetask(id){
    tasks=tasks.filter(task=>task.id!==id);
    savetasks();
    rendertasks();
}

let debounceTimer;
function debounce(func, delay=300){
    clearTimeout(debounceTimer);
    debounceTimer=setTimeout(func, delay);
}

function setFilter(f){
    debounce(()=>{
        filteredTasks=f;
        rendertasks();
    })();
}

function setSort(s){
    sorttype=s;
    rendertasks();
}

function getPriorityValue(p){
    return p==="High"?3:p==="Medium"?2:1;
}

function rendertasks(){
    let filtered=[...tasks];
    if(filteredTasks=='completed') filtered=filtered.filter(t=>t.completed);
    if(filteredTasks=='pending') filtered=filtered.filter(t=>!t.completed);

    if(sorttype=='priority'){
        filtered.sort((a,b)=>getPriorityValue(b.priority)-getPriorityValue(a.priority));
    }
    if(sorttype=='deadline'){
        filtered.sort((a,b)=>new Date(a.deadline)-new Date(b.deadline));
    }
    const today=new Date().toISOString().split('T')[0];
    const taskList=document.getElementById("taskList");
    taskList.innerHTML='';

    filtered.forEach(task=>{
        const col=document.createElement("div");
        col.className="col-md-4 mb-3";
        const overdue=task.deadline && task.deadline<today;
        col.innerHTML=`
            <div class="card p-3 ${overdue?'border border-danger':''}">
            <h5 class="${task.completed? 'text-decoration-line-through text-muted':''}">
                ${task.title}</h5>

            <span class='badge ${
                task.priority==="High"?"bg-danger":
                task.priority==="Medium"?"bg-warning":
                "bg-success"
            }'>${task.priority}</span>

            <p>Deadline: ${task.deadline || 'N/A'}</p>

            <div class="mt-2">
                <button class="btn btn-sm btn-success" onclick="toggleTask(${task.id})">complete</button>
                <button class="btn btn-sm btn-danger" onclick="deletetask(${task.id})">delete</button>
            </div>
            </div>
        `;
        taskList.appendChild(col);
    });
    updateCounts();
}

function toggleTask(id){
    const task = tasks.find(t => t.id === id);
    if(task){
        task.completed = !task.completed;
        savetasks();
        rendertasks();
    }
}

function updateCounts(){
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById("totalCount").innerText = total;
    document.getElementById("completedCount").innerText = completed;
    document.getElementById("pendingCount").innerText = pending;
}

rendertasks();