import pool from '../config/database.js';

export const RefugeModel = {
  getAllRefuges: async () => {
    try {
      const query = `
        SELECT r.*, 
          array_agg(DISTINCT s.nom_service) as services,
          array_agg(DISTINCT e.nom) as equipements
        FROM refuge r
        LEFT JOIN relier rel ON r.id_refuge = rel.id_refuge
        LEFT JOIN service s ON rel.id_service = s.id_service
        LEFT JOIN posseder p ON r.id_refuge = p.id_refuge
        LEFT JOIN equipement e ON p.id_equipement = e.id_equipement
        GROUP BY r.id_refuge
      `;
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des refuges: ${error.message}`);
    }
  },
 

  getRefugeById: async (id) => {
    try {
      // Informations du refuge
      const refugeQuery = `
        SELECT * FROM refuge WHERE id_refuge = $1
      `;
      const refugeResult = await pool.query(refugeQuery, [id]);
      
      if (refugeResult.rows.length === 0) {
        throw new Error('Refuge non trouvé');
      }

      const refuge = refugeResult.rows[0];

      // Services
      const servicesQuery = `
        SELECT s.* 
        FROM service s
        JOIN relier r ON s.id_service = r.id_service
        WHERE r.id_refuge = $1
      `;
      const servicesResult = await pool.query(servicesQuery, [id]);

      // Équipements
      const equipmentQuery = `
        SELECT e.* 
        FROM equipement e
        JOIN posseder p ON e.id_equipement = p.id_equipement
        WHERE p.id_refuge = $1
      `;
      const equipmentResult = await pool.query(equipmentQuery, [id]);

      // Guides
      const guidesQuery = `
        SELECT g.* 
        FROM guide g
        JOIN fournir f ON g.id_guide = f.id_guide
        WHERE f.id_refuge = $1
      `;
      const guidesResult = await pool.query(guidesQuery, [id]);

      // Sommets accessibles
      const sommetsQuery = `
        SELECT s.* 
        FROM sommet s
        JOIN relier_sommet_refuge r ON s.id_sommet = r.id_sommet
        WHERE r.id_refuge = $1
      `;
      const sommetsResult = await pool.query(sommetsQuery, [id]);

      return {
        ...refuge,
        services: servicesResult.rows,
        equipements: equipmentResult.rows,
        guides: guidesResult.rows,
        sommets: sommetsResult.rows
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du refuge: ${error.message}`);
    }
  },

  createReservation: async (reservationData) => {
    const {
      id_refuge,
      nom,
      prenom,
      email,
      telephone,
      date_debut,
      date_fin,
      nombre_personne,
      guide_id
    } = reservationData;

    try {
      // Commencer une transaction
      const client = await pool.connect();
      try {
        await client.query('BEGIN');

        // Créer le client
        const clientQuery = `
          INSERT INTO client (nom, prenom, email, telephone, type_client)
          VALUES ($1, $2, $3, $4, 'Randonneur')
          RETURNING id_client
        `;
        const clientResult = await client.query(clientQuery, [nom, prenom, email, telephone]);
        const id_client = clientResult.rows[0].id_client;

        // Créer la réservation
        const reservationQuery = `
          INSERT INTO reservation (
            date_reservation,
            date_debut,
            date_fin,
            nombre_personne,
            etat_reservation,
            id_client,
            id_refuge
          )
          VALUES (CURRENT_DATE, $1, $2, $3, 'Confirmée', $4, $5)
          RETURNING *
        `;
        const reservationResult = await client.query(reservationQuery, [
          date_debut,
          date_fin,
          nombre_personne,
          id_client,
          id_refuge
        ]);

        // Si un guide est sélectionné, créer la relation guide-client
        if (guide_id) {
          const guiderQuery = `
            INSERT INTO guider (id_guide, id_client)
            VALUES ($1, $2)
          `;
          await client.query(guiderQuery, [guide_id, id_client]);
        }

        await client.query('COMMIT');
        return reservationResult.rows[0];
      } catch (e) {
        await client.query('ROLLBACK');
        throw e;
      } finally {
        client.release();
      }
    } catch (error) {
      throw new Error(`Erreur lors de la création de la réservation: ${error.message}`);
    }
  }
};