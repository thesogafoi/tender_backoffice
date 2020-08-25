export default function ({ $axios, store }) {

    $axios.onError(error => {
        if (error.response.status == 422) {
            store.dispatch('errorHandlin/setErrors', error.response.data.errors);
            return Promise.reject(error);
        }
    });
    $axios.onRequest(() => {
        store.dispatch('errorHandlin/clearErrors');
    });
}