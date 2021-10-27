<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/style.css">
    <title>Tempeerature converter</title>
</head>
<body>
    <header>
        <h1>Temperature converter</h1>
    </header>

    <main>
        
    <?php include 'conversion.php' ?>
        <form action="" method="POST">
            <label for="convertion">Convert</label>
            <input type="number" name="number" value="0.00" placeholder="0.00" step="0.01" required>
            
            <div class="container">
                <div class="container-from">
                    <label for="from">From</label>
                    <select name="from" id="from">
                        <option value="C" selected>Celsius</option>
                        <option value="F">Fahrenheit</option>
                        <option value="K">Kelvin</option>
                    </select>
                </div>

                <div class="container-to">
                    <label for="to">To</label>
                    <select name="to" id="to">
                        <option value="C">Celsius</option>
                        <option value="F" selected>Fahrenheit</option>
                        <option value="K">Kelvin</option>
                    </select>
                </div>
            </div>

        <input type="submit" name="button" id="btn" value="Calculate">

        </form>
        <div class="results">
            <blockquote>
                <p>
                    <span id="result-from"> <?= $result_from ?></span>
                    <span>=</span>
                    <span id="result-to"> <?= $result_to ?></span>
                </p>
            </blockquote>
        </div>
    </main>
    <footer>&copy; 2021 Amalia Caldare</footer>    
</body>
</html>