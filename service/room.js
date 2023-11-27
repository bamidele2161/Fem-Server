const { client } = require("../config/db");

const getRooms = async () => {
  const result = await client.query("SELECT * FROM room");
  return result.rows;
};

const createRoom = async (room) => {
  try {
    const { r_class } = room;

    const result = await client.query(
      "INSERT INTO room ( r_class ) VALUES ($1) RETURNING *",
      [r_class]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const updateRoom = async (id, user) => {
  const { r_class, note, status } = user;
  const result = await client.query(
    "UPDATE room SET r_class = $1, r_status = $2, r_notes = $3 WHERE r_no = $4 RETURNING *",
    [r_class, status, note, id]
  );
  return result.rows[0];
};

const deleteRoom = async (id) => {
  try {
    const result = await client.query("DELETE FROM room WHERE r_no = $1 ", [
      id,
    ]);

    if (result.rowCount === 1) {
      const response = {
        message: `Room ${id} deleted successfully.`,
      };
      return response;
    }
  } catch (error) {
    throw error;
  }
};

const getRoom = async (id) => {
  try {
    const result = await client.query("SELECT * FROM room WHERE r_no = $1", [
      id,
    ]);
    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
};
