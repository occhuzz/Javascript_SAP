/*
Realizar un programa para web (Con interfaz Gráfica), en el cual el alumno introduce sus datos al ingresar:

Nombre, DNI, Fecha de nacimiento, teléfono, email, numero de legajo, Curso.

Validar si el alumno pertenece al Curso:
    -Si el alumno cumple con el rango de edad para el curso seleccionado
    -Si el alumno es mayor de 18
    -Validar largo de teléfono (10) y email (50)
    -Si el número de legajo es correcto con el DNI (Numero de Legajo se forma con: “A” + curso + DNI + “2021”)

Ingresar notas y su valor ponderado (como cuando un examen vale un 30% y otro examen el 70%). 
Materias:
    -Química (Aprobado 10%)
    -Matemática (Aprobado 20%)
    -Ciencias Sociales (Aprobado 5%)
    -Física (Aprobado 10%)
    -Historia (Aprobado 5%)
    -Biología (Aprobado 20%)
    -Informática (Aprobado 30%)
    -Idiomas (Aprobado 30%)

Se debe permitir:

*Buscar un alumno:
    -Debe podir seleccionar por qué dato se va a buscar: DNI, nombre, celular o email.
        .A continuación, debe poder ingresar el valor que se va a buscar.
        .Si el alumno existe debe mostrar la información del alumno con todos sus datos.
        .Si el alumno no existe debe mostrar un mensaje informándolo.
        .A continuación, debe pedir si se desea realizar nuevamente el procedimiento: 
            -Si la respuesta es afirmativa, debe volver a realizar el procedimiento
            -Si la respuesta es negativa, debe llevar al menú de operaciones

*Listar todos los alumnos:
    -Debe mostrar un listado con todos los usuarios y todos sus datos: 
        .Legajo Curso   DNI Nombre  Fecha Nacimiento    Teléfono    Email
    -Luego debe llevar al menú de operaciones.

    .Debe poder mostrar un listado por materia con los alumnos aprobados y desaprobados según selección. Además un mensaje advirtiendo si el alumno paso de Año (Debe tener un porcentaje total mayor o igual al 100%)

*Salir del programa:
    -Debe preguntar si desea confirmar la operación:
        .Si la respuesta es afirmativa debe mostrar un mensaje de despedida y salir del programa
        .Si la respuesta es negativa debe volver al menú de operaciones
*/

let arrayAlumnos = []   //Array de Alumnos

let arrayMaterias = ["quimica","matematica","csociales","fisica","historia","biologia","informatica","idiomas"] //Array de notas

let arrayCursos =   //Array de cursos
[
    {
        nombreCurso: "A",
        edadMinima: 18,
        edadMaxima: 25,
    },
    {
        nombreCurso: "B",
        edadMinima: 26,
        edadMaxima: 30,
    },
    {
        nombreCurso: "C",
        edadMinima: 31,
        edadMaxima: 35,
    },
]

//-----------------------------------------------------------------------------------------------------------
//VERIFICACIONES

function verificarNombre()  //Verificar nombre válido
{
    var letras = /^[A-Za-z]+$/;
    
    let dato = document.getElementById("nombre").value;

    if(!(dato.match(letras)) || dato == "")
    {
        alert("Ingrese sólo letras");
        return false;
    }
    else
        return dato;
}

function verificarDNITelefono() //Verificar DNI y Teléfono válido
{
    let dni = parseInt(document.getElementById("dni").value);
    let telefono = document.getElementById("telefono").value;

    if(telefono.length > 10)
    {
        alert("Máximo de 10 números para el teléfono");
        return false;
    }

    if((isNaN(dni) || isNaN(parseInt(telefono))))
    {
        alert("Ingrese sólo números.");
        return false;
    }

    return dni;
}

function verificarEmail()   //Verificar email válido
{
    let dato = document.getElementById("email").value;

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(dato.length > 50)
    {
        alert("Máximo de 50 caracteres para el email.");
        return false;
    }

    if(re.test(dato))
    {
        return dato;
    }
    else
    {
        alert("El email ingresado no es válido.");
        return false;
    }
}

function verificarEdad()    //Verificar edad
{
    let dato = document.getElementById("nacimiento").value;

    let anio = parseInt(dato.slice(0,4));

    if((2021 - anio) > 18)
    {
        return (2021 - anio);
    }
    else
    {
        alert("Debe ser mayor de 18 años para ingresar. Edad: " + (2021 - anio));
        return false;
    }
}

