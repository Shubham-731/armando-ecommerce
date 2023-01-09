async function handler(req, res) {
  const { method } = req;

  try {
    if (method.toUpperCase() === "POST") {
      //
    } else {
      res.status(405).json({
        msg: "Method not allowed",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export default handler;
