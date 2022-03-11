const getRandInt = (max) => Math.floor(Math.random() * Math.floor(max));

export default async (request, response) => {
  response.setHeader("Content-Type", "application/json");

  if (request.method === "POST") {
    return new Promise((resolve) => {
      const timeoutTime = getRandInt(8000);

      const shouldFail = !!getRandInt(2);

      let payload;

      if (shouldFail) {
        payload = {
          message: "Sorry API is available",
          timeout: timeoutTime,
        };
        response.statusCode = 418;
      } else {
        payload = {
          ...request.body,
          timeout: timeoutTime,
        };
        response.statusCode = 202;
      }

      setTimeout(() => {
        resolve(response.send(payload));
      }, timeoutTime);
    });
  } else {
    return response.status(405).send({ message: "Method not allowed" });
  }
};
