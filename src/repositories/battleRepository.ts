import connection from "../../database/config/postgres.js";

export async function findFighterByUsername(username: string) {
    const result = await connection.query(
        `
        SELECT * FROM fighters WHERE username=$1
        `,
        [username]
      );
      return result.rows[0];
    }

export async function insertFighter(username: string){
    const result = await connection.query(
        `
        INSERT INTO fighters (username, wins, losses, draws) 
        VALUES ($1, 0, 0, 0)
        RETURNING id;
      `,
        [username]
      );
    
      return result.rows[0];
    }

export async function updateBattle(id: number, column: "wins" | "losses" | "draws") {
  connection.query(
    `
    UPDATE fighters 
     SET ${column} = ${column}+1
    WHERE id = $1
  `,
    [id]
  );
  
}

export async function getRanking() {
    const result = await connection.query(
    `
    SELECT * FROM fighters
    ORDER BY wins, draws DESC
    `
    );
    return result.rows;
}