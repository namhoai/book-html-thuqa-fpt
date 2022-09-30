window.DOMAIN_USER_API = "http://103.160.84.126:8000"
window.DOMAIN_BOOK_API = "http://103.160.84.126:8001"
window.DOMAIN_MANAGE_API = "http://103.160.84.126:8002"
// window.root_domain = "/book/public"
window.root_domain = ""

function reloadPage() {
    window.location.reload()
}

function onViewDetail(bookId) {
    window.location = `${window.root_domain}/BookDetails.html?bookId=${bookId}`
}

function onReserveNow(event) {
    event.preventDefault();
    const id = event.target.id_book.value;
    const from = event.target.from.value;
    const to = event.target.to.value;
    
    $.ajax({
        type: "POST",
        url: `${window.DOMAIN_MANAGE_API}/user/reserve-book/${id}`,
        data: {
            reservedDate: from,
            returnDate: to,
            userId: Number(window.userId),
        },
        dataType: "xml/html/script/json", // expected format for response
        contentType: "application/x-www-form-urlencoded", // send as JSON
        // data: JSON.stringify({
        //     reservedDate: from,
        //     returnDate: to,
        //     userId: Number(window.userId),
        // }),
        // dataType: 'json',
        // contentType: 'application/json',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        // dataType: 'json',
        // contentType: 'application/json',
        success: function() {}
      });
}

function onReserveBook(bookId) {
    const book = window.listBookUser.find((item) => item.id === bookId)
    if (window.isLogin) {
        $("#idBookReserve").val(book.id)
        $("#ReserveBookTitle").val(book.name)
        $("#ReserveISBN").val(book.isbn)
        $("#ReserveStudentID").val(window.username)
    } else {
        alert("You need Login !")
        window.location = `${window.root_domain}/Login.html`
    }
}

function onNextPageLink(event) {
    event.preventDefault();
    var url = new URL(window.location.href);
    var search_params = url.searchParams;
    const page_link = search_params.get("page-link") || 1;
    search_params.set('page', (Number(page_link) - 1) *3 + 1);
    search_params.set('page-link', Number(page_link) + 1);
    url.search = search_params.toString();

    var new_url = url.toString();
    window.location.href = new_url;
}

function onPrePageLink(event) {
    event.preventDefault();
    var url = new URL(window.location.href);
    var search_params = url.searchParams;
    const page_link = search_params.get("page-link") || 1;
    search_params.set('page', (Number(page_link) - 1) *3 + 1);
    search_params.set('page-link', Number(page_link) - 1);
    url.search = search_params.toString();

    var new_url = url.toString();
    window.location.href = new_url;
}

function onSearchBook(event) {
    event.preventDefault();
    const text = $("#text-input-search").val()
    const category = $("#input-category").val()
    var url = new URL(`${window.location.origin}${window.root_domain}/AllBooks.html`);
    var search_params = url.searchParams;
    search_params.set('categories', category);
    search_params.set('text', text);
    search_params.set('page', 1);
    search_params.set('page-link', 1);
    url.search = search_params.toString();

    var new_url = url.toString();
    window.location.href = new_url;
}

function fillterBook() {
    var categories = [];
    $.each($("input[name='exampleRadios']:checked"), function(){
        categories.push($(this).val());
    });

    var url = new URL(window.location.href);
    var search_params = url.searchParams;
    search_params.set('categories', categories.toString());
    search_params.set('page', 1);
    search_params.set('page-link', 1);
    search_params.set('text', "");
    url.search = search_params.toString();

    // the new url string
    var new_url = url.toString();
    window.location = new_url;
}

