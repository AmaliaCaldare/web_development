document.getElementById("btnCalculate").addEventListener('click', () => {
    const amount = document.getElementById('amount').value;
    const tax = document.getElementById('tax').value;

    const taxAmount = (amount * tax) / 100;
    const finalAmount = amount - tax;
    
    document.getElementById("taxAmount").innerHTML = taxAmount;
    document.getElementById("finalAmount").innerHTML = finalAmount;
});
