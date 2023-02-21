import path from "path";
// to update, read, overwrite the file
import fs from "fs";

function buildPath() {
  // get access to the current working directory with process.cwd(), then the data folder then the file
  return path.join(process.cwd(), "data", "data.json");
}

function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export default function handler(req, res) {
  const { method } = req;
  // Access our data (here data.json file)
  // Extract AllEvents, loop through them and identify the EventID
  // add the registered email into the emails_registered inside data.json (write on our data),
  // but only if that email doesn't exist
  //  res 404 if there are no AllEvents
  // check if the email format is ok

  const filePath = buildPath();
  // const data = extractData(filePath);  destructuring data below
  const { event_categories, allEvents } = extractData(filePath);

  if (!allEvents) {
    return res.status(404).json({
      message: "Events data not found",
    });
  }

  if (method === "POST") {
    const { email, eventId } = req.body;

    const newAllEvents = allEvents.map((ev) => {
      if (ev.id === eventId) {
        if (ev.emails_registered.includes(email)) {
          res
            .status(201)
            .json({ message: "Ths email has already been registered!" });
        }
        return {
          // we use the spread operator ... so that we don't have to specify id, etc...
          // also, we return the emails that we have here registered and the email that we just added (that comes from the req above)
          ...ev,
          emails_registered: [...ev.emails_registered, email],
        };
      }
      // if the above is not true, it will return the data without any modification
      return ev;
    });

    fs.writeFileSync(
      filePath,
      JSON.stringify({ event_categories, allEvents: newAllEvents })
    );
    // If all of the above is good, we'll send back the response below
    res.status(200).json({
      message: `You have been registered successfully with the email: ${email} for the event: ${eventId}`,
    });
  }
}
