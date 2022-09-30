$(document).ready(function(){
    // Check login, role.
    if (window.isLoginAdmin) {
        window.location = `${window.root_domain}/Librarian.html`
    } else if (window.isLogin){
        window.location = `${window.root_domain}/index.html`
    }
});
