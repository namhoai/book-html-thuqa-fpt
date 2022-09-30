$(document).ready(function(){
    // Get List user
    $.ajax({
        type: "GET",
        url: `${window.DOMAIN_USER_API}/get/users`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        dataType: 'json',
        contentType: 'application/json',
        success: function( result ) {
            window.listUser = result;
            let user_list = "";
            let count = 0;
            result.forEach(user => {
                count ++;
                user_list += `
                    <tr>
                        <th scope="row">${count}</th>
                        <td>${user.id}</td>
                        <td><a href="StudentInfoDetail.html?userId=${user.id}">${user.email}</a></td>
                        <td>${user.status}</td>
                        <td>${user.reserved_books || 0}</td>
                        <td>${user.overdue_books || 0}</td>
                    </tr>
                `
            });

            $("#user-list").html(user_list)
        }
      });
});
