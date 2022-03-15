let app = new Vue({
    el: '#app',
    data: {
        name:'',
        isStart: false,
        scores: 0,
        result: [],
        fishes: [],
        time: 15,
        interval:'',
        fishCount: 5,
    },
    methods: {
        startGame: function(){
            this.isStart = true;
            this.resetTimer();
            this.timer();
            this.fishCount = 5;
        },
        checkRecordTable: function(){
            this.result.sort(function (a, b){
                if(a.scores > b.scores){
                    return -1;
                }
                if(a.scores < b.scores){
                    return 1;
                }
                return 0;
            });
            if(this.result.length == 11){
                this.result.pop();
            }
        },
        timer: function(){
            this.interval = setInterval(() => {
                this.time -- ;

                if (this.time <= 0){
                    this.endGame();
                } 
                else{
                    for(let i = 0; i < this.fishCount; i++){
                        this.fishCreate();
                        this.fishCount -- ;
                    }
                    
                }

            }, 1000);

        },
        endGame: function(){
            this.time = 15;
            this.isStart = false;
            this.resetTimer();
            this.result.push(
                {
                name: this.name,
                scores: this.scores
            });
            this.checkRecordTable();
            
            this.name='';
            this.scores = 0;
            this.fishes = [];

        },
        resetTimer: function(){
            return clearInterval(this.interval);
        },
        takeFish: function(index){
            if(this.fishes[index].type==1){
                this.scores += 70;
            }
            else if(this.fishes[index].type==2){
                this.scores += 50;

            }
            else{
                this.scores += 30;

            }
            this.fishCount++;
            this.fishes.splice(index, 1);
        },
        makeTurn: function(fish){
            setInterval(() => {
                if(fish.left == 0){
                    fish.turn = true;
                }
                else if(fish.left >= 1000 - fish.width){
                    fish.turn = false;
                }
                if(fish.turn){
                    fish.left++;
                }
                if(!fish.turn){
                    fish.left--;
                }
            }, 1)
        },
        fishCreate: function(){
                let type = Math.floor(Math.random() * 3);

                let fish = {
                    type: type, 
                    top: Math.floor(Math.random() * (640 - 150)),
                    left: Math.floor(Math.random() * (1000 - 250)),
                    turn: false 
                }
                if(fish.type == 1){
                    fish.img = 'media/fish1.png';
                    fish.class ='fish1';
                    fish.width = 100;
	                fish.height = 50;

                }
                else if(fish.type == 2){
                    fish.img = 'media/fish2.png';
                    fish.class ='fish2';
                    fish.width = 120;
	                fish.height = 60;

                }
                else{
                    fish.img = 'media/fish3.png';
                    fish.class ='fish3';
                    fish.width = 150;
	                fish.height = 100;

                }
                this.fishes.push(fish);
                this.makeTurn(fish);
            }
        },
    
        
});