const inquirer = require("inquirer");
const chalk = require("chalk");
const clipboardy = require("clipboardy").default;
const { generarPassword } = require("./generator");

let ultimaPassword = null;

console.clear();
console.log(chalk.greenBright("╔═══════════════════════════════════════╗"));
console.log(chalk.greenBright("║"+ chalk.green("+-------------------------------------+")+"║"));
console.log(chalk.greenBright("║" + ("            ")+ chalk.bold.red("PASSWORD MANAGER")+("           ")+"║"));
console.log(chalk.greenBright("║"+ chalk.green("+-------------------------|------------+")+"║"));
console.log(chalk.greenBright("╚═══════════════════════════════════════╝\n"));
async function main() {
    const opciones = await inquirer.prompt([
        {
            type: "list",
            name: "opcion",
            message: chalk.cyanBright("¿Qué deseas hacer?"),
            choices: [
                "1. Generar nueva contraseña",
                "2. copiar contraseña al portapapeles",
                "3. Salir"
            ]
        }
    ]);

    switch (opciones.opcion) {
        case "1. Generar nueva contraseña":
            const config = await inquirer.prompt([
                {
                    type: "number",
                    name: "length",
                    message: "longitud de la contraseña",
                    default: 12
                },
                {
                    type: "confirm",
                    name: "numbers",
                    message: "Incluir numeros?",
                    default: true
                },
                {
                    type: "confirm",
                    name: "symbols",
                    message: "Incluir simbolos?",
                    default: true
                },
                {
                    type: "confirm",
                    name: "uppercase",
                    message: "Incluir mayusculas?",
                    default: true
                }
            ]);

            const nuevaPassword = generarPassword(config);
            ultimaPassword = nuevaPassword;
            console.log(chalk.greenBright("****************************************"));
            console.log(chalk.green("          contraseña generada         "));
            console.log(chalk.yellowBright.bold( "        contraseña:"+ chalk.underline.blueBright(nuevaPassword)));
            console.log(chalk.greenBright("****************************************\n"));

            break
        case "2. copiar contraseña al portapapeles":
            if (ultimaPassword) {
                await clipboardy.write(ultimaPassword);
                console.log(chalk.blue("**************************************\n"));
                console.log(chalk.blue("  Contraseña copiada al portapapeles.\n"));
                console.log(chalk.blue("***************************************\n"));
            } else {
                console.log(chalk.red("***************************************\n"));
                console.log(chalk.red("No haz generado ninguna contraseña aun.\n"));
                console.log(chalk.red("***************************************\n"));
            } break

        case "3. Salir":
            console.log(chalk.greenBright("╔═══════════════════════════════════════╗"));
            console.log(chalk.greenBright("║"+ chalk.green("+-------------------------------------+")+"║"));
            console.log(chalk.greenBright("║" + chalk.red("   Gracias por usar PASSWORD-MANAGER")+"   ║"));
            console.log(chalk.greenBright("║" + chalk.red("             hasta luego!!")+"             ║"));
            console.log(chalk.greenBright("║"+ chalk.green("+-------------------------------------+")+"║"));
            console.log(chalk.greenBright("╚═══════════════════════════════════════╝\n"));
            process.exit(0);
    }
    await main();
}

main()