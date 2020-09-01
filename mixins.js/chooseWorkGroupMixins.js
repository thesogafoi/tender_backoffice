export default {
    methods: {
        clearSelectedWorkGroups(ref) {
            this.$refs[ref].selected = [];
        },
        fillSelected(nameOfForm, ref) {
            this.clearSelectedWorkGroups(ref);
            this[nameOfForm].work_groups.map((newData) => {
                this.$refs[ref].selected.push(newData.id);
            });
        },
        selectedWorkGroupChanged(data) {
            this.formData.work_groups = data;
        },
    }
}