

let list = new Vue({
    el: '#list',
    data: {
        visible: true,
        name: '',
        newPurchase: '',
        purchases:[
            {
                text:'Здесь находятся ваши покупки', status: true, className: 'notLine',
            }
        ],

    },
    mounted() {
        if (localStorage.name) {
            this.name = localStorage.name;
        }
    },
    watch: {
        name(newName) {
            localStorage.name = newName;
        }
    }


});
