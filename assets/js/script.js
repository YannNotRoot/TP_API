const API_rand_usr = 'https://randomuser.me/api/?results=50';

fetch(API_rand_usr)
    .then(response => response.json())
    .then(data => {
        // Vérif console
        console.table(data.results);

        afficherUtilisateurs(data.results);
    });

function afficherUtilisateurs(listeUtilisateurs) {
    const tbody = document.getElementById('table-users');

    // Boucle pour chaque user
    listeUtilisateurs.forEach(user =>{
        // Icon pour le genre
        const iconGenre = user.gender === 'male' 
        ? '<i class="bi bi-gender-male text-primary fs-4" title="Homme"></i>' 
        : '<i class="bi bi-gender-female text-danger fs-4" title="Femme"></i>';
        
        // Affichage drapeau
        const InitialCountry = user.nat.toLowerCase();
        const flag = `<span class="fi fi-${InitialCountry} me-2"></span>`;
        
        // Concaténation titre + Nom + Prénom
        const nomComplet = `${user.name.title} ${user.name.last} ${user.name.first}`;

        tbody.innerHTML += `
            <tr>
                <td>${user.login.username}</td>
                <td>${iconGenre}</td>
                <td>${nomComplet}</td>
                <td><img src="${user.picture.thumbnail}" class="rounded-circle user-photo" alt="Photo"></td>
                <td>${user.location.city}</td>
                <td>${flag} ${user.location.country}</td>
            </tr>
        `;
    });



    // Envol (60% IA)
    document.querySelectorAll('.user-photo').forEach(photo => {
        let timerEnvol = null;

        // souris
        photo.addEventListener('mouseenter', function() {
            if (!this.classList.contains('animating') && !this.classList.contains('envol-verrouille')) {
                this.classList.add('animating');

                // Au bout de 15s verrouille l'animation 
                timerEnvol = setTimeout(() => {
                    this.classList.add('envol-verrouille');
                }, 15000);
            }
        });

        // Pas souris
        photo.addEventListener('mouseleave', function() {
            // Si pas envol stoppe animation
            if (!this.classList.contains('envol-verrouille')) {
                clearTimeout(timerEnvol);
                this.classList.remove('animating');
            }
        });

        // Fin complète animation
        photo.addEventListener('animationend', function() {
            clearTimeout(timerEnvol);
            this.classList.remove('animating', 'envol-verrouille');
        });
    });
}