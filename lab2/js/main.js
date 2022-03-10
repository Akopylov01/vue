
let app = new Vue({
    el: '#field',
    data: {
        scoreboardVisible: false,
        xMove: true,
        oMove: false,
        isWinner: false,
        message:'',
        win:'',
        player1:'',
        player2:'',
        xOro: [],
        visible: true,
        currentPlayer:'',
        field: [],
        fieldSize: '',
        fieldWitdh: '',
        countCell: '',
    },
    // mounted() {
    //     if (localStorage.xName && localStorage.oName) {
    //         this.xName = localStorage.xName;
    //         this.oName = localStorage.oName;
    //     }
    // },
    // watch: {
    //     xName(newName) {
    //         localStorage.xName = newName;
    //     },
    //     oName(newName2){
    //         localStorage.oName = newName2;
    //     }
    // },
    methods:{
        isNotEmptyNamesForm: function(){
            if(this.player1.trim().length == 0 || this.player2.trim().length == 0 ){
                this.isWinner = true;
                this.message = 'Некорректные имена';
                this.scoreboardVisible = false;
                return false;
            }
            return true;
        },
        isNotEmptyNames: function()
        {
            if(this.xOro[0]==this.xOro[1]){
                this.isWinner = true;
                this.message = 'Некорректные имена';
                this.scoreboardVisible = false;

                return false;
            }
            return true;
        },
        isNotExistsNames: function(){
            if(this.xOro[0]==this.xOro[1]){
                this.isWinner = true;
                this.message = 'Некорректные имена';
                this.scoreboardVisible = false;

                return false;
            }
            return true;
        },
        isNotExistsNamesForm: function(){
            if(this.player1 == this.player2){
                this.isWinner = true;
                this.message = 'Некорректные имена';
                this.scoreboardVisible = false;

                return false;
            }
            return true;
        },
        savePlayers: function(){
            if(this.isNotExistsNamesForm() && this.isNotEmptyNamesForm()){
                this.xOro = [];
                this.xOro.push(this.player1, this.player2);
                this.player1 = '';
                this.player2 = '';
                this.scoreboardVisible = true;

            }
            else{
                this.isWinner = true;
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
            if(this.isNotExistsNames() && this.isNotEmptyNames()){
                if(this.isWinner){
                        this.message = 'Начните заново';
                    }
                else if(this.field[id] == 0){
                    if(this.currentPlayer===this.xOro[0])
                    {
                        

                        Vue.set(this.field, id, 'X');
                        this.xMove = !this.xMove;
                        this.oMove = !this.oMove;



                    }
                    else{
                        this.xMove = !this.xMove;

                        Vue.set(this.field, id, 'O');

                        this.oMove = !this.oMove;




                    }
                    this.getThisPlayer();
                    
                }
                
                this.IsOver();
                this.win = this.winner();
            }
        },
        IsOver : function(){
            let sum = 0;
            for(let i = 0; i < this.countCell; i++){
                if(this.field[i] == 0)
                    ++sum;
            }
            if(sum <= 0){
                this.message = 'Конец игры';

                this.isWinner = true;
            }
        },
        makeNewField: function(){
            this.field = [];
            this.isWinner = false;
            this.win = "";
            this.countCell = this.fieldSize * this.fieldSize;
            this.fieldWitdh = this.fieldSize * 50 + this.fieldSize * 2;
            for(let i = 0; i < this.countCell; ++i){
                this.field[i] = 0;
            }
            for(let i = 0; i < this.countCell; ++i){
                Vue.set(this.field,i,0);
            }
            
        },
        winner: function(){
            if(this.fieldSize == 3){
                this.for3Wineer();
            }
            else if (this.fieldSize == 4){
                this.for4Winner();
            }
            },
        for3Wineer: function(){
            for(let i=0; i < countCell; i+=3){
                if(this.field[i]!=0 && this.field[i] == this.field[i+1] && this.field[i] == this.field[i+2]){
                    this.isWinner = true;
                    this.message = 'Победил';
                    return this.currentPlayer;
                }
            }
            for(let i = 0; i < countCell; i++){
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
        },
        for4Winner: function(){
            for(let i=0; i < 16; i+=4){
                if(this.field[i]!=0 && this.field[i] == this.field[i+1] && this.field[i] == this.field[i+2] && this.field[i] == this.field[i+3]){
                    this.isWinner = true;
                    this.message = 'Победил';
                    return this.currentPlayer;
                }
            }
            for(let i = 0; i < 16; i++){
                if(this.field[i]!=0 && this.field[i] == this.field[i+4] && this.field[i+4] == this.field[i+8] && this.field[i+8] == this.field[i+12]){
                    this.isWinner = true;
                    this.message = 'Победил';
                    return this.currentPlayer;
                }
            }
            if(this.field[0]!=0 && this.field[0]==this.field[5] && this.field[5] == this.field[10] && this.field[10] == this.field[15]){
                this.isWinner = true;
                this.message = 'Победил';
                return this.currentPlayer;
            }
            if(this.field[3]!=0 && this.field[3] == this.field[6] && this.field[6] == this.field[9] && this.field[9] == this.field[12]){
                this.isWinner = true;
                this.message = 'Победил';
                return this.currentPlayer;
            }
        },
        for5Winner: function(){
            for(let i=0; i < 25; i+=5){
                if(this.field[i]!=0 && this.field[i] == this.field[i+1] && this.field[i] == this.field[i+2] && this.field[i] == this.field[i+3] && this.field[i] == this.field[i+4]){
                    this.isWinner = true;
                    this.message = 'Победил';
                    return this.currentPlayer;
                }
            }
            for(let i = 0; i < 25; i++){
                if(this.field[i]!=0 && this.field[i] == this.field[i+5] && this.field[i+10] == this.field[i+5] && this.field[i+5] == this.field[i+10] && this.field[i+10] == this.field[i+15] && this.field[i+15] == this.field[i+20]){
                    this.isWinner = true;
                    this.message = 'Победил';
                    return this.currentPlayer;
                }
            }
            if(this.field[0]!=0 && this.field[0]==this.field[6] && this.field[6] == this.field[12] && this.field[12] == this.field[18] && this.field[18] == this.field[24]){
                this.isWinner = true;
                this.message = 'Победил';
                return this.currentPlayer;
            }
            if(this.field[4]!=0 && this.field[4] == this.field[8] && this.field[8] == this.field[12] && this.field[12] == this.field[16] && this.field[16] == this.field[20]){
                this.isWinner = true;
                this.message = 'Победил';
                return this.currentPlayer;
            }
        }
            
        }
    
})


