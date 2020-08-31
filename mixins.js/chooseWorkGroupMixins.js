export default {
    methods: {
        clearSelectedWorkGroups() {
            this.$refs.workGroups.selected = [];
        },
        fillSelected() {
            this.clearSelectedWorkGroups();
            this.formData.work_groups.map((newData) => {
                this.$refs.workGroups.selected.push(newData.id);
            });
        },
        selectedWorkGroupChanged(data) {
            this.formData.work_groups = data;
        },
    }
}