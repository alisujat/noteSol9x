import { Router } from "express";
import { 
    createNote,
    getNotes,
    updateNote,
    deleteNote
} from "../controllers/notes.js";
import { verifyJWT } from "../middleware/authentication.js";

const router = Router();

// Protect all note routes with verifyJWT
router.use(verifyJWT);

// Notes CRUD routes
router.route("/")
    .post(createNote)     // Create a note
    .get(getNotes);       // Get all notes of logged-in user

router.route("/:id")
    .put(updateNote)      // Update note
    .delete(deleteNote);  // Delete note

export default router;