function verificarCurso(okEdad) //Verificar curso correcto
{
    let curso = document.getElementById("curso").value.toUpperCase();
    let ok;

    if(curso == "")
    {
        alert("Ingrese curso.");
        return false;
    }

    if(okEdad)
    {
        arrayCursos.forEach(recorrerCursos);

        function recorrerCursos(e)
        {
            if(e.nombreCurso == curso)
            {
                if(e.edadMinima < okEdad && e.edadMaxima > okEdad)
                {
                    ok = curso;
                }
                else
                {
                    ok = false;
                }
            }
        }
        if(ok == false)
        {
            return false;
        }
        else
        {
            return curso;
        }
    }
    else
    {
        return false;
    }
}

function verificarLegajo(okCurso,okDNITel)  //Verificar legajo
{
    let dato = document.getElementById("legajo").value.toUpperCase();
    let ok = "A"+okCurso+okDNITel+"2021";

    if(dato === ok)
    {
        return dato;
    }
    else
    {
        return false;
    }
}

/*----------------------------------------------------------------------------------------------------------------*/

function login()    //Login de alumno y comprobaciones
{
    let okNombre = verificarNombre();
    let okDNITel = verificarDNITelefono();
    let okEmail = verificarEmail();
    let okEdad = verificarEdad();
    let okCurso = verificarCurso(okEdad);
    let okLegajo = verificarLegajo(okCurso,okDNITel);

    let alumno = 
    {
        nombre: "",
        dni: "",
        telefono: "",
        email: "",
        edad: "",
        curso: "",
        legajo: "",
        fechaNacimiento: "",
        materia:
            {
                quimica:"",
                matematica:"",
                csociales:"",
                fisica:"",
                historia:"",
                biologia:"",
                informatica:"",
                idiomas:"",
            },
        aprobado: 0,
    }

    if(okNombre == false || okDNITel == false || okEmail == false || okCurso == false || okLegajo == false)
    {
        alert("Ingrese los datos correctamente.");
    }
    else
    {
        alumno.nombre = okNombre;
        alumno.dni = okDNITel;
        alumno.telefono = document.getElementById("telefono").value;
        alumno.email = okEmail;
        alumno.edad = okEdad;
        alumno.curso = okCurso;
        alumno.legajo = okLegajo;
        alumno.fechaNacimiento = document.getElementById("nacimiento").value;

        asignarNotas(alumno);
    }
}

function asignarNotas(alumno) //Pasar las notas al array de notas
{
    alumno.materia.quimica = parseInt(document.getElementById("quimica").value);
    alumno.materia.matematica = parseInt(document.getElementById("matematica").value);
    alumno.materia.csociales = parseInt(document.getElementById("csociales").value);
    alumno.materia.fisica = parseInt(document.getElementById("fisica").value);
    alumno.materia.historia = parseInt(document.getElementById("historia").value);
    alumno.materia.biologia = parseInt(document.getElementById("biologia").value);
    alumno.materia.informatica = parseInt(document.getElementById("informatica").value);
    alumno.materia.idiomas = parseInt(document.getElementById("idiomas").value);

    if(alumno.materia.quimica >= 5)
        alumno.aprobado += 10;

    if(alumno.materia.matematica >= 5)
        alumno.aprobado += 20;

    if(alumno.materia.csociales >= 5)
        alumno.aprobado += 5;
    
    if(alumno.materia.fisica >= 5)
        alumno.aprobado += 10;

    if(alumno.materia.historia >= 5)
        alumno.aprobado += 5;

    if(alumno.materia.biologia >= 5)
        alumno.aprobado += 20;

    if(alumno.materia.informatica >= 5)
        alumno.aprobado += 30;

    if(alumno.materia.idiomas >= 5)
        alumno.aprobado += 30;

    arrayAlumnos.push(alumno);

    menuPrincipal();
}

/*----------------------------------------------------------------------------------------------------------------*/

