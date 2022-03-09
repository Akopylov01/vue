let userName = new Vue({
    el: '#user_name',
    data: {
        visible: true,
        name: '',
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

let list = new Vue({
    el: '#list',
    data: {
        newPurchase: '',
        purchases:[
            {
                text:'Здесь находятся ваши покупки', status: true, className: 'notLine',
            }
        ],

    },


});
