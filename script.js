const form = document.getElementById('formContato');
const statusMensagem = document.getElementById('statusMensagem');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !email || !mensagem) {
        statusMensagem.style.color = 'red';
        statusMensagem.textContent = 'Por favor, preencha todos os campos.';
        statusMensagem.style.display = 'block';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/contato', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, mensagem }),
        });

        const data = await response.json();

        if (response.ok) {
            statusMensagem.style.color = 'green';
            statusMensagem.textContent = data.message;
            form.reset();
        } else {
            statusMensagem.style.color = 'red';
            statusMensagem.textContent = data.error || 'Erro ao enviar a mensagem.';
        }
    } catch (error) {
        statusMensagem.style.color = 'red';
        statusMensagem.textContent = 'Erro na comunicação com o servidor.';
    }

    statusMensagem.style.display = 'block';
});
