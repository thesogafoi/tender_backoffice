export default {
    created() {
        this.formData.provinces = [];
    },
    computed: {
        likesAllFruit() {
            return this.formData.provinces.length === this.$store.state.cityList.length
        },
        likesSomeFruit() {
            return this.formData.provinces.length > 0 && !this.likesAllFruit
        },
        icon() {
            if (this.likesAllFruit) return 'mdi-close-box'
            if (this.likesSomeFruit) return 'mdi-minus-box'
            return 'mdi-checkbox-blank-outline'
        },
    },
    methods: {
        toggle() {
            this.$nextTick(() => {

                if (this.likesAllFruit) {
                    this.formData.provinces = []
                } else {
                    this.formData.provinces = []
                    this.$store.state.cityList.forEach(element => {
                        this.formData.provinces.push(element.id);
                    });

                }
                console.log(this.formData.provinces);
            })
        },
    },
}