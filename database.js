const simulateDelay = (callback) => {
    setTimeout(() => {
        const isSuccess = Math.random() > 0.5;
        if (isSuccess) {
            callback(null, "Reservation created successfully!");
        } else {
            callback(new Error("Database Error: Failed to create reservation"));
        }
    }, 1000);
};

function createReservation(callback) {
    simulateDelay(callback);
}

function getReservation(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isSuccess = Math.random() > 0.5;
            if (isSuccess) {
                resolve({ id, message: "Reservation found!" });
            } else {
                reject(new Error("Database Error: Reservation not found"));
            }
        }, 1000);
    });
}
module.exports = { createReservation, getReservation }