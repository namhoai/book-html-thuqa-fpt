$(document).ready(function(){
    window.isLogin = !!localStorage.getItem("token")
    window.role = localStorage.getItem("role")
    window.isLoginAdmin = !!localStorage.getItem("token") && localStorage.getItem("role") === 'admin'
    window.username = localStorage.getItem("username")
    window.userId = localStorage.getItem("userId")
});
