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
    $("#current-stats").removeClass();
    $('#current-stats').addClass('jumbotron', 'bg-' + currColor);
});
