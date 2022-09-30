$(document).ready(function(){
    // Loading config
    let contentCategories = "";
    window.categories.forEach(category => {
        contentCategories += `
            <option value="${category.value}">${category.name}</option>
        `;
    }); 

    // load category
    $("#list-categories").html(contentCategories)
    $("#list-categories-edit").html(contentCategories)

    // Get List Book
    $.ajax({
        type: "GET",
        url: `${window.DOMAIN_BOOK_API}/get/books`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        dataType: 'json',
        contentType: 'application/json',
        success: function( result ) {
            window.listBook = result;
            let book_list = "";
            result.forEach(book => {
                book_list += `
                <tr>
                    <td>${book.name}</td>
                    <td>${book.isbn}</td>
                    <td>${book.stock}</td>
                    <td>${book.author}</td>
                    <td>${book.year}</td>
                    <td>${book.edition}</td>
                    <td>${book.cover}</td>
                    <td> 
                    <button type="button" class="btn btn-primary btn-sm" data-container="body" data-toggle="popover" data-placement="top" title="${book.abstract}" data-content="${book.abstract}">
                        more...
                    </button>
                    </td>
                    <td>${book.category}</td>
                    <td><button onclick="onEditBook(${book.id})" class="Edit bg-primary" type="submit"><a href="#!" data-id="" data-bs-toggle="modal"
                          data-bs-target="#editBook_Form" class="btn btn-sm"><i class="fa fa-edit"></i></a></button></td>
                    <td><button class="Delete bg-danger" type="submit"><a href="#!" data-id="" data-bs-toggle="modal"
                          data-bs-target="#deleteBook_Form" class="btn btn-sm"><i class="fa fa-trash"></i></a></button>
                    </td>
                  </tr>

                `
            });

            $("#book-list").html(book_list)
        }
      });
});
