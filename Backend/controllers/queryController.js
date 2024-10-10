import asyncHandler from "../utilities/asyncHandler.js"
// import  dbConnectionInstance  from "../DB/database.js";
import {ApiError} from "./../utilities/apiError.js"
import dbConnectionInstance from "../index.js";

const registerUser = asyncHandler(async (req,res)=>{
    // console.log(req);
    let conn;

    
    try {
        // Get the database connection
        conn = await dbConnectionInstance();

        // Extract data from the request body
        const { name,  _class, roll_number } = req.body;
        if(!(name && _class && roll_number))
            throw new ApiError(400,"all fields Are required")
        
        
        // Run the insert query using async/await
        const sql = 'INSERT INTO student_table (name, _class, roll_number) VALUES (?)';
        const values= [
            name,
            _class,
            roll_number
        ]
        conn.query(sql,[values],(err,data)=>{
            if(err){
                console.log("error",err);
            }
            console.log("data",data);
            return res.status(201).json({
                message: 'Student added successfully',
                studentId: data
            });
        })
        // Send success response

    } catch (error) {
        // Handle database errors
        console.error('Error adding the student:', error);
        throw new ApiError(500,"Error adding the student")
        
    } finally {
        // Ensure the connection is closed
        if (conn) await conn.end();
    }
})

const getAllStudents = asyncHandler(async (req, res) => {
    let conn;

    try {
        // Get the database connection
        conn = await dbConnectionInstance();

        // Define the SQL query to select all students
        const sql = 'SELECT * FROM student_table';

        // Execute the query and return the data
        conn.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching the students:', err);
                
                throw new ApiError(500,"Error fetching the students");
            }
            // Send the results as a response
            return res.status(200).json({
                message: 'Students retrieved successfully',
                students: results
            });
        });

    } catch (error) {
        // Handle any unexpected errors
        console.error('Error fetching the students:', error);
        throw new ApiError(500,"Error fetching the students");
    } finally {
        // Ensure the connection is closed
        if (conn) await conn.end();
    }
});



const getStudentById = asyncHandler(async (req, res) => {
    let conn;
    const { id } = req.body; // Assuming the ID is passed as a URL parameter
    console.log("iddddddddddddd",id);
    
    try {
        // Get the database connection
        conn = await dbConnectionInstance();

        // SQL query to get one student by ID
        const sql = 'SELECT * FROM student_table WHERE id = ?';

        // Execute the query
        conn.query(sql, [id], (err, results) => {
            if (err) {
                console.error('Error fetching the student:', err);
                throw new ApiError(500,"Error fetching the student");
            }
            // Check if a student was found
            if (results.length === 0) {
            
                throw new ApiError(404,"Student not found ");
            }
            // Send the result back as JSON
            return res.status(200).json(results[0]); // Return only the first result
        });

    } catch (error) {
        // Handle any unexpected errors
        console.error('Error fetching the student:', error);
        
        throw new ApiError(500,"Error fetching the student");
    } finally {
        // Ensure the connection is closed
        if (conn) await conn.end();
    }
});

const deleteStudent = asyncHandler(async (req, res) => {
    let conn;
    const { id } = req.body;  // Get the student ID from the request body
    console.log("iddddddddddddd",id);
    
    if (!id) {
        
        throw new ApiError(400,"Student ID is required");
    }

    try {
        // Get the database connection
        conn = await dbConnectionInstance();

        // SQL query to delete a student by ID
        const sql = 'DELETE FROM student_table WHERE id = ?';

        // Execute the query
        conn.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting the student:', err);
                
                throw new ApiError(500,"Error deleting the student");
            }

            // Check if a student was deleted
            if (result.affectedRows === 0) {
                
                throw new ApiError(404,"Student not found or already deleted");
            }

            // Send success response
            return res.status(200).json({ message: 'Student deleted successfully' });
        });

    } catch (error) {
        // Handle unexpected errors
        console.error('Error during the deletion process:', error);
       
        throw new ApiError(500,"Error deleting the student");
    } finally {
        // Ensure the connection is closed
        if (conn) await conn.end();
    }
});


const updateStudent = asyncHandler(async (req, res) => {
    let conn;
    const { id, name, _class } = req.body;  // Destructure data from the request body
    console.log("id updateee",id);
    console.log("name updateee",name);
    console.log("class updateee",_class);
    
    if (!id || !name || !_class) {
    
        throw new ApiError(400,"Student ID, name, and class are required");

    }

    try {
        // Get the database connection
        conn = await dbConnectionInstance();

        // SQL query to update student information
        const sql = 'UPDATE student_table SET name = ?, _class = ? WHERE id = ?';

        // Execute the query with the provided values
        conn.query(sql, [name, _class, id], (err, result) => {
            if (err) {
                console.error('Error updating the student:', err);
                throw new ApiError(500,"Error updating the student");
            }

            // Check if any rows were updated
            if (result.affectedRows === 0) {
                
                throw new ApiError(404,"Student not found");
            }

            // Send success response
            return res.status(200).json({ message: 'Student updated successfully' });
        });

    } catch (error) {
        // Handle unexpected errors
        console.error('Error during the update process:', error);
        
        throw new ApiError(500,"Error updating the student");
    } finally {
        // Ensure the connection is closed
        if (conn) await conn.end();
    }
});






export {registerUser, getAllStudents, getStudentById, deleteStudent, updateStudent}

