import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { error } from "console";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  const properties = ["has_booked_meeting", "visa_type"];

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

  if (method === "POST") {
    try {
      const apiResponse = await axios.post(searchApiURL, searchEmail, {
        headers,
      });

      let value = apiResponse.data.results;
      let obj = value[0];
      let has_booked_meeting = obj.properties.has_booked_meeting;
      let visa_type = obj.properties.visa_type;
      let contactId = obj.id;

      let contactproperties = {};

      if (
        has_booked_meeting === "" ||
        has_booked_meeting === "false" ||
        has_booked_meeting === null
      ) {
        contactproperties = {
          has_booked_meeting: true,
        };
      } else {
        return res.status(400).json({ error: "Meeting already booked" });
      }

      const recordMeeting = `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`;
      try {
        const apiresponse2 = await axios.patch(
          recordMeeting,
          { properties: contactproperties },
          {
            headers,
          }
        );

        const data = {
          apiresponse2: apiresponse2.data,
          visa_type: visa_type,
        };

        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
