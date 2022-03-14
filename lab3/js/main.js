let app = new Vue({
    el: '#app',
    data: {
        name:'',
        isStart: false,
        scores: 0,
        result: [],
        fishes: [],
        class: ['fish1','fish2','fish3'],
        time: 60,
        interval:'',
    },
    methods: {
        startGame: function(){
            this.isStart = true;
            this.resetTimer();
            this.timer();
            

        },
        timer: function(){
            this.interval = setInterval(() => {
                this.time -- ;

                if (this.time <= 0){
                    this.endGame(this.interval);
                } 
                else{
                    this.fishCreate();
                }

            }, 1000);

        },
        endGame: function(){
            this.isStart = false;
            this.resetTimer();
            this.result.push({
                name: this.name,
                score: this.score
            });
            this.name='';

        },
        resetTimer: function(){
            return clearInterval(this.interval);
        },
        fishCreate: function(){
                let type = Math.floor(Math.random() * 3);
                let fish = {
                    type:type, 
                    top: Math.floor(Math.random() * 640),
                    left: Math.floor(Math.random() * (1000 - 150)),
                    turn:false 
                }
                if(fish.type == 1){
                    fish.img = 'media/fish1.png';
                    fish.class ='fish1';
                    fish.width = 50;
	                fish.height = 100;

                }
                else if(fish.type == 2){
                    fish.img = 'media/fish2.png';
                    fish.class ='fish2';
                    fish.width = 60;
	                fish.height = 120;

                }
                else{
                    fish.img = 'media/fish3.png';
                    fish.class ='fish3';
                    fish.width = 75;
	                fish.height = 150;

                }
                this.fishes.push(fish);
                this.makeTurn(fish);
            }
        },
        makeTurn: function(obj){
            setInterval(() => {
                if(obj.left == 0){
                    obj.turn = false;
                }
                else{
                    obj.turn = true;
                }
                if(obj.turn){
                    obj.left--;
                }
                else{
                    obj.left++;
                }
            }, 100)
        },
        takeFish: function(index){
            if(this.fishes[index].type==1){
                this.scores += 35;
            }
            else if(this.fishes[index].type==2){
                this.scores += 55;

            }
            else if(this.fishes[index].type==3){
                this.scores += 70;

            }
            this.fishes.splice(index, 1)
        },
});