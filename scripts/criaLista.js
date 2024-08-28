document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('dropdown-produtos');
    const button = document.getElementById('btn-adicionar-item');
    const ul = document.getElementById('lista-selecionados');


    // Adiciona um novo item à lista ao clicar no botão "Adicionar"
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Previne o comportamento padrão do botão de enviar o formulário
        const quantidade = document.getElementById('quantidade').value;
        const selectedOption = select.options[select.selectedIndex];
        if (selectedOption) {
            // Cria um novo item de lista
            const li = document.createElement('li');
            li.classList.add('item-lista');

            // Adiciona conteúdo ao item de lista
            li.innerHTML = `
                <div class="item-conteudo">
                    <img src="./img/checkbox_unchecked.svg" alt="Checkbox" class="checkbox">
                    <span class="item-descricao">${selectedOption.text}</span> <!-- Adiciona o texto do item selecionado -->
                    </div>
                <div class="item-acoes">
                    <p class="quantidade-item">${quantidade}</p>
                    <img src="./img/delete.svg" alt="btn-delete" class="btn-delete">
                </div>
            `;

            // Adiciona o novo item de lista à lista de selecionados
            ul.appendChild(li);
        }
    });

    // Alterna o estado do checkbox ao clicar
    ul.addEventListener('click', (event) => {
        if (event.target.classList.contains('checkbox')) {
            const checkbox = event.target;
            if (checkbox.src.includes('checkbox_unchecked.svg')) {
                checkbox.src = './img/checkbox_checked.svg';
            } else {
                checkbox.src = './img/checkbox_unchecked.svg';
            }
        }

        // Remove o item da lista ao clicar no botão "delete"
        if (event.target.classList.contains('btn-delete')) {
            const item = event.target.closest('li');
            if (item) {
                item.remove();
            }
        }
    });
});
