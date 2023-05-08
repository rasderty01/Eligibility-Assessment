import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  const hs_task_body = `
<strong><br>First Name: ${req.body.firstName}</br>
<br>Last Name: ${req.body.lastName}</br>
<br>Email: ${req.body.email}</br>
<br>WhatsApp Number: ${req.body.whatsappNumber}</br>
<br>Applying with Sponsor: ${req.body.yesNoQuestion}</br>
<br>Relationship With Sponsor: ${req.body.RelationshipWithSponsor}</br>
<br>Met With Sponsor: ${req.body.metWithSponsor}</br>
<br>Applicant Source of Income: ${req.body.ApplicantSourceOfIncome}</br>
<br>Sponsor Source of Income: ${req.body.SponsorSourceOfIncome}</br>
<br>Income Range: ${req.body.incomeRange}</br>
`;

  const twoDaysLater = new Date();
  twoDaysLater.setDate(twoDaysLater.getDate() + 2);
  const hs_timestamp = twoDaysLater.toISOString();

  const oneDayBefore = new Date(twoDaysLater);
  oneDayBefore.setDate(oneDayBefore.getDate() - 1);
  const reminder_timestamp_ms = oneDayBefore.getTime();

  const properties = {
    hs_timestamp: hs_timestamp,
    hs_task_body: hs_task_body,
    hubspot_owner_id: "805242080",
    hs_task_subject: `New Contact  {${req.body.firstName} ${req.body.lastName}}`,
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

  console.log(SimplePublicObjectInputForCreate);

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
      console.log(apiResponse);
      res.status(200).json(apiResponse.data);
    } catch (error) {
      res.status(500).json({ error });
      console.log("Error generated");
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
