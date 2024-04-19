/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
    let url = 'http://127.0.0.1:5000/consulta';
     fetch(url, {
      method: 'get',
    })
      
      .then((response) =>  response.json())

      .then((data) => {
        data.consultas.forEach(item => insertList(item.nome_paciente, item.nome_medico, item.data_consulta))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */
  getList()
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para colocar a consulta na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
  const postItem = async (inputNome_Paciente, inputNome_Medico, inputDataHorario) => {
    const formData = new FormData();
    formData.append('nome_paciente',inputNome_Paciente);
    formData.append('nome_medico', inputNome_Medico);
    formData.append('data', inputDataHorario);
  
    let url = 'http://127.0.0.1:5000/consulta';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para criar um botão close para cada item da lista
    --------------------------------------------------------------------------------------
  */
  const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "cancelar";
    span.appendChild(txt);
    parent.appendChild(span);
  }
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para remover um item da lista de acordo com o click no botão close
    --------------------------------------------------------------------------------------
  */
  const removeElement = () => {
    let cancelar = document.getElementsByClassName("cancelar");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < cancelar.length; i++) {
      cancelar[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza?")) {
          div.remove()
          deleteItem(nomeItem)
          alert("Removido!")
        }
      }
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para deletar um item da lista do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
  */
  const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/consulta?paciente=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para adicionar um novo item com paciente, medico e data 
    --------------------------------------------------------------------------------------
  */
  const newItem = () => {
    let inputid_paciente = document.getElementById("id_paciente").value;
    let inputid_medico = document.getElementById("id_medico").value;
    let inputdata_consulta = document.getElementById("data").value + ' ' + document.getElementById("horario").value;
    alert("entrou!");
    if (inputid_paciente === '') {
      alert("Escreva o nome do paciente!");
    } else if (inputid_medico === '') {
      alert("Escreva o nome do médico!");
    } else {
      insertList(inputid_paciente, inputid_medico, inputdata_consulta)
      postItem(inputid_paciente, inputid_medico, inputdata_consulta)
      alert("Item adicionado!")
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para inserir items na lista apresentada
    --------------------------------------------------------------------------------------
  */
  const insertList = (namepaciente, nomemedico, dataagendamento) => {
    var item = [namepaciente, nomemedico, dataagendamento]
    var table = document.getElementById('consultas-tabela');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("id_paciente").value = "";
    document.getElementById("id_medico").value = "";
    document.getElementById("data").value + document.getElementById("horario").value;
  
    removeElement()
  }