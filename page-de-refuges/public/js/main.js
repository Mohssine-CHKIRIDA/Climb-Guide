// frontend/js/main.js
// Fonction pour récupérer les détails d'un refuge par ID
async function fetchRefugeDetails(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/refuges/${id}`);
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des détails du refuge');
        }
        const refuge = await response.json();

        // Remplir les données du refuge
        document.getElementById('refuge-name').innerText = refuge.nom;
        document.querySelector('.location p').innerHTML = `<i class="fas fa-map-marker-alt"></i> <strong>${refuge.localisation}</strong>`;
        document.querySelector('.altitude p').innerHTML = `<i class="fas fa-mountain"></i> <strong>Altitude:</strong> ${refuge.altitude}m`;
        document.querySelector('.Contact p').innerHTML = `<i class="fas fa-phone"></i> <strong>Contact:</strong> ${refuge.contact}`;
        document.querySelector('.Gardien p').innerHTML = `<i class="fas fa-user"></i> <strong>Gardien:</strong> ${refuge.gardien}`;
        document.getElementById('refuge-description').innerText = refuge.description;

        // Remplir les services
        const servicesContainer = document.getElementById('services-container');
        servicesContainer.innerHTML = ''; // Vider le conteneur actuel
        refuge.services.forEach(service => {
            const serviceElement = document.createElement('div');
            serviceElement.className = 'service-item';
            serviceElement.innerHTML = `
                <img src=${getServiceIcon(service.nom_service)} alt="${service.nom_service}">
                <p>${service.nom_service}</p>
            `;
            servicesContainer.appendChild(serviceElement);
        });

        // Remplir les équipements
        const equipmentContainer = document.getElementById('equipment-container');
        equipmentContainer.innerHTML = ''; // Vider le conteneur actuel
        refuge.equipements.forEach(equipement => {
            const equipementElement = document.createElement('div');
            equipementElement.className = 'equipment-item';
            equipementElement.innerHTML = `
                <img src=${getEquipmentIcon(equipement.nom)} alt="${equipement.nom}">
                <p>${equipement.nom}</p>
            `;
            equipmentContainer.appendChild(equipementElement);
        });

        // Remplir les guides
        const guidesContainer = document.getElementById('guides-container');
        guidesContainer.innerHTML = ''; // Vider le conteneur actuel
        refuge.guides.forEach(guide => {
            const guideElement = document.createElement('div');
            guideElement.className = 'guide-item';
            guideElement.innerHTML = `
                <p><strong>Nom :</strong> ${guide.nom}</p>
                <p><strong>Prénom :</strong> ${guide.prenom}</p>
                <p><strong>Expérience :</strong> ${guide.experience} ans</p>
                <p><strong>Contact :</strong> ${guide.contact_guide}</p>
            `;
            guidesContainer.appendChild(guideElement);
        });

        // Remplir les sommets
        const summitsContainer = document.getElementById('summits-container');
        summitsContainer.innerHTML = ''; // Vider le conteneur actuel
        refuge.sommets.forEach(sommet => {
            const summitElement = document.createElement('div');
            summitElement.className = 'summit-item';
            summitElement.innerHTML = `
                <i class="fas fa-mountain" style="color: #3498db; font-size: 2rem;"></i>
                <h3>${sommet.nom}</h3>
                <p><strong>Altitude :</strong> ${sommet.altitude}m</p>
                <p><strong>Difficulté :</strong> ${sommet.difficulte}</p>
                <p><strong>Temps :</strong> ${sommet.temps}h</p>
            `;
            summitsContainer.appendChild(summitElement);
        });

        // Remplir les prix et la capacité
        document.querySelector('.prix_sans_Restauration').innerHTML = `prix <strong>sans</strong> Restauration: <span class="prix_sans_Restauration">${refuge.prix_sans_restauration} DH</span>`;
        document.querySelector('.prix_avec_Restauration').innerHTML = `prix <strong>avec</strong> Restauration: <span class="prix_avec_restauration">${refuge.prix_avec_restauration} DH</span>`;
        document.querySelector('.places').innerText = refuge.capacite;

        // Remplir les options de guide
        const guideSelect = document.getElementById('guide');
        guideSelect.innerHTML = `<option value="0" selected>Pas de guide</option>`; // Option par défaut
        refuge.guides.forEach(guide => {
            guideSelect.innerHTML += `<option value="${guide.id_guide}">${guide.nom} ${guide.prenom} (${guide.experience} ans)</option>`;
        });
    } catch (error) {
        console.error('Erreur:', error);
        alert('Impossible de charger les détails du refuge. Veuillez réessayer plus tard.');
    }
}

// Fonction pour obtenir l'icône correspondant à l'équipement
function getEquipmentIcon(equipement) {
    const icons = {
        'Cordes': './images/Cordes.png',
        'Crampons': './images/Crampons.png',
        'Piolets': './images/Piolets.png',
        'Tentes': './images/Tentes.png',
        'Raquettes à neige': 'snowflake'
    };
    return icons[equipement];
}
function getServiceIcon(service) {
    const icons = {
        'Eau potable': 'https://refugedaverole.ffcam.fr/csx/scripts/resizer.php?filename=REFUGE_PRESTATIONS%2FpictoON%2F50%2F48%2Fefa81co9ae15o&mime=image%252Fpng&originalname=Icon_57-Eau-courante.png&geometry=56x56',
        'Electricité': 'https://refugedaverole.ffcam.fr/csx/scripts/resizer.php?filename=REFUGE_PRESTATIONS%2FpictoON%2Fb0%2F56%2Fefa81cp1yhd97&mime=image%252Fpng&originalname=Icon_64-Prises-electriques.png&geometry=56x56',
        'Chauffage': 'https://refugedaverole.ffcam.fr/csx/scripts/resizer.php?filename=REFUGE_PRESTATIONS%2FpictoON%2F34%2F66%2Fefa81col3idzj&mime=image%252Fpng&originalname=Icon_60-Chauffage.png&geometry=56x56',
        'Restauration': 'https://refugedaverole.ffcam.fr/csx/scripts/resizer.php?filename=REFUGE_PRESTATIONS%2FpictoON%2Fec%2F43%2Fefa81coy53bep&mime=image%252Fpng&originalname=Icon_63-Restauration.png&geometry=56x56',
        'Couette': 'https://refugedaverole.ffcam.fr/csx/scripts/resizer.php?filename=REFUGE_PRESTATIONS%2FpictoON%2F7d%2F03%2Fefa81cnoifo9r&mime=image%252Fpng&originalname=Icon_51-Couette.png&geometry=56x56',
        'Couverture': 'https://refugedaverole.ffcam.fr/csx/scripts/resizer.php?filename=REFUGE_PRESTATIONS%2FpictoON%2F5a%2Fca%2Fefa81cnstfepu&mime=image%252Fpng&originalname=Icon_52-Couverture.png&geometry=56x56',
        'Douche' : 'https://refugedaverole.ffcam.fr/csx/scripts/resizer.php?filename=REFUGE_PRESTATIONS%2FpictoON%2Fb0%2F75%2Fefa81co5eoilr&mime=image%252Fpng&originalname=Icon_55-Douche.png&geometry=56x56',
        'Vaisselle': 'https://refugedaverole.ffcam.fr/csx/scripts/resizer.php?filename=REFUGE_PRESTATIONS%2FpictoON%2F17%2F50%2Fefa81codb8brv&mime=image%252Fpng&originalname=Icon_58-Vaisselle.png&geometry=56x56',
        'Équipement de cuisson': 'https://refugedaverole.ffcam.fr/csx/scripts/resizer.php?filename=REFUGE_PRESTATIONS%2FpictoON%2F9f%2Fbf%2Fefa81coh8ef2l&mime=image%252Fpng&originalname=Icon_59-Equipement-de-cuisson.png&geometry=56x56',
        'Internet' : 'https://chaletlaberarde.ffcam.fr/csx/scripts/resizer.php?filename=REFUGE_PRESTATIONS%2FpictoON%2F44%2F99%2Fefa81copkm6fj&mime=image%252Fpng&originalname=Icon_61-Wifi.png&geometry=56x56'
    };
    return icons[service] ;
}

// Réservation avec barre d'étapes
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || 2; // ID par défaut 2 si non spécifié
    fetchRefugeDetails(id);

    const reserveBtn = document.getElementById("reserveBtn");
    const reservationSection = document.getElementById("reservationSection");
    const steps = document.querySelectorAll(".step");
    const stepContents = document.querySelectorAll(".step-content");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let currentStep = 1;

    // Afficher/Masquer la section de réservation
    reserveBtn.addEventListener("click", () => {
        reservationSection.classList.toggle("hidden");
        currentStep = 1; // Réinitialiser à la première étape
        updateStepper();
        updateStepContent();
    });

    // Fonction pour mettre à jour la barre d'étapes
    function updateStepper() {
        steps.forEach((step) => {
            const stepNumber = parseInt(step.getAttribute("data-step"));
            if (stepNumber === currentStep) {
                step.classList.add("active");
            } else {
                step.classList.remove("active");
            }
        });
    }

    // Fonction pour afficher la bonne section
    function updateStepContent() {
        stepContents.forEach((content) => {
            const stepNumber = parseInt(content.getAttribute("data-step"));
            if (stepNumber === currentStep) {
                content.classList.add("active");
                content.classList.remove("hidden");
            } else {
                content.classList.remove("active");
                content.classList.add("hidden");
            }
        });

        // Activer/Désactiver les boutons suivant et précédent
        prevBtn.disabled = currentStep === 1;
        nextBtn.textContent = currentStep === steps.length ? "Terminer" : "Suivant";
    }

    // Navigation entre les étapes
    nextBtn.addEventListener("click", () => {
        if (currentStep < steps.length) {
            currentStep++;
            updateStepper();
            updateStepContent();
        } else {
            // Logique de validation finale
            finalizeReservation();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepper();
            updateStepContent();
        }
    });

    // Fonction pour finaliser la réservation
    async function finalizeReservation() {
        const arrival = document.getElementById("arrival").value;
        const departure = document.getElementById("departure").value;
        const people = document.getElementById("people").value;
        const stayOption = document.querySelector("input[name='stay']:checked").value;
        const guideSelect = document.getElementById("guide");
        const guide_id = guideSelect.value;
        const clientName = document.getElementById("client-name").value;
        const clientSurname = document.getElementById("client-surname").value;
        const clientPhone = document.getElementById("client-phone").value;
        const clientEmail = document.getElementById("client-email").value;

        // Calcul du prix (Exemple : 200 MAD par personne par nuit, +100 MAD pour restauration, +500 MAD pour guide)
        const nights = calculateNights(arrival, departure);
        let totalPrice = nights * people * 200; // Prix de base
        if (stayOption === "avec_restauration") totalPrice += nights * people * 100; // Restauration
        if (guide_id && guide_id !== '0') totalPrice += nights * 500; // Guide

        // Remplir le résumé
        document.getElementById("summary-arrival").textContent = arrival;
        document.getElementById("summary-departure").textContent = departure;
        document.getElementById("summary-people").textContent = people;
        document.getElementById("summary-stay").textContent =
            stayOption === "avec_restauration" ? "Avec restauration" : "Sans restauration";
        document.getElementById("summary-guide").textContent = guide_id !== '0' ? guideSelect.options[guideSelect.selectedIndex].text : "Pas de guide";
        document.getElementById("summary-price").textContent = `${totalPrice} DH`;

        // Passer à la dernière étape
        currentStep = 4;
        updateStepper();
        updateStepContent();

        // Envoyer la réservation au backend
        try {
            const response = await fetch('http://localhost:3000/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_refuge: id,
                    nom: clientName,
                    prenom: clientSurname,
                    email: clientEmail,
                    telephone: clientPhone,
                    date_debut: arrival,
                    date_fin: departure,
                    nombre_personne: people,
                    guide_id: guide_id
                })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la réservation');
            }

            const reservation = await response.json();
            alert('Réservation confirmée !');
            // Réinitialiser le formulaire ou rediriger l'utilisateur
            reservationSection.classList.add('hidden');
            resetReservationForm();
        } catch (error) {
            console.error('Erreur:', error);
            alert('Impossible de finaliser la réservation. Veuillez réessayer.');
        }
    }

    // Fonction pour calculer le nombre de nuits
    function calculateNights(arrival, departure) {
        const arrivalDate = new Date(arrival);
        const departureDate = new Date(departure);
        const diffTime = Math.abs(departureDate - arrivalDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    // Fonction pour réinitialiser le formulaire de réservation
    function resetReservationForm() {
        document.getElementById("arrival").value = '';
        document.getElementById("departure").value = '';
        document.getElementById("people").value = '';
        document.querySelector("input[name='stay'][value='sans_restauration']").checked = true;
        document.getElementById("guide").value = '0';
        document.getElementById("client-name").value = '';
        document.getElementById("client-surname").value = '';
        document.getElementById("client-phone").value = '';
        document.getElementById("client-email").value = '';
        currentStep = 1;
        updateStepper();
        updateStepContent();
    }

    // Initialiser les données des services et équipements
    async function fetchServicesAndEquipments() {
        try {
            const response = await fetch(`http://localhost:3000/api/refuges/2`);
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des services et équipements');
            }
            const refuge = await response.json();

            // Remplir les options de guide
            const guideSelect = document.getElementById('guide');
            guideSelect.innerHTML = `<option value="0" selected>Pas de guide</option>`; // Option par défaut
            refuge.guides.forEach(guide => {
                guideSelect.innerHTML += `<option value="${guide.id_guide}">${guide.nom} ${guide.prenom} (${guide.experience} ans)</option>`;
            });
        } catch (error) {
            console.error('Erreur:', error);
        }
    }

    // Appeler la fonction pour remplir les guides
    fetchServicesAndEquipments();
});
