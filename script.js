// Referencias a los elementos del DOM
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const validationMessage = document.getElementById("validationMessage");

// Función para validar el texto (no mayúsculas ni caracteres especiales)
function validarTexto(texto) {
  const regex = /^[a-z\s]+$/;  // Solo acepta letras minúsculas y espacios
  return regex.test(texto);
}

// Función para encriptar el texto
function encriptarTexto() {
  const texto = inputText.value;

  // Validar texto
  if (!validarTexto(texto)) {
    validationMessage.style.display = "block";
    outputText.value = "";
    return;
  }

  validationMessage.style.display = "none";

  let textoEncriptado = "";
  for (let i = 0; i < texto.length; i++) {
    // Lógica simple de cifrado: desplazamiento de caracteres usando UNICODE
    textoEncriptado += String.fromCharCode(texto.charCodeAt(i) + 3);
  }

  // Mostrar el texto encriptado en el área de presentación
  outputText.value = textoEncriptado;
}

// Función para descifrar el texto
function desencriptarTexto() {
  const texto = inputText.value;

  // Validar texto
  if (!validarTexto(texto)) {
    validationMessage.style.display = "block";
    outputText.value = "";
    return;
  }

  validationMessage.style.display = "none";

  let textoDescifrado = "";
  for (let i = 0; i < texto.length; i++) {
    // Lógica simple de descifrado: revertir el desplazamiento de caracteres
    textoDescifrado += String.fromCharCode(texto.charCodeAt(i) - 3);
  }

  // Mostrar el texto descifrado en el área de presentación
  outputText.value = textoDescifrado;
}

// Función para copiar el texto procesado al portapapeles
function copiarTexto() {
  const copyButton = document.getElementById("copyBtn");

  navigator.clipboard.writeText(outputText.value).then(() => {
    // Cambiar el color del botón temporalmente
    copyButton.style.backgroundColor = "#4caf50";  // Color verde
    copyButton.textContent = "¡Copiado!";

    // Restaurar el color y el texto después de 2 segundos
    setTimeout(() => {
      copyButton.style.backgroundColor = "#28a745";  // Volver al color original
      copyButton.textContent = "Copiar al Portapapeles";
    }, 2000);
  }).catch(err => {
    console.error('Error al copiar el texto: ', err);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  const encryptBtn = document.getElementById('encryptBtn');
  const decryptBtn = document.getElementById('decryptBtn');
  const copyBtn = document.getElementById('copyBtn');
  const inputMessage = document.getElementById('inputMessage');
  const outputMessage = document.getElementById('outputMessage');
  const errorMessage = document.getElementById('error-message');
  const themeToggle = document.getElementById('theme-toggle');
  const themeStyle = document.getElementById('theme-style');

  // Función para encriptar el texto
  function encrypt(text) {
      return text.replace(/e/g, 'enter')
                 .replace(/i/g, 'imes')
                 .replace(/a/g, 'ai')
                 .replace(/o/g, 'ober')
                 .replace(/u/g, 'ufat');
  }

  // Función para desencriptar el texto
  function decrypt(text) {
      return text.replace(/enter/g, 'e')
                 .replace(/imes/g, 'i')
                 .replace(/ai/g, 'a')
                 .replace(/ober/g, 'o')
                 .replace(/ufat/g, 'u');
  }

  // Función para validar el texto de entrada
  function validateText(text) {
      const regex = /^[a-z\s]+$/;
      return regex.test(text);
  }

  // Función para mostrar mensaje de error
  function showError() {
      errorMessage.style.display = 'block';
  }

  // Función para ocultar mensaje de error
  function hideError() {
      errorMessage.style.display = 'none';
  }

  // Encriptar botón de clic
  encryptBtn.addEventListener('click', () => {
      const text = inputMessage.value;
      if (validateText(text)) {
          hideError();
          outputMessage.value = encrypt(text);
          outputMessage.placeholder = ''; // Limpia el placeholder
          copyBtn.style.display = 'block'; // Muestra el botón de copiar
      } else {
          showError();
          outputMessage.value = ''; // Limpia el área de salida
          outputMessage.placeholder = 'Ningún mensaje fue encontrado.';
          copyBtn.style.display = 'none'; // Oculta el botón de copiar
      }
  });

  // Desencriptar botón de clic
  decryptBtn.addEventListener('click', () => {
      const text = inputMessage.value;
      if (validateText(text)) {
          hideError();
          outputMessage.value = decrypt(text);
          outputMessage.placeholder = ''; // Limpia el placeholder
          copyBtn.style.display = 'block'; // Muestra el botón de copiar
      } else {
          showError();
          outputMessage.value = ''; // Limpia el área de salida
          outputMessage.placeholder = 'Ningún mensaje fue encontrado.';
          copyBtn.style.display = 'none'; // Oculta el botón de copiar
      }
  });

  // Copiar al portapapeles
  copyBtn.addEventListener('click', () => {
      outputMessage.select();
      document.execCommand('copy');
      copyBtn.classList.add('active');
      setTimeout(() => {
          copyBtn.classList.remove('active');
      }, 1000); // El color cambia temporalmente por 1 segundo
  });
});