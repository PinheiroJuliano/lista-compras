// Função para converter para Propper Case
function toProperCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Função para ordenar por descrição em ordem alfabética
function sortByDescription(items) {
  return items.slice().sort((a, b) => {
    const descA = toProperCase(a.itemDescription);
    const descB = toProperCase(b.itemDescription);
    return descA.localeCompare(descB);
  });
}

// Definição da função
async function loadData() {
  try {
    const response = await fetch('/public/produtos.json'); // Caminho para o JSON
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }
    const jsonData = await response.json();

    console.log(jsonData);

    const itemDescriptions = jsonData.map(item => toProperCase(item.itemDescription));

    console.log(itemDescriptions);

    const itemDescriptionsObj = jsonData.reduce((acc, item, index) => {
      acc[`item${index + 1}`] = toProperCase(item.itemDescription);
      return acc;
    }, {});

    console.log(itemDescriptionsObj);

    return jsonData; // Retorna os dados para uso posterior
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
