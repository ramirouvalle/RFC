export class GenerarRFC {
    constructor(private nombre: string, private paterno: string, private materno: string, private fecha: string) { }
    private rfc: string;
    private primerFactor: number = 34;

    private dirUno: any = {
        ' ': '00',
        '0': '00',
        '1': '01',
        '2': '02',
        '3': '03',
        '4': '04',
        '5': '05',
        '6': '06',
        '7': '07',
        '8': '08',
        '9': '09',
        '&': '10',
        'A': '11',
        'B': '12',
        'C': '13',
        'D': '14',
        'E': '15',
        'F': '16',
        'G': '17',
        'H': '18',
        'I': '19',
        'J': '21',
        'K': '22',
        'L': '23',
        'M': '24',
        'N': '25',
        'O': '26',
        'P': '27',
        'Q': '28',
        'R': '29',
        'S': '32',
        'T': '33',
        'U': '34',
        'V': '35',
        'W': '36',
        'X': '37',
        'Y': '38',
        'Z': '39',
        'Ñ': '40'
    }

    private dirDos: any = {
        '0': '1',
        '1': '2',
        '2': '3',
        '3': '4',
        '4': '5',
        '5': '6',
        '6': '7',
        '7': '8',
        '8': '9',
        '9': 'A',
        '10': 'B',
        '11': 'C',
        '12': 'D',
        '13': 'E',
        '14': 'F',
        '15': 'G',
        '16': 'H',
        '17': 'I',
        '18': 'J',
        '19': 'K',
        '20': 'L',
        '21': 'M',
        '22': 'N',
        '23': 'P',
        '24': 'Q',
        '25': 'R',
        '26': 'S',
        '27': 'T',
        '28': 'U',
        '29': 'V',
        '30': 'W',
        '31': 'X',
        '32': 'Y',
        '33': 'Z'
    }

    private dirTres: any = {
        '0': '00',
        '1': '01',
        '2': '02',
        '3': '03',
        '4': '04',
        '5': '05',
        '6': '06',
        '7': '07',
        '8': '08',
        '9': '09',
        'A': '10',
        'B': '11',
        'C': '12',
        'D': '13',
        'E': '14',
        'F': '15',
        'G': '16',
        'H': '17',
        'I': '18',
        'J': '19',
        'K': '20',
        'L': '21',
        'M': '22',
        'N': '23',
        '&': '24',
        'O': '25',
        'P': '26',
        'Q': '27',
        'R': '28',
        'S': '29',
        'T': '30',
        'U': '31',
        'V': '32',
        'W': '33',
        'X': '34',
        'Y': '35',
        'Z': '36',
        ' ': '37',
        'Ñ': '38'
    }

    private quitarArticulos(palabra: string): string {
        return palabra.replace("DEL ", "").replace("LAS ", "").replace("DE ", "").replace("LA ", "").replace("Y ", "").replace("A ", "");
    }

    private esVocal(letra: string): boolean {
        letra = letra.toUpperCase();
        let sts: boolean = true;
        switch (letra) {
            case "A":
                break;
            case "E":
                break;
            case "I":
                break;
            case "O":
                break;
            case "U":
                break;
            default:
                sts = false
                break;
        }
        return sts;
    }

    private quitarAcentos(strTexto) {
        return strTexto.replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u').replace('Á', 'A').replace('É', 'E').replace('Í', 'I').replace('Ó', 'O').replace('Ú', 'U');
    }

    public calcularRFC() {
        // Eliminar espacios al inicio y final del nombre y apellidos, ademas cambiar todo a mayusculas
        let nombre = this.nombre.trim().toUpperCase();
        let apePaterno = this.paterno.trim().toUpperCase();
        let apeMaterno = this.materno.trim().toUpperCase();

        // Eliminar los articulos de los apellidos
        apePaterno = this.quitarArticulos(apePaterno);
        apeMaterno = this.quitarArticulos(apeMaterno);

        nombre = this.quitarAcentos(nombre);
        apePaterno = this.quitarAcentos(apePaterno);
        apeMaterno = this.quitarAcentos(apeMaterno);

        console.log(nombre);
        console.log(apePaterno);
        console.log(apeMaterno);

        // Agregar el primer caracter del apellido paterno al rfc
        this.rfc = apePaterno.substr(0, 1);
        console.log(this.rfc);

        // Agregar la primera vocal del apellido paterno que no sea el primer caracter
        let i = 0;
        for (let letra of apePaterno) {
            if (this.esVocal(letra) && i > 0) {
                this.rfc += letra;
                break;
            }
            i++;
        }
        console.log(this.rfc);

        // Agregar el primer caracter del apellido materno
        this.rfc += apeMaterno.substr(0, 1);
        console.log(this.rfc);

        // Agregar el primer caracter del primer nombre
        this.rfc += nombre.substr(0, 1);
        console.log(this.rfc);

        // Agregar fecha de nacimiento en formato yymmdd
        this.rfc += this.fecha.substr(6, 8) + this.fecha.substring(2, 4) + this.fecha.substring(0, 2);
        console.log(this.rfc);

        this.calcularHomoclave(nombre + " " + apePaterno + " " + apeMaterno, this.rfc);
    }

    private calcularHomoclave(nombreCompleto: string, rfc: string) {
        let nombreEnNumero = "0";
        // Convertir el nombre completo a su equivalente en numeros segun las tablas 
        for (let i = 0; i < nombreCompleto.length; i++) {
            let letra = nombreCompleto.charAt(i);
            console.log(letra);
            console.log(this.dirUno[letra]);
            if (this.dirUno[letra]) {
                nombreEnNumero += this.dirUno[letra];
            } else {
                nombreEnNumero += "00";
            }
        }
        console.log(nombreEnNumero);

        // Se efectuaran las multiplicaciones de los números tomados de dos en dos para la posición de la pareja y se sumara el resultado de cada multiplicacion
        let sumatoria: number = 0;
        for (let i = 0; i < nombreEnNumero.length - 1; i++) {
            let digitos = nombreEnNumero.substring(i, i + 2);
            let digitoDos = nombreEnNumero.charAt(i + 1);

            console.log(digitos);
            console.log(digitoDos);

            let resultado: number = parseInt(digitos) * parseInt(digitoDos);
            console.log(resultado);
            sumatoria += resultado;
            console.log('---');
        }
        console.log(sumatoria);

        // Obtener los 3 ultimos digitos de la sumatoria y este se divide entre el factor de 34 para obtener el cociente y el residuo
        let sumatoriaLength = sumatoria.toString().length;
        if (sumatoriaLength > 3) {
            let ultimosTresDigitos = sumatoria.toString().substr(sumatoriaLength - 3, sumatoriaLength - 1);
            console.log(ultimosTresDigitos);
            sumatoria = parseInt(ultimosTresDigitos);
        }
        let cociente = Math.floor(sumatoria / this.primerFactor);
        console.log(cociente);

        let residuo = sumatoria % this.primerFactor;
        console.log(residuo);

        // Obtener el valor del cociente y residuo segun la segunda tabla y agregarlos al rfc
        console.log(this.dirDos[cociente]);
        console.log(this.dirDos[residuo]);

    }
}