import {Router} from "express"
import {registerUser,getAllStudents, getStudentById,deleteStudent,updateStudent} from "./../controllers/queryController.js"


const router = Router()

router.route("/getAllStudents").get(getAllStudents)
router.route("/registerUser").post(registerUser)
router.route("/getStudentById").post(getStudentById)
router.route("/deleteStudent").delete(deleteStudent)
router.route("/updateStudent").post(updateStudent)

export default router;