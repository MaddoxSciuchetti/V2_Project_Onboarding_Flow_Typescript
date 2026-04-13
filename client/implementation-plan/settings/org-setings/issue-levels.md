Definition of done:

-The owner of the company can create their own issue levels
-This uses the same table component as the other tables
-The table header reads "issue levl" and on the right it is the actual name of the status

There are four rows by default (this is being fetched from endpoint):
These rows are aligned according to the header (name of level on the left with growing flex item) and the actual level on the right hand side
When hovering over item delete icon pops up to delete the issue level at endpoint:
When the add level is added a modal comes up where the user can input there new project level
-Ensure with zod validation that the project level has a name
-Once add is being clicked hit the endpoint:
