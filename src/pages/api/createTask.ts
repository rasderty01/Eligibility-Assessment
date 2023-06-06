import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  let hs_task_body = "";
  let First_Name = "";
  let Last_Name = "";
  let Visa_Type = "";

  Object.entries(req.body).forEach(([key, value]) => {
    if (key === "Type of Visa") {
      Visa_Type += `${value}`;
    }
    if (key === "First Name") {
      First_Name += `${value}`;
    }
    if (key === "Last Name") {
      Last_Name += `${value}`;
    }
    if (
      key !== "First Name" &&
      key !== "Last Name" &&
      key !== "Visa Type" &&
      key !== "contactId"
    ) {
      hs_task_body += `${key}: ${value} <br>`;
    }
  });

  const twoDaysLater = new Date();
  twoDaysLater.setDate(twoDaysLater.getDate() + 2);
  const hs_timestamp = twoDaysLater.toISOString();

  const oneDayBefore = new Date(twoDaysLater);
  oneDayBefore.setDate(oneDayBefore.getDate() - 1);
  const reminder_timestamp_ms = oneDayBefore.getTime();

  const properties = {
    hs_timestamp: reminder_timestamp_ms,
    hs_task_body: hs_task_body,
    hubspot_owner_id: "805242080",
    hs_task_subject: `ATTENTION!!! ${Visa_Type} for ${First_Name} ${Last_Name}`,
    hs_task_status: "WAITING",
    hs_task_priority: "HIGH",
  };

  const SimplePublicObjectInputForCreate = {
    properties,
    associations: [
      {
        to: { id: req.body.contactId },
        types: [
          { associationCategory: "HUBSPOT_DEFINED", associationTypeId: 10 },
        ],
      },
    ],
  };

  const hubspotAPIKey = process.env.SECRET_NAME;

  const apiUrl = "https://api.hubapi.com/crm/v3/objects/tasks";
  const headers = {
    Authorization: `Bearer ${hubspotAPIKey}`,
    "Content-Type": "application/json",
  };

  if (method === "POST") {
    try {
      const apiResponse = await axios.post(
        apiUrl,
        SimplePublicObjectInputForCreate,
        { headers }
      );
      res.status(200).json(apiResponse.data);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
