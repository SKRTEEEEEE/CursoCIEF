$(document).ready(function () {
    var reservedDates = [
        { start: '2024-06-10', end: '2024-06-12' },
        { start: '2024-06-15', end: '2024-06-18' }
        // Agrega más objetos según sea necesario
    ]; // Supongamos que estas son las fechas reservadas que vienen de la base de datos
    var today = new Date();
    $('#startDate').datepicker({
        language: 'es',
        format: 'dd/mm/yyyy',
        startDate: today,
        todayHighlight: true,
        autoclose: true
    }).on('changeDate', function (selected) {
        var startDate = new Date(selected.date.valueOf());
        $('#endDate').datepicker('setStartDate', startDate);
    });

    $('#endDate').datepicker({
        language: 'es',
        format: 'dd/mm/yyyy',
        startDate: today,
        todayHighlight: true,
        autoclose: true,
        

    }).on('changeDate', function (selected) {
        var endDate = new Date(selected.date.valueOf());
        $('#startDate').datepicker('setEndDate', endDate);
    });
});




