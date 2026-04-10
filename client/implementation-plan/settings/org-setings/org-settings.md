Goal for this implementation is that the user navigates to the org-settings page.

-Page dispays minimalistic input box
-Minimalistic heading telling the user to signup
-Validation happens through a simple zod schema ensuring input is a email
-When button is clicked a request is sent to endpoint /v2/register
-This endpoint verifies that the user who send the request has a actual oganiation under his name
-Once this is checked with app assert new phase next step
-A unique slug is created, using the email template a email is sent to the user from the input
box containing the unique slug
-Wen the user receives this unique slug and clicks on the link it prompts to a different signup page
-This signup page is prefilled with the email of the user. The user just needs to enter further
details like his password and his display name
-Once he signs up the regular /v2/register endpoint is created
-The user is than prompted to log in and is part of the organization
