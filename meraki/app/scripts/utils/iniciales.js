export function obtenerIniciales(nombre) {
    const palabras = nombre.split(' ');
    let iniciales = '';
    palabras.forEach(palabra => {
      if (palabra.length > 0) {
        iniciales += palabra[0].toUpperCase();
      }
    });
    return iniciales;
  }