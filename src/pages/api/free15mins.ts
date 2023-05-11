import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";
import { error } from "console";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  const properties = ["has_booked_meeting"];

  const filters = [
    {
      propertyName: "email",
      operator: "EQ",
      value: req.body.email,
    },
  ];

  const searchEmail = JSON.stringify({
    filters,
    id: [],
    properties,
    associations: [],
  });

  const hubspotAPIKey = process.env.SECRET_NAME;

  const searchApiURL = "https://api.hubapi.com/crm/v3/objects/contacts/search";
  const headers = {
    Authorization: `Bearer ${hubspotAPIKey}`,
    "Content-Type": "application/json",
  };

  const recordMeeting = "https://api.hubapi.com/crm/v3/objects/contacts/";

  if (method === "POST") {
    try {
      const apiResponse = await axios.post(searchApiURL, searchEmail, {
        headers,
      });

      BookedMeeting(apiResponse);

      res.status(200).json(apiResponse.data);
    } catch (error) {
      res.status(500).json({ error });
      console.log("Error generated");
    }
  }
}

async function BookedMeeting(apiResponse: AxiosResponse<any, any>) {
  let value = apiResponse.data.results;
  let obj = value[0];
  let has_booked_meeting = obj.properties.has_booked_meeting;
  let contactId = obj.id;

  let contactproperties = {};

  if (has_booked_meeting === null || has_booked_meeting === "No") {
    contactproperties = {
      has_booked_meeting: "Yes",
    };
  } else {
    return res.status(400).json({ error: "Meeting already booked" });
  }

  const bookedMeeting1 = {
    id: [contactId],
    contactproperties,
    associations: [],
  };

  try {
    const apiresponse2 = await axios.post(recordMeeting, bookedMeeting1, {
      headers,
    });

    res.status(200).json(apiresponse2.data);
  } catch (error) {
    res.status(500).json({ error });
    console.log("Error generated");
  }
}
