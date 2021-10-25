<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tax calculator</title>
</head>
<body>
    <header>
        <h1>Tax calculator</h1>
    </header>
    
    <main>
        <?php if (isset($_POST['calculate'])): ?>
            <?php 
                $amount = $_POST['amount'];
                $tax = $_POST['tax'];
            ?>
            <blockquote>
                <p>Tax amount: <?php echo ($amount*$tax)/100 ?></p>
                <p>Final amount: <?php echo $amount-$tax ?></p>
            </blockquote>
        <?php endif; ?> 

        <form action="calculate.php", method="POST">
            <div>
                <label for="amount">Monetary amount</label>
                <input type="number" name="amount", value=0>
            </div>
            <div>
                <label for="tax">Tax percentage</label>
                <input type="number" id="tax" value=0>  
            </div>

            <button name="calculate=" id="btnCalculate">Calculate</button>

        </form>
    </main>
</body>
</html>