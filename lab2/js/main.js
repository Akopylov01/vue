
let app = new Vue({
    el: '#field',
    data: {
        isWinner: false,
        message:'',
        win:'',
        player1:'',
        player2:'',
        xOro: [],
        xName: '',
        oName: '',
        visible: true,
        currentPlayer:'',
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
        oName(newName2){
            localStorage.oName = newName2;
        }
    },
    methods:{
        checkNoEmptyNames: function(){
            if(this.player1.trim().length() == 0 || this.player2.trim().length() == 0 ){
                this.isWinner = true;
                this.message = 'Введите имена игроков';
                return false;
            }
            return true;
        },
        savePlayers: function(){
            if(checkNoEmptyNames()){
                this.xOro = [];
                this.xOro.push(this.player1, this.player2);
                this.player1 = '';
                this.player2 = '';
            }
            
        },
        getThisPlayer: function(){
            if(this.currentPlayer == this.xOro[0]){
                this.currentPlayer = this.xOro[1];
            }
            else{
                this.currentPlayer = this.xOro[0];
            }
        },
        cellClick: function(id){
            if(checkNoEmptyNames()){
                if(this.isWinner){
                    this.message = 'Начните заново';
                }
                else if(this.field[id] == 0){
                    if(this.currentPlayer===this.xOro[0])
                    {
                        Vue.set(this.field, id, 'X');
                    }
                    else{
                        Vue.set(this.field, id, 'O');
                    }
                    this.getThisPlayer();
                    
                }
                
                this.IsOver();
                this.win = this.winner();
            }
            

        },
        IsOver : function(){
            let sum = 0;
            for(let i = 0; i < 9; i++){
                if(this.field[i] == 0)
                    ++sum;
            }
            if(sum <= 0){
                this.message = 'Конец игры';

                this.isWinner = true;
            }
        },
        makeNewField: function(){
            this.isWinner = false;
            this.win = "";
            for(let i = 0; i < 9; ++i){
                Vue.set(this.field,i,0);
            }
        },
        winner: function(){
            if(this.isWinner){
                this.message = 'Начните заново';

            }
            else{
                for(let i=0; i < 9; i+=3){
                    if(this.field[i]!=0 && this.field[i] == this.field[i+1] && this.field[i] == this.field[i+2]){
                        this.isWinner = true;
                        this.message = 'Победил';
                        return this.currentPlayer;
                    }
                }
                for(let i = 0; i < 9; i++){
                    if(this.field[i]!=0 && this.field[i] == this.field[i+3] && this.field[i+3] == this.field[i+6]){
                        this.isWinner = true;
                        this.message = 'Победил';
                        return this.currentPlayer;
                    }
                }
                if(this.field[0]!=0 && this.field[0]==this.field[4] && this.field[4] == this.field[8]){
                    this.isWinner = true;
                    this.message = 'Победил';
                    return this.currentPlayer;
                }
                if(this.field[2]!=0 && this.field[2] == this.field[4] && this.field[4] == this.field[6]){
                    this.isWinner = true;
                    this.message = 'Победил';
                    return this.currentPlayer;
                }
            }

        }
    }
})


