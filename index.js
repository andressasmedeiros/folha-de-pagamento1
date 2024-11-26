const prompt = require("prompt-sync")()

const listaFuncionarios = []

function adicionarFuncionario(id, nome, cargo, taxaHoraria){
    let funcionario = {
        id,
        nome,
        cargo,
        taxaHoraria,
        horasTrabalhadas: []
    }

    listaFuncionarios.push(funcionario)
}

function registrarHoras(idFuncionario, numHoras){
    listaFuncionarios.map((func) => {
        if(func.id == idFuncionario){
            func.horasTrabalhadas.push(numHoras)
        }
    })
}

function totalHorasTrabalhadas(funcionario){
    
    let totalHoras = 0

    funcionario.horasTrabalhadas.map((horas) => {
        totalHoras += horas
    })
    return totalHoras
}

function calcularSalarioMensal(funcionario){
    let totalHoras = totalHorasTrabalhadas(funcionario)
    return totalHoras * funcionario.taxaHoraria
}

function calcularINSS(funcionario){
    let salarioBruto= calcularSalarioMensal(funcionario)
    let inss = 0

    if(salarioBruto > 4000.04){
        inss = salarioBruto * 14 / 100
    } else if (salarioBruto > 2666.69){
        inss = salarioBruto * 12 / 100
    } else if (salarioBruto > 1412.01){
        inss = salarioBruto * 9 / 100
    } else {
        inss = salarioBruto * 7.5 / 100
    }

    if(inss > 908.85){
        inss = 908.85
    }

    return inss
}

function gerarRelatorioPagamento(){
    console.log('---------- RELATÓRIO DE PAGAMENTO ---------- \n')

    listaFuncionarios.map((func) => {

        let salarioBruto = calcularSalarioMensal(func)
        let descontoINSS = calcularINSS(func)

        console.log(`Nome: ${func.nome}`)
        console.log(`Nome: ${func.cargo}`)
        console.log(`Total de horas trabalhadas: ${totalHorasTrabalhadas(func)}`)
        console.log(`Total INSS: R$ ${descontoINSS.toFixed(2)}`)
        console.log(`Salário bruto: R$ ${salarioBruto.toFixed(2)}`)
        console.log(`Salário líquido: R$ ${(salarioBruto - descontoINSS).toFixed(2)}`)
        console.log('--------------------\n')
    })
}

function gerenciarFolhaPagamento(){
    function exibirMenu(){
        console.log("\n--- Sistema de Folha de Pagamento ---")
        console.log("1 - Adicionar Funcionário")
        console.log("2 - Registrar Horas Trabalhadas")
        console.log("3 - Exibir Relatório de Pagamento")
        console.log("4 - Sair")
    }

    let opcao;

    do {
        exibirMenu();
        opcao = prompt("Digite a opção desejada: ");
        switch (opcao) {
            case "1":
                let id = Number(prompt("Digite o id do funcionário: "));
                let nome = prompt("Digite o nome do funcionário: ");
                let cargo = prompt("Digite o cargo do funcionário: ");
                let taxaHoraria = Number(prompt("Digite o valor/hora do funcionário: "));

                adicionarFuncionario(id, nome, cargo, taxaHoraria);
                break;

            case "2":
                let idFuncionario = Number(prompt("Digite o id do funcionário: "));
                let numHoras = Number(prompt("Digite o número de horas trabalhadas: "));

                registrarHoras(idFuncionario, numHoras);
                break;

            case "3":
                gerarRelatorioPagamento();
                break;

            case "4":
                console.log("Sistema finalizado...");
                break;

            default:
                console.log("Opção inválida!");
        }
    } while (opcao != "4");
}

gerenciarFolhaPagamento();