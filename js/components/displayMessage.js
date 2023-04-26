export default function displayMessage(messageType, message, targetElement) {
  const element = document.querySelector(targetElement);

  element.innerHTML = `<div class="message rounded bg-${messageType}-subtle">${message}</div>`;
}
