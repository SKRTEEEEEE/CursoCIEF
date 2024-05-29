
const datatable = new simpleDatatables.DataTable("#contactos", {
    searchtable: true,
    sortable: true, 
    filterable: true,
    pageable: true,
    perPage: 5,
    perPageSelect: [5, 10, 15, 20],
    fixedHeight: true,
})