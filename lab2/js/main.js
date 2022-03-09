
let app = new Vue({
    el: '#field',
    data: {
        isWinner: false,
        isEnd: false,
        endMessage: '',
        message:'',
        win:'',
        xName: '',
        oName: '',
        visible: true,
        player:'',
        field: [0,0,0,0,0,0,0,0,0],
        
    },
    mounted() {
        if (localStorage.xName && localStorage.oName) {
            this.xName = localStorage.xName;
            this.oName = localStorage.oName;
        }
    },
    watch: {
        xName(newName) {
            localStorage.xName = newName;
        },
        oName(newName){
            localStorage.oName = newName;
        }
    },
    methods:{
        getThisPlayer: function(){
            if(this.player == this.xName){
                this.player = this.oName;
            }
            else{
                this.player = this.xName;
            }
        },
        cellClick: function(id){
            this.getThisPlayer();
            if(this.isWinner){
                this.message = 'Начните заново';
            }
            else if(this.field[id] == 0){
                if(this.player===this.xName)
                    Vue.set(this.field, id, 'X');
                else
                    Vue.set(this.field, id, 'O');
                
            }
            this.IsOver();
            this.win = this.winner();

        },
        IsOver : function(){
            let sum = 0;
            for(let i = 0; i < 9; i++){
                if(this.field[i] == 0)
                    ++sum;
            }
            if(sum <= 0){
                this.endMessage = 'Конец игры';

                this.isEnd = true;
            }
        },
        makeNewField: function(){
            this.isEnd = false;
            this.isWinner = false;
            this.win = "";
            for(let i = 0; i < 9; ++i){
                Vue.set(this.field,i,0);
            }
        },
        winner: function(){

            for(let i=0; i < 9; i+=3){
                if(this.field[i]!=0 && this.field[i] == this.field[i+1] && this.field[i] == this.field[i+2]){
                    this.isWinner = true;
                    this.message = 'Победил';
                    return this.player;
                }
            }
            for(let i = 0; i < 9; i++){
                if(this.field[i]!=0 && this.field[i] == this.field[i+3] && this.field[i+3] == this.field[i+6]){
                    this.isWinner = true;
                    this.message = 'Победил';
                    return this.player;
                }
            }
            if(this.field[0]!=0 && this.field[0]==this.field[4] && this.field[4] == this.field[8]){
                this.isWinner = true;
                this.message = 'Победил';
                return this.player;
            }
            if(this.field[2]!=0 && this.field[2] == this.field[4] && this.field[4] == this.field[6]){
                this.isWinner = true;
                this.message = 'Победил';
                return this.player;
            }

        }
    }
})