function menuPrincipal(anterior)    //Crea el menú de operaciones en el body y borra la vista anterior
{
    switch(anterior)
    {
        case 1: document.getElementById("buscarAlumno").style.visibility = "hidden";
        break;
        case 2: document.getElementById("volver").remove();
        break;
        case 3:
    }
    
    document.getElementById("login").innerHTML = "";
    let op = document.createElement("div");
    op.id="menuOperaciones";
    document.body.append(op);

    let menu = document.createElement("div");
    menu.innerHTML = "<h2>Buscar alumno</h2><input type='button' value='Buscar'onclick='buscarAlumno()'><h2>Listar alumnos</h2><input type='button' value='Listar' onclick='listarAlumno()'><h2>Listar materias</h2><input type='button' value='Listar Materias' onclick='listarMaterias(arrayAlumnos)'><h2>Salir</h2><input type='button' value='Salir' onclick='salir()'>";

    document.getElementById("menuOperaciones").append(menu);
}

/*----------------------------------------------------------------------------------------------------------------*/
//BUSCAR ALUMNOS
function buscarAlumno() //Muestra la vista de búsqueda
{
    document.getElementById("menuOperaciones").remove();

    document.getElementById("buscarAlumno").style.visibility = "visible";
}

function buscar()   //Busca el input escrito para buscar en la base de alumnos según el campo escrito
{
    let encontrado = false;

    if(document.getElementById("buscarDNI").value !="")
    {
        let dato = document.getElementById("buscarDNI").value;
        arrayAlumnos.forEach(busqueda);

        function busqueda(e)
        {
            if(e.dni == dato)
            {
                encontrado = true;
                mostrarInfo(e);
            }
        }
    }
    else if(document.getElementById("buscarNombre").value !="")
    {
        let dato = document.getElementById("buscarNombre").value;
        arrayAlumnos.forEach(busqueda);

        function busqueda(e)
        {
            if(e.nombre == dato)
            {
                encontrado = true;
                mostrarInfo(e);
            }
        }
    }
    else if(document.getElementById("buscarCel").value !="")
    {
        let dato = document.getElementById("buscarCel").value;
        arrayAlumnos.forEach(busqueda);

        function busqueda(e)
        {
            if(e.telefono == dato)
            {
                encontrado = true;
                mostrarInfo(e);
            }
        }
    }
    else if(document.getElementById("buscarEmail").value !="")
    {
        let dato = document.getElementById("buscarEmail").value;
        arrayAlumnos.forEach(busqueda);

        function busqueda(e)
        {
            if(e.email == dato)
            {
                encontrado = true;
                mostrarInfo(e);
            }
        }
    }
    if(encontrado == false )
    {
        volver = confirm("No encontrado.¿Desea volver a ingresar los datos?");
        if(!volver)
            menuPrincipal(1);
    }
}

/*----------------------------------------------------------------------------------------------------------------*/
//LISTAR ALUMNOS
function listarAlumno(arrayAlumnos)
{
    document.getElementById("menuOperaciones").remove();

    let btnVolver = document.createElement("button");
    btnVolver.id = "volver";
    btnVolver.innerText = "Volver";
    btnVolver.addEventListener("click",menuPrincipal(2));

    arrayAlumnos.forEach(listar);

    function listar(e)
    {
        mostrarInfo(e);
    }
}

function mostrarInfo(objeto)
{
    document.getElementById("info").innerHTML = "<h2>"+objeto.nombre+"</h2><p>Legajo: "+objeto.legajo+"</p><p>Curso: "+objeto.curso+"</p><p>DNI: "+objeto.dni+"</p><p>Fecha Nacimiento: "+objeto.fechaNacimiento+"</p><p>Teléfono: "+objeto.telefono+"</p><p>Email: "+objeto.email+"</p>";    
}

//----------------------------------------------------------------------------------------
//LISTAR MATERIAS

function listarMaterias(arrayAlumnos)
{
    document.getElementById("menuOperaciones").remove();

    let btnVolver = document.createElement("button");
    btnVolver.id = "volver";
    btnVolver.innerText = "Volver";
    btnVolver.addEventListener("click",menuPrincipal(2));

    arrayMaterias.forEach(listar);

    function listar(e)
    {
        //mostrarInfoMaterias(e);
    }
}
/*
function mostrarInfoMaterias(objeto)
{
    document.getElementById("info").innerHTML = "<h2>"+ objeto +"</h2><p>Aprobados: " + arr;    
}*/

//----------------------------------------------------------------------------------------
//SALIR

function salir()
{
    let salir = confirm("¿Salir del programa?");

    if(salir)
    {
        alert("Hasta luego.");
        window.close();
    }
}