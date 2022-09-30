$(document).ready(function(){
    // Get List user
    $.ajax({
        type: "GET",
        url: `${window.DOMAIN_MANAGE_API}/admin/borrowed-history`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        dataType: 'json',
        contentType: 'application/json',
        success: function( result ) {
            $('#recent_borrow').html(result.length)

            window.listBookRecentBorrow = result;
            let book_list = "";
            let count = 0;
            result.forEach(book => {
                count++;
                book_list += `
                <tr>
                    <th scope="row">${count}</th>
                    <td>${book.bookId}</td>
                    <td>${book.userId}</td>
                    <td>${book.reservedDate}</td>
                    <td>${book.returnDate}</td>
                    <td>${book.status}</td>
                </tr>
                `
            });

            $("#book-list-borrow").html(book_list)

        }
      });

      $.ajax({
        type: "GET",
        url: `${window.DOMAIN_MANAGE_API}/admin/returned-history`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        dataType: 'json',
        contentType: 'application/json',
        success: function( result ) {
            $('#return_book').html(result.length)
        }
      });

      $.ajax({
        type: "GET",
        url: `${window.DOMAIN_MANAGE_API}/admin/overdue-history`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        dataType: 'json',
        contentType: 'application/json',
        success: function( result ) {
            $('#overdue').html(result.length)
        }
      });

      $.ajax({
        type: "GET",
        url: `${window.DOMAIN_BOOK_API}/get/books`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        dataType: 'json',
        contentType: 'application/json',
        success: function( result ) {
            debugger;
            $('#book_total').html(result.length)
        }
      });
});