function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++){
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

function onChangePage(page) {
    var url = new URL(window.location.href);
    var search_params = url.searchParams;
    search_params.set('page', page);
    url.search = search_params.toString();

    // the new url string
    var new_url = url.toString();
    window.location = new_url;
}

window.getURLParameter = getURLParameter

function onClickLogout() {
    localStorage.setItem("token", "")
    localStorage.setItem("role", "")
    localStorage.setItem("username", "")
    localStorage.clear();
    window.location = `${window.root_domain}/Logout.html`
}

function onUpdateBook(event) {
    event.preventDefault();
    const id = event.target.id.value;
    const name = event.target.name.value;
    const isbn = event.target.isbn.value;
    const stock = event.target.stock.value;
    const author = event.target.author.value;
    const year = event.target.year.value;
    const edition = event.target.edition.value;
    const cover = event.target.cover.value;
    const abstract = event.target.abstract.value;
    const category = event.target.category.value;

    // TODO : Thieu API.
    $.ajax({
        type: "PUT",
        url: `${window.DOMAIN_MANAGE_API}/admin/update-book/${id}`,
        data: {
            name,
            isbn,
            stock: Number(stock),
            author,
            year,
            edition: Number(edition),
            cover,
            abstract,
            category,
            available: true,
            availableDate: new Date()
        },
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        // dataType: 'json',
        // contentType: 'application/json',
        success: function() {
            $('#editBook_Form').modal('hide')
            window.location.reload()
        }
      });
}

function onEditBook(bookId) {
    const book = window.listBook.find((item) => item.id === bookId)
    $("#editBookId").val(book.id)
    $("#editBookTitle").val(book.name)
    $("#editISBN").val(book.isbn)
    $("#editStock").val(book.stock)
    $("#editAuthor").val(book.author)
    $("#editYear").val(book.year)
    $("#editEdition").val(book.edition)
    $("#editCover").val(book.cover)
    $("#editAbstract").val(book.abstract)
    $("#list-categories-edit").val(book.category).change()
}

function onCreateBook(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const isbn = event.target.isbn.value;
    const stock = event.target.stock.value;
    const author = event.target.author.value;
    const year = event.target.year.value;
    const edition = event.target.edition.value;
    const cover = event.target.cover.value;
    const abstract = event.target.abstract.value;
    const category = event.target.category.value;

    $.ajax({
        type: "POST",
        url: `${window.DOMAIN_BOOK_API}/admin/add/book`,
        data: JSON.stringify({
            name,
            isbn,
            stock: Number(stock),
            author,
            year,
            edition: Number(edition),
            cover,
            abstract,
            category,
            available: true,
            availableDate: new Date()
        }),
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        dataType: 'json',
        contentType: 'application/json',
        success: function() {
            $('#addBook_Form').modal('hide')
            window.location.reload()
        }
      });
}

function onSubmitLoginStudent(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    $.ajax({
        type: "POST",
        url: `${window.DOMAIN_USER_API}/login`,
        data: JSON.stringify({
            email,
            password,
            accountRole: "user"
        }),
        dataType: 'json',
        contentType: 'application/json',
        success: function( result ) {
            if (result.token  && result.accountRole === 'user') {
                localStorage.setItem("role", result.accountRole)
                localStorage.setItem("token", result.token)
                localStorage.setItem("username", email)
                localStorage.setItem("userId", result.userId)

                window.location = `${window.root_domain}/index.html`
            } else {
                alert("Login error !")
            }
        }
      });
}

function onSubmitLoginLib(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    $.ajax({
        type: "POST",
        url: `${window.DOMAIN_USER_API}/login`,
        data: JSON.stringify({
            email,
            password,
            accountRole: "admin"
        }),
        dataType: 'json',
        contentType: 'application/json',
        success: function( result ) {
            if (result.token  && result.accountRole === 'admin') {
                localStorage.setItem("role", result.accountRole)
                localStorage.setItem("token", result.token)
                localStorage.setItem("username", email)
                localStorage.setItem("userId", result.userId)
                window.location = `${window.root_domain}/Librarian.html`;
            } else {
                alert("Login error !")
            }
        }
      });
}
