import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  const properties = {
    email: req.body.email,
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    hs_whatsapp_phone_number: req.body.whatsappNumber,
    visa_type: req.body.typeofVisa,
    hubspot_owner_id: "805242080",
  };

  const SimplePublicObjectInputForCreate = { properties, associations: [] };

  const hubspotAPIKey = process.env.SECRET_NAME;

  const apiUrl = "https://api.hubapi.com/crm/v3/objects/contacts";
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
  }
}
