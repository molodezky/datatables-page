$(document).ready(function () {
    let table = $('#products').DataTable({
        order: [],
        columnDefs: [ {
            'targets': [0, 1, 4, 5, 6, 7],
            'orderable': false,
        }],
        'lengthChange': false,
        pagingType: 'full_numbers',
        pageLength: 9,
        responsive: true,
        'info': false,
        select: true,
        'oLanguage': {
            'sSearch': ''
          }
    });

    $('#products').wrap( "<div class='wrapper'></div>" );

    $("#products tfoot th").each( function ( i ) {
		if ($(this).text() !== '') {
            var startText = $(this).text();
			var select = $('<select class="col-' + i +'"><option value="">' + startText + '</option></select>')
	            .appendTo( $('#products_filter') )
	            .on( 'change', function () {
	                var val = $(this).val();
					
	            table.column( i )
	                .search( val ? '^'+$(this).val()+'$' : val, true, false )
	                .draw();
	            } ).select2();

				table.column( i ).data().unique().sort().each( function ( d, j ) {  
					select.append( '<option value="'+d+'">'+d+'</option>' );
		        } );	
		}
    } );

    $('.actions').prependTo('#products_filter');
    $('.actions select').select2();

    $('#products tbody').on( 'click', '.icon-trash', function () {
        table
            .row( $(this).parents('tr') )
            .remove()
            .draw();
    } );
});


