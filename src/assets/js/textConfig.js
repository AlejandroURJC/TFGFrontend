function changeFont(selector) {   
    // obtenemos el valor de la variable CSS      
    let fontSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-size'));   
    // aumentamos el valor de esa variable en 1.1
    if(selector === '+')      
        document.documentElement.style.setProperty('--font-size', `${fontSize * 1.125}`);
    else 
        document.documentElement.style.setProperty('--font-size', `${fontSize / 1.125}`);              
}
