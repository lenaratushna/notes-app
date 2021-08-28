const createBtn = document.querySelector('.create');

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes) {
    notes.forEach(note => {
        createNewNote(note);
    });
}

createBtn.addEventListener('click', () => {
    createNewNote();
});

function createNewNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
        <div class="note">
            <div class="note__tools">
              <button class="edit"><img width="30px" src="./img/icons/edit.svg" alt="Edit"></button>
              <button class="delete"><img width="30px" src="./img/icons/delete.svg" alt="Delete"></button>
            </div>
            <div class="note__main ${text ? '' : 'hidden'}"></div>
               <textarea class="${text ? 'hidden' : ''}" placeholder="Type here..."></textarea>
        </div> 
        `;

        const editBtn = note.querySelector('.edit'),
              deleteBtn = note.querySelector('.delete'),
              main = note.querySelector('.note__main'),
              textArea = note.querySelector('textarea');

        textArea.value = text;
        main.innerHTML = marked(text);

        editBtn.addEventListener('click', () => {
            main.classList.toggle('hidden');
            textArea.classList.toggle('hidden');
        });

        deleteBtn.addEventListener('click', () => {
            note.remove();

            updateLS();
        });
        
        textArea.addEventListener('input', (e) => {
            const {value} = e.target;
            main.innerHTML = marked(value);

            updateLS();
        });

    document.body.appendChild(note);
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea');
    const notes = [];

    notesText.forEach(note => {
        notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}