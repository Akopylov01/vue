

let app = new Vue({
    el: '#app',
    data: {
        tasks:[],
        searchStr:'',
        showModal:false,
        showTask: false,
        taskListName: '',
        taskName:'',
        changeListName:'',
        editTaskListModal: false,
        tempId:'',
        classColor:'elemHead',
        color:'white',
        fontColor:'',
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
    methods: {
        editColor: function(id){
            if(this.tasks[id].color = 'white'){
                this.tasks[id].color = 'black';
                this.tasks[id].fontColor = 'white';

            }
            else{
                this.tasks[id].color = 'white';
                this.tasks[id].fontColor = 'black';

            }
        },
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
            this.tasks.push({ name:this.taskListName, task:[], date: date, color:'white'});
            this.showTask = this.tasks.length;
            this.showModal = false;
            this.taskListName = '';
        },
        addTask: function(id){
            this.tasks[id].task.push(this.taskName);
            console.log(this.tasks);
            this.taskName = '';

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
        }
        
    },

        
});