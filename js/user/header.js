$(document).ready(function(){
    // action loading
    if (window.isLogin) {
        $(".btn-login").hide()
        $("#AccountDropDown").html(window?.username)
    } else {
        $(".btn-logout").hide()
    }
});

