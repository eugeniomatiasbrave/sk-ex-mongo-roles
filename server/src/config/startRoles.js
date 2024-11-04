import roleModel from "../managers/mongo/models/role.model.js";

// Crear roles en la base de datos al niciar la aplicación
export const createRoles = async (req, res) => {

	try {
		const count = await roleModel.estimatedDocumentCount();

	if (count > 0) return;
	
	const values = await Promise.all([
		new roleModel({ name: "user" }).save(),
		new roleModel({ name: "moderator" }).save(),
		new roleModel({ name: "admin" }).save(),
	]);

	console.log(values);
	//res.json({ values });
	} catch (error) {
		res.status(500).json({ status: "error", message: "Registration failed", error: error.message });
	}
}