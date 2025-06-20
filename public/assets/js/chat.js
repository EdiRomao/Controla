let currentMember = { id: "1", nome: "José Matos", avatar: null };
let destinatario = null;
let searchQuery = '';
let messages = [];
let sending = false;

const members = [
  { _id: "1", nome: "José Matos", status: "online", avatar: null, ultimaVisto: "" },
  { _id: "2", nome: "Raquel Domingos", status: "offline", ultimaVisto: "2h atrás", avatar: null },
  { _id: "3", nome: "Barroso André", status: "online", avatar: null, ultimaVisto: "" }
];

const conversations = [
  { memberId: "2", ultimaMensagem: { content: "Olá, tudo bem?", dataEnvio: new Date().toISOString(), remetenteId: "2" }, mensagensNaoLidas: 1 },
  { memberId: "3", ultimaMensagem: { content: "Você terminou?", dataEnvio: new Date().toISOString(), remetenteId: "1" }, mensagensNaoLidas: 0 }
];

function getStatusColor(status) {
  return status === "online" ? "#28a745" : "#ccc";
}

function formatarHora(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getConversaParaMembro(memberId) {
  return conversations.find(conv => conv.memberId === memberId);
}

function renderMembers() {
  const filteredMembers = members.filter(member =>
    member.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const membersList = document.getElementById('membersList');
  membersList.innerHTML = '';
  if (filteredMembers.length === 0) {
    membersList.innerHTML = '<p class="text-center text-muted mt-3">Nenhum membro encontrado</p>';
  } else {
    filteredMembers.forEach((member, index) => {
      const conversa = getConversaParaMembro(member._id);
      const isSelected = destinatario && destinatario._id === member._id;
      const div = document.createElement('div');
      div.className = `d-flex align-items-center p-3 position-relative ${isSelected ? "bg-light" : ""}`;
      div.style.cursor = "pointer";
      div.style.borderRadius = "8px";
      div.style.margin = "0 8px";
      div.style.transition = "all 0.2s ease";
      div.innerHTML = `
        <div class="position-relative me-3">
          <img src="${member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.nome)}&background=1877f2&color=fff&size=56`}" class="rounded-circle" width="56" height="56" alt="${member.nome}" style="object-fit: cover;">
          <div class="position-absolute rounded-circle border border-2 border-white" style="width: 16px; height: 16px; background-color: ${getStatusColor(member.status)}; bottom: 2px; right: 2px;"></div>
          ${conversa && conversa.mensagensNaoLidas > 0 ? `<div class="position-absolute rounded-circle bg-danger text-white d-flex align-items-center justify-content-center" style="width: 20px; height: 20px; font-size: 12px; font-weight: bold; top: -5px; right: -5px;">${conversa.mensagensNaoLidas > 9 ? "9+" : conversa.mensagensNaoLidas}</div>` : ""}
        </div>
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between align-items-start">
            <h6 class="mb-1 fw-medium" style="color: #1c1e21; font-size: 15px;">${member.nome}</h6>
            ${conversa?.ultimaMensagem ? `<small class="text-muted" style="font-size: 12px;">${formatarHora(conversa.ultimaMensagem.dataEnvio)}</small>` : ""}
          </div>
          <p class="mb-0 text-muted text-truncate" style="font-size: 13px; max-width: 200px;">
            ${conversa?.ultimaMensagem ? `${conversa.ultimaMensagem.remetenteId === currentMember.id ? "Você: " : ""}${conversa.ultimaMensagem.content}` : "Começar conversa"}
          </p>
        </div>
      `;
      div.onclick = () => selecionarMember(member._id);
      div.onmouseenter = (e) => {
        if (!isSelected) e.currentTarget.style.backgroundColor = "#f2f3f5";
      };
      div.onmouseleave = (e) => {
        if (!isSelected) e.currentTarget.style.backgroundColor = "transparent";
      };
      membersList.appendChild(div);
    });
  }
}

function selecionarMember(memberId) {
  destinatario = members.find(m => m._id === memberId);
  messages = [
    { _id: "m1", remetente: { _id: memberId === "2" ? "2" : "1", nome: members.find(m => m._id === (memberId === "2" ? "2" : "1")).nome }, conteudo: memberId === "2" ? "Olá, tudo bem?" : "Oi, José!", dataEnvio: new Date(), lida: false, entregue: true }
  ];
  renderChat();
  renderMembers();
}

function renderChat() {
  const chatArea = document.getElementById('chatArea');
  if (!destinatario) {
    chatArea.innerHTML = `
      <div class="d-flex align-items-center justify-content-center h-100 flex-column" id="noRecipient">
        <div class="text-center">
          <div class="rounded-circle d-flex align-items-center justify-content-center mb-4" style="width: 100px; height: 100px; background-color: #e4e6ea;">
            <i class="fas fa-comments" style="font-size: 40px; color: #65676b;"></i>
          </div>
          <h4 style="color: #1c1e21;">Suas mensagens</h4>
          <p class="text-muted mb-4" style="max-width: 400px;">Envie mensagens para seus colegas e mantenha-se conectado</p>
          <p class="text-muted">Selecione um contato para começar a conversar</p>
        </div>
      </div>
    `;
    return;
  }

  chatArea.innerHTML = `
    <div class="d-flex align-items-center p-3 border-bottom bg-white" style="min-height: 80px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
      <div class="position-relative me-3">
        <img src="${destinatario.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(destinatario.nome)}&background=1877f2&color=fff&size=40`}" class="rounded-circle" width="40" height="40" alt="${destinatario.nome}" style="object-fit: cover;">
        <div class="position-absolute rounded-circle border border-2 border-white" style="width: 12px; height: 12px; background-color: ${getStatusColor(destinatario.status)}; bottom: 0; right: 0;"></div>
      </div>
      <div class="flex-grow-1">
        <h5 class="mb-0 fw-medium" style="color: #1c1e21;">${destinatario.nome}</h5>
        <small class="text-muted">${destinatario.status === "online" ? "Ativo agora" : `Visto ${destinatario.ultimaVisto || "recentemente"}`}</small>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-light rounded-circle p-2" style="width: 40px; height: 40px;"><i class="fas fa-phone" style="color: #1877f2;"></i></button>
        <button class="btn btn-light rounded-circle p-2" style="width: 40px; height: 40px;"><i class="fas fa-video" style="color: #1877f2;"></i></button>
        <button class="btn btn-light rounded-circle p-2" style="width: 40px; height: 40px;"><i class="fas fa-info-circle" style="color: #1877f2;"></i></button>
      </div>
    </div>
    <div class="flex-grow-1 p-3 overflow-auto" id="chatMessages" style="background-color: #f8f9fa; background-image: radial-gradient(circle at 25px 25px, rgba(255,255,255,.2) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255,255,255,.2) 2%, transparent 0%); background-size: 100px 100px;">
      ${messages.length === 0 ? `
        <div class="text-center mt-5">
          <img src="${destinatario.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(destinatario.nome)}&background=1877f2&color=fff&size=80`}" class="rounded-circle mb-3" width="80" height="80" alt="${destinatario.nome}">
          <h5 style="color: #1c1e21;">${destinatario.nome}</h5>
          <p class="text-muted mb-4">Vocês ainda não têm mensagens juntos</p>
          <p class="text-muted">Envie uma mensagem para começar a conversa</p>
        </div>
      ` : messages.map(msg => `
        <div class="mb-3 d-flex ${msg.remetente._id === currentMember.id ? "justify-content-end" : "justify-content-start"}">
          ${msg.remetente._id !== currentMember.id ? `<img src="${msg.remetente.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.remetente.nome)}&background=1877f2&color=fff&size=28`}" class="rounded-circle me-2 align-self-end" width="28" height="28" alt="${msg.remetente.nome}">` : ""}
          <div class="p-3 rounded-4 position-relative ${msg.remetente._id === currentMember.id ? "text-white" : "bg-white text-dark"}" style="max-width: 70%; background-color: ${msg.remetente._id === currentMember.id ? "#1877f2" : "#ffffff"}; box-shadow: ${msg.remetente._id === currentMember.id ? "none" : "0 1px 2px rgba(0,0,0,0.1)"}; font-size: 15px; line-height: 1.4;">
            <div>${msg.conteudo}</div>
            <div class="small mt-1 opacity-75 d-flex align-items-center justify-content-between">
              <span>${formatarHora(msg.dataEnvio)}</span>
              ${msg.remetente._id === currentMember.id ? `<span class="ms-2">${msg.lida ? '<i class="fas fa-check-double text-info"></i>' : msg.entregue ? '<i class="fas fa-check-double"></i>' : '<i class="fas fa-check"></i>'}</span>` : ""}
            </div>
          </div>
        </div>
      `).join('')}
      <div id="chatEnd"></div>
    </div>
    <div class="p-3 bg-white border-top">
      <div class="d-flex align-items-end gap-2">
        <button class="btn btn-light rounded-circle p-2 align-self-center" style="width: 40px; height: 40px;"><i class="fas fa-plus" style="color: #1877f2;"></i></button>
        <div class="flex-grow-1 position-relative">
          <input type="text" class="form-control border-0 ps-3 pe-5" id="messageInput" placeholder="Mensagem para ${destinatario.nome}..." style="border-radius: 20px; background-color: #f0f2f5; font-size: 15px; min-height: 40px;">
          <i class="fas fa-smile position-absolute" style="right: 15px; top: 50%; transform: translateY(-50%); color: #1877f2; cursor: pointer;"></i>
        </div>
        <button class="btn rounded-circle p-2 align-self-center" id="sendButton" style="width: 40px; height: 40px; background-color: #e4e6ea; border: none;">
          <i class="fas fa-paper-plane" style="color: #bcc0c4; font-size: 14px;"></i>
        </button>
      </div>
    </div>
  `;
  document.getElementById('messageInput').oninput = (e) => updateSendButton(e.target.value);
  document.getElementById('messageInput').onkeydown = (e) => {
    if (e.key === "Enter" && !sending) sendMessage();
  };
  document.getElementById('sendButton').onclick = sendMessage;
  document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
}

function updateSendButton(message) {
  const sendButton = document.getElementById('sendButton');
  const icon = sendButton.querySelector('i');
  if (message.trim() && !sending) {
    sendButton.style.backgroundColor = '#1877f2';
    icon.style.color = 'white';
    sendButton.disabled = false;
  } else {
    sendButton.style.backgroundColor = '#e4e6ea';
    icon.style.color = '#bcc0c4';
    sendButton.disabled = true;
  }
}

function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();
  if (!message || sending) return;
  sending = true;
  messages.push({
    _id: `m${messages.length + 1}`,
    remetente: { _id: currentMember.id, nome: currentMember.nome },
    conteudo: message,
    dataEnvio: new Date(),
    lida: false,
    entregue: true
  });
  messageInput.value = '';
  updateSendButton('');
  renderChat();
  sending = false;
}

// Initial render
document.getElementById('currentMemberAvatar').src = currentMember.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentMember.nome)}&background=1877f2&color=fff&size=40`;
document.getElementById('currentMemberName').textContent = currentMember.nome;
document.getElementById('searchInput').oninput = (e) => {
  searchQuery = e.target.value;
  renderMembers();
};
document.getElementById('loadingSpinner').style.display = 'none';
renderMembers();