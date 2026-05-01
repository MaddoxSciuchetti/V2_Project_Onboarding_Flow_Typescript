Project to help companies onboard and offboard employees with 10x less headache.

When editing the schema run npx prisma generate to make the new updates available to you codebase
Once this has been done create a migration file that shows these new changes that have been applied
Run this command to apply a new migration: npx prisma migrate dev --name describe_the_change
Command on render runs migrate deploy and executes this on the table
