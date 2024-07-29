const { Command } = require("commander");
const packageJson = require("./package.json");

const program = new Command();
program.version(packageJson.version);

function parseCnpj(cnpj) {
     return cnpj.replace(/\D/g, '');
}

program
     .command('cnpj <number>')
     .description('Consulta informações de um CNPJ')
     .action((number) => {
          console.log(`Consultando informações do CNPJ: ${number}`);
          fetch(`https://brasilapi.com.br/api/cnpj/v1/${parseCnpj(number)}`, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json',
               }
          })
               .then(response => response.json())
               .then(data => {
                    console.log(data);
               })

     });

program
     .command('ddd <number>')
     .description('Consulta informações de um DDD')
     .action((number) => {
          console.log(`Consultando informações do DDD: ${number}`);
     });

program
     .command('corretoras')
     .description('Lista todas as corretoras')
     .action(() => {
          console.log('Listando todas as corretoras');
     });

program
     .command('help [command]')
     .description('Exibe ajuda para um comando específico')
     .action((command) => {
          if (command) {
               const cmd = program.commands.find(c => c.name() === command);
               if (cmd) {
                    cmd.help();
               } else {
                    console.log(`Comando "${command}" não encontrado.`);
               }
          } else {
               program.help();
          }
     });

program.parse(process.argv);