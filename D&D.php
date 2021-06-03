<?php

session_start();
if(strlen($_SESSION[map]) != 112)
        $_SESSION[map] = 'R11111111111111111R1111111111111A11111111111111R1111111111AAA111111111111111111RRRRRRRR111111111AR1AR1RA1RA1RA1A';

if (isset($_GET['getPlayers']))
        echo  $_SESSION[map];

if (isset($_GET['movePlayers'])){
        $from_coord = $_GET['from_coord'];
        $to_coord = $_GET['to_coord'];
        $player = $_SESSION['map'][$from_coord];
        $_SESSION['map'][$from_coord] = '1';
        $_SESSION['map'][$to_coord] = $player;
        echo  $_SESSION[map] ;
    }
