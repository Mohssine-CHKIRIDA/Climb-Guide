
async function displayRefuges() {
    const country = document.getElementById("country").value;
    const region = document.getElementById("regions").value;
    const sommet = document.getElementById("mountains").value;

    // Construire l'URL avec les paramètres de requête
    const url = new URL("http://localhost:5000/refuge");
    url.searchParams.append("country", country);
    url.searchParams.append("region", region);
    url.searchParams.append("sommet", sommet);
    console.log(url.href)

    try {
        const response = await fetch(url, {
            method: "GET", // Utilisez GET ici
        });

        if (!response.ok) throw new Error("Erreur lors de la recherche.");

        const refuges = await response.json();

        // Traitement des résultats (comme dans votre code existant)
        const container = document.querySelector(".refuges");
        container.innerHTML = ""; // Nettoyer les anciens résultats

        if (refuges.length === 0) {
            container.innerHTML = "<p>Aucun refuge trouvé.</p>";
            return;
        }
        const uniqueRefuges = refuges.filter((refuge, index, self) =>
            index === self.findIndex((r) =>
                JSON.stringify(r) === JSON.stringify(refuge)
            )
        );

        uniqueRefuges.forEach((refuge) => {
            console.log(refuge.id_refuge);
            const refugeElement = `
                <div class="refuge">
                    <img src="images/${refuge.id_refuge}.jpg" alt="${refuge.nom}">
                    <div class="refuge-info">
                        <h3>${refuge.nom}</h3>
                        <p>${refuge.localisation }- ${refuge.altitude}m -${refuge.capacite} places</p>
                        <p>Gardien(ne) : ${refuge.gardien}</p>
                        <p>Tel : ${refuge.contact}</p>
                        <p>${refuge.description}</p>
                        <button><a href="page-de-refuges/public/index.html?id=${refuge.id_refuge}" target="_blank"> Voir le site</a></button>

                    </div>
                </div>
            `;
            container.innerHTML += refugeElement;
        });
    } catch (error) {
        console.error("Erreur:", error.message);
    }
}
const data = {
    Maroc: {
        Imlil: ["Toubkal", "Ouanoukrim"],
        Oukaimeden: ["Angour"],
        Mgoun: ["Mgoun"],
        Tachdirt_Asni: ["Angour"],
        Azilal:["Mgoun"],
        Taghia_Zaouit_Ahnsal:["Timghazine"],
        Amsefran_Azilal:["Amsafrane"],
        Bab_Bered:["Tizirane"],
        Tazarhart:["Timghazine"],
        Azila_Issaken:["Tidghine"]
    },
    France: {
        Alpes: ["Mont Blanc", "Barre des Écrins"],
        Pyrénées: ["Pic du Midi", "Vignemale"],
        Vosges: ["Grand Ballon", "Hohneck"]
    }
};

// Sélecteurs
const countrySelect = document.getElementById("country");
const regionSelect = document.getElementById("regions");
const mountainSelect = document.getElementById("mountains");

// Fonction pour mettre à jour les options d'un select
const updateOptions = (select, options) => {
    select.innerHTML = '<option value="">-- Choisissez une option --</option>'; // Réinitialise les options
    options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
    });
    select.disabled = options.length === 0; // Désactive si pas d'options
};

// Écoute le changement de pays
countrySelect.addEventListener("change", () => {
    const selectedCountry = countrySelect.value;

    if (selectedCountry && data[selectedCountry]) {
        // Met à jour les régions
        updateOptions(regionSelect, Object.keys(data[selectedCountry]));
        updateOptions(mountainSelect, []); // Réinitialise les montagnes
    } else {
        // Réinitialise si aucun pays sélectionné
        updateOptions(regionSelect, []);
        updateOptions(mountainSelect, []);
    }
});

// Écoute le changement de région
regionSelect.addEventListener("change", () => {
    const selectedCountry = countrySelect.value;
    const selectedRegion = regionSelect.value;

    if (selectedCountry && selectedRegion && data[selectedCountry][selectedRegion]) {
        // Met à jour les montagnes
        updateOptions(mountainSelect, data[selectedCountry][selectedRegion]);
    } else {
        // Réinitialise les montagnes si aucune région valide
        updateOptions(mountainSelect, []);
    }
});

