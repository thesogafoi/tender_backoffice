export default {
    created() {
        this.workGroups = this.$store.getters.workGroups;
    },
    data() {
        return {
            workGroups: [],
            statusList: [
                {
                    id: "0",
                    value: "در حال بررسی",
                },
                {
                    id: "1",
                    value: "انتشار یافته",
                },
            ],
            staffStatusList: [
                {
                    value: "ستاد",
                    id: "1",
                },
                {
                    value: "غیر ستاد",
                    id: "0",
                },
            ],
            listType: [
                {
                    id: "AUCTION",
                    value: "مزایده",
                },
                {
                    id: "TENDER",
                    value: "مناقصه",
                },
                {
                    id: "INQUIRY",
                    value: "استعلام",
                },
            ],
            filters: {
                title: "",
                priorty: "",
                status: "",
                type: "",
            }
        }
    },
    methods: {
        resetWorkGroupSearchForm() {
            this.filters = {
                title: "",
                priorty: "",
                status: "",
                type: "",
                isParent: "",
            }
        },
        workGroupSearch() {
            this.workGroups = this.$store.getters.workGroups;
            Object.keys(this.filters).map(filter => {
                if (this.filterExists(filter)) {
                    this[filter]();
                }
            });
        },
        filterExists(filter) {
            let condition = false;
            Object.keys(this).map(element => {
                if (typeof this[element] == "function" && element == filter
                    && Object.keys(this.filters).includes(filter)) {
                    condition = true;
                }
            });
            return condition;
        },
        title() {
            if (this.filters.title == "") {
                return;
            }
            this.workGroups = Object.values(this.workGroups).filter(workGroup => {
                return workGroup.title.includes(this.filters.title);
            });
        },
        priorty() {
            if (this.filters.priorty == "") {
                return;
            }

            this.workGroups = Object.values(this.workGroups).filter(workGroup => {
                return workGroup.priorty == this.filters.priorty
            });
        },
        status() {
            if (this.filters.status == "") {
                return;
            }
            this.workGroups = Object.values(this.workGroups).filter(workGroup => {
                return workGroup.status == this.filters.status
            });
        },
        type() {
            if (this.filters.type == "") {
                return;
            }
            this.workGroups = Object.values(this.workGroups).filter(workGroup => {
                return workGroup.type == this.filters.type
            });
            if (this.$refs.workGroups != undefined) {
                this.$refs.workGroups.workGroups = this.workGroups;
            }
        },
    }
}