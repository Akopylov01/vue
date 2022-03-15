let app = new Vue({
    el: '#app',
    data: {
        tasks:[
            {
                name:'auf',
                task:['fawfw','fwafwa','fwafafw12312'],
            },
            {
                name:'ацфацфа',
                task:['ацфацф','fwafafw12312'],
            }
        ],
        searchStr:'',
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
      }
    
        
});