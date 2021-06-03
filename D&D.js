var map;
var div_square = '<div id= "s$coord"  class = "square white"> </div>';
var div_player = '<div id= "f$coord"  class = "player">$player </div>';
var div_image = '<p><img src= image alt="Player"></p>';
var is_dragging = false;

$(function () {
  start();
  setInterval('show_player_php()', 3000);
})

function start () {
  map = new Array(112);

  add_squares();
  show_player_php();



}

function set_draggable(){
    $('.player').draggable({
      start: function(event, ui) {
        is_dragging = true;
      }
    });
}

function set_droppable() {
    $('.square').droppable({
      drop: function(event, ui) {
         var from_coord = ui.draggable.attr('id').substring(1);
         var to_coord = this.id.substring(1);
         move_player(from_coord, to_coord);
         move_player_php(from_coord, to_coord);
         is_dragging = false;
      }
    });

}

function move_player(from_coord, to_coord) {
       console.log('move from ' + from_coord + ' to ' + to_coord);

       player = map[from_coord];

       show_player(from_coord, '1');
       show_player(to_coord, player);

}

function add_squares() {
  $('.board').html('');
  for(var coord = 0; coord <112 ; coord++)
  $('.board').append(div_square .replace('$coord', coord));

  set_droppable();
}

function show_players (players) {
  for (var coord = 0; coord < 112; coord++)
      show_player(coord, players.charAt(coord));
}

function show_player(coord, player) {
  if (map[coord] == player) return;
  map[coord] = player;
  $('#s' + coord).html(div_player
    .replace('$coord', coord)
    .replace('$player', get_player_image(player)));
    set_draggable();
}

function get_player_image(player) {
  switch(player){
  case 'R': return (div_image
    .replace('image', "Sprites/standing.png" )
        );
  case 'A': return (div_image
    .replace('image', "Sprites/L1.png")
        );
  default: return '';
    }
  }

  function move_player_php (from_coord, to_coord) {
    $.get('D&D.php?movePlayers' +
            '&from_coord=' + from_coord +
            '&to_coord=' + to_coord,
          show_players);
          console.log('yes');
  }

  function show_player_php () {
    if (is_dragging) return;
    console.log('No');
    $.get('D&D.php?getPlayers', show_players);
  }
