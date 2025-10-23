<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Matematicna avla</title>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="style.css">
</head>


<body>

<div id="search-overlay" class="overlay">
    <button class="close-button" onclick="closeSearch()">×</button>
    <div class="overlay-content">
        <h2>Iskanje po spletni strani</h2>
        <input type="text" id="search-input" placeholder="Vnesite iskalni pojem...">
        <button id="search-submit">Išči</button>
    </div>
</div>
<div id="main-content">
    <div class="navbar"> 
       <a href="#"><i class="fa fa-fw fa-house"></i> Doma</a> 

        <div class="dropdown">
            <button class="dropbtn">
                <a class="active" href="#"><i class="fa fa-fw fa-book"></i> Knjiznica</a> 
            </button>
            <div class="dropdown-content">
                <a href="#">Analiza 1</a>
                <a href="#">Analiza 2</a>
                <a href="#">Algebra 1</a>
                <a href="#">Racunalniski praktikum</a>
                <a href="#">Diskretne strukture</a>
                <a href="#">Proseminar</a>
                <a href="#">Analiza 2</a>
                <a href="#">Mikroekonomija</a>
                <a href="#">Optimizacijske metode</a>
                <a href="#">Uvod v programiranje</a>
            </div>
        </div>

        <a href="#" id="open-search-link"><i class="fa fa-fw fa-search"></i> Search</a> 

        <a href="#"><i class="fa fa-fw fa-envelope"></i> Contact</a> 
        <a href="#"><i class="fa fa-fw fa-user"></i> Login</a>
    </div>

    </div>
<script src="script.js"></script> 
</body>
</html>