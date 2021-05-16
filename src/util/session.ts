class Session {
    accessToken: string
    refreshToken: string

    constructor(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken
        this.refreshToken = refreshToken
    }
}


class SessionManager {

    static setLoggedIn (authorized: boolean) {
        localStorage.setItem("authorized", JSON.stringify(authorized))
    }

    static isLoggedIn (): boolean  {
        return JSON.parse(<string>localStorage.getItem("authorized"))
    }

    static logOut () {
        localStorage.clear()
        this.setLoggedIn(false)
    }

    static setSession (accessToken: string, refreshToken: string) {
        let session = new Session(accessToken, refreshToken)
        localStorage.setItem("session", JSON.stringify(session))
    }

    static refreshSession (accessToken: string, refreshToken: string) {
        localStorage.removeItem("session")
        this.setSession(accessToken, refreshToken)
    }

    static getSession (): Session {
        let session = localStorage.getItem("session")
        return JSON.parse(<string>session)
    }
}

export {
    SessionManager
}