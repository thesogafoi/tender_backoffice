export default (({ redirect, store, $auth }) => {
    if (store.state.auth.loggedIn && (store.state.auth.user.type == 'STAFF')) {
        $auth.logout();
    }
});