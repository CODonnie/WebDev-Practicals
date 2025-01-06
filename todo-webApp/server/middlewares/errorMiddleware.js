const notFound = (req, res, next) => {
	const error = new Error(`ewooo! kasala don burst - ${req.originalUrl}`);
	res.status(404);
	next(error);
}

const errorHandler = (err, req, res, next) => {
	let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	let message = err.message

	if (err.name === "CastError" && err.kind === "ObjectId"){
		statusCode = 400;
		message = "resources not found";
	} else if (err.name === "ValidationError"){
		statusCode = 500;
		message = "err.message"
	}

	res.status(statusCode).json({
		message,
		stack: process.env.NODE_ENV === "development" ? err.stack : null
	})
}

export { notFound, errorHandler };
