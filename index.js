function simulate() {
    const doors = [0, 1, 2]

    const prizeIndex = Math.floor(Math.random() * 3)
    const playerIndex = Math.floor(Math.random() * 3)

    let removableDoors = doors.filter((door) => (door != prizeIndex && door != playerIndex))

    const removedDoor = (removableDoors.length > 1) ? removableDoors[Math.floor(Math.random() * 2)] : removableDoors[0]
    const switchDoor = doors.filter((door) => door != playerIndex && door != removedDoor)[0]

    if (switchDoor === prizeIndex) return true
    if (playerIndex === prizeIndex) return false
    console.log('Something went wrong')
}

const mainContent = document.getElementById('mainContent');
const gomb = document.getElementById('sim');
gomb.addEventListener('click', function () {
    let staying = 0
    let switching = 0
    for (let index = 0; index < 100000; index++) {
        if (simulate()) switching++
        else staying++
    }

    const result = document.getElementById('result')
    result.textContent = `100 000 szimulációból ${staying} alkalommal a maradás és ${switching} alkalommal a cserélés nyert.`
});