const {
  getRoom,
  getRooms,
  createRoom,
  deleteRoom,
  updateRoom,
} = require("../service/room");
const collectRequestData = require("../util/collectRequestData");
const GetParam = require("../util/getParams");

const CreateRoom = async (req, res) => {
  try {
    collectRequestData(req, async (data) => {
      const value = {
        r_class: data.r_class,
      };

      let create = await createRoom(value);

      if (!create) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end("Error occured!");
      }

      const response = {
        message: "Room created successfully",
        data: {
          r_no: create.r_no,
          r_class: create.r_class,
          r_status: create.r_status,
          r_notes: create.r_notes,
        },
        statusCode: 200,
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response));
    });
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
};

const GetRoom = async (req, res, id) => {
  try {
    let room = await getRoom(id);

    if (!room) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end("Room not found!");
    }

    const response = {
      message: "Room fetched successfully",
      data: {
        r_no: room.r_no,
        r_class: room.r_class,
        r_status: room.r_status,
        r_notes: room.r_notes,
      },
      statusCode: 200,
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
};

const GetAllRooms = async (req, res) => {
  try {
    let rooms = await getRooms();

    if (!rooms) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end("Error occured while fetching all rooms!");
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(rooms));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
};

const DeleteRoom = async (req, res, id) => {
  try {
    let room = await deleteRoom(id);
    if (!room) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end("Error occured while deleting this room.!");
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(room));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
};

const UpdateRoom = async (req, res) => {
  try {
    collectRequestData(req, async (data) => {
      const id = data.r_no;
      const roomClasses = ["std_d", "std_t", "sup_d", "sup_t"];
      const findClass = roomClasses.includes(data.r_class);
      if (!findClass) {
        const errorMsg = {
          error:
            "Class such as 'std_d', 'std_t', 'sup_d', 'sup_t' can only be added",
        };
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify(errorMsg));
      }

      const values = {
        r_class: data.r_class,
        r_status: data.r_status,
        r_notes: data.r_notes,
      };

      let room = await getRoom(data.r_no);

      if (!room) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end("Room not found.");
      }

      let updatedRoom = await updateRoom(id, values);
      if (!updatedRoom) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end("Error occured while updating room!");
      }

      const response = {
        message: "Room updated successfully",
        data: {
          r_no: updatedRoom.r_no,
          r_class: updatedRoom.r_class,
          r_status: updatedRoom.r_status,
          r_notes: updatedRoom.r_notes,
        },
        statusCode: 200,
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response));
    });
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
};

module.exports = {
  CreateRoom,
  GetRoom,
  GetAllRooms,
  UpdateRoom,
  DeleteRoom,
};
