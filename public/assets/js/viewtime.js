const membros = [
    { id: 1, iniciais: "JM", nome: "José Matos", cargo: "Desenvolvedor", email: "jose.matos@empresa.com", telefone: "123 456 789", status: "Ativo" },
    { id: 2, iniciais: "RD", nome: "Raquel Domingos", cargo: "Gerente", email: "raquel.domingos@empresa.com", telefone: "987 654 321", status: "Ausente" },
    { id: 3, iniciais: "BA", nome: "Barroso André", cargo: "Designer", email: "barroso.andre@empresa.com", telefone: "456 789 123", status: "Ativo" }
  ];

  let filteredMembros = membros;

  function renderMembers() {
    const tableBody = document.getElementById('membersTable');
    tableBody.innerHTML = '';
    filteredMembros.forEach(membro => {
      tableBody.innerHTML += `
        <tr>
          <td class="py-3">
            <div class="bg-light rounded-circle d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
              ${membro.iniciais}
            </div>
          </td>
          <td class="py-3">${membro.nome}</td>
          <td class="py-3">${membro.cargo}</td>
          <td class="py-3">${membro.email}</td>
          <td class="py-3">${membro.telefone}</td>
          <td class="py-3">
            <span class="d-flex align-items-center">
              <div class="${membro.status === 'Ativo' ? 'bg-success' : 'bg-warning'} rounded-circle me-2" style="width: 10px; height: 10px;"></div>
              ${membro.status}
            </span>
          </td>
          <td class="py-3">
            <button class="btn btn-link text-decoration-none" type="button" onclick="editMember(${membro.id})">Editar</button>
          </td>
          <td class="py-3">
            <div class="d-flex">
              <div class="d-flex flex-column">
                <button class="btn btn-link text-decoration-none p-0 text-start" type="button" onclick="editMember(${membro.id})">Editar</button>
                <button class="btn btn-link text-decoration-none p-0 text-start" type="button" onclick="removeMember(${membro.id})">Remover</button>
              </div>
            </div>
          </td>
        </tr>
      `;
    });
  }

  function filterByFunction(cargo) {
    filteredMembros = cargo ? membros.filter(membro => membro.cargo === cargo) : membros;
    renderMembers();
  }

  function searchMembers(searchTerm) {
    filteredMembros = membros.filter(membro =>
      membro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membro.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membro.cargo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    renderMembers();
  }

  function editMember(id) {
    alert(`Editar membro com ID: ${id}`);
    // Implementar lógica de edição
  }

  function removeMember(id) {
    if (confirm(`Tem certeza que deseja remover o membro com ID: ${id}?`)) {
      filteredMembros = filteredMembros.filter(membro => membro.id !== id);
      renderMembers();
    }
  }

  // Initial render
  renderMembers();