enum Perfil {
    ADMIN = "admin",
    USER = "user"
}

type Usuario = {
    name: string,
    senhaHash : string,
    perfil: Perfil
}
const Usuarios: Usuario[] = [
    {
        name: "Usuario",
        senhaHash: "user1234",
        perfil: Perfil.USER
    },
    {
        name: "Admin",
        senhaHash: "admin1234",
        perfil: Perfil.ADMIN
    }
]

export { Perfil, Usuario, Usuarios };