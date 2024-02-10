import { deleteUser } from "@/services/user"

export default {
    "ban": [
        {
            name: "lorem",
            description: "desc",
            func: async () => await deleteUser(1),
        }
    ]
}