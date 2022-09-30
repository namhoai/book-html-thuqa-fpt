$(document).ready(function(){

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
        window.listBookUser = result;
        let book_list = "";
        let path = result.length / 9 - Math.floor(result.length / 9);
        const totalPage = path > 0 ? Math.floor(result.length / 9) + 1 : Math.floor(result.length / 9)

        const page = window.getURLParameter("page") || 1
        const page_link = window.getURLParameter("page-link") || 1
        const categories = window.getURLParameter("categories") || "all"
        const textInput = window.getURLParameter("text") || ""

        let categoriesList = [];
        let resultFilter = result;

        debugger;


        if (categories !== 'all') {
            categoriesList = decodeURIComponent(categories).split(',')
            resultFilter = result.filter((item) => categoriesList.includes(item.category))
        }

        if (textInput) {
            $("#text-input-search").val(textInput)
            resultFilter = resultFilter.filter((item) => !item.name.toLowerCase().indexOf(textInput.toLowerCase()))
        }

        if (categoriesList.length === 1) {
            $("#select-categories-header").val(categoriesList[0]).change()
        }

        resultFilter.slice(9*(page - 1), page * 9).forEach(book => {
            book_list += `
            <div class="col">
            <div class="card h-100">
              <img onclick="onViewDetail(${book.id})" src="image/bookcover.png" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 onclick="onViewDetail(${book.id})" class="card-title mb-0 text-center">${book.name || 'Book'}</h5>
                <p class="card-text text-center p-4 pb-0">${book.author || 'Anonymous'}</p>
                <div class="button">
                  <div class="button-layer"></div>
                  <button onclick="onReserveBook(${book.id})" type="button" class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#reserve_Form">Reserve</button>
                </div>
              </div>
            </div>
          </div>
            `
        });
     
        $("#list-link-page").html(`
                 <li class="page-item">
                     <a onclick="onPrePageLink(event)" class="page-link" href="#" aria-label="Previous" style="color: black; display: ${Number(page_link) === 1 ? "none" : ""}">
                       <span aria-hidden="true">&laquo;</span>
                     </a>
                   </li>
                   <li onclick="onChangePage(${(Number(page_link) - 1)*3 + 1})" class="page-item"><a class="page-link" href="#" style="color: black;">${(Number(page_link) - 1)*3 + 1}</a></li>
                   <li  onclick="onChangePage(${(Number(page_link) - 1)*3 + 2})" class="page-item"><a class="page-link" href="#" style="color: black;">${(Number(page_link) - 1)*3 + 2}</a></li>
                   <li  onclick="onChangePage(${(Number(page_link) - 1)*3 + 3})" class="page-item"><a class="page-link" href="#" style="color: black;">${(Number(page_link) - 1)*3 + 3}</a></li>
                   <li class="page-item">
                     <a onclick="onNextPageLink(event)" class="page-link" href="#" aria-label="Next" style="color: black; display: ${ Number(page_link) * 3 >= totalPage ? "none" : ""}">
                       <span aria-hidden="true">&raquo;</span>
                     </a>
                 </li>
        `)

        if (categories !== 'all') {
            debugger;
             // Update categories
             if (!categoriesList.includes("Technology")) {
                $('#exampleRadios1').prop('checked', false)
             }
             if (!categoriesList.includes("Business/Economic")) {
                $('#exampleRadios2').prop('checked', false)
             }
             if (!categoriesList.includes("Religion")) {
                $('#exampleRadios3').prop('checked', false)
             }
             if (!categoriesList.includes("Psychology")) {
                $('#exampleRadios4').prop('checked', false)
             }
             if (!categoriesList.includes("Business&Management")) {
                $('#exampleRadios5').prop('checked', false)
             }
             if (!categoriesList.includes("Philosophy")) {
                $('#exampleRadios6').prop('checked', false)
             }
             if (!categoriesList.includes("Science")) {
                $('#exampleRadios7').prop('checked', false)
             }
             if (!categoriesList.includes("Guide")) {
                $('#exampleRadios8').prop('checked', false)
             }
        }
       

        $("#book-list").html(book_list)
    }
  });
});

