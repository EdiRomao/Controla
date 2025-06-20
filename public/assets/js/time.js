let membros = [{ id: 1, nome: "", cargo: "", email: "", telefone: "" }];

    function adicionarMembro() {
      const novoId = membros.length > 0 ? Math.max(...membros.map(m => m.id)) + 1 : 1;
      membros.push({ id: novoId, nome: "", cargo: "", email: "", telefone: "" });

      const membrosContainer = document.getElementById('membrosContainer');
      const membroDiv = document.createElement('div');
      membroDiv.className = 'card mb-3 border p-3';
      membroDiv.dataset.id = novoId;
      membroDiv.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h6 class="mb-0">Membro #${membros.length}</h6>
          <button class="btn btn-light btn-sm" onclick="removerMembro(${novoId})">Remover</button>
        </div>
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Nome</label>
            <input type="text" class="form-control" name="nome_${novoId}" placeholder="Nome do membro" oninput="atualizarMembro(${novoId}, 'nome', this.value)">
          </div>
          <div class="col-md-6">
            <label class="form-label">Cargo</label>
            <input type="text" class="form-control" name="cargo_${novoId}" placeholder="Cargo" oninput="atualizarMembro(${novoId}, 'cargo', this.value)">
          </div>
          <div class="col-md-6">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" name="email_${novoId}" placeholder="email@empresa.com" oninput="atualizarMembro(${novoId}, 'email', this.value)">
          </div>
          <div class="col-md-6">
            <label class="form-label">Telefone</label>
            <input type="text" class="form-control" name="telefone_${novoId}" placeholder="123 456 789" oninput="atualizarMembro(${novoId}, 'telefone', this.value)">
          </div>
        </div>
      `;
      membrosContainer.appendChild(membroDiv);
      atualizarBotoesRemover();
    }

    function removerMembro(id) {
      if (membros.length > 1) {
        membros = membros.filter(membro => membro.id !== id);
        const membroDiv = document.querySelector(`[data-id="${id}"]`);
        if (membroDiv) membroDiv.remove();
        atualizarMembroTitulos();
        atualizarBotoesRemover();
      }
    }

    function atualizarMembro(id, field, value) {
      membros = membros.map(membro => 
        membro.id === id ? { ...membro, [field]: value } : membro
      );
    }

    function atualizarMembroTitulos() {
      const membroDivs = document.querySelectorAll('#membrosContainer .card');
      membroDivs.forEach((div, index) => {
        const h6 = div.querySelector('h6');
        h6.textContent = `Membro #${index + 1}`;
      });
    }

    function atualizarBotoesRemover() {
      const botoesRemover = document.querySelectorAll('#membrosContainer .btn-sm');
      botoesRemover.forEach(botao => {
        botao.disabled = membros.length === 1;
      });
    }

    function salvarTime() {
      const timeData = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        responsavel: document.getElementById('responsavel').value,
        departamento: document.getElementById('departamento').value,
        status: document.getElementById('status').value
      };
      console.log("Time salvo:", { timeData, membros });
      alert("Time adicionado com sucesso!");
    }