<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css">
    <title>Tax calculator</title>
</head>
<body>
    <header>
        <h1>Tax calculator</h1>
    </header>
    <main>
        <?php
            if(isset($_POST['amount']) && isset($_POST['tax'])) {
                    $amount = (float) $_POST['amount'];
                    $taxPercentage = (float) $_POST['tax'];
                    } else {
                    $taxAmount = 0;
                    $finalAmount = 0;
                    }

                    $taxAmount = round(($amount * $taxPercentage) / 100, 2);
                    $finalAmount = round($amount - $taxAmount, 2);
            ?>
        <form method="POST">
            <div>
                <label for="amount">Monetary amount</label>
                <input type="number" name="amount", value=0  required pattern="[0-9]" step="0.01" min="0">
            </div>
            <div>
                <label for="tax">Tax percentage</label>
                <input type="number" name="tax" id="tax" value=0 required pattern="[0-9]" step="0.01" min="0" max="100">  
            </div>

            <button id="btnCalculate">Calculate</button>
        </form>
        <blockquote>
            <p>Tax amount: <span> <?=$taxAmount ?> </span> </p>
            <p>Final Amount: <span> <?=$finalAmount ?> </span> </p>
        </blockquote>
    </main>
    <footer>&copy; 2021 Amalia Caldare</footer>
</body>
</html>