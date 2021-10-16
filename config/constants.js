httpCodes = {
    badRequest: 400,
    internalError: 500,
    created: 201,
    notFound: 404,
    ok: 200,
    notImplemented: 501,
    forbidden: 403,
    unAuthorized: 401
}

messages = {
    
    noValidClients: "Not Valid input number of clients",
    noValidSeconds: "Not Valid input Seconds",
    serverProblem: "Operation could not complete due to server problem",
    notValidSeconds: "Not Valid input Seconds",
    internalError: "Something went wrong",
    urlNotFound: "URL not found",

    
}

module.exports = {
    httpCodes,
    messages
}