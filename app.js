const express = require("express");
const { createReservation, getReservation } = require("./database");
const app = express();

app.get("/create-reservation", (req, res) => {
    createReservation((error, successMessage) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json({ message: successMessage });
    });
});

app.get("/reservation/:id", async (req, res, next) => {
    try {
        const reservation = await getReservation(req.params.id);
        res.json(reservation);
    } catch (error) {
        next(error);
    }
});

app.use((error, req, res, next) => {
    if (error.message.includes("Database")) {
        return res.status(500).json({ error: "There was an issue with the database" });
    }
    res.status(500).json({ error: "An unexpected error occurred" });
});

app.listen(3000, () => console.log("Server running on port 3000"))