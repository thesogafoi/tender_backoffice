export default (({ redirect, store, $auth }) => {
    if (!store.state.auth.loggedIn || (store.state.auth.user.type != 'SUPERADMIN' &&
        store.state.auth.user.type != 'ADMIN' && store.state.auth.user.type != 'STAFF')) {
        $auth.logout();
    }
});