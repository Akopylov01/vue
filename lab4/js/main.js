

let app = new Vue({
    el: '#app',
    data: {
        tasks:[],
        searchStr:'',
        showModal:false,
        showTask: true,
        taskListName: '',
        taskName:'',
        changeName: '',
        changeListName:'',
        editTaskListModal: false,
        editTaskNameModal: false,
        tempId:'',
        tempNameId:'',
    },
    // computed: {
    //     searchTask() {
    //       if (this.searchStr) {
    //         return this.tasks.filter(item => {
    //             return item.name.includes(this.searchStr);
    //         });
    //       }
    //       return this.tasks;
    //     }
    // },
    mounted() {
        if (localStorage.getItem('tasks')) {
          try {
            this.tasks = JSON.parse(localStorage.getItem('tasks'));
          } catch(e) {
            localStorage.removeItem('tasks');
          }
        }
      },
    methods: {
        
        classNameHead: function(id) {
            if(this.tasks[id].swapColor == true) {
                this.colorClass='elemHeadBlack';
            } 
            else 
            {
                this.colorClass='elemHead';
            }
        },
        addTaskList: function(){
            let date = new Date().toLocaleString();
            console.log(this.tasks);
            if (this.taskListName.trim() == '') 
            { 
                return false;
            }
            this.tasks.push({ name:this.taskListName, task:[], date: date, taskName:'',});
            this.showTask = this.tasks.length;
            this.showModal = false;
            this.taskListName = '';
            this.saveTask();

        },
        addTask: function(id, taskName){
            this.tasks[id].task.push({taskName:taskName, className: 'notLine'});
            console.log(this.tasks);
            this.tasks[id].taskName = '';
            this.saveTask();
        },
        editTaskNameFunc: function(id, nameId){
            this.tempId = id;
            this.tempNameId = nameId;
            this.changeName = this.tasks[id].task[nameId].taskName;
            this.editTaskNameModal = true;
        },
        editTaskName: function(){
            if (this.changeName.trim() == '') 
            { 
                return false; 
            }
            this.tasks[this.tempId].task[this.tempNameId].taskName = this.changeName;
            this.editTaskNameModal = false;
        },
        editTaskListModalFunc: function(id){
            this.tempId = id;
            this.changeListName = this.tasks[id].name;
            this.editTaskListModal = true;
        },
        editTaskList: function(id){
            if (this.changeListName.trim() == '') 
            { 
                return false; 
            }
            this.tasks[this.tempId].name = this.changeListName;
            this.editTaskListModal = false;
        },
        deleteTaskList: function(id){
            this.tasks.splice(id, 1);
        },
        saveTask() {
            const parsed = JSON.stringify(this.tasks);
            localStorage.setItem('tasks', parsed);
        },
        isDone: function(){
            this.lineStyle = 'line';
        }
        
    },
    // computed: {
    //     isDone: function(){
    //         if(this.line){
    //             return 'line'
    //         }
    //         return 'notLine'
    //     },
    // }

        
});