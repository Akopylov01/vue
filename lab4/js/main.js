

let app = new Vue({
    el: '#app',
    data: {
        tasks:[
            {
                name:'',
                task:[],
            },

        ],
        searchStr:'',
        showModal:false,
        showTask: false,
        taskListName: '',
        taskName:'',
    },
    computed: {
        searchTask() {
          if (this.searchStr) {
            return this.tasks.filter(item => {
                return item.name.includes(this.searchStr);
            });
          }
          return this.tasks;
        }
    },
    methods: {
        addTaskList: function(){
            this.tasks = [];
            this.tasks.push({ name:this.taskListName, task:'' });
            this.showTask = this.tasks.length;
            this.taskListName = '';
            this.showModal = false;
            console.log(this.tasks);
        },
        addTask: function(){
            this.tasks.push({ task:this.taskName });
        }
    }
    
        
});