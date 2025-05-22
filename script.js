// fetch employees logic
(async function () {
    const data = await fetch('./data.json')
    const res = await data.json();

    let employees = res;
    let selectedEmployeeId = employees[0].id;
    let selectedEmployee = employees[0];

    const employeeList = document.querySelector('.employee_name--list');
    const employeeInfo = document.querySelector('.employees_name--info');

    //rendering logic
    const renderEmployees = () => {
        employeeList.innerHTML = ""
        employees.forEach(elem => {
            const employee = document.createElement('span');
            employee.classList.add('employee_name--list');

            if (parseInt(selectedEmployeeId, 10) === elem.id) {
                employee.classList.add('selected');
                selectedEmployee = elem
            }
            employee.setAttribute("id", elem.id);
            employee.innerHTML = `${elem.firstName} ${elem.lastname} `

            employeeList.append(employee)
        })
    }
    // render single employee
    const renderSingleEmployee = () => {
        employeeInfo.innerHTML = `
        <img src="${selectedEmployee.imageUrl}"/>
        <span class ="employees-single-heading">${selectedEmployee.firstName} ${selectedEmployee.lastname} ${selectedEmployee.age}</span>
        <span>${selectedEmployee.address}</span>
        <span>${selectedEmployee.email}</span>
        <span>Mobile - ${selectedEmployee.contact}</span>
        <span>DOB - ${selectedEmployee.dob}</span>
        `
    }
    if (selectedEmployee) renderSingleEmployee()
    renderEmployees()
    // selecting employees logic
    employeeList.addEventListener("click", (e) => {
        if (e.target.tagName === 'SPAN' && selectedEmployeeId !== e.target.id) {
            selectedEmployeeId = e.target.id;
            renderEmployees()
            renderSingleEmployee()
        }
    })
    // add employee logic
    const createEmployee = document.querySelector(".createEmployee");
    const addEmployeeModal = document.querySelector(".addEmployee");
    const addEmployeeForm = document.querySelector(".addEmployee-create");

    createEmployee.addEventListener("click", () => {
        addEmployeeModal.style.display = "flex"
    });
    addEmployeeModal.addEventListener("click", (e) => {
        if (e.target.className === 'addEmployee') {
            addEmployeeModal.style.display = "none"
        }
    });

    const dobInput = document.querySelector(".dob");
    dobInput.max = `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}`

    addEmployeeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(addEmployeeForm);
        const values = [...formData.entries()]
        let empData = {};
        values.forEach((val) => {
            empData[val[0]] = val[1]
        });
        empData.id = employees[employees.length - 1].id + 1;
        empData.age = new Date().getFullYear() - parseInt(empData.dob.slice(0, 4));
        empData.imageUrl = empData.imageUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        employees.push(empData);
        renderEmployees();
        addEmployeeForm.reset();
        addEmployeeModal.style.display = "none"
    })
    // delete employee logic

})()

