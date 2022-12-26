//Funcion para calcular el costo total de la compra
function montoTotal(precio, metodoPago) {
    if(metodoPago==1){
        precio=precio + (precio*0.10)
        return precio
    }else if(metodoPago==2){
        return precio
    }else{
        precio=precio - (precio*0.10)
        return precio
    }
}
//Funcion para chequear de que la cantidad ingresada no sea negativa, ni alfabetica
function esCantidad(cant) {
    if(isNaN(cant)){
        return false
    }else if(cant<0){
        return false
    }
    return true
}
alert("Bienvenidos a tienda 'El negrito'")
let respuesta=Number(prompt("Desea realizar una compra?\n 1) Si\n 0) No" ))
//Ciclo por si inserta un numero incorrecto
while(respuesta!=1){
    if(respuesta==0){
        break
    }
    alert("Opcion incorrecta, vuelva a intentar")
    respuesta=Number(prompt("1) Si\n 0) No" ))
}
if (respuesta==0){
    //Si no desea realizar la compra, se muestra un mensaje de despedida
    alert("Usted no deseo realizar una compra, gracias por su visita!")
}else{
    //Caso que desee realizar una compra
    alert("La ropa disponible es la siguiente:\n A) Pantalones  $7500 \n B)Remeras  $4900\n C)Shorts   $3600\n D)Buzos   $5000\n E)Zapatillas   $8650")
    let opcion=prompt("Ingrese la opcion de la ropa que desea comprar").toUpperCase()
    let precioTotal=0
    //Ahora se pide ingresar lo que se desea comprar y se va agregando al subtotal
    while(opcion!=""){
        let cantidad=0
        switch (opcion) {
            case "A":
                cantidad=Number(prompt("Ingrese cuantos pantalones"))
                console.log(cantidad)
                while(!esCantidad(cantidad)){
                    alert("La cantidad ingresada es negativa o no es numerica, vuelva a intentar.")
                    cantidad=Number(prompt("Ingrese cuantos pantalones"))
                }
                precioTotal=precioTotal+(7500*cantidad)
                alert("Pantalon agregado exitosamente al carrito, su subtotal es de: "+precioTotal)
                break
            case "B":
                cantidad=Number(prompt("Ingrese cuantas remeras"))
                while(!esCantidad(cantidad)){
                    alert("La cantidad ingresada es negativa o no es numerica, vuelva a intentar.")
                    cantidad=Number(prompt("Ingrese cuantos pantalones"))
                }
                precioTotal=precioTotal+(4900*cantidad)
                alert("Remera agregada exitosamente al carrito, su subtotal es de: "+precioTotal)
                break
            case "C":
                cantidad=Number(prompt("Ingrese cuantos shorts"))
                while(!esCantidad(cantidad)){
                    alert("La cantidad ingresada es negativa o no es numerica, vuelva a intentar.")
                    cantidad=Number(prompt("Ingrese cuantos pantalones"))
                }
                precioTotal=precioTotal+(3600*cantidad)
                alert("Short agregado exitosamente al carrito, su subtotal es de: "+precioTotal)
                break
            case "D":
               cantidad=Number(prompt("Ingrese cuantos buzos"))
               while(!esCantidad(cantidad)){
                    alert("La cantidad ingresada es negativa o no es numerica, vuelva a intentar.")
                    cantidad=Number(prompt("Ingrese cuantos pantalones"))
                }
                precioTotal=precioTotal+(5000*cantidad)
                alert("Buzo agregado exitosamente al carrito, su subtotal es de: "+precioTotal)
                break
            case "E":
                cantidad=Number(prompt("Ingrese cuantos pares"))
                while(!esCantidad(cantidad)){
                    alert("La cantidad ingresada es negativa o no es numerica, vuelva a intentar.")
                    cantidad=Number(prompt("Ingrese cuantos pantalones"))
                }
                precioTotal=precioTotal+(8650*cantidad)
                alert("Zapatilla agregado exitosamente al carrito, su subtotal es de: "+precioTotal)
                break
            default:
                "La opcion ingresada no esta contemplada."
                break;
        }
        opcion=prompt("Ingrese la opcion de la ropa que desea comprar, en caso de querer finalizar la compra solo de enter").toUpperCase()
    }
    //Ahora pregunto si desea realizar la compra o cancelarla
    alert("Desea realizar la compra?\n 1)Si \n 0) No, la cancelo.")
    let compra=Number(prompt("Ingrese opcion:"))
    while(compra!=1){
        if(compra==0){
            break
        }
        alert("Opcion incorrecta, vuelva a intentar")
        compra=Number(prompt("Ingrese opcion\n 1)Si\n 0)No "))
    }
    //En caso de que cancele la compra
    if(compra==0){
        alert("Compra cancelada, disculpe las molestias.")
    }else{
        ///Ahora selecciona el metodo de pago
        alert("Como desea realizar el pago?\n 1)Tarjeta de credito(10% de recargo)\n 2)Tarjeta de debito\n 3)Efectivo (10% descuento)")
        let metodoPago=Number(prompt("Ingrese forma de pago"))
        //Llamo a la funcion para calcular el monto total dependiendo del modo de pago
        let costoCompra=montoTotal(precioTotal, metodoPago)
        alert("El subtotal de su compra es: "+precioTotal)
        alert("El costo total de su compra es de: "+costoCompra)
        alert("Gracias por su compra!")
    }
}

