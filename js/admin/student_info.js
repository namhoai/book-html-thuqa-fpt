$(document).ready(function(){
    const userId = window.getURLParameter("userId") || 1

    debugger
    // Get user
    $.ajax({
        type: "GET",
        url: `${window.DOMAIN_USER_API}/get/users-by-id/${userId}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        dataType: 'json',
        contentType: 'application/json',
        success: function( result ) {
            debugger;
                $("#user-info").html(`
                    <tr>
                        <th scope="row">1</th>
                        <td>${result.id}</td>
                        <td>${result.email}</td>
                        <td>${result.status}</td>
                        <td>${result.CreatedAt}</td>
                    </tr>
                `)
        }
      });

      // Get List Book Reserver by User
    $.ajax({
        type: "GET",
        url: `${window.DOMAIN_MANAGE_API}/admin/get-book-reserve-by-student/${userId}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        dataType: 'json',
        contentType: 'application/json',
        success: function( result ) {
            debugger;
        }
      });
});
