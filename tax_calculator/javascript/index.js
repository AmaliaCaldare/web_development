"use strict";
document.getElementById("form").addEventListener('submit', (e) => {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const tax = parseFloat(document.getElementById('tax').value);

    const taxAmount = (amount * tax) / 100;
    const finalAmount = amount - tax;
    
    document.getElementById("taxAmount").innerHTML = taxAmount.toFixed(2);
    document.getElementById("finalAmount").innerHTML = finalAmount.toFixed(2);
});
