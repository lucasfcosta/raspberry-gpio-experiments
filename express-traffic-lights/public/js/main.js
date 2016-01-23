var socket = io();

$('.btn-green').click(function() {
    socket.emit('changeColor', 'green');
});

$('.btn-yellow').click(function() {
    socket.emit('changeColor', 'yellow');
});

$('.btn-red').click(function() {
    socket.emit('changeColor', 'red');
});

socket.on('colorChanged', function(currColor) {
    $('#current-status').removeClass();
    $('#current-status').addClass('jumbotron');
    $('#current-status').addClass('bg-' + currColor);
});
