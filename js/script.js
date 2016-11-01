/**
 * Created by Agnieszka on 2016-10-30.
 */
var offices = [
    { id: "GD", name: "Gdańsk", headquarter: true },
    { id: "GL", name: "Gliwice" },
    { id: "KO", name: "Koszalin" }
];

var workers = [
    { id: 1,  name: "Bartek",     type: "P", office: "GD", salary: 300 },
    { id: 2,  name: "Wojtek",     type: "P", office: "GD", salary: 210 },
    { id: 3,  name: "Piotr",      type: "M", office: "GL", salary: 250 },
    { id: 4,  name: "Damian",     type: "P", office: "KO", salary: 290 },
    { id: 5,  name: "Jan",        type: "P", office: "GL", salary: 210 },
    { id: 6,  name: "Mateusz",    type: "P", office: "GD", salary: 290 },
    { id: 7,  name: "Weronika",   type: "M", office: "KO", salary: 240 },
    { id: 8,  name: "Gabriela",   type: "M", office: "GD", salary: 290 },
    { id: 9,  name: "Alina",      type: "M", office: "KO", salary: 290 },
    { id: 10, name: "Aleksander", type: "P", office: "GL", salary: 260 },
    { id: 11, name: "Tomek",      type: "P", office: "GD", salary: 200 },
    { id: 12, name: "Krzysztof",  type: "M", office: "KO", salary: 290 },
    { id: 13, name: "Marcin",     type: "P", office: "GD", salary: 280 },
    { id: 14, name: "Agata",      type: "P", office: "GD", salary: 230 },
    { id: 15, name: "Magda",      type: "P", office: "KO", salary: 220 }
];

var table = document.getElementById("workers-table-body"),
    addBtn = document.getElementById("add-btn"),
    searchWorker = document.getElementById("input-search-worker"),
    searchBtn = document.getElementById("search-btn");
    searchError = document.getElementById("search-error");
var company = {};

function mapWorkerstoOffices(office) {
    return {
        id: office.id,
        name: office.name,
        headquarter: office.headquarter || false,
        workers: workers.filter( function findWorkersOfOffice(worker) {
            return worker.office === office.id;
        })
    }
}

function addWorkerstoOffices() {
    offices = offices.map(mapWorkerstoOffices);
}

function addOfficesToCompany() {
    for (var office of offices) {
        company[office.name] = office;
    }
}

function calculateAverageWorkersSalary(office) {
    var salarySum = 0;
    for (var i = 0, len = office.workers.length; i < len; i++) {
        salarySum += office.workers[i].salary;
    }
    return salarySum / len;
}

function calculateAverageGlobalSalary() {
    var salarySum = 0;
    var workersLength = 0;
    for (var office in company) {
        workersLength += company[office].workers.length;
        for (var i = 0, len = company[office].workers.length; i < len; i++) {
            salarySum += company[office].workers[i].salary;
        }
    }
    return salarySum/workersLength;
}

function compareSalary(prev, next) {
    return next.salary - prev.salary;
}

function showHighestSalary(office) {
    var sortedWorkers = office.workers.sort(compareSalary);
    return "The best paid worker is " + sortedWorkers[0].name + " and his salary is " + sortedWorkers[0].salary;
}

function displayWorkersTable() {
    var companyWorkersTable = "";
    for (var office in company) {
        for (var i = 0, len = company[office].workers.length; i < len; i++) {
            companyWorkersTable += '<tr><td>' + company[office].workers[i].id + '</td><td>'
                + company[office].workers[i].name + '</td><td>'
                + company[office].workers[i].salary + '</td><td>'
                + office + '</td><td>' + '<span class="remove-worker" id="' + i + '">X</span>' + '</td></tr>';
        }
    }
    table.innerHTML = companyWorkersTable; // zawsze nadpisuje całą zawartość węzła, do którego jest dodawany //
    var spans = document.getElementsByClassName("remove-worker");
    for (var j = 0; j < spans.length; j++) {
        spans[j].addEventListener('click', removeWorker)
    }
}

function Worker(id, name, salary, office) {
    this.id = id;
    this.name = name;
    this.salary = salary;
    this.office = office;
}

function addWorker() {
    var lastId = workers.length;
    var nextId = ++lastId;
    var name = document.getElementById("input-name").value;
    var salary = document.getElementById("input-salary").value;
    var office = document.getElementById("input-office").value;
    var availableOffices = workers.map(function(worker) {
        return worker.office;
    });
    if (availableOffices.indexOf(office) === -1){
        document.getElementById("office-error").innerHTML = "Available offices are GD, GL or KO!";
        return;
    }
    workers.push(new Worker(nextId, name, salary, office));
    console.log(workers);
    addWorkerstoOffices();
    addOfficesToCompany();
    displayWorkersTable();
}

function searchWorkers() {
    workers = workers.filter(function(worker) {
        return worker.name.toLowerCase().indexOf(searchWorker.value.toLowerCase().trim()) !== -1;
    });
    if (workers.length === 0) {
        document.getElementById("search-error").innerHTML = "No workers found!";
    }
    addWorkerstoOffices();
    addOfficesToCompany();
    displayWorkersTable();
}

function removeWorker() {
    var id = parseFloat(this.getAttribute('id'));
    workers.splice(id,1);
    addWorkerstoOffices();
    addOfficesToCompany();
    displayWorkersTable();
    return false;
}

addBtn.addEventListener("click", addWorker);
searchBtn.addEventListener("click", searchWorkers);

addWorkerstoOffices();
addOfficesToCompany();
displayWorkersTable();


