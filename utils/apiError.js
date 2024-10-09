const { Sequelize } = require("sequelize");

exports.apiError = (err, req, res, next) => {
  //handleDbError
  err = handleDbError(err);

  //logging error
  console.error(err.message);

  res.status(err.statusCode).json({ message: err.message, des: err.des });
};

function handleDbError(error) {
  if (error instanceof Sequelize.ValidationError) {
    const errSum = error.errors.reduce((acc, err, index, arr) => {
      const lastWord = index === arr.length - 1 ? "" : "\n";
      return acc + err.message + lastWord;
    }, "");

    return { message: errSum, statusCode: 401 };
  } else if (error instanceof Sequelize.UniqueConstraintError) {
    console.error("Unique constraint error:", error.message);
    const fields = Object.keys(error.fields).join(", ");
    return {
      error: "Unique constraint violation",
      details: `Duplicate entry for ${fields}`,
    };
  } else {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "internal server failed";
    return error;
  }
}
