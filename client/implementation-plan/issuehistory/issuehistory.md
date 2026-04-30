Success condition for this task is that the history log is showing on the sidebar that opens when a task is being edited
The component for this is already sitting at @client/src/features/worker-task-management/components/tasks/task-sidebar/task-history/TaskHistory.tsx

Implementation details:

Ensure that the PUT request to task/:id which edits the task also updates the issue log. With no issue log we can fetch no history
Ensure that the typing is on the latest standpoint as the modules connected still use old types
Once the above is verified ensure that @client/src/features/worker-task-management/components/tasks/task-sidebar/task-history/HistoryContent.tsx:11 properly fetches the history data using the proper endpoint. It should call a new route: @client/src/features/worker-task-management/api/index.api.ts:44-49 here that fetches the issue log for that specific Task
