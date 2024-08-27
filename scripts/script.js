import toProperCase from "./toProperCase.js";
import { sortByDescription } from "./sortByDescription.js";

// Função para carregar dados do JSON
async function loadData() {
  try {
    const response = await fetch('public/produtos.json');
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }
    const jsonData = await response.json();

    return jsonData;
  } catch (error) {
    console.error('Erro ao carregar o arquivo JSON:', error);
    return [];
  }
}

// Manipulação do DOM após o carregamento da página
document.addEventListener('DOMContentLoaded', async () => {
  const dropdown = document.getElementById('dropdown-produtos');

  try {
    const jsonData = await loadData();

    // Ordena os itens por descrição em ordem alfabética
    const sortedData = sortByDescription(jsonData);

    // Limpa qualquer conteúdo existente no dropdown (opcional)
    dropdown.innerHTML = '';

    sortedData.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = toProperCase(item.itemDescription);
      dropdown.appendChild(option);
    });

    console.log('Itens adicionados ao dropdown:', dropdown);
  } catch (error) {
    console.error('Erro ao processar os itens:', error);
  }
});
