const NotFound = (req, res, next) => {
  const error = new Error(`chai! not found error - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandling = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
		res.json({
			message: "resource not found",
			stack: process.env.NODE_ENV === "production" ? null : err.stack
		})
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { NotFound, errorHandling };
