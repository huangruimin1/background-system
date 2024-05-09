interface userInfo {
    avatar: string,
    name: string,
    username: string,
    pone: string,
    usertype: number,
    sex: number,
    info: string,
    [porptyName:string]:any
}

export type UserInfo = userInfo;