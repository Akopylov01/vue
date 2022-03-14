let app = new Vue({
    el: '#app',
    data: {
        name:'',
        isStart: false,
        scores: 0,
        fish:0,
        fishImg:'',
        time: 5,
        fishes: [],
    },
    methods: {
        startGame: function(){
            this.isStart=!this.isStart;
            if(this.isStart){
                this.timer();
            }
        },
        timer: function(){
            let interval = setInterval(() => {
                if (this.time==0){
                    this.isStart=false;
                    this.time = 5;
                }
                else{
                    --this.time;
                }
            }, 1000);

        },
        fishCreate: function(){
            setInterval(() => {
                this.fish = Math.floor(Math.random() * 3);
                if(this.fish == 1){
                    this.fishImg = '../media/рыба1.jpg';
                }
                else if(this.fish == 2){
                    this.fishImg = '../media/рыба2.jpg';
                }
                else{
                    this.fishImg = '../media/рыба3.jpg';
                }
            })
        },



    },
});