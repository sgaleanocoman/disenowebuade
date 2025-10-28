
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    }).format(amount);
}


function calcularTodo() {
 
    const input1 = document.getElementById('cantidad-servicio1');
    const input2 = document.getElementById('cantidad-servicio2');

    const cantidad1 = parseInt(input1.value) || 0;
    const cantidad2 = parseInt(input2.value) || 0;
    
    const precio1 = parseFloat(input1.getAttribute('data-precio'));
    const precio2 = parseFloat(input2.getAttribute('data-precio'));

    const promocionSeleccionada = document.querySelector('input[name="promocion"]:checked').value;

  
    let totalBase = (cantidad1 * precio1) + (cantidad2 * precio2);
    let descuentoTotal = 0;
    let totalConDescuento = totalBase;

    if (totalBase === 0) {
        document.getElementById('total-base').textContent = formatCurrency(0);
        document.getElementById('descuento-aplicado').textContent = formatCurrency(0);
        document.getElementById('total-final').textContent = formatCurrency(0);
        document.getElementById('ahorro-total').textContent = formatCurrency(0);
        return; 
    }


    if (promocionSeleccionada === 'promoA') {
        const cantidadTotal = cantidad1 + cantidad2;
        if (cantidadTotal >= 2) {
            descuentoTotal = totalBase * 0.25;
        }

    } else if (promocionSeleccionada === 'promoB') {
        const unidadesGratis = Math.floor(cantidad2 / 3);
        descuentoTotal = unidadesGratis * precio2;

    } else if (promocionSeleccionada === 'promoC') {
        if (totalBase > 30000) {
            descuentoTotal = totalBase * 0.10;
        }
    }

    totalConDescuento = totalBase - descuentoTotal;
    const ahorro = descuentoTotal;


    document.getElementById('total-base').textContent = formatCurrency(totalBase);
    document.getElementById('descuento-aplicado').textContent = formatCurrency(descuentoTotal);
    document.getElementById('total-final').textContent = formatCurrency(totalConDescuento);
    document.getElementById('ahorro-total').textContent = formatCurrency(ahorro);
}

window.onload = function() {

    document.getElementById('cantidad-servicio1').addEventListener('input', calcularTodo);
    document.getElementById('cantidad-servicio2').addEventListener('input', calcularTodo);
    
    document.querySelectorAll('input[name="promocion"]').forEach(radio => {
        radio.addEventListener('change', calcularTodo);
    });


    calcularTodo();
};