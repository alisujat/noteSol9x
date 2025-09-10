import { asyncHandler } from "../utils/asynchronousHandler.js";
import { ApiError } from "../utils/error.js";
import { ApiResponse } from "../utils/response.js";
import  Note  from "../modals/notes.js";

// CREATE Note
const createNote = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user?._id; // assuming user is attached to req via auth middleware

    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }

    const note = await Note.create({
        title,
        description,
        userId
    });

    return res.status(201).json(
        new ApiResponse(201, note, "Note created successfully")
    );
});

// GET all notes of logged-in user
const getNotes = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const notes = await Note.find({ userId });

    return res
        .status(200)
        .json(new ApiResponse(200, notes, "Notes fetched successfully"));
});

// UPDATE Note
const updateNote = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    const note = await Note.findByIdAndUpdate(
        req.params.id,
        { title, description },
        { new: true, runValidators: true }
    );

    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, note, "Note updated successfully"));
});

// DELETE Note
const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Note deleted successfully"));
});

export {
    createNote,
    getNotes,
    updateNote,
    deleteNote
};
