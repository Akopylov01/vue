
let app = new Vue({
    el: '#field',
    data: {
        showField: false,
        fieldSize: '',
        scoreboardVisible: false,
        xMove: true,
        oMove: false,
        isWinner: false,
        message: '',
        win: '',
        player1: '',
        player2: 'bot',
        xOro: [],
        visible: true,
        currentPlayer: '',
        field: [],
        fieldWitdh: '',
        countCell: '',
        errorMessage: '',
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
    methods: {
        isNotEmptyNamesForm: function () {
            if (this.player1.trim().length == 0 || this.player2.trim().length == 0) {
                this.isWinner = true;
                this.message = 'Некорректные имена';
                this.scoreboardVisible = false;
                return false;
            }
            return true;
        },
        isNotEmptyNames: function () {
            if (this.xOro[0] == this.xOro[1]) {
                this.isWinner = true;
                this.message = 'Некорректные имена';
                this.scoreboardVisible = false;

                return false;
            }
            return true;
        },
        isNotExistsNames: function () {
            if (this.xOro[0] == this.xOro[1]) {
                this.isWinner = true;
                this.message = 'Некорректные имена';
                this.scoreboardVisible = false;

                return false;
            }
            return true;
        },
        isNotExistsNamesForm: function () {
            if (this.player1 == this.player2) {
                this.isWinner = true;
                this.message = 'Некорректные имена';
                this.scoreboardVisible = false;

                return false;
            }
            return true;
        },
        savePlayers: function () {
            if (this.isNotExistsNamesForm() && this.isNotEmptyNamesForm()) {
                this.xOro = [];
                this.xOro.push(this.player1, this.player2);
                this.player1 = '';
                this.scoreboardVisible = true;
                
            }
            else {
                this.isWinner = true;
            }
        },
        getThisPlayer: function () {
            if (this.currentPlayer == this.xOro[0]) {
                this.currentPlayer = this.xOro[1];
            }
            else {
                this.currentPlayer = this.xOro[0];
            }
        },
        cellClick: function (id) {

            if (this.isNotExistsNames() && this.isNotEmptyNames()) {
                if (this.isWinner) {
                    this.message = 'Начните заново';
                }
                else if (this.field[id] == 0) {
                    if(this.xOro.includes('bot')){
                        if (this.currentPlayer === this.xOro[0]) {
                            Vue.set(this.field, id, 'X');
                            this.xMove = !this.xMove;
                            this.oMove = !this.oMove;
                            this.getThisPlayer();
                            let arr = [];
                                this.field.forEach((value, index) => {
                                    if (value == 0) {
                                        arr.push(index);
                                    }
                                });
                                let random = Math.floor(Math.random() * arr.length);
                                this.xMove = !this.xMove;
                                Vue.set(this.field, arr[random], 'O');
                                this.oMove = !this.oMove;
                            }
                        }
                    
                    else{
                        if (this.currentPlayer === this.xOro[0]) {
                            Vue.set(this.field, id, 'X');
                            this.xMove = !this.xMove;
                            this.oMove = !this.oMove;
                    
                        }
                        else {
                            this.xMove = !this.xMove;
                            Vue.set(this.field, id, 'O');
                            this.oMove = !this.oMove;
                        }
                    }
                    this.getThisPlayer();

                }
                this.IsOver();
                this.win = this.winner();
            }
        },
        IsOver: function () {
            let sum = 0;
            for (let i = 0; i < this.countCell; i++) {
                if (this.field[i] == 0)
                    ++sum;
            }
            if (sum <= 0) {
                this.message = 'Конец игры';

                this.isWinner = true;
            }
        },
        makeNewField: function () {
            this.isWinner = false;
            this.win = "";
            this.fieldSize = Number(this.fieldSize);
            if (this.fieldSize < 11 && this.fieldSize > 2) {
                this.errorMessage = '';
                this.field = [];
                this.countCell = this.fieldSize * this.fieldSize;
                this.fieldWitdh = this.fieldSize * 50 + this.fieldSize * 2;
                for (let i = 0; i < this.countCell; i++) {
                    Vue.set(this.field, i, 0);
                }

            }
    
            else {
                this.fieldSize = '';
                this.countCell = 0;
                this.errorMessage = 'Введите число от 3 до 10!';
            }


        },

        winner: function () {
            if (this.fieldSize <= 5) {
                if (this.horisontalWinner()) {
                    this.isWinner = true;
                    this.message = 'Победил';
                    return this.currentPlayer;
                }
                if (this.verticalWinner()) {
                    this.isWinner = true;
                    this.message = 'Победил';
                    return this.currentPlayer;
                }
                if (this.leftDiagonal()) {
                    this.isWinner = true;
                    this.message = 'Победил';
                    return this.currentPlayer;
                }
                if (this.rightDiagonal()) {
                    this.isWinner = true;
                    this.message = 'Победил';
                    return this.currentPlayer;
                }
            }
            else {
                if (this.verticalWinnerFor5()) {
                    this.isWinner = true;
                    this.message = 'Победил';
                    return this.currentPlayer;
                }
                if (this.horisontalWinnerFor5()) {
                    this.isWinner = true;
                    this.message = 'Победил';
                    return this.currentPlayer;
                }
                if (this.leftDiagonalFor5()) {
                    this.isWinner = true;
                    this.message = 'Победил';
                    return this.currentPlayer;
                }
                if (this.rightDiagonalFor5()) {
                    this.isWinner = true;
                    this.message = 'Победил';
                    return this.currentPlayer;
                }
            }
        },
        leftDiagonal: function () {
            let count = 0;
            for (let i = 0; i < this.countCell; i += this.fieldSize + 1) {
                if (this.field[i] != 0 && this.field[i] === this.field[i + this.fieldSize + 1]) {
                    count += 1;
                }
            }
            if (count == this.fieldSize - 1) {
                return true;
            }
            else {
                count = 0;
            }
            return false;
        },
        rightDiagonal: function () {
            let count = 0;
            for (let i = this.fieldSize - 1; i < this.countCell; i += this.fieldSize - 1) {
                if (this.field[i] != 0 && this.field[i] === this.field[i + this.fieldSize - 1]) {
                    count += 1;
                }
            }
            if (count == this.fieldSize - 1) {
                return true;
            }
            else {
                count = 0;
            }
            return false;
        },
        horisontalWinner: function () {
            let count = 0;
            for (let i = 0; i < this.countCell; i += this.fieldSize) {
                for (let j = i; j < i + this.fieldSize - 1; j++) {
                    if (this.field[j] != 0 && this.field[j] === this.field[j + 1]) {
                        count += 1;
                    }
                }
                if (count == this.fieldSize - 1) {
                    return true;
                }
                else {
                    count = 0;
                }

            }
            return false;

        },
        verticalWinner: function () {
            let count = 0;
            for (let i = 0; i < this.fieldSize; i++) {
                let j = 0;

                for (j = i + j; j < this.countCell; j += this.fieldSize) {
                    if (this.field[j] != 0 && this.field[j] == this.field[j + this.fieldSize]) {
                        count++;

                    }
                }
                if (count == this.fieldSize - 1) {
                    return true;
                }
                else {
                    count = 0;
                }


            }
            return false;

        },
        verticalWinnerFor5: function () {
            let count = 0;
            for (let i = 0; i < this.fieldSize; i++) {
                let j = 0;

                for (j = i + j; j < this.countCell; j += this.fieldSize) {
                    if (this.field[j] != 0 && this.field[j] == this.field[j + this.fieldSize]) {
                        count++;

                    }
                }
                if (count == 4) {
                    return true;
                }
                else {
                    count = 0;
                }


            }
            return false;

        },
        horisontalWinnerFor5: function () {
            let count = 0;
            for (let i = 0; i < this.countCell; i += this.fieldSize) {
                for (let j = i; j < i + this.fieldSize - 1; j++) {
                    if (this.field[j] != 0 && this.field[j] === this.field[j + 1]) {
                        count += 1;
                    }
                }
                if (count == 4) {
                    return true;
                }
                else {
                    count = 0;
                }

            }
            return false;

        },

        leftDiagonalFor5: function () {
            let count = 0;
            for (let g = 0; g < this.countCell; g += this.fieldSize) {
                for (let j = g; j < this.countCell; j++) {


                    for (let i = j; i < this.countCell; i += this.fieldSize + 1) {
                        if (this.field[i] != 0 && this.field[i] === this.field[i + this.fieldSize + 1]) {
                            count += 1;
                        }
                    }
                    if (count == 4) {
                        return true;
                    }
                    else {
                        count = 0;
                    }
                }

            }

            return false;
        },
        rightDiagonalFor5: function () {
            let count = 0;
            for (let j = 0; j < this.countCell; j += this.fieldSize) {
                for (let g = j; g < this.countCell; g++) {
                    for (let i = g; i < this.countCell; i += this.fieldSize - 1) {
                        if (this.field[i] != 0 && this.field[i] === this.field[i + this.fieldSize - 1]) {
                            count += 1;
                        }
                    }
                    if (count == 4) {
                        return true;
                    }
                    else {
                        count = 0;
                    }
                }



            }

            return false;
        },
    }

})


