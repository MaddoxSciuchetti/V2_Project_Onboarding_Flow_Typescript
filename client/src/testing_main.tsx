import { useState } from "react";

type RequestState = 
    | {status: "idle"}
    | {status: "loading"}
    | {status: "sucess", data: any}
    | {status: "error", error: Error};

const [requestState, setRequestState] = useState<RequestState> ({status: "idle"})