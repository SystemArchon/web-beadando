class Card {
    constructor(title) {
        this.title = title;
        this.cardElement = document.createElement('div');
        this.cardElement.className = 'card';
    }

    render() {
        const heading = document.createElement('h2');
        heading.innerText = this.title;
        this.cardElement.appendChild(heading);
        return this.cardElement;
    }
}

class ProfileCard extends Card {
    constructor(title, age) {
        super(title);
        this.age = age;
    }

    render() {
        const card = super.render();

        const ageP = document.createElement('p');
        ageP.innerText = `Kor: ${this.age}`;
        card.appendChild(ageP);

        return card;
    }
}

const container = document.getElementById('container');

const people = [
    { name: "Kovács Anna", age: 22 },
    { name: "Szabó Béla", age: 28 },
    { name: "Kiss Gábor", age: 19 }
];

people.forEach(person => {
    const profile = new ProfileCard(person.name, person.age);
    document.body.appendChild(profile.render());
});
