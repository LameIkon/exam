import bcrypt from "bcrypt";

// Simuleret POST-request body
const postedPassword = req.body.password;

// Hashet password hentet fra databasen (eksempel)
const hashedPasswordFromDB = user.password; // fx "$2b$10$abc123..."

async function checkPassword(postedPassword, hashedPasswordFromDB) {
    const isMatch = await bcrypt.compare(postedPassword, hashedPasswordFromDB);

    if (isMatch) {
        console.log("Password er korrekt");
        return true;
    } else {
        console.log("Password er forkert");
        return false;
    }
}

// Brug funktionen
checkPassword(postedPassword, hashedPasswordFromDB);
