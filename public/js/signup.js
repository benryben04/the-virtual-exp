const getData = (query)=>{
    const dataJSON = localStorage.getItem(query)
    if(dataJSON !== null){
        return JSON.parse(dataJSON)
    } else {
        return []
    }
}

const createNewUser = (data)=>{
    localStorage.setItem('Users', JSON.stringify(data)) 
}

const sendError = (msg)=>{
    const errorEl = document.createElement('div')
    errorEl.classList.add('alert', 'alert-warning')
    errorEl.textContent = msg
    document.querySelector('#error-field').appendChild(errorEl)
}

document.querySelector('#sign-up').addEventListener('submit', (e)=>{
    document.querySelector('#error-field').innerHTML = ''
    e.preventDefault()
    let users = getData('Users')
    let inputtedEmail = document.querySelector('#email').value
    let inputtedPassword = document.querySelector('#password').value
    let inputtedGrade = document.querySelector('#grade-input').options[document.querySelector('#grade-input').selectedIndex].text
    let newUser = {
        email: inputtedEmail,
        password: inputtedPassword,
        grade: inputtedGrade
    }
    let count = 0
    users.forEach((user)=>{
        if(user.email !== inputtedEmail){
            count++
        }
    })
    if(count === users.length){
        users.push(newUser)
        createNewUser(users)
        window.location.href = "/login"
        console.log(users)
    } else {
        sendError('Email already taken')
    }
})