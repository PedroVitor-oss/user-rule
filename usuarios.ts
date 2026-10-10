enum Perfil {
    ADMIN = "admin",
    USER = "user"
}

type Usuario = {
    id: number,
    name: string,
    senhaHash : string,
    perfil: Perfil
}
const Usuarios: Usuario[] = [
    {
        id:0,
        name: "Usuario",
        senhaHash: "user1234",
        perfil: Perfil.USER
    },
    {
        id:1,
        name: "Admin",
        senhaHash: "admin1234",
        perfil: Perfil.ADMIN
    }
]

export { Perfil, Usuario, Usuarios };