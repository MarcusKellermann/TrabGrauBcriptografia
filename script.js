// Função sobre código de repetição
function repetitionCode(input) {
    let output = '';
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '1') {
            output += '111';  // Repetição do 1
        } else if (input[i] === '0') {
            output += '000';  // Repetição do 0
        }
    }
    return output;
}

// Função  de codificaçao de Hamming (7,4)
function hammingCode(input) {
    const encoded = [];
    for (let i = 0; i < input.length; i += 4) {
        let data = input.slice(i, i + 4);
        if (data.length < 4) {
            data = data.padEnd(4, '0');  // Completa com 0 caso o tamanho seja menor que 4
        }
        // Calcula os bits de paridade
        let parity1 = (parseInt(data[0]) + parseInt(data[1]) + parseInt(data[3])) % 2;
        let parity2 = (parseInt(data[0]) + parseInt(data[2]) + parseInt(data[3])) % 2;
        let parity3 = (parseInt(data[1]) + parseInt(data[2]) + parseInt(data[3])) % 2;

        // Bits codificados de Hamming
        encoded.push(parity1, parity2, data[0], parity3, data[1], data[2], data[3]);
    }
    return encoded.join('');
}

// Função para decodificar o código de repetição
function decodeRepetitionCode(input) {
    let output = '';
    for (let i = 0; i < input.length; i += 3) {
        let triplet = input.slice(i, i + 3);
        if (triplet === '111') {
            output += '1';
        } else if (triplet === '000') {
            output += '0';
        } else {
            output += '?';  // Erro detectado
        }
    }
    return output;
}

// Função para decodificar o código de Hamming (7,4)
function decodeHammingCode(input) {
    let output = '';
    for (let i = 0; i < input.length; i += 7) {
        let codeword = input.slice(i, i + 7);
        if (codeword.length < 7) break; // Ignora código incompleto
        
        // Verificar bits de paridade
        let p1 = (parseInt(codeword[0]) + parseInt(codeword[2]) + parseInt(codeword[4]) + parseInt(codeword[6])) % 2;
        let p2 = (parseInt(codeword[1]) + parseInt(codeword[2]) + parseInt(codeword[5]) + parseInt(codeword[6])) % 2;
        let p3 = (parseInt(codeword[3]) + parseInt(codeword[4]) + parseInt(codeword[5]) + parseInt(codeword[6])) % 2;

        let errorPos = p1 * 1 + p2 * 2 + p3 * 4;  // Calcula a posição do erro 

        if (errorPos !== 0) {
            codeword = codeword.slice(0, errorPos - 1) + (codeword[errorPos - 1] === '0' ? '1' : '0') + codeword.slice(errorPos);
        }

        // Extrair os 4 bits de dados
        output += codeword[2] + codeword[4] + codeword[5] + codeword[6];
    }
    return output;
}

// Função principal para processar os dados
function processData() {
    const input = document.getElementById('input').value.replace(/\s+/g, '');  // Remover espaços extras
    const method = document.getElementById('method').value;
    const operation = document.getElementById('operation').value;
    let output = '';

    // Validação de entrada
    if (!/^[01]+$/.test(input)) {
        output = 'Por favor, insira apenas números binários (0 ou 1).';
    } else {
        // Processar conforme o método e operação escolhidos
        if (method === 'repetition') {
            if (operation === 'encode') {
                output = repetitionCode(input);
            } else if (operation === 'decode') {
                output = decodeRepetitionCode(input);
            }
        } else if (method === 'hamming') {
            if (operation === 'encode') {
                output = hammingCode(input);
            } else if (operation === 'decode') {
                output = decodeHammingCode(input);
            }
        }
    }

    // Exibir o resultado
    document.getElementById('output').textContent = output;
}
